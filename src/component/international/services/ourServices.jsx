import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppImage from "../../AppImage";
import robot from "../../../assets/images/IServicesS4.webp";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";
import { useServices } from "../../../hooks/useServices";

const OurServices = () => {
  const {
    data: services = [],
    isLoading: loading,
    error,
  } = useServices();
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (service) => {
    navigate(`/ServiceDetail/${service._id}`, { state: { service } });
  };

  return (
    <div className="OurServices p-20">
      <div className="container mx-auto">
        <h2 className="lg:text-6xl md:text-5xl text-4xl text-foreground poppins-bold mb-16">
          Our Services
        </h2>
        {error && <p className="text-destructive">We couldn&apos;t load services right now.</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center text-lg">Loading services...</p>
          ) : services.length > 0 ? (
            (showAll ? services : services.slice(0, 6)).map((service) => {
              const imageUrl = resolveBackendAssetUrl(service.thumbnailImage, robot);

              return (
                <div
                  key={service._id}
                  className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => handleNavigate(service)}
                >
                  <div className="flex justify-center relative">
                    <div className="absolute inset-0 bg-foreground opacity-40 hover:bg-foreground hover:opacity-20 transition-all duration-100 ease-in-out"></div>
                    <div className="absolute mt-10 z-raised">
                      <h3 className="text-3xl text-background poppins-bold mb-2 text-wrap text-center">
                        {service.name}
                      </h3>
                    </div>
                    <AppImage
                      className="w-full object-cover"
                      src={imageUrl}
                      alt={`Image representing ${service.name}`}
                    />
                  </div>
                </div>
              );
            })
          ) : !error ? (
            <p className="text-center text-lg">No services available right now.</p>
          ) : (
            null
          )}
        </div>

        {services.length > 6 && (
          <div className="text-center mt-8">
            <button
              className="bg-foreground text-background px-6 py-2 rounded-lg text-lg hover:bg-foreground/80 transition"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurServices;
