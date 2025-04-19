import Intro from "../../component/dashboard/intro";

import RoboGeniusPaymentDetail from "../../component/dashboard/RoboGeniusPaymentDetail";

const PaymentDetail = () => {
  return (
    <div>
      <div className="px-4 md:px-20 bg-[#ebe5e2] ">
      <Intro />
      </div>
      <RoboGeniusPaymentDetail />
    </div>
  );
};

export default PaymentDetail;
