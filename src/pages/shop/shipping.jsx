import CheckoutIntro from "@/components/site/shop/CheckoutIntro";
import MarketingHero from "@/components/marketing/MarketingHero";
import ShopShipping from "@/components/site/shop/shopShipping";

const Shipping = () => (
  <>
    <MarketingHero
      size="compact"
      step={{ current: 4, label: "Review order", total: 4 }}
      title="Review your order"
      subtitle="Confirm your details, then submit your order request."
      containerSize="wide"
    >
      <CheckoutIntro activeStep={4} />
    </MarketingHero>
    <ShopShipping />
  </>
);

export default Shipping;
