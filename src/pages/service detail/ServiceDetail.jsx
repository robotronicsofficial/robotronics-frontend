import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ServiceInto from "./ServiceInto";
import ServiceBody from "./ServiceBody";
import QuickContact from "../../component/international/services/quickContact";
import { fetchServices, findCachedService } from "../../lib/services";

const ServiceDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const routeService = location.state?.service;
  const [service, setService] = useState(() => {
    if (routeService?._id === id) {
      return routeService;
    }

    return id ? findCachedService(id) : null;
  });
  const [loading, setLoading] = useState(Boolean(id) && !service);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchService = async () => {
      if (!id) {
        if (!active) {
          return;
        }

        setLoading(false);
        if (!routeService) {
          setError("Service details are unavailable.");
        }
        return;
      }

      const nextService =
        routeService?._id === id ? routeService : findCachedService(id);

      if (nextService) {
        if (!active) {
          return;
        }

        setService(nextService);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const services = await fetchServices();
        const matchedService =
          services.find((entry) => String(entry?._id) === String(id)) || null;

        if (!active) {
          return;
        }

        setService(matchedService);
        setError("");
      } catch (fetchError) {
        if (!active) {
          return;
        }

        setError(fetchError.message || "Failed to load service details");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchService();

    return () => {
      active = false;
    };
  }, [id, routeService]);

  if (loading) {
    return <div className="bg-background pt-44 pb-20 text-center">Loading service details...</div>;
  }

  if (error || !service) {
    return (
      <div className="bg-background pt-44 pb-20 text-center">
        <p className="text-lg text-red-500">{error || "Service not found"}</p>
      </div>
    );
  }

  return (
    <div>
      <ServiceInto service={service} />
      <ServiceBody service={service} />
      <QuickContact />
    </div>
  );
};

export default ServiceDetail;
