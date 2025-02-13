import React from "react";
import ServiceInto from "./ServiceInto";
import ServiceBody from "./ServiceBody";
import Footer from "../../component/footer";
import QuickContact from "../../component/international/services/quickContact";

const ServiceDetail = () => {
  return (
    <div>
      <ServiceInto />
      <ServiceBody />
      <QuickContact/>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
