import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the default styles for the slider

const Shopfilter = ({ onPriceRangeChange, onShippingChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [shippingDays, setShippingDays] = useState(15);

  const shippingMarks = {
    7: "7",
    15: "15",
    30: "30",
    45: "45",
    60: "60",
  };

  const handleRangeChange = (value) => {
    setPriceRange(value);
    onPriceRangeChange(value); // Pass the range to the parent
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleShippingChange = (value) => {
    setShippingDays(value);
    onShippingChange(value);
  };

  return (
    <div className="hidden lg:block min-w-[16vw]">
      {/* All Products */}
      <div className="lg:pt-6 pt-3 text-lightblack">
        <div className="flex justify-between">
          <p className="poppins-semibold lg:text-2xl text-xl">All PRODUCTS</p>
          <button className="lg:text-xl text-sm" onClick={handleClick}>
            {isOpen ? "+" : "-"}
          </button>
        </div>
        <div className="h-0 lg:w-full border border-brown"></div>
        {isOpen && (
          <div>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-5 pt-2"
              href="#"
            >
              Lego Robots
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-5 pt-2"
              href="#"
            >
              Curriculum Books
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-8 pt-4"
              href="#"
            >
              Arduino Robots
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-8 pt-4"
              href="#"
            >
              Educational Toys
            </a>
            <a
              className="flex cursor-pointer hover:text-black poppins-light hover:border-black lg:text-base text-sm text-lightblack lg:pt-8 pt-4"
              href="#"
            >
              Others
            </a>
          </div>
        )}
      </div>

      {/* Shipping */}
      <div className="lg:pt-20 pt-8">
        <div className="flex justify-between">
          <p className="text-bold font-bold lg:text-2xl text-xl">SHIPPING</p>
          <button className="lg:text-xl text-sm" onClick={handleClick}>
            {isOpen ? "+" : "-"}
          </button>
        </div>
        <div className="h-0 lg:w-full border border-brown "></div>
        {isOpen && (
          <div >
            <div className="mt-8">
              <Slider
                min={7}
                max={60}
                step={null} // Disable intermediate steps
                marks={shippingMarks}
                defaultValue={15}
                value={shippingDays}
                onChange={handleShippingChange}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "black",
                  backgroundColor: "black",
                }}
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
        <button className="lg:text-xl text-sm" onClick={handleClick}>
          {isOpen ? "+" : "-"}
        </button>
      </div>
      <div className="mb-8 border bg-brown border-brown"></div>
      <div className="mt-4">
        <Slider
          range
          min={0}
          max={600000}
          defaultValue={[0, 600000]}
          value={priceRange}
          onChange={handleRangeChange}
          trackStyle={{ backgroundColor: "black" }} // Set track color to black
          handleStyle={{
            borderColor: "black",
            backgroundColor: "black",
          }} // Set handle color to black
          railStyle={{ backgroundColor: "#e5e7eb" }} // Set rail color to gray
        />
      </div>
      <div className="flex space-x-2 justify-center mt-4">
        <p className="text-black p-2 bg-white rounded text-center">
          PKR {priceRange[0].toLocaleString()} - PKR{" "}
          {priceRange[1].toLocaleString()}
        </p>
        {/* <button className="hover:bg-gold p-2 bg-lightblack text-white">
          APPLY
        </button> */}
      </div>
    </div>
  );
};

export default Shopfilter;
