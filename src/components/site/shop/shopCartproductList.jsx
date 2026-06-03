import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import ShopOrderSummary from "./ShopOrderSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/useAuth";
import { getCommerceItemKey } from "@/lib/commerceItems";
import {
  clearPendingCartItems,
  EMPTY_SHOP_CART_QUOTE,
  loadPendingCartItems,
  loadShopCheckout,
  savePendingCartItems,
  saveShopCheckout,
} from "@/lib/shopCheckout";
import { useShopCartQuoteQuery } from "@/hooks/useShopOrders";
import { resolveCatalogImageUrl } from "@/lib/catalogImage";
import { useFormatMoney } from "@/utils/formatPrice";
import { selectCart, useCartStore } from "@/stores/cartStore";
import { LOGIN_PATH, SHOP_PATH } from "@/router/paths";

const ShopCartproductList = ({ onNext }) => {
  const cart = useCartStore(selectCart);
  const formatMoney = useFormatMoney();
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeItemEntirely = useCartStore((state) => state.removeItemEntirely);
  const [notes, setNotes] = useState(() => loadShopCheckout().note || "");
  const { currentUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const quoteQuery = useShopCartQuoteQuery(cart);
  const quote = cart.length ? quoteQuery.data : EMPTY_SHOP_CART_QUOTE;
  const pricing = quote?.pricing || null;
  const quoteItemsByKey = useMemo(
    () => new Map((quote?.items || []).map((item) => [getCommerceItemKey(item), item])),
    [quote],
  );

  const [itemQuantity, setItemQuantity] = useState(
    cart.reduce((acc, product) => {
      acc[getCommerceItemKey(product)] = product.quantity;
      return acc;
    }, {}),
  );

  useEffect(() => {
    if (!currentUser) return;
    if (cart.length > 0) return;

    const pending = loadPendingCartItems();
    pending.forEach(addToCart);
    clearPendingCartItems();
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
    [addToCart],
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
    [removeFromCart],
  );

  const handleRemoveLine = useCallback(
    (product) => removeItemEntirely(product),
    [removeItemEntirely],
  );

  const handleNext = useCallback(() => {
    if (isAuthLoading) {
      toast.info("Checking your account. Please try again in a moment.");
      return;
    }

    if (!currentUser) {
      savePendingCartItems(cart);

      toast.error("Please sign in to proceed to checkout", {
        duration: 5000,
      });

      navigate({
        to: LOGIN_PATH,
        search: { redirect: location.href },
      });
      return;
    }

    if (onNext) onNext();
  }, [cart, currentUser, isAuthLoading, location.href, onNext, navigate]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-4">
        {cart.length > 0 ? (
          cart.map((product) => (
            <Card key={getCommerceItemKey(product)}>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <div className="size-32 shrink-0 overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={resolveCatalogImageUrl(product.image || product.images?.[0])}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <Text size="lg" weight="semibold">{product.name}</Text>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-border bg-card">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRemoveFromCart(product)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-4" aria-hidden="true" />
                      </Button>
                      <Input
                        type="number"
                        className="h-8 w-12 border-0 bg-transparent text-center"
                        value={itemQuantity[getCommerceItemKey(product)] || 1}
                        readOnly
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleAddToCart(product)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <Text size="lg" weight="semibold">
                        {quoteItemsByKey.has(getCommerceItemKey(product))
                          ? formatMoney(quoteItemsByKey.get(getCommerceItemKey(product)).unitPrice)
                          : quoteQuery.isError
                            ? "Unavailable"
                            : "Updating..."}
                      </Text>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRemoveLine(product)}
                        aria-label="Remove item from cart"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-start gap-4 py-10">
              <Text tone="muted">Your cart is empty.</Text>
              <Button asChild>
                <Link to={SHOP_PATH}>Continue shopping</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="lg:sticky lg:top-24 lg:self-start">
        <CardContent className="flex flex-col gap-6">
          <Heading level={3} className="text-h4">Order summary</Heading>

          <ShopOrderSummary
            pricing={pricing}
            isLoading={cart.length > 0 && quoteQuery.isLoading}
            isError={cart.length > 0 && quoteQuery.isError}
          />

          <div className="flex flex-col gap-2">
            <Text size="sm" weight="semibold">Special notes</Text>
            <Textarea
              className="min-h-32"
              placeholder="Add any delivery notes…"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                saveShopCheckout({ note: e.target.value });
              }}
            />
          </div>

          <Button
            type="button"
            size="marketing"
            onClick={handleNext}
            disabled={cart.length === 0 || quoteQuery.isLoading || quoteQuery.isError}
            className="w-full"
          >
            Proceed to checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

ShopCartproductList.propTypes = {
  onNext: PropTypes.func,
};

export default ShopCartproductList;
