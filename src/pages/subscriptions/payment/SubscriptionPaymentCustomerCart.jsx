import SubscriptionPayment from "../register/SubscriptionPayment";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";

const SubscriptionPaymentCustomerCart = () => {
  return (
    <div>
      <div className="px-4 pb-6 pt-20 text-center md:px-10">
        <p className="text-4xl font-bold text-foreground">Payment</p>
        <p className="mt-4 text-sm text-foreground/80">
          Enter your billing details to continue to the final review.
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
