import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import CenteredState from "../../components/layout/CenteredState";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCommerceItemRoute } from "../../lib/commerceItems";
import { getSavedItems, removeSavedItem } from "../../lib/savedItems";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import { useCartStore } from "../../stores/cartStore";

const WishListD = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setItems(await getSavedItems());
      setError("");
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (item) => {
    try {
      await removeSavedItem(item);

      setItems((currentItems) =>
        currentItems.filter(
          (currentItem) =>
            currentItem.itemType !== item.itemType || currentItem.itemId !== item.itemId,
        ),
      );
    } catch (removeError) {
      setError(removeError.message);
    }
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
  };

  if (loading) {
    return <CenteredState className="bg-background min-h-screen">Loading wishlist...</CenteredState>;
  }

  if (error) {
    return <CenteredState className="bg-background min-h-screen text-red-500">{error}</CenteredState>;
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
        <h1 className="ml-14 text-2xl text-lightblack poppins-bold">WishList</h1>
        {items.length === 0 ? (
          <div className="px-14 py-12 text-gray-500">No saved items yet.</div>
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
                    className="text-gray-600 transition hover:text-red-600"
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
                    className="text-left text-xl text-brown poppins-bold"
                  >
                    {item.name || "Saved item"}
                  </button>
                  <div className="flex items-center gap-2">
                    <p className="text-brown poppins-bold text-sm">Category:</p>
                    <p className="text-sm">{item.category || "General"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-brown font-bold text-sm">Type:</p>
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
                    className="rounded-lg bg-orange-500 px-4 py-2 text-white poppins-bold"
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
