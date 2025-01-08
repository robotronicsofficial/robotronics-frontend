import mask from "../../assets/images/shopMask.svg";

const Shopproduct = ({ title, price, image }) => {
  return (
    <div className="">
      <div className="relative w-[18vw] h-[20vw]  group">
        <div className="w-[18vw] h-[17vw] rounded-2xl overflow-hidden">
          <img className="h-full w-full object-full group-hover:opacity-50" src={image} alt="Product" />
        </div>
        <div className="text-wrap w-full">
          <p className="h-[5vw] text-lightblack hover:text-black hover:border-black text-xl poppins-bold my-2">
            {title}
          </p>
          <p className="text-yellow  hover:text-gold hover:border-black">
            PKR {price}
          </p>
        </div>
        {/* Ensure proper positioning */}
        <div className="absolute flex flex-col w-[14vw] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-yellow p-2 lg:px-7 text-white poppins-medium rounded-lg mb-2">
            Add to Cart
          </button>
          <button className="bg-yellow p-2 lg:px-7 text-white poppins-medium rounded-lg">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shopproduct;
