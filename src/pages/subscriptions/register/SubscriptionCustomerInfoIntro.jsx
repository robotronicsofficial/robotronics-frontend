import SubscriptionCustomerCart from "./SubscriptionCustomerCart";
import { Container } from "@/components/ui/container";
import {
  Display,
  Eyebrow,
  Highlight,
  Text,
} from "@/components/ui/typography";

const SubscriptionCustomerInfoIntro = () => (
  <>
    <section className="bg-background pt-header pb-10">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow>Subscription setup</Eyebrow>
          <Display size="md">
            Add your <Highlight>child profile</Highlight>.
          </Display>
          <Text tone="muted" className="max-w-prose">
            Tell us about your child so we can personalize their learning path. You can add more children after checkout.
          </Text>
        </div>
      </Container>
    </section>
    <SubscriptionCustomerCart />
  </>
);

export default SubscriptionCustomerInfoIntro;
