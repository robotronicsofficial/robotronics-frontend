import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppImage from "../../AppImage";
import robot from "../../../assets/images/IServicesS4.webp";
import { resolveBackendAssetUrl } from "../../../utils/mediaUrl";
import { useServices } from "../../../hooks/useServices";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
                <Card
                  key={service._id}
                  className="overflow-hidden rounded-lg p-0"
                  onClick={() => handleNavigate(service)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleNavigate(service);
                    }
                  }}
                >
                  <div className="relative">
                    <AppImage
                      className="w-full object-cover"
                      src={imageUrl}
                      alt={`Image representing ${service.name}`}
                    />
                    <div className="absolute inset-x-0 top-0 flex justify-center bg-foreground/50 p-4">
                      <h3 className="text-3xl text-background poppins-bold text-wrap text-center">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                </Card>
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
            <Button
              type="button"
              className="h-auto rounded-lg bg-foreground px-6 py-2 text-lg text-background hover:bg-foreground/80"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurServices;
