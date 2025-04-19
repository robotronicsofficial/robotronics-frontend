import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the default styles for the slider

const Shopfilter = ({
  onPriceRangeChange,
  onShippingChange,
  onCategoryChange,
}) => {
  const categories = [
    "Lego Robots",
    "Curriculum Books",
    "Arduino Robots",
    "Educational Toys",
    "Others",
  ];
  const [isOpenProducts, setIsOpenProducts] = useState(true);
  const [isOpenShipping, setIsOpenShipping] = useState(true);
  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [shippingDays, setShippingDays] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState("");

  

  const shippingMarks = {
    7: "7",
    15: "15",
    30: "30",
    45: "45",
    60: "60",
  };

  const handleRangeChange = (value) => {
    setPriceRange(value);
    onPriceRangeChange(value);
  };

  const handleShippingChange = (value) => {
    setShippingDays(value);
    onShippingChange(value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="hidden lg:block min-w-[16vw]">
      {/* All Products */}
      <div className="lg:pt-6 pt-3 text-lightblack">
        <div className="flex justify-between">
          <p className="poppins-semibold lg:text-2xl text-xl">All PRODUCTS</p>
          <button
            className="lg:text-xl text-sm"
            onClick={() => setIsOpenProducts(!isOpenProducts)}
          >
            {isOpenProducts ? "-" : "+"}
          </button>
        </div>
        <div className="h-0 lg:w-full border border-brown"></div>
        {isOpenProducts && (
          // <div>
          //   <a className="flex cursor-pointer hover:text-black poppins-light lg:text-base text-sm text-lightblack lg:pt-5 pt-2" href="#">Lego Robots</a>
          //   <a className="flex cursor-pointer hover:text-black poppins-light lg:text-base text-sm text-lightblack lg:pt-5 pt-2" href="#">Curriculum Books</a>
          //   <a className="flex cursor-pointer hover:text-black poppins-light lg:text-base text-sm text-lightblack lg:pt-8 pt-4" href="#">Arduino Robots</a>
          //   <a className="flex cursor-pointer hover:text-black poppins-light lg:text-base text-sm text-lightblack lg:pt-8 pt-4" href="#">Educational Toys</a>
          //   <a className="flex cursor-pointer hover:text-black poppins-light lg:text-base text-sm text-lightblack lg:pt-8 pt-4" href="#">Others</a>
          // </div>

          <div>
            {categories.map((category, index) => (
              <a
                key={category}
                className={`flex cursor-pointer poppins-light lg:text-base text-sm lg:pt-5 pt-2 transition-colors duration-200 
                ${
                  selectedCategory === category
                    ? "font-semibold"
                    : "text-gray-500 hover:text-black"
                }
              `}
                style={
                  selectedCategory === category ? { color: "#e06f21" } : {}
                }
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Shipping */}
      <div className="lg:pt-20 pt-8">
        <div className="flex justify-between">
          <p className="text-bold font-bold lg:text-2xl text-xl">SHIPPING</p>
          <button
            className="lg:text-xl text-sm"
            onClick={() => setIsOpenShipping(!isOpenShipping)}
          >
            {isOpenShipping ? "-" : "+"}
          </button>
        </div>
        <div className="h-0 lg:w-full border border-brown"></div>
        {isOpenShipping && (
          <div>
            <div className="mt-8">
              <Slider
                min={7}
                max={60}
                step={null}
                marks={shippingMarks}
                defaultValue={15}
                value={shippingDays}
                onChange={handleShippingChange}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{ borderColor: "black", backgroundColor: "black" }}
                railStyle={{ backgroundColor: "#e5e7eb" }}
              />
            </div>
            <div className="text-center mt-12 text-black p-2 bg-white rounded">
              {shippingDays} Days
            </div>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="flex justify-between mt-6">
        <p className="text-bold font-bold lg:text-2xl text-xl">PRICE</p>
        <button
          className="lg:text-xl text-sm"
          onClick={() => setIsOpenPrice(!isOpenPrice)}
        >
          {isOpenPrice ? "-" : "+"}
        </button>
      </div>
      <div className="mb-8 border bg-brown border-brown"></div>
      {isOpenPrice && (
        <>
          <div className="mt-4">
            <Slider
              range
              min={0}
              max={600000}
              defaultValue={[0, 600000]}
              value={priceRange}
              onChange={handleRangeChange}
              trackStyle={{ backgroundColor: "black" }}
              handleStyle={{ borderColor: "black", backgroundColor: "black" }}
              railStyle={{ backgroundColor: "#e5e7eb" }}
            />
          </div>
          <div className="flex space-x-2 justify-center mt-4">
            <p className="text-black p-2 bg-white rounded text-center">
              PKR {priceRange[0].toLocaleString()} - PKR{" "}
              {priceRange[1].toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Shopfilter;
