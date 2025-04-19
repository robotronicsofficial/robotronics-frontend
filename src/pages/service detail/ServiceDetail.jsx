import { useLocation } from "react-router-dom";
import ServiceInto from "./ServiceInto";
import ServiceBody from "./ServiceBody";
import QuickContact from "../../component/international/services/quickContact";

const ServiceDetail = () => {
  const location = useLocation();
  const service = location.state?.service; // Get the passed service data

  if (!service) {
    return <p className="text-center text-lg">No service details found.</p>;
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
