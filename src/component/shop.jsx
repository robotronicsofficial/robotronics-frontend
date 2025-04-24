import { useEffect, useState } from "react";
import Aos from "aos";
import robo from "../assets/logo/Robotrinic.svg";
import leftArrow from "../assets/logo/arrow-up-left.svg";
import rightArrow from "../assets/logo/arrow-up-right.svg";
import { IoStarSharp } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="p-3 sm:p-4 lg:p-5" data-aos="fade-up">
      <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all h-full flex flex-col">
        {/* Image */}
        <img
          className="rounded-xl w-full h-48 sm:h-56 object-cover"

          src={`${import.meta.env.VITE_BACKEND_URL}/${service.thumbnail}`}

          alt={service.title || "Course image"}
        />

        {/* Content */}
        <div className="flex-grow flex flex-col pt-4 sm:pt-5">
          {/* Title and Rating */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold poppins-extrabold pr-2 text-wrap">
              {service.title || "Unnamed Service"}
            </h3>
            <div className="flex text-yellow">
              {[...Array(5)].map((_, i) => (
                <IoStarSharp key={i} className="text-sm sm:text-base" />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-0.5 border border-dotted border-black my-2 sm:my-3"></div>

          {/* Details */}
          <div className="flex justify-between items-center mt-auto ">
            <div className="flex items-center gap-2">
              <LuClock className="text-yellow text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm font-bold poppins-extrabold text-wrap">
                {service.title || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoVideocamOutline className="text-yellow text-lg sm:text-xl" />
              <span className="text-xs sm:text-sm font-bold poppins-extrabold text-wrap">
                {service.title || "N/A"} Lessons
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const servicesPerPage = 3;

  useEffect(() => {
    Aos.init({ duration: 1000 });
    const fetchServices = async () => {
      try {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-courses`);

        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data.courses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <section className="bg-gray py-8 md:py-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between mb-4 gap-6">
          {/* Title with Robot Image - Stacked on mobile */}
          <div className="flex flex-col items-center md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8 w-full md:w-auto">
            {/* Image - Always on top */}
            <img
              src={robo}
              alt="Robotics Course"
              className="h-20 md:h-24 lg:h-44 order-first"
            />

            {/* Text Content */}
            <div className="text-center md:text-left">
              <h2 className="text-brown text-2xl sm:text-3xl md:text-4xl lg:text-5xl poppins-extrabold leading-tight">
                Upcoming <span className="text-[#f5ab34]">Courses-</span>
              </h2>
              <p className="text-brown text-xl sm:text-2xl md:text-3xl poppins-extrabold mt-1 sm:mt-2">
                Gear up for some Fun
              </p>
            </div>
          </div>

          {/* Navigation Arrows - Below on mobile, to the right on desktop */}
          <div className="flex gap-3 sm:gap-4 md:ml-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 justify-center items-center rounded-full border-2 border-black hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <img src={leftArrow} alt="Previous" className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + servicesPerPage >= services.length}
              className="flex w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 justify-center items-center rounded-full border-2 border-black hover:bg-gray-100 transition-colors disabled:opacity-50"
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
            onClick={() => navigate("/Robogeniushome")}
            className="bg-yellow hover:bg-yellow-600 text-brown text-lg sm:text-xl font-bold poppins-bold px-8 py-3 rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            Get Enrolled
          </button>
        </div>
      </div>
    </section>
  );
};

export default Shop;
