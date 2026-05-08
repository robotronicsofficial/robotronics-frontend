import CheckoutIntro from "@/components/site/shop/CheckoutIntro";
import CustomerInfomation from "@/components/site/shop/CustomerInfomation";
import MarketingHero from "@/components/marketing/MarketingHero";

const CustomerInfo = () => (
  <>
    <MarketingHero
      size="compact"
      step={{ current: 2, label: "Customer info", total: 4 }}
      title="Customer information"
      subtitle="Follow the steps to complete your order."
      containerSize="wide"
    >
      <CheckoutIntro activeStep={2} />
    </MarketingHero>
    <CustomerInfomation />
  </>
);

export default CustomerInfo;
