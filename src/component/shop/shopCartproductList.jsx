import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderSummaryLine from "./OrderSummaryLine";
import { useAuth } from "../../contexts/useAuth";
import { BACKEND_BASE_URL } from "../../lib/api";
import { getCommerceItemKey } from "../../lib/commerceItems";
import {
  calculateCartSummary,
  formatShopCurrency,
  loadShopCheckout,
  saveShopCheckout,
} from "../../lib/shopCheckout";
import { addToCart, removeFromCart } from "../../store/cart/cartSlice";
import "react-toastify/dist/ReactToastify.css";

const REDIRECT_AFTER_LOGIN_STORAGE_KEY = "redirectAfterLogin";
const summaryRowClassName =
  "pb-2 font-lato font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C]";
const summaryValueBaseClassName =
  "bg-transparent text-right text-[20px] font-extrabold leading-[28px] tracking-[0]";
const summaryValueClassName = `${summaryValueBaseClassName} text-[#362D2C]`;
const totalSummaryValueClassName = `${summaryValueBaseClassName} text-yellow`;

const ShopCartproductList = ({ onNext }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [notes, setNotes] = useState(() => loadShopCheckout().note || "");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const summary = useMemo(() => calculateCartSummary(cart), [cart]);

  const resolveImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/300x200";
    if (image.startsWith("http")) return image;
    return `${BACKEND_BASE_URL}/${image.replace(/\\/g, "/")}`;
  };

  const [itemQuantity, setItemQuantity] = useState(
    cart.reduce((acc, product) => {
      acc[getCommerceItemKey(product)] = product.quantity;
      return acc;
    }, {})
  );

  const handleAddToCart = useCallback(
    (product) => {
      const productId = getCommerceItemKey(product);
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
      const productId = getCommerceItemKey(product);
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

      toast.error("Please sign in to proceed to checkout", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/Login");
      return;
    }

    if (onNext) onNext();
  }, [currentUser, onNext, navigate]);


  return (
    <div className="lg:flex">
      <div className="flex-col pr-5 lg:w-2/3">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div className="mx-auto max-w-4xl py-8" key={getCommerceItemKey(product)}>
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="size-[15vw] overflow-hidden">
                  <img
                    src={resolveImageUrl(product.image || product.images?.[0])}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="w-full sm:w-2/3">
                  <h1 className="mb-2 text-wrap font-Poppins text-[20px] font-bold leading-[28px] tracking-normal text-[#362D2C]">
                    {product.name}
                  </h1>
                  <div className="my-6 flex text-2xl text-yellow-500">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span className="text-yellow" key={i}>★</span>
                    ))}
                  </div>
                  <div className="mb-4 flex justify-end gap-4">
                    <div className="flex items-center justify-center bg-white">
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(product)}
                        className="rounded-md bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300 focus:outline-none"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-10 rounded-md px-1 py-1 text-center text-sm focus:outline-none lg:w-24 lg:px-3"
                        value={itemQuantity[getCommerceItemKey(product)] || 1}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="rounded-md bg-gray-200 px-1 text-gray-700 hover:bg-gray-300 focus:outline-none lg:px-3 lg:py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="pt-10 text-right text-2xl font-bold text-[#362D2C]">
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
      <div className="flex flex-col rounded-lg bg-gray px-6 py-6 lg:px-10">
        <h2 className="mb-4 font-poppins text-[32px] font-semibold leading-[40px] tracking-[0] text-[#362D2C]">
          ORDER SUMMARY
        </h2>
        <p className="my-6 font-poppins text-[16px] font-medium leading-[20px] tracking-[0] text-[#7E7F7C]">
          Apply your monthly voucher to get more discount!
        </p>
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
        <div className="mt-6">
          <input
            id="voucher"
            type="text"
            className="mt-2 w-full border-b bg-gray p-2 font-poppins text-[16px] font-medium leading-[20px] tracking-[0] text-[#7E7F7C]"
            placeholder="Your voucher code"
          />
        </div>

        <div className="mt-20">
          <span className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-[#362D2C]">
            Write your special notes here...
          </span>

          <textarea
            className="mt-1 block h-[139px] w-[401px] border border-[#BCBABA] bg-[#EBE5E2] p-7 font-poppins font-light shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              saveShopCheckout({ note: e.target.value });
            }}
          />
        </div>

        <div className="flex justify-center mt-20">
          <button
            type="button"
            onClick={handleNext}
            aria-label="Proceed to Checkout"
            className="flex h-11 w-[408px] items-center justify-center gap-2.5 bg-[#362D2C] p-3 font-semibold text-white transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

ShopCartproductList.propTypes = {
  onNext: PropTypes.func,
};

export default ShopCartproductList;
