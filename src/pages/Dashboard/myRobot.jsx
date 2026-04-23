import { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Intro from "../../component/dashboard/intro"
import LeftNav from "../../component/dashboard/leftNav";
import { getCommerceItemRoute } from "../../lib/commerceItems";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";

const MyRobot = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlists/wishlist`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to load saved items: ${response.status}`);
        }

        const data = await response.json();
        setItems(Array.isArray(data?.items) ? data.items : []);
        setError("");
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load saved items");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + Number(item?.price || 0), 0),
    [items]
  );

  const handleRemove = async (item) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/wishlists/wishlist/${item.itemType}/${item.itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to remove saved item: ${response.status}`);
      }

      setItems((currentItems) =>
        currentItems.filter(
          (currentItem) =>
            currentItem.itemType !== item.itemType || currentItem.itemId !== item.itemId,
        ),
      );
    } catch (removeError) {
      setError(removeError.message || "Failed to remove saved item");
    }
  };

  return (
    <div className="bg-background min-h-screen"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000" >
      {/* intro */}
      <div className="px-4 md:px-20">
        <Intro/>
      </div>
      {/* Product & NavBar */}
      <div className="lg:flex flex-row px-4 md:px-20 pt-40 md:pt-4">
        {/* NavBr */}
        <div className="lg:w-1/3 w-2/3 ">
          <LeftNav />
        </div>
        {/* products */}
        <div className="w-full py-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 px-8 lg:px-14">
            <div>
              <h1 className="text-lightblack poppins-bold lg:text-2xl text-base">My Saved Items</h1>
              <p className="text-sm text-[#7E7F7C]">Items you saved for later from the live catalog.</p>
            </div>
            <div className="rounded-xl bg-white px-4 py-3 text-sm text-brown shadow-sm">
              Saved items: <span className="font-bold">{items.length}</span> · Value: <span className="font-bold">PKR {Number(totalValue || 0).toLocaleString()}</span>
            </div>
          </div>

          {loading ? (
            <div className="px-8 lg:px-14 py-12 text-brown">Loading saved items...</div>
          ) : error ? (
            <div className="px-8 lg:px-14 py-12 text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="px-8 lg:px-14 py-12 space-y-4 text-brown">
              <p>No saved items yet.</p>
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="rounded-lg bg-brown px-5 py-3 font-semibold text-gold"
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="space-y-5 px-8 lg:px-14">
              {items.map((item) => (
                <div
                  key={`${item.itemType}:${item.itemId}`}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex flex-row items-center gap-5">
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      className="text-gray-600 transition hover:text-red-600"
                      aria-label={`Remove ${item.name || "item"} from saved items`}
                    >
                      <FaTimes />
                    </button>
                    <button type="button" onClick={() => navigate(getCommerceItemRoute(item))}>
                      <img
                        src={resolveBackendAssetUrl(item?.image || item?.images?.[0], "https://via.placeholder.com/160")}
                        className="h-20 w-20 rounded-xl object-cover"
                        alt={item?.name || "Item"}
                      />
                    </button>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => navigate(getCommerceItemRoute(item))}
                        className="text-left text-xl font-bold text-brown"
                      >
                        {item?.name || "Item"}
                      </button>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#7E7F7C]">
                        <span>Category: {item?.category || "General"}</span>
                        <span>Type: {item?.itemType || "item"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <p className="text-xl font-bold text-brown">PKR {Number(item?.price || 0).toLocaleString()}</p>
                    <button
                      type="button"
                      onClick={() => navigate(getCommerceItemRoute(item))}
                      className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white"
                    >
                      {item?.itemType === "course" ? "View course" : "View product"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRobot;
