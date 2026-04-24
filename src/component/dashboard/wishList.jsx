import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import CenteredState from "../../components/layout/CenteredState";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCommerceItemRoute } from "../../lib/commerceItems";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import { useCartStore } from "../../stores/cartStore";
import {
  useRemoveSavedItemMutation,
  useSavedItems,
} from "../../hooks/useSavedItems";

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
        <h1 className="ml-14 text-2xl text-foreground poppins-bold">WishList</h1>
        {items.length === 0 ? (
          <div className="px-14 py-12 text-muted-foreground">No saved items yet.</div>
        ) : (
          items.map((item) => (
            <div
              key={`${item.itemType}:${item.itemId}`}
              className="mb-5 flex items-center justify-between px-14 py-5"
            >
              <div className="flex items-center gap-5">
                <div>
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="text-muted-foreground transition hover:text-destructive"
                    aria-label={`Remove ${item.name}`}
                  >
                    <FaTimes />
                  </button>
                </div>
                <button type="button" onClick={() => navigate(getCommerceItemRoute(item))}>
                  <img
                    src={resolveBackendAssetUrl(item.image || item.images?.[0], "https://via.placeholder.com/160")}
                    className="size-20 object-cover"
                    alt={item.name || "Saved item"}
                  />
                </button>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(getCommerceItemRoute(item))}
                    className="text-left text-xl text-foreground poppins-bold"
                  >
                    {item.name || "Saved item"}
                  </button>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground poppins-bold text-sm">Category:</p>
                    <p className="text-sm">{item.category || "General"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-bold text-sm">Type:</p>
                    <p className="text-sm poppins-bold">{item.itemType}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-5">
                <div>
                  <p className="text-xl poppins-bold">PKR {Number(item.price || 0).toLocaleString()}</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    className="rounded-lg bg-warning px-4 py-2 text-background poppins-bold"
                  >
                    Add to Cart
                  </button>
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
