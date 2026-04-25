import { useLocation, useParams } from "@tanstack/react-router";
import ServiceInto from "./ServiceInto";
import ServiceBody from "./ServiceBody";
import QuickContact from "@/components/site/international/services/quickContact";
import PageState from "@/components/layout/PageState";
import { useService } from "../../hooks/useServices";

const ServiceDetail = () => {
  const { id } = useParams({ strict: false });
  const location = useLocation();
  const routeService = location.state?.service;
  const {
    data: service,
    isLoading: loading,
    error,
  } = useService(id, routeService);

  if (!id || loading) {
    return <PageState message="Loading service details..." />;
  }

  if (error || !service) {
    return (
      <PageState>
        <p className="text-lg text-destructive">{error?.message || "Service not found"}</p>
      </PageState>
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
