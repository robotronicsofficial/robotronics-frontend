import SubscriptionPayment from "../register/SubscriptionPayment";

const SubscriptionPaymentCustomerCart = () => (
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
  </div>
);

export default SubscriptionPaymentCustomerCart;
