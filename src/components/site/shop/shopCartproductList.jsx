import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import OrderSummaryLine from "./OrderSummaryLine";
import { useAuth } from "@/contexts/useAuth";
import { getCommerceItemKey } from "@/lib/commerceItems";
import {
  calculateCartSummary,
  formatShopCurrency,
  loadShopCheckout,
  saveShopCheckout,
} from "@/lib/shopCheckout";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { selectCart, useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "react-toastify/dist/ReactToastify.css";

const PENDING_CART_STORAGE_KEY = "robotronics:pendingCart";

const summaryRowClassName =
  "pb-2 font-lato font-medium text-[16px] leading-[20px] tracking-[0] text-muted-foreground";
const summaryValueBaseClassName =
  "bg-transparent text-right text-[20px] font-extrabold leading-[28px] tracking-[0]";
const summaryValueClassName = `${summaryValueBaseClassName} text-foreground`;
const totalSummaryValueClassName = `${summaryValueBaseClassName} text-primary`;

const ShopCartproductList = ({ onNext }) => {
  const cart = useCartStore(selectCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeItemEntirely = useCartStore((state) => state.removeItemEntirely);
  const [notes, setNotes] = useState(() => loadShopCheckout().note || "");
  const { currentUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const summary = useMemo(() => calculateCartSummary(cart), [cart]);

  const [itemQuantity, setItemQuantity] = useState(
    cart.reduce((acc, product) => {
      acc[getCommerceItemKey(product)] = product.quantity;
      return acc;
    }, {})
  );

  // Restore any pending cart from a pre-login redirect. Only runs when the
  // user is authenticated and the current cart is empty — the persisted
  // Zustand store handles the common case, this covers the edge where the
  // cart was cleared or opened in a new tab.
  useEffect(() => {
    if (!currentUser) return;
    if (cart.length > 0) return;

    try {
      const raw = window.localStorage.getItem(PENDING_CART_STORAGE_KEY);
      if (!raw) return;

      const pending = JSON.parse(raw);
      if (Array.isArray(pending) && pending.length > 0) {
        pending.forEach((item) => {
          if (item) addToCart(item);
        });
      }
    } catch (restoreError) {
      console.error("Failed to restore pending cart:", restoreError);
    } finally {
      window.localStorage.removeItem(PENDING_CART_STORAGE_KEY);
    }
  }, [currentUser, cart.length, addToCart]);

  const handleAddToCart = useCallback(
    (product) => {
      const productId = getCommerceItemKey(product);
      setItemQuantity((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));
      addToCart(product);
    },
    [addToCart]
  );

  const handleRemoveFromCart = useCallback(
    (product) => {
      const productId = getCommerceItemKey(product);
      setItemQuantity((prev) => ({
        ...prev,
        [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
      }));
      removeFromCart(product);
    },
    [removeFromCart]
  );

  const handleRemoveLine = useCallback(
    (product) => {
      removeItemEntirely(product);
    },
    [removeItemEntirely]
  );

  const handleNext = useCallback(() => {
    if (isAuthLoading) {
      toast.info("Checking your account. Please try again in a moment.");
      return;
    }

    if (!currentUser) {
      // Stash cart so the user doesn't lose their selections across the
      // login redirect. Restored on mount once authenticated.
      try {
        window.localStorage.setItem(
          PENDING_CART_STORAGE_KEY,
          JSON.stringify(cart)
        );
      } catch (stashError) {
        console.error("Failed to stash pending cart:", stashError);
      }

      toast.error("Please sign in to proceed to checkout", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate({
        to: "/Login",
        search: { redirect: location.href },
      });
      return;
    }

    if (onNext) onNext();
  }, [cart, currentUser, isAuthLoading, location.href, onNext, navigate]);


  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-col lg:w-2/3 lg:pr-5">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div className="mx-auto max-w-4xl py-8" key={getCommerceItemKey(product)}>
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="h-40 w-full overflow-hidden rounded-lg sm:size-40">
                  <img
                    src={resolveBackendAssetUrl(product.image || product.images?.[0], "https://via.placeholder.com/300x200")}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="w-full sm:w-2/3">
                  <h1 className="mb-2 text-wrap font-Poppins text-[20px] font-bold leading-[28px] tracking-normal text-foreground">
                    {product.name}
                  </h1>
                  <div className="mb-4 flex items-center justify-end gap-4">
                    <div className="flex items-center justify-center bg-card">
                      <Button
                        type="button"
                        onClick={() => handleRemoveFromCart(product)}
                        variant="secondary"
                        size="sm"
                        className="rounded-md bg-muted px-3 py-1 text-muted-foreground hover:bg-muted"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        className="h-auto w-10 rounded-md px-1 py-1 text-center text-sm lg:w-24 lg:px-3"
                        value={itemQuantity[getCommerceItemKey(product)] || 1}
                        readOnly
                      />
                      <Button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        variant="secondary"
                        size="sm"
                        className="rounded-md bg-muted px-1 text-muted-foreground hover:bg-muted lg:px-3 lg:py-1"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveLine(product)}
                      aria-label="Remove item from cart"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <div className="pt-10 text-right text-2xl font-bold text-foreground">
                    {formatShopCurrency(product.price)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-4 p-5 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild className="bg-primary text-background">
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="hidden flex-col p-2 lg:flex">
        <div className="h-full w-0 border border-border"></div>
      </div>
      <div className="flex w-full flex-col rounded-lg bg-background px-4 py-6 sm:px-6 lg:w-1/3 lg:px-10">
        <h2 className="mb-4 font-poppins text-[32px] font-semibold leading-[40px] tracking-[0] text-foreground">
          ORDER SUMMARY
        </h2>
        <div className="my-6 flex flex-col gap-3">
          <OrderSummaryLine
            label="Price"
            value={formatShopCurrency(summary.subtotal)}
            className={summaryRowClassName}
            valueClassName={summaryValueClassName}
          />
          <OrderSummaryLine
            label="Discount (10%)"
            value={`- ${formatShopCurrency(summary.discount)}`}
            className={summaryRowClassName}
            valueClassName={summaryValueClassName}
          />
          <OrderSummaryLine
            label="Shipping"
            value={formatShopCurrency(summary.shipping)}
            className={summaryRowClassName}
            valueClassName={summaryValueClassName}
          />
          <OrderSummaryLine
            label="Total Price"
            value={formatShopCurrency(summary.total)}
            className={summaryRowClassName}
            valueClassName={totalSummaryValueClassName}
          />
        </div>
        <div className="mt-20">
          <span className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-foreground">
            Write your special notes here...
          </span>

          <Textarea
            className="mt-1 block min-h-36 w-full border-border bg-background p-4 font-poppins font-light sm:p-7"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              saveShopCheckout({ note: e.target.value });
            }}
          />
        </div>

        <div className="flex justify-center mt-20">
          <Button
            type="button"
            onClick={handleNext}
            aria-label="Proceed to Checkout"
            className="h-11 w-full max-w-md gap-2.5 bg-foreground p-3 font-semibold text-background"
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </div>
  );
};

ShopCartproductList.propTypes = {
  onNext: PropTypes.func,
};

export default ShopCartproductList;
