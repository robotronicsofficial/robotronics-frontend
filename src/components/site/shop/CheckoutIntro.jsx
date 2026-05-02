import PropTypes from "prop-types";

import { Container } from "@/components/ui/container";
import { Stepper } from "@/components/ui/stepper";
import {
  Display,
  Eyebrow,
  Text,
} from "@/components/ui/typography";

const STEPS = [
  { label: "Cart", description: "Review your selected products." },
  { label: "Customer info", description: "Shipping address and contact details." },
  { label: "Shipping & payment", description: "Choose courier and billing method." },
  { label: "Review order", description: "Confirm details before checkout." },
];

const CheckoutIntro = ({ activeStep = 1 }) => {
  const activeIndex = Math.min(Math.max(activeStep - 1, 0), STEPS.length - 1);
  return (
    <section className="bg-muted/40 pt-header pb-12">
      <Container size="wide">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <Eyebrow>Checkout</Eyebrow>
          <Display size="md">Almost there.</Display>
          <Text tone="muted">
            Follow the steps to complete your order.
          </Text>
        </div>
        <Stepper steps={STEPS} activeIndex={activeIndex} className="mt-12" />
      </Container>
    </section>
  );
};

CheckoutIntro.propTypes = {
  activeStep: PropTypes.number,
};

export default CheckoutIntro;
