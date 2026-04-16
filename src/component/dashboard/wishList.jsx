import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import LeftNav from "./leftNav";
import { addToCart } from "../../store/cart/cartSlice";

const resolveImageUrl = (image) => {
  if (!image) return "https://via.placeholder.com/160";
  if (image.startsWith("http")) return image;
  return `${import.meta.env.VITE_BACKEND_URL}/${image.replace(/\\/g, "/")}`;
};

const WishListD = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlists/wishlist`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to load wishlist");
      }

      const data = await response.json();
      setProducts(Array.isArray(data?.products) ? data.products : []);
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

  const handleRemove = async (productId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wishlists/wishlist/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove wishlist item");
      }

      setProducts((currentProducts) => currentProducts.filter((product) => product._id !== productId));
    } catch (removeError) {
      setError(removeError.message);
    }
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <div className="bg-background min-h-screen flex items-center justify-center">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-background">
      <div className="flex flex-row" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
        <div className="w-1/3">
          <LeftNav />
        </div>
        <div className="w-full py-10">
          <h1 className="text-lightblack poppins-bold text-2xl ml-14">WishList</h1>
          {products.length === 0 ? (
            <div className="px-14 py-12 text-gray-500">No saved products yet.</div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="flex flex-row justify-between items-center px-14 py-5 mb-5"
              >
                <div className="flex flex-row space-x-5 items-center">
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemove(product._id)}
                      className="text-gray-600 cursor-pointer"
                      aria-label={`Remove ${product.name}`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <button type="button" onClick={() => navigate(`/ProductDetailPage/${product._id}`)}>
                    <img
                      src={resolveImageUrl(product.images?.[0])}
                      className="w-20 h-20 object-cover"
                      alt={product.name || "Product"}
                    />
                  </button>
                  <div className="flex flex-col space-y-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/ProductDetailPage/${product._id}`)}
                      className="text-brown poppins-bold text-xl text-left"
                    >
                      {product.name || "Product"}
                    </button>
                    <div className="flex flex-row items-center">
                      <p className="text-brown poppins-bold text-sm mr-2">Category:</p>
                      <p className="text-sm">{product.category || "General"}</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className="text-brown font-bold text-sm mr-2">Stock:</p>
                      <p className="text-sm poppins-bold">{product.stock ?? "N/A"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-end space-x-5">
                  <div>
                    <p className="text-xl poppins-bold">PKR {Number(product.price || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleMoveToCart(product)}
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
