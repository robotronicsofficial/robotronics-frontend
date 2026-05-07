import MarketingHero from "@/components/marketing/MarketingHero";
import SubscriptionCustomerCart from "./SubscriptionCustomerCart";

const SubscriptionCustomerInfoIntro = () => (
  <>
    <MarketingHero
      size="compact"
      step={{ current: 1, label: "Customer info", total: 3 }}
      title="Add your child profile."
      subtitle="Tell us about your child so we can personalize their learning path. You can add more children after checkout."
    />
    <SubscriptionCustomerCart />
  </>
);

export default SubscriptionCustomerInfoIntro;
