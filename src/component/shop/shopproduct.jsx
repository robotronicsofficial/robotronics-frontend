import { FaRegHeart } from "react-icons/fa";

const Shopproduct = ({ title, price, image,onAddToWishlist, onAddToCart }) => {
  return (
    <div className="relative w-[18vw] h-[20vw] group">
      <div className="w-[18vw] h-[17vw] rounded-2xl overflow-hidden">
        <img
          className="h-full w-full object-cover group-hover:opacity-50"
          src={image}
          alt="Product"
        />
      </div>
      <div className="text-wrap w-full">
        <p className=" text-[#362D2C] hover:text-black text-xl poppins-bold my-2">
          {title}
        </p>
        <p className="text-[#C86400] poppins-bold text-xl">PKR {price}.00</p>
      </div>
      <div className="absolute flex flex-col w-[14vw] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="bg-[#F2F1F1DE] bg-opacity-30 p-2 text-[362D2C] poppins-medium rounded-lg mb-2"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="bg-[#C86400] p-2 text-[362D2C] poppins-medium rounded-lg flex items-center"
          onClick={onAddToWishlist}
        >
          <FaRegHeart/>

          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Shopproduct;
