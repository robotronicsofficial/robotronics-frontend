import { useMemo, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CHECKOUT_NOTE_STORAGE_KEY = "checkoutNote";
const REDIRECT_AFTER_LOGIN_STORAGE_KEY = "redirectAfterLogin";

const getStoredCheckoutNote = () => (
  typeof window === "undefined" ? "" : window.sessionStorage.getItem(CHECKOUT_NOTE_STORAGE_KEY) || ""
);
const setStoredCheckoutNote = (value) => {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(CHECKOUT_NOTE_STORAGE_KEY, value);
  }
};

const ShopCartproductList = ({ onNext }) => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const discountPercentage = 10;
  const [notes, setNotes] = useState(() => getStoredCheckoutNote());
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const discountAmount = useMemo(
    () => (totalPrice * discountPercentage) / 100,
    [totalPrice, discountPercentage]
  );

  const discountedPrice = useMemo(
    () => totalPrice - discountAmount,
    [totalPrice, discountAmount]
  );

  const resolveImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/300x200";
    if (image.startsWith("http")) return image;
    return `${import.meta.env.VITE_BACKEND_URL}/${image.replace(/\\/g, "/")}`;
  };

  const [itemQuantity, setItemQuantity] = useState(
    cart.reduce((acc, product) => {
      acc[product._id || product.id] = product.quantity;
      return acc;
    }, {})
  );

  const handleAddToCart = useCallback(
    (product) => {
      const productId = product._id || product.id;
      setItemQuantity((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (product) => {
      const productId = product._id || product.id;
      setItemQuantity((prev) => ({
        ...prev,
        [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
      }));
      dispatch(removeFromCart(product));
    },
    [dispatch]
  );

  const handleNext = useCallback(() => {
    if (!currentUser) {
      window.sessionStorage.setItem(
        REDIRECT_AFTER_LOGIN_STORAGE_KEY,
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      );
      
      // Show toast message
      toast.error("Please sign in to proceed to checkout", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Redirect to login page
      navigate("/Login");
      return;
    }
    
    // If user is authenticated, proceed to next step
    if (onNext) onNext();
  }, [currentUser, onNext, navigate]);


  return (
    <div className="lg:flex flex-row">
      <div className="lg:w-2/3 flex-col pr-5">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div className="max-w-4xl mx-auto py-8" key={product._id || product.id}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-[15vw] h-[15vw] overflow-hidden">
                  <img
                    src={resolveImageUrl(product.images?.[0])}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-fit"
                  />
                </div>

                <div className="w-full sm:w-2/3">
                  <h1 className="text-[20px] font-bold leading-[28px] tracking-normal font-Poppins mb-2 text-[#362D2C] text-wrap">
                    {product.name}
                  </h1>
                  <div className="flex text-yellow-500 my-6 text-2xl">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span className="text-yellow" key={i}>★</span>
                    ))}
                  </div>
                  {/* Counter */}
                  <div className="flex justify-end gap-4 mb-4">
                    <div className="bg-white flex items-center justify-center">
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="lg:w-24 w-10 lg:px-3 px-1 py-1 text-sm rounded-md focus:outline-none text-center"
                        value={itemQuantity[product._id || product.id] || 1}
                        readOnly
                      />
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="lg:px-3 px-1 lg:py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-right text-[#362D2C] pt-10">
                    PKR {Number(product.price || 0).toLocaleString()}
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="p-5 text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <div className="flex flex-col p-2">
        <div className="h-full w-0 border border-[#D4D4D4]"></div>
      </div>
      <div className="flex flex-col bg-gray lg:px-10 px-6 py-6 rounded-lg">
      <h2 className="font-poppins font-semibold text-[32px] leading-[40px] tracking-[0] text-[#362D2C] mb-4">
        ORDER SUMMARY
      </h2>
      <p className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C] my-6">
        Apply your monthly voucher to get more discount!
      </p>
        <div className="space-y-3 my-6">
          <div className="flex justify-between font-lato font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C] pb-2">
            <span>Price</span>
            <span className="font-extrabold text-[20px] leading-[28px] tracking-[0] text-right text-[#362D2C] bg-transparent">
              PKR {Number(totalPrice || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-lato font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C] pb-2">
            <span>Discount ({discountPercentage}%)</span>
            <span className="font-extrabold text-[20px] leading-[28px] tracking-[0] text-right text-[#362D2C] bg-transparent">
              - PKR {Number(discountAmount || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-lato font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C] pb-2">
            <span>Total Price</span>
            <span className="font-extrabold text-[20px] leading-[28px] tracking-[0] text-right text-yellow bg-transparent">
              PKR {Number(discountedPrice || 0).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="mt-6">
        <input
          id="voucher"
          type="text"
          className="w-full p-2 mt-2 bg-gray font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C] border-b"
          placeholder="Your voucher code"
        />

        </div>

        <div className="mt-20">
          <span className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-[#362D2C]">
            Write your special notes here...
          </span>

          <textarea
            className="block mt-1 p-7 font-poppins font-light shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setStoredCheckoutNote(e.target.value);
              }}
            style={{
              width: '401px',
              height: '139px',
              background: '#EBE5E2',
              border: '1px solid #BCBABA',
            }}
          ></textarea>

        </div>

        <div className="flex justify-center mt-20">
          <button
            type="button"
            onClick={handleNext}
            aria-label="Proceed to Checkout"
            className="font-semibold transition text-white"
            style={{
              width: '408px',
              height: '44px',
              padding: '12px',
              gap: '10px',
              backgroundColor: '#362D2C',
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCartproductList;
