import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ServiceInto from "./ServiceInto";
import ServiceBody from "./ServiceBody";
import QuickContact from "../../component/international/services/quickContact";

const ServiceDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [service, setService] = useState(location.state?.service || null);
  const [loading, setLoading] = useState(Boolean(id) && !location.state?.service);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      if (!id) {
        setLoading(false);
        if (!location.state?.service) {
          setError("Service details are unavailable.");
        }
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getAllService`);

        if (!response.ok) {
          throw new Error("Failed to fetch service details");
        }

        const payload = await response.json();
        const services = Array.isArray(payload?.data) ? payload.data : [];
        setService(services.find((entry) => entry._id === id) || null);
        setError("");
      } catch (fetchError) {
        setError(fetchError.message || "Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, location.state?.service]);

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
