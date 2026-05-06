import { useNavigate } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";

import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { getCommerceItemRoute } from "@/lib/commerceItems";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useCartStore } from "@/stores/cartStore";
import {
  useRemoveSavedItemMutation,
  useSavedItems,
} from "@/hooks/useSavedItems";
import { useFormatMoney } from "@/utils/formatPrice";

const WishListItem = ({ item, onRemove, onView, onMoveToCart }) => {
  const formatMoney = useFormatMoney();
  return (
  <Card>
    <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item)}
        className="absolute right-3 top-3 sm:static text-muted-foreground hover:text-destructive"
        aria-label={`Remove ${item.name || "item"}`}
      >
        <X className="size-4" />
      </Button>

      <button
        type="button"
        onClick={() => onView(item)}
        className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted"
      >
        <img
          src={resolveBackendAssetUrl(item.image || item.images?.[0], "https://via.placeholder.com/160")}
          className="size-full object-cover"
          alt={item.name || "Saved item"}
        />
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <button
          type="button"
          onClick={() => onView(item)}
          className="text-left text-body font-semibold text-foreground hover:text-primary"
        >
          {item.name || "Saved item"}
        </button>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted-foreground">
          <span>Category: {item.category || "General"}</span>
          <span>Type: {item.itemType}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Text size="sm" weight="semibold" className="text-foreground">
          {formatMoney(item.price)}
        </Text>
        <Button type="button" onClick={() => onMoveToCart(item)} className="rounded-full">
          Add to cart
        </Button>
      </div>
    </CardContent>
  </Card>
  );
};

const WishListD = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const {
    data: items = [],
    isLoading,
    error,
  } = useSavedItems();
  const removeSavedItemMutation = useRemoveSavedItemMutation();

  const handleRemove = async (item) => {
    try {
      await removeSavedItemMutation.mutateAsync(item);
    } catch (err) {
      console.error("Failed to remove saved item:", err);
    }
  };

  if (isLoading) {
    return <CenteredState className="bg-background min-h-screen">Loading wishlist…</CenteredState>;
  }

  if (error) {
    return (
      <CenteredState className="bg-background min-h-screen text-destructive">
        {error.message}
      </CenteredState>
    );
  }

  return (
    <DashboardLayout contentClassName="px-6">
      <div className="mb-8 flex flex-col gap-1">
        <Heading level={1} className="text-h1">
          Wishlist
        </Heading>
        <Text tone="muted">Items you saved for later from the live catalog.</Text>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-start gap-4 py-10">
            <Heart aria-hidden="true" className="size-12 text-muted-foreground" />
            <Text tone="muted" className="max-w-md">
              Your wishlist is empty. Add items you&apos;re thinking about, and compare them later before checkout.
            </Text>
            <Button type="button" size="marketing" onClick={() => navigate({ to: "/shop" })}>
              Browse products
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <WishListItem
              key={`${item.itemType}:${item.itemId}`}
              item={item}
              onRemove={handleRemove}
              onView={(it) => navigate({ to: getCommerceItemRoute(it) })}
              onMoveToCart={addToCart}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default WishListD;
