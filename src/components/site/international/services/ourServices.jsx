import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import AppImage from "../../AppImage";
import robot from "@/assets/images/IServicesS4.webp";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";
import { useServices } from "@/hooks/useServices";
import QueryErrorState from "@/components/layout/QueryErrorState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Text } from "@/components/ui/typography";

const ServiceCard = ({ service, onSelect }) => {
  const imageUrl = resolveBackendAssetUrl(service.thumbnailImage, robot);

  return (
    <Card
      className="group flex h-full cursor-pointer flex-col overflow-hidden p-0 transition-shadow hover:shadow-lg"
      onClick={() => onSelect(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(service);
        }
      }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <AppImage
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={imageUrl}
          alt={`Image representing ${service.name}`}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Text size="lg" weight="semibold">{service.name}</Text>
      </div>
    </Card>
  );
};

const OurServices = () => {
  const {
    data: services = [],
    isLoading: loading,
    error,
    refetch,
  } = useServices();
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (service) => {
    navigate({ to: `/ServiceDetail/${service._id}`, state: { service } });
  };

  const visibleServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="bg-background py-20">
      <Container size="wide" className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Eyebrow>What we do</Eyebrow>
          <Display size="md">Our services.</Display>
        </div>

        {loading ? (
          <Text tone="muted">Loading services…</Text>
        ) : error ? (
          <QueryErrorState
            title="Couldn't load services"
            message={error.message}
            onRetry={() => refetch()}
          />
        ) : services.length === 0 ? (
          <Text tone="muted">No services available right now.</Text>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onSelect={handleNavigate}
                />
              ))}
            </div>
            {services.length > 6 && (
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show less" : "Show more"}
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default OurServices;
