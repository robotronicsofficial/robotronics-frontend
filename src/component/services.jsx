import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Bot } from "lucide-react";
import robort from "../assets/images/right-face-robot.png";
import AppImage from "./AppImage";
import { useServices } from "../hooks/useServices";

const Services = () => {
  const {
    data: services = [],
    isLoading: loading,
    error,
  } = useServices();
  const navigate = useNavigate();

  const handleServiceNavigate = (service) => {
    navigate({ to: `/ServiceDetail/${service._id}`, state: { service } });
  };

  return (
    <div className="services" id="services" data-aos="fade-down">
      <div className="flex justify-between items-start">
        {/* Left text */}
        <div className="flex justify-start lg:p-10 p-2">
          <div className="p-5 pt-10">
            <h2 className="text-background lg:text-6xl font-bold poppins-black text-2xl">
              Our Top <span className="text-primary">Services-</span> <br />{"Let's"} Browse Through
            </h2>
          </div>
          {/* Right image */}
          <div className="flex">
            <AppImage
              src={robort}
              alt="Robotronics services robot"
              data-aos="fade-up"

            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 sm:px-6 py-6 sm:py-8">
  {error && <p className="text-destructive text-sm sm:text-base mb-4">We couldn&apos;t load services right now.</p>}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
    {loading ? (
      <div className="col-span-full py-10">
        <p className="text-center text-background text-lg sm:text-xl">Loading services...</p>
      </div>
    ) : services.length > 0 ? (
      services.slice(0,6).map((service) => (
        <div
          key={service._id}
          className="h-full flex flex-col p-4 sm:p-5 border border-card rounded-xl sm:rounded-2xl transition-all hover:scale-[1.02]"
        >
          {/* Icon with consistent size */}
          <div className="text-4xl sm:text-5xl md:text-6xl text-background mb-3 sm:mb-4">
            <Bot />
          </div>

          {/* Title with fixed height */}
          <div className="min-h-[60px] sm:min-h-[70px] flex items-center">
            <h3 className="text-background poppins-bold text-lg sm:text-xl md:text-2xl lg:text-3xl line-clamp-2 text-wrap">
              {service.name}
            </h3>
          </div>

          {/* Description with fixed height and consistent alignment */}
          <div className="min-h-[100px] sm:min-h-[120px] mb-4 sm:mb-6 flex flex-col justify-center">
            <p className="text-background poppins-light text-sm sm:text-base line-clamp-3 text-wrap">
              {service.description}
            </p>
          </div>

          {/* Bottom section with consistent alignment */}
          <div className="mt-auto border-t border-card/50 pt-3 sm:pt-4">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleServiceNavigate(service)}
            >
              <div className="text-background text-sm sm:text-base underline poppins-light group-hover:text-primary transition-colors">
                View Detail
              </div>
              <ArrowUpRight className="text-lg sm:text-xl text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ))
    ) : !error ? (
      <div className="col-span-full py-10">
        <p className="text-center text-background text-lg sm:text-xl">No services available right now.</p>
      </div>
    ) : null}
  </div>
</div>
    </div>
  );
};

export default Services;
