import CartsStep from "@/components/site/shop/steps/cartsStep";
import CheckoutIntro from "@/components/site/shop/CheckoutIntro";
import MarketingHero from "@/components/marketing/MarketingHero";
import { Container } from "@/components/ui/container";

const Cart = () => (
  <>
    <MarketingHero
      size="compact"
      step={{ current: 1, label: "Cart", total: 4 }}
      title="Your cart"
      subtitle="Review your items, then proceed to checkout."
      containerSize="wide"
    >
      <CheckoutIntro activeStep={1} />
    </MarketingHero>
    <section className="bg-background pb-20">
      <Container size="wide">
        <CartsStep />
      </Container>
    </section>
  </>
);

export default Cart;
