import { useMemo, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart/cartSlice";

const ShopCartproductList = ({ onNext }) => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const discountPercentage = 10;

  const discountAmount = useMemo(
    () => (totalPrice * discountPercentage) / 100,
    [totalPrice, discountPercentage]
  );

  const discountedPrice = useMemo(
    () => totalPrice - discountAmount,
    [totalPrice, discountAmount]
  );

  const [itemQuantity, setItemQuantity] = useState(
    cart.reduce((acc, product) => {
      acc[product._id] = product.quantity;
      return acc;
    }, {})
  );

  const handleAddToCart = useCallback(
    (product) => {
      setItemQuantity((prev) => ({
        ...prev,
        [product._id]: (prev[product._id] || 0) + 1,
      }));
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (product) => {
      setItemQuantity((prev) => ({
        ...prev,
        [product._id]: prev[product._id] > 1 ? prev[product._id] - 1 : 1,
      }));
      dispatch(removeFromCart(product));
    },
    [dispatch]
  );

  const handleNext = useCallback(() => {
    if (onNext) onNext();
  }, [onNext]);

  return (
    <div className="lg:flex flex-row">
      <div className="lg:w-2/3 flex-col">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div className="max-w-4xl mx-auto py-8" key={product._id}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-[15vw] h-[15vw] overflow-hidden">
                  <img
                    src={`http://localhost:8080/${product.images[0]}`}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-fit"
                  />
                </div>

                <div className="w-full sm:w-2/3">
                  <h1 className="text-[20px] font-bold leading-[28px] tracking-normal font-Poppins mb-2 text-[#362D2C]">
                    {product.name}
                  </h1>
                  <div className="flex text-yellow-500 my-6 text-2xl">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="lg:px-5 bg-white items-center text-center justify-center">
                      <p>Type: {product.category}</p>
                    </div>
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
                        value={itemQuantity[product._id] || 1}
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
                    PKR {product.price.toLocaleString()}
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
        <div className="h-full border border-gray-300"></div>
      </div>
      <div className="flex flex-col bg-gray lg:px-10 px-6 py-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">ORDER SUMMARY</h2>
        <p className="text-sm text-gray-500 mb-6">Apply your monthly voucher to get more discounts!</p>
        <div className="space-y-3">
          <div className="flex justify-between text-sm border-b pb-2">
            <span>Price</span>
            <span className="font-bold">PKR {totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm border-b pb-2">
            <span>Discount ({discountPercentage}%)</span>
            <span className="font-bold text-red-500">- PKR {discountAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price</span>
            <span className="text-green-600">PKR {discountedPrice.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="voucher" className="text-sm">Your voucher code</label><br />
          <input
            id="voucher"
            type="text"
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter voucher code"
          />
        </div>
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
