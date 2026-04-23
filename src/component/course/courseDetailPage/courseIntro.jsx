import PropTypes from "prop-types";
import AppImage from "../../AppImage";
import robo from "../../../assets/images/shopRobot.webp";
import python from "../../../assets/images/python.webp";
import star from "../../../assets/images/shopStar.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../store/cart/cartSlice";
import { createCourseCommerceItem } from "../../../lib/commerceItems";
import { CART_PATH } from "../../../router/paths";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";
const CourseIntro = ({ title, id, image, price, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resolvedImage = resolveBackendAssetUrl(image, python);

  const handleAddToCart = () => {
    const cartItem = createCourseCommerceItem({
      _id: id,
      title,
      price,
      thumbnail: image,
      category,
    });

    if (cartItem) {
      dispatch(addToCart(cartItem));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate(CART_PATH);
  };

  return (
    <div className="bg-lightgray"data-aos="fade-right">
      {/* parent */}
      <div className=" p-10 lg:flex flex-row ">
        {/* left */}
        <div className="lg:flex flex-row justify-center ">
          {/* img */}
          <div className="rounded-full bg-gray max-w-full max-h-full flex items-center justify-center">
            <AppImage
              src={resolvedImage}
              className="rounded-full object-cover md:w-full md:h-full"
              alt={title || "Course"}
              loading="eager"
            />
          </div>

          {/* pic's */}
          <div className="flex flex-row space-x-3 py-10">
            {/* pic 1 */}
            <div className="h-10 w-10 bg-white shadow-lg">
              <AppImage src={robo} className="h-10 w-10" alt="" />
            </div>
            {/* pic 2 */}
            <div className="h-10 w-10 bg-white shadow-lg">
              <AppImage src={robo} className="h-10 w-10" alt="" />
            </div>
            {/* pic 3 */}
            <div className="h-10 w-10 bg-white shadow-lg">
              <AppImage src={robo} className="h-10 w-10" alt="" />
            </div>
            {/* pic 4 */}
            <div className="h-10 w-10 bg-white shadow-lg">
              <AppImage src={robo} className="h-10 w-10" alt="" />
            </div>
          </div>
        </div>

        {/* right */}
        <div className="p-5 lg:px-24 lg:space-y-5 space-y-3 ">
          {/* title */}
          <div>
            <p className="poppins-bold text-brown lg:text-6xl ">{title}</p>
          </div>
          {/* sale */}
          <div className="space-y-8">
            {/* stars */}
            <div className="flex flex-row lg:space-x-14 space-x-8">
              {/* img */}
              <div>
                <img src={star} alt="" />
              </div>
              {/* button */}
              <div className="bg-red-600 p-1 px-2">
                <button className="text-white poppins-bold">ON SALE</button>
              </div>
            </div>
            {/* text */}
            <div className="flex flex-row space-x-2 ">
              <p className="text-sm text-line poppins-thin">
                261 products sold .
              </p>
              <p className="text-sm text-line poppins-thin">
                3,1k products watched
              </p>
            </div>
          </div>
          <div className="text-yellow text-2xl poppins-bold">
            {price != null ? `Pkr ${price}` : "Included"}
          </div>
          {/* buy now */}
          <div className="lg:flex flex-row lg:space-x-10 ">
            <div className="flex flex-row space-x-5">
              {/* buy now button */}
              <div>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="bg-brown p-2 poppins-medium lg:px-6 text-white rounded-lg"
                >
                  BUY NOW
                </button>
              </div>
              {/* Add to card button */}
              <div>
                <button
                  onClick={handleAddToCart}
                  className="bg-yellow p-2 poppins-medium  lg:px-7 text-white rounded-lg"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CourseIntro.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
};

export default CourseIntro;
