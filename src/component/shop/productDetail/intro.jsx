import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../store/cart/cartSlice";

import robo from "../../../assets/images/shopRobot.svg";
import star from "../../../assets/images/shopStar.svg";
import { FaRegHeart } from "react-icons/fa";

const Intro = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // All products from Redux store
  const products = useSelector((state) => state.cart.items);
  
  // Get the product by ID
  const product = products.find((item) => item._id === id);

  // State for quantity and selected image
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] ? `${import.meta.env.VITE_BACKEND_URL}/${product.images[0]}` : robo);

  // Update selected image when product changes
  useEffect(() => {
    if (product?.images?.[0]) {
      setSelectedImage(`${import.meta.env.VITE_BACKEND_URL}/${product.images[0]}`);
    }
  }, [product]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (!product) return <p className="p-10 text-center text-lg">Loading product...</p>;

  return (
    <div className="bg-lightgray">
      <div className="lg:p-5 lg:px-14 flex flex-row">
        {/* Left Section: Images */}
        <div className="lg:flex flex-row justify-center hidden" data-aos="fade-up">
          <div className="p-14 h-94 w-94 rounded-full bg-gray">
            <img src={selectedImage} alt="Selected" />
          </div>
          <div className="flex flex-row space-x-3 py-10">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className="h-10 w-10 bg-white shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(`${import.meta.env.VITE_BACKEND_URL}/${img}`)}
              >
                <img src={`${import.meta.env.VITE_BACKEND_URL}/${img}`} alt={`thumb-${idx}`} className="h-10 w-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="p-5 lg:px-24 lg:space-y-14 space-y-8" data-aos="fade-up">
          <p className="poppins-bold lg:text-4xl text-wrap">{product.name}</p>

          <div className="space-y-6">
            <div className="flex flex-row items-center lg:space-x-14 space-x-8">

            <div className="flex my-6 text-2xl">
              {Array.from({ length: 5 }, (_, i) => {
                const fullStars = Math.floor(product.ratings);
                const hasHalfStar = product.ratings % 1 >= 0.5;
                
                if (i < fullStars) {
                  return <span key={i} className="text-yellow">★</span>; // full star
                } else if (i === fullStars && hasHalfStar) {
                  return <span key={i} className="text-yellow">☆</span>; // half star (replace with half-icon if you have one)
                } else {
                  return <span key={i} className="text-white">★</span>; // empty star
                }
              })}
            </div>
              {product.onSale && (
                <div className="bg-red-600 p-1 px-2">
                  <span className="text-white">ON SALE</span>
                </div>
              )}
            </div>
            <div className="flex flex-row space-x-2">
              <p className="text-sm poppins-medium text-line">
                {product.productSold} products sold,
              </p>
              <p className="text-sm poppins-medium text-line">
                {product.productWatched} products watched
              </p>
            </div>
          </div>
          <div className="flex flex-row lg:justify-start space-x-2">
            <div className="lg:px-5 bg-white">
              <p>{product.category}</p>
            </div>

            <div className="bg-white flex items-center">
              <button className="lg:px-3 px-1 lg:py-1 bg-gray-200 rounded-md" onClick={handleDecrease}>-</button>
              <input type="number" className="lg:w-24 w-10 text-center" value={quantity} readOnly />
              <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={handleIncrease}>+</button>
            </div>
          </div>

          <div className="lg:flex flex-row items-center justify-between lg:space-x-10">
            <div className="text-yellow text-2xl poppins-medium">
              PKR {product.price.toLocaleString()}
            </div>
            <div className="flex flex-row space-x-5">
              <button
                className="bg-yellow p-2 lg:px-7 text-white poppins-medium rounded-lg"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    dispatch(addToCart(product));
                  }
                }}
              >
                ADD TO CART
              </button>
            </div>
            <button className="bg-gray p-2 px-3 poppins-medium rounded-lg">
              <FaRegHeart />
            </button>
          </div>
        </div>
      </div>


      <div className="lg:p-14 p-2 bg-gray">

        {/* div 1 */}
        <div className="px-2 flex flex-row lg:justify-center lg:space-x-10 space-x-4 "data-aos="fade-down" data-aos-duration="2000" data-aos-delay="4000">
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
            PRODUCT DETAIL
          </p>
          <p className="h-8 w-0 border border-black "></p>
          <p className="lg:text-3xl font-bold text-wrap poppins-extrabold text-brown">
            DELIVERY AND RETURN
          </p>
        </div>

        <div className="p-5 flex flex-row justify-between">
          {/* DESCRIPTION */}
          <div className="p-2 w-1/2 space-y-2">
            <p
              className="lg:text-2xl text-xl poppins-semibold text-brown"
              data-aos="fade-up"
            >
              DESCRIPTION
            </p>
            <p className="text-wrap text-xs poppins-medium text-line"
              data-aos="fade-up"
            >
              {product?.description || "No description available."}
            </p>
          </div>

          {/* FEATURES */}
          <div className="p-2 w-1/2">
            <div
              className="text-wrap text-line space-y-2 lg:px-20 px-4"
              data-aos="fade-up"
            >
              <p className="lg:text-2xl text-xl poppins-semibold text-brown">
                FITS AND FEATURES
              </p>
              {Array.isArray(product?.features) && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <p key={index} className="text-xs poppins-medium">
                    {index + 1}. {feature}
                  </p>
                ))
              ) : (
                <p className="text-xs poppins-medium">No features listed.</p>
              )}
            </div>
          </div>
        </div>

        <a className=" hover:curser-pointer transition duration-300 ease-in-out hover:opacity-70" >
          <div className="shopPages flex flex-row lg:px-14 px-5 " id="shopPages">
            {/* text */}
            <div className="flex-1 lg:py-20 py-8 ">
              <div className="flex flex-col justify-content ">
                <p className="flex text-gold lg:text-4xl text-2xl font-bold"data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000">MORDERN</p>
                <p className="flex text-white lg:text-4xl text-2xl font-bold"data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">LEGO ROBOT</p>
                <p className="flex text-white line-through lg:text-xl text-sm lg:pt-8 pt-4 "data-aos="fade-right" data-aos-duration="2000" data-aos-delay="4000" >PKR 3252.41</p>
                <p className="flex text-white lg:text-4xl text-2xl font-bold"data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000" >PKR 2352.41</p>
      
              </div>
              <img src={star} data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000"/>
            </div>
            {/* img */}
            <div className="flex-1"data-aos="fade-left" data-aos-duration="2000" data-aos-delay="4000">
              <div className="flex justify-content w-full " >
              <img src={robo} alt="LEGO ROBOT"/>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Intro;
