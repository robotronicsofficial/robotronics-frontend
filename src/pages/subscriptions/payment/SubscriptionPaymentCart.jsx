import SubscriptionPaymentCustomerCart from "./SubscriptionPaymentCustomerCart";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Text,
} from "@/components/ui/typography";

const SubscriptionPaymentCart = () => (
  <>
    <section className="bg-background pt-header pb-10">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow>Step 2 · Payment</Eyebrow>
          <Display size="md">Pay for your subscription.</Display>
          <Text tone="muted" className="max-w-prose">
            Enter your billing details to continue. Your card is charged at the start of each cycle.
          </Text>
        </div>
      </Container>
    </section>
    <SubscriptionPaymentCustomerCart />
  </>
);

export default SubscriptionPaymentCart;
