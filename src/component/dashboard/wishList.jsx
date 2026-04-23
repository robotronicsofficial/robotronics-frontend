import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import LeftNav from "./leftNav";
import { addToCart } from "../../store/cart/cartSlice";
import { getCommerceItemRoute } from "../../lib/commerceItems";

import { BACKEND_BASE_URL } from "../../lib/api";
const resolveImageUrl = (image) => {
  if (!image) return "https://via.placeholder.com/160";
  if (image.startsWith("http")) return image;
  return `${BACKEND_BASE_URL}/${image.replace(/\\/g, "/")}`;
};

const WishListD = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_BASE_URL}/wishlists/wishlist`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to load wishlist");
      }

      const data = await response.json();
      setItems(Array.isArray(data?.items) ? data.items : []);
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
      const response = await fetch(
        `${BACKEND_BASE_URL}/wishlists/wishlist/${item.itemType}/${item.itemId}`,
        {
        method: "DELETE",
        credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove wishlist item");
      }

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
    dispatch(addToCart(item));
  };

  if (loading) {
    return <div className="bg-background min-h-screen flex items-center justify-center">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-background">
      <div className="flex flex-row" data-aos="fade-up">
        <div className="w-1/3">
          <LeftNav />
        </div>
        <div className="w-full py-10">
          <h1 className="text-lightblack poppins-bold text-2xl ml-14">WishList</h1>
          {items.length === 0 ? (
            <div className="px-14 py-12 text-gray-500">No saved items yet.</div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.itemType}:${item.itemId}`}
                className="flex flex-row justify-between items-center px-14 py-5 mb-5"
              >
                <div className="flex flex-row space-x-5 items-center">
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      className="text-gray-600 cursor-pointer"
                      aria-label={`Remove ${item.name}`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <button type="button" onClick={() => navigate(getCommerceItemRoute(item))}>
                    <img
                      src={resolveImageUrl(item.image || item.images?.[0])}
                      className="w-20 h-20 object-cover"
                      alt={item.name || "Saved item"}
                    />
                  </button>
                  <div className="flex flex-col space-y-2">
                    <button
                      type="button"
                      onClick={() => navigate(getCommerceItemRoute(item))}
                      className="text-brown poppins-bold text-xl text-left"
                    >
                      {item.name || "Saved item"}
                    </button>
                    <div className="flex flex-row items-center">
                      <p className="text-brown poppins-bold text-sm mr-2">Category:</p>
                      <p className="text-sm">{item.category || "General"}</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className="text-brown font-bold text-sm mr-2">Type:</p>
                      <p className="text-sm poppins-bold">{item.itemType}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-end space-x-5">
                  <div>
                    <p className="text-xl poppins-bold">PKR {Number(item.price || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleMoveToCart(item)}
                      className="bg-orange-500 poppins-bold text-white px-4 py-2 rounded-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishListD;
