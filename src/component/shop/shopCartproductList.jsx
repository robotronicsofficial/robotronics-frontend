import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import ShopCartItems from "../shop/shopCartItems";

const ShopCartproductList = ({ onNext }) => {
  const {cart, totalQuantity} = useSelector((state) => state.cart);
  //also destructure totalPrice from the slice
  const discountPercentage = 10;

  // Memoized calculations
  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.count * item.price, 0),
    [cart]
  );

  const discountAmount = useMemo(
    () => (totalPrice * discountPercentage) / 100,
    [totalPrice, discountPercentage]
  );

  const discountedPrice = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount]);

  // Callback to prevent unnecessary re-renders
  const handleNext = useCallback(() => {
    if (onNext) onNext();
  }, [onNext]);


  return (
    <div className="lg:flex flex-row">
      {/* Cart Items Section */}
      <div className="lg:w-2/3 flex flex-col lg:px-5 shadow-lg bg-gray-100 p-4">
        {cart.length > 0 ? (
          cart.map((product) => (
            <ShopCartItems
              key={product.id}
              id={product.id}
              count={product.count}
              title={product.name}
              description={product.description}
              image={`http://localhost:8080/${product.images[0]}`}
              price={product.price}
              category={product.category}
            />
          ))
        ) : (
          <p className="p-5 text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Vertical Divider */}
      <div className="flex flex-col p-2">
        <div className="h-full border border-gray-300"></div>
      </div>

      {/* Order Summary Section */}
      <div className="flex flex-col bg-gray lg:px-10 px-6 py-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">ORDER SUMMARY</h2>
        <p className="text-sm text-gray-500 mb-6">
          Apply your monthly voucher to get more discounts!
        </p>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm border-b pb-2">
            <span>Price</span>
            <span className="font-bold">PKR {totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm border-b pb-2">
            <span>Discount ({discountPercentage}%)</span>
            <span className="font-bold text-red-500">- PKR {discountAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price</span>
            <span className="text-green-600">PKR {discountedPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Voucher Input */}
        <div className="mt-6">
          <label htmlFor="voucher" className="text-sm">
            Your voucher code
          </label>
          <br></br>
          <input
            id="voucher"
            type="text"
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter voucher code"
          />
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="w-full lg:w-auto px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition"
            onClick={handleNext}
            aria-label="Proceed to Checkout"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCartproductList;
