import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot} from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import robort from "../assets/images/right-face-robot.svg";
import { fetchServices } from "../lib/services";

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      try {
        const nextServices = await fetchServices();

        if (!active) {
          return;
        }

        setServices(nextServices);
        setError(null);
      } catch (nextError) {
        if (!active) {
          return;
        }

        console.error("Error fetching services:", nextError);
        setError(nextError.message || "Failed to load services");
      }
    };

    loadServices();

    return () => {
      active = false;
    };
  }, []);

  const handleServiceNavigate = (service) => {
    navigate(`/ServiceDetail/${service._id}`, { state: { service } });
  };

  return (
    <div className="services" id="services" data-aos="fade-down" data-aos-duration="2000">
      <div className="flex justify-between items-start">
        {/* Left text */}
        <div className="flex justify-start lg:p-10 p-2">
          <div className="p-5 pt-10">
            <h2 className="text-white lg:text-6xl font-bold poppins-black text-2xl">
              Our Top <span className="text-[#f5ab34]">Services-</span> <br />{"Let's"} Browse Through
            </h2>
          </div>
          {/* Right image */}
          <div className="flex">
            <img src={robort} alt="robot" data-aos="fade-up" data-aos-duration="2000" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 sm:px-6 py-6 sm:py-8">
  {error && <p className="text-red-500 text-sm sm:text-base mb-4">Error: {error}</p>}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
    {services.length > 0 ? (
      services.slice(0,6).map((service) => (
        <div 
          key={service._id} 
          className="h-full flex flex-col p-4 sm:p-5 border border-white rounded-xl sm:rounded-2xl transition-all hover:scale-[1.02]"
        >
          {/* Icon with consistent size */}
          <div className="text-4xl sm:text-5xl md:text-6xl text-white mb-3 sm:mb-4">
            <FaRobot />
          </div>
          
          {/* Title with fixed height */}
          <div className="min-h-[60px] sm:min-h-[70px] flex items-center">
            <h3 className="text-white poppins-bold text-lg sm:text-xl md:text-2xl lg:text-3xl line-clamp-2 text-wrap">
              {service.name}
            </h3>
          </div>
          
          {/* Description with fixed height and consistent alignment */}
          <div className="min-h-[100px] sm:min-h-[120px] mb-4 sm:mb-6 flex flex-col justify-center">
            <p className="text-white poppins-light text-sm sm:text-base line-clamp-3 text-wrap">
              {service.description}
            </p>
          </div>
          
          {/* Bottom section with consistent alignment */}
          <div className="mt-auto border-t border-white/50 pt-3 sm:pt-4">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => handleServiceNavigate(service)}
            >
              <div className="text-white text-sm sm:text-base underline poppins-light group-hover:text-yellow transition-colors">
                View Detail
              </div>
              <MdArrowOutward className="text-lg sm:text-xl text-yellow group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full py-10">
        <p className="text-center text-white text-lg sm:text-xl">Loading services...</p>
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default Services;
