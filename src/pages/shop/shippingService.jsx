import CheckoutIntro from "@/components/site/shop/CheckoutIntro";
import MarketingHero from "@/components/marketing/MarketingHero";
import ShopPaymentMethod from "@/components/site/shop/shopPaymentMethod";

const ShippingService = () => (
  <>
    <MarketingHero
      size="compact"
      step={{ current: 3, label: "Shipping & payment", total: 4 }}
      title="Shipping and payment"
      subtitle="Choose a courier and a billing method to continue."
      containerSize="wide"
    >
      <CheckoutIntro activeStep={3} />
    </MarketingHero>
    <ShopPaymentMethod />
  </>
);

export default ShippingService;
