import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart/cartSlice";

export default function ShopCartItems({ title, price, image, count, id, quantity }) {
  const [type, setType] = useState("Robot");

  // Redux Hooks
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  // Memoized total item count
  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.count, 0),
    [cartItems]
  );

  // Callbacks for performance
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ id }));
  }, [dispatch, id]);

  const handleRemoveFromCart = useCallback(() => {
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

          {/* Select Type */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <select
                className="w-full bg-white border border-gray-300 rounded-md p-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Robot">Robot</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Building">Building</option>
              </select>
            </div>

            {/* Quantity selector */}
            <div className="bg-white flex items-center justify-centle">
              {/* Decrease button */}
              <button
                className="lg:px-3 px-1 lg:py-1 bg-gray-200 bg-red rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none"
              >
                +
              </button>
              {/* Quantity input */}
              <input
                type="number"
                className="lg:w-24 w-10 lg:px-3 px-1 py-1 text-sm rounded-md focus:outline-none text-center"
                value={quantity}
                readOnly
              />
              {/* Increase button */}
              <button
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
