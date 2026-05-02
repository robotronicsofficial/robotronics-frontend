import { useNavigate } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import CenteredState from "@/components/layout/CenteredState";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getCommerceItemRoute } from "@/lib/commerceItems";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useCartStore } from "@/stores/cartStore";
import {
  useRemoveSavedItemMutation,
  useSavedItems,
} from "@/hooks/useSavedItems";
import { Button } from "@/components/ui/button";

const WishListD = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const {
    data: items = [],
    isLoading: loading,
    error,
  } = useSavedItems();
  const removeSavedItemMutation = useRemoveSavedItemMutation();

  const handleRemove = async (item) => {
    try {
      await removeSavedItemMutation.mutateAsync(item);
    } catch (removeError) {
      console.error("Failed to remove saved item:", removeError);
    }
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
  };

  if (loading) {
    return <CenteredState className="bg-background min-h-screen">Loading wishlist...</CenteredState>;
  }

  if (error) {
    return <CenteredState className="bg-background min-h-screen text-destructive">{error.message}</CenteredState>;
  }

  return (
    <DashboardLayout
      className="min-h-0 bg-background px-0"
      contentClassName="w-full py-10 p-0"
      navClassName="w-1/3"
      navProps={{ "data-aos": "fade-up" }}
      withHeaderOffset={false}
    >
      <div data-aos="fade-up">
        <h1 className="ml-14 text-2xl text-foreground">WishList</h1>
        {items.length === 0 ? (
          <div className="flex flex-col items-start gap-4 px-14 py-12">
            <Heart aria-hidden="true" className="size-12 text-muted-foreground" />
            <p className="max-w-md text-muted-foreground">
              Your wishlist is empty. Add items you&apos;re thinking about, and compare them later before checkout.
            </p>
            <Button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              className="h-auto rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Browse products
            </Button>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={`${item.itemType}:${item.itemId}`}
              className="mb-5 flex items-center justify-between px-14 py-5"
            >
              <div className="flex items-center gap-5">
                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item)}
                    className="text-muted-foreground hover:bg-transparent hover:text-destructive"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X />
                  </Button>
                </div>
                <Button type="button" variant="ghost" className="h-auto p-0" onClick={() => navigate({ to: getCommerceItemRoute(item) })}>
                  <img
                    src={resolveBackendAssetUrl(item.image || item.images?.[0], "https://via.placeholder.com/160")}
                    className="size-20 object-cover"
                    alt={item.name || "Saved item"}
                  />
                </Button>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => navigate({ to: getCommerceItemRoute(item) })}
                    className="h-auto justify-start p-0 text-left text-xl text-foreground"
                  >
                    {item.name || "Saved item"}
                  </Button>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground text-sm">Category:</p>
                    <p className="text-sm">{item.category || "General"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-bold text-sm">Type:</p>
                    <p className="text-sm">{item.itemType}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-5">
                <div>
                  <p className="text-xl">PKR {Number(item.price || 0).toLocaleString()}</p>
                </div>
                <div>
                  <Button
	                    type="button"
	                    onClick={() => handleMoveToCart(item)}
	                    className="h-auto rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
	                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default WishListD;
