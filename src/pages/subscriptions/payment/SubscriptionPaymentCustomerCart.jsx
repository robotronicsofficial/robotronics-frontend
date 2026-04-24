import SubscriptionPayment from "../register/SubscriptionPayment";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";

const SubscriptionPaymentCustomerCart = () => {
  return (
    <div>
      <div className="px-4 pb-6 pt-20 text-center md:px-10">
        <p className="text-4xl font-bold text-brown">Payment Process</p>
        <p className="mt-4 text-sm text-brown/80">
          Save the subscription billing details in this browser before the final review.
        </p>
      </div>
      <div className="px-4 pb-10 md:px-10">
        <SubscriptionPayment />
      </div>
      <YtVideos />
    </div>
  );
};

export default SubscriptionPaymentCustomerCart;
