import SubscriptionReviewCustomer from "./SubscriptionReviewCustomer";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Text,
} from "@/components/ui/typography";

const SubscriptionReviewCart = () => (
  <>
    <section className="bg-background pt-header pb-10">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow>Step 3 · Review</Eyebrow>
          <Display size="md">Review your order.</Display>
          <Text tone="muted" className="max-w-prose">
            One last look before we activate your subscription. You can change your plan after checkout.
          </Text>
        </div>
      </Container>
    </section>
    <SubscriptionReviewCustomer />
  </>
);

export default SubscriptionReviewCart;
