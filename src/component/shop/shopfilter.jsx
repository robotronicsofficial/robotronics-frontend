import PropTypes from "prop-types";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Import the default styles for the slider
import { cn } from "../../lib/utils";

const categories = [
  "Lego Robots",
  "Curriculum Books",
  "Arduino Robots",
  "Educational Toys",
  "Others",
];

const sliderTrackStyle = { backgroundColor: "black" };
const sliderHandleStyle = { borderColor: "black", backgroundColor: "black" };
const sliderRailStyle = { backgroundColor: "#e5e7eb" };
const shippingMarks = {
  7: "7",
  15: "15",
  30: "30",
  45: "45",
  60: "60",
};

const Shopfilter = ({
  onPriceRangeChange,
  onShippingChange,
  onCategoryChange,
}) => {
  const [isOpenProducts, setIsOpenProducts] = useState(true);
  const [isOpenShipping, setIsOpenShipping] = useState(true);
  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 600000]);
  const [shippingDays, setShippingDays] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState("");

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
            type="button"
            className="lg:text-xl text-sm"
            onClick={() => setIsOpenProducts(!isOpenProducts)}
          >
            {isOpenProducts ? "-" : "+"}
          </button>
        </div>
        <div className="h-0 lg:w-full border border-brown"></div>
        {isOpenProducts && (
          <div className="flex flex-col">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={cn(
                  "flex pt-2 text-left text-sm transition-colors duration-200 lg:pt-5 lg:text-base",
                  selectedCategory === category
                    ? "font-semibold text-[#e06f21]"
                    : "text-gray-500 hover:text-black",
                )}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Shipping */}
      <div className="lg:pt-20 pt-8">
        <div className="flex justify-between">
          <p className="text-bold font-bold lg:text-2xl text-xl">SHIPPING</p>
          <button
            type="button"
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
                trackStyle={sliderTrackStyle}
                handleStyle={sliderHandleStyle}
                railStyle={sliderRailStyle}
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
          type="button"
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
              trackStyle={sliderTrackStyle}
              handleStyle={sliderHandleStyle}
              railStyle={sliderRailStyle}
            />
          </div>
          <div className="mt-4 flex justify-center gap-2">
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

Shopfilter.propTypes = {
  onPriceRangeChange: PropTypes.func.isRequired,
  onShippingChange: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default Shopfilter;
