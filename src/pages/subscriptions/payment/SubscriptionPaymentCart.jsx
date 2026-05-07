import MarketingHero from "@/components/marketing/MarketingHero";
import SubscriptionPaymentCustomerCart from "./SubscriptionPaymentCustomerCart";

const SubscriptionPaymentCart = () => (
  <>
    <MarketingHero
      size="compact"
      step={{ current: 2, label: "Payment", total: 3 }}
      title="Pay for your subscription."
      subtitle="Enter your billing details to continue. Your card is charged at the start of each cycle."
    />
    <SubscriptionPaymentCustomerCart />
  </>
);

export default SubscriptionPaymentCart;
