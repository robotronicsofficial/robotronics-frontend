import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart/cartSlice";

export default function ShopCartItems({ title, price, image, count, id, quantity, category }) {
  // Redux Hooks
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  // Local state for quantity
  const [itemQuantity, setItemQuantity] = useState(quantity);

  // Callbacks for performance
  const handleAddToCart = useCallback(() => {
    setItemQuantity((prev) => prev + 1);
    dispatch(addToCart({ id }));
  }, [dispatch, id]);

  const handleRemoveFromCart = useCallback(() => {
    setItemQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    dispatch(removeFromCart({ id }));
  }, [dispatch, id]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Product Image */}
        <div className="sm:w-1/3">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={200}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full sm:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>

          {/* Star Rating (Static) */}
          <div className="flex text-yellow-500 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="lg:px-5 bg-white items-center text-center justify-center">
              <p>Type: {category}</p>
            </div>

            {/* Quantity selector */}
            <div className="bg-white flex items-center justify-center">
              {/* Increase button */}
              <button
                onClick={handleAddToCart}
                className="lg:px-3 px-1 lg:py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none"
              >
                +
              </button>
              {/* Quantity input */}
              <input
                type="number"
                className="lg:w-24 w-10 lg:px-3 px-1 py-1 text-sm rounded-md focus:outline-none text-center"
                value={itemQuantity}
                readOnly
              />
              {/* Decrease button */}
              <button
                onClick={handleRemoveFromCart}
                className="px-3 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none"
              >
                -
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-right text-green-600">
            PKR {parseFloat(price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
