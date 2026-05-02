import CartsStep from "@/components/site/shop/steps/cartsStep";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Text } from "@/components/ui/typography";

const Cart = () => (
  <div className="bg-background pt-header pb-20">
    <Container size="wide">
      <header className="flex flex-col items-center gap-3 text-center">
        <Eyebrow>Cart</Eyebrow>
        <Display size="md">Your cart</Display>
        <Text tone="muted">Review your items, then proceed to checkout.</Text>
      </header>
      <div className="mt-12">
        <CartsStep />
      </div>
    </Container>
  </div>
);

export default Cart;
