import MarketingHero from "@/components/marketing/MarketingHero";
import SubscriptionReviewCustomer from "./SubscriptionReviewCustomer";

const SubscriptionReviewCart = () => (
  <>
    <MarketingHero
      size="compact"
      step={{ current: 3, label: "Review", total: 3 }}
      title="Review your order."
      subtitle="One last look before we activate your subscription. You can change your plan after checkout."
    />
    <SubscriptionReviewCustomer />
  </>
);

export default SubscriptionReviewCart;
