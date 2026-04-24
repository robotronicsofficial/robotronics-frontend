import { useState } from "react";
import PropTypes from "prop-types";
import robo from "../assets/logo/Robotrinic.svg";
import leftArrow from "../assets/logo/arrow-up-left.svg";
import rightArrow from "../assets/logo/arrow-up-right.svg";
import { IoStarSharp } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { resolveBackendAssetUrl } from "../utils/mediaUrl";
import AppImage from "./AppImage";
import { useCourses } from "../hooks/useCourses";

const ServiceCard = ({ service }) => {
  return (
    <div className="p-3 sm:p-4 lg:p-5" data-aos="fade-up">
      <div className="bg-card p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all h-full flex flex-col">
        {/* Image */}
        <AppImage
          className="rounded-xl w-full h-48 sm:h-56 object-fit"
          src={resolveBackendAssetUrl(service.thumbnail)}
          alt={service.title || "Course image"}
        />

        {/* Content */}
        <div className="flex-grow flex flex-col pt-4 sm:pt-5">
          {/* Title and Rating */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold poppins-extrabold pr-2 text-wrap">
              {service.title || "Unnamed Service"}
            </h3>
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <IoStarSharp key={i} className="text-sm sm:text-base" />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 border border-dotted border-foreground my-2 sm:my-3"></div>

          {/* Details */}
          <div className="flex justify-between items-center mt-auto ">
            <div className="flex items-center gap-2">
              <LuClock className="text-primary text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm font-bold poppins-extrabold text-wrap">
                {service.month || "N/A"} Months
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoVideocamOutline className="text-primary text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm font-bold poppins-extrabold text-wrap">
                {service.numLessons || "N/A"} Lectures
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numLessons: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

const Shop = () => {
  const navigate = useNavigate();
  const {
    data: services = [],
    isLoading: loading,
    error,
  } = useCourses();
  const [currentIndex, setCurrentIndex] = useState(0);
  const servicesPerPage = 3;

  const handleNext = () => {
    if (currentIndex + servicesPerPage < services.length) {
      setCurrentIndex(currentIndex + servicesPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - servicesPerPage >= 0) {
      setCurrentIndex(currentIndex - servicesPerPage);
    }
  };

  const visibleServices = services.slice(
    currentIndex,
    currentIndex + servicesPerPage
  );

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-destructive">We couldn&apos;t load courses right now.</div>;

  return (
    <section className="bg-background py-8 md:py-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between mb-4 gap-6">
          {/* Title with Robot Image - Stacked on mobile */}
          <div className="flex flex-col items-center md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8 w-full md:w-auto">
            {/* Image - Always on top */}
            <AppImage
              src={robo}
              alt="Robotics Course"
              className="h-20 md:h-24 lg:h-44 order-first"
            />

            {/* Text Content */}
            <div className="text-center md:text-left">
              <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl poppins-extrabold leading-tight">
                Courses in <span className="text-primary">Subscription Plans</span>
              </h2>
              <p className="text-foreground text-xl sm:text-2xl md:text-3xl poppins-extrabold mt-1 sm:mt-2">
                Gear up for some Fun!
              </p>
            </div>
          </div>

          {/* Navigation Arrows - Below on mobile, to the right on desktop */}
          <div className="flex gap-3 sm:gap-4 md:ml-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 justify-center items-center rounded-full border-2 border-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              <img src={leftArrow} alt="Previous" className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + servicesPerPage >= services.length}
              className="flex w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 justify-center items-center rounded-full border-2 border-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              <img src={rightArrow} alt="Next" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-10 md:mb-14 p-4 sm:p-6 lg:p-8 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {visibleServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        {/* Enrollment Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/subscriptions")}
            className="bg-primary hover:bg-primary text-foreground text-lg sm:text-xl font-bold poppins-bold px-8 py-3 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            Get Enrolled
          </button>
        </div>
      </div>
    </section>
  );
};

export default Shop;
