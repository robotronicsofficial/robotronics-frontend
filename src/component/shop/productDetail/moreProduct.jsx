import { useSelector } from "react-redux";

const MoreProduct = () => {
  const products = useSelector((state) => state.cart.items);
  const topThree = products.slice(0, 3); // Get the first 3 products

  return (
    <div className="bg-gray p-14 ">
      <div className="space-y-8">
        {/* Title */}
        <p
          className="lg:text-5xl text-2xl poppins-bold text-brown text-center"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          You May Also Like This
        </p>

        {/* Description */}
        <p
          className="text-line text-wrap poppins-light text-center"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          Top Selling Products
        </p>

        {/* Product Cards */}
        <div
          className="p-5 lg:flex flex-row justify-between lg:space-x-14"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          {topThree.map((product, index) => (
            <div
              key={product._id || index}
              className="w-[398px] h-[700px] flex flex-col items-center justify-between text-center"
            >
              {/* Product Image */}
              <img
                src={
                  product?.images?.[0]
                    ? `${import.meta.env.VITE_BACKEND_URL}/${product.images[0]}`
                    : "https://via.placeholder.com/150"
                }
                alt={product.name}
                className="w-[398px] h-[574px] object-cover"
              />

              {/* Product Info */}
              <div className="flex flex-col items-center justify-center space-y-3 flex-grow">
                {/* Name */}
                <p className="text-line poppins-light text-lg text-wrap">
                  {product.name || "Unnamed Product"}
                </p>

                {/* Rating */}
                <div className="flex text-2xl">
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = product.ratings || 0;
                    const full = i + 1 <= Math.floor(rating);
                    const half = i < rating && i + 1 > rating;

                    let starColor = "text-white";
                    if (full) starColor = "text-yellow";
                    else if (half) starColor = "text-yellow";

                    return (
                      <span key={i} className={`${starColor}`}>★</span>
                    );
                  })}
                </div>

                {/* Price */}
                <p className="text-[#362D2C] poppins-bold text-lg">
                  PKR {product.price?.toLocaleString() || "N/A"}
                </p>

              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default MoreProduct;
