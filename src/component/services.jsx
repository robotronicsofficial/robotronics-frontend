import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot} from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import robort from "../assets/images/right-face-robot.svg";

const BASE_URL = "http://localhost:8080/";

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null); // Added missing state for error
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}api/getAllService`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Services:", data);
        setServices(data.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setError(error.message);
      });
  }, []);

  const handleServiceNavigate = (service) => {
    navigate("/serviceDetail", { state: { service } }); // Pass service data
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
      <div className="px-4 py-8">
        {error && <p className="text-red-500">Error: {error}</p>} {/* Show error if any */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="h-[54vh] w-[60vh] p-4 flex flex-col justify-between border-white border-2 rounded-2xl">
                <div className="text-6xl sm:text-6xl md:text-5xl lg:text-6xl text-white">
                  <FaRobot />
                </div>
                <div className="my-2 min-h-[6vw]">
                  <p className="text-wrap text-left text-white poppins-bold text-lg sm:text-xl md:text-2xl lg:text-4xl">
                    {service.name}
                  </p>
                </div>
                <div className="min-h-[16vh]">
                  <p className="text-left text-wrap poppins-light sm:text-sm text-white">{service.description}</p>
                </div>
                <div className="border-t border-white"></div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleServiceNavigate(service)}>
                  <div className="text-white text-sm md:text-lg underline poppins-light">
                    View Detail
                  </div>
                  <MdArrowOutward className="text-xl text-yellow" />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-white">Loading services...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
