import { useState } from "react";
import robo from "../../../assets/images/shopRobot.svg";
import star from "../../../assets/images/shopStar.svg";
import { FaRegHeart } from "react-icons/fa";

const Intro = () => {
  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(robo);

  // Handlers for increment and decrement
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-lightgray">
      {/* parent */}
      <div className="lg:p-5 lg:px-14 flex flex-row">
        {/* left */}
        <div
          className="lg:flex flex-row justify-center hidden"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          {/* Main image */}
          <div className="p-14 h-94 w-94 rounded-full bg-gray">
            <img src={selectedImage} className="" alt="Selected" />
          </div>
          {/* Thumbnail images */}
          <div className="flex flex-row space-x-3 py-10">
            {/* Images to choose from */}
            <div
              className="h-10 w-10 bg-white shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(robo)}
            >
              <img src={robo} className="h-10 w-10" alt="Robot" />
            </div>
            <div
              className="h-10 w-10 bg-white shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(star)}
            >
              <img src={star} className="h-10 w-10" alt="Star" />
            </div>
            <div
              className="h-10 w-10 bg-white shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(robo)} // Replace with another image source
            >
              <img src={robo} className="h-10 w-10" alt="Robot Again" />
            </div>
            <div
              className="h-10 w-10 bg-white shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(star)} // Replace with another image source
            >
              <img src={star} className="h-10 w-10" alt="Star Again" />
            </div>
          </div>
        </div>
        {/* right */}
        <div
          className="p-5 lg:px-24 lg:space-y-14 space-y-8"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          {/* title */}
          <div>
            <p className="poppins-bold lg:text-4xl">Arduino Based Robots</p>
          </div>
          {/* sale */}
          <div className="space-y-8">
            {/* stars */}
            <div className="flex flex-row items-center justify-start lg:space-x-14 space-x-8 ">
              {/* img */}
              <div>
                <img src={star} alt="" />
              </div>
              {/* button */}
              <div className="bg-red-600 p-1 px-2">
                <button className="text-white">ON SALE</button>
              </div>
            </div>
            {/* text */}
            <div className="flex flex-row space-x-2 ">
              <p className="text-sm poppins-medium text-line ">
                261 products sold .
              </p>
              <p className="text-sm poppins-medium text-line ">
                3,1k products watched
              </p>
            </div>
          </div>
          <div className="flex flex-row lg:justify-start space-x-2">
            {/* button */}
            <div className="lg:px-5 bg-white items-center text-center justify-center">
              <p>category</p>
            </div>
            {/* Quantity selector */}
            <div className="bg-white flex items-center justify-centle">
              {/* Decrease button */}
              <button
                className="lg:px-3 px-1 lg:py-1 bg-gray-200 bg-red rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none"
                onClick={handleDecrease}
              >
                -
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
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          </div>
          {/* buy now */}
          <div className="lg:flex flex-row items-center justify-between lg:space-x-10 ">
            <div className="text-yellow text-2xl poppins-medium">
              Pkr 2352.41
            </div>
            <div className="flex flex-row space-x-5">
              {/* buy now button */}
              <div>
                <a href="/cart">
                  <button className="bg-brown p-2 lg:px-6 text-white poppins-medium rounded-lg">
                    BUY NOW
                  </button>
                </a>
              </div>
              {/* Add to cart button */}
              <div>
                <button className="bg-yellow p-2 lg:px-7 text-white poppins-medium rounded-lg">
                  ADD TO CART
                </button>
              </div>
            </div>
            {/* WISH LIST */}
            <div>
              <button className="bg-gray p-2 px-3 poppins-medium rounded-lg">
              <FaRegHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
