import { afterEach, describe, expect, it, vi } from "vitest";

import { requireShopCartQuote } from "./shopCheckoutGuard";
import { requestShopCartQuote } from "./shopOrders";
import { useCartStore } from "@/stores/cartStore";

vi.mock("./shopOrders", () => ({
  requestShopCartQuote: vi.fn(),
}));

const createContext = () => ({
  queryClient: {
    fetchQuery: vi.fn(({ queryFn }) => queryFn()),
  },
});

describe("shop checkout route guard", () => {
  afterEach(() => {
    useCartStore.setState({ ownerId: null, cart: [] });
    vi.clearAllMocks();
  });

  it("loads one backend quote before allowing checkout detail routes", async () => {
    const quote = {
      items: [{ itemType: "product", itemId: "product-1", quantity: 1 }],
      requiresShipping: true,
      pricing: { subtotal: 1000, discount: 100, shipping: 500, total: 1400 },
    };
    requestShopCartQuote.mockResolvedValue({ quote });
    useCartStore.setState({
      cart: [{ itemType: "product", itemId: "product-1", quantity: 1 }],
    });

    const context = createContext();

    await expect(requireShopCartQuote({ context })).resolves.toEqual({
      shopCartQuote: quote,
    });
    expect(context.queryClient.fetchQuery).toHaveBeenCalledTimes(1);
    expect(requestShopCartQuote).toHaveBeenCalledWith({
      items: [{ itemType: "product", itemId: "product-1", quantity: 1 }],
    });
  });

  it("redirects before checkout detail routes when the cart has no quoteable items", async () => {
    const context = createContext();

    await expect(requireShopCartQuote({ context })).rejects.toBeDefined();
    expect(context.queryClient.fetchQuery).not.toHaveBeenCalled();
    expect(requestShopCartQuote).not.toHaveBeenCalled();
  });

  it("redirects when the backend quote does not contain items", async () => {
    requestShopCartQuote.mockResolvedValue({ quote: { items: [] } });
    useCartStore.setState({
      cart: [{ itemType: "product", itemId: "product-1", quantity: 1 }],
    });

    await expect(requireShopCartQuote({ context: createContext() })).rejects.toBeDefined();
  });
});
