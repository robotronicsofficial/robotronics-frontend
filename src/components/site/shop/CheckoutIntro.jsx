import PropTypes from "prop-types";

import { Stepper } from "@/components/ui/stepper";

const STEPS = [
  { label: "Cart", description: "Review your selected products." },
  { label: "Customer info", description: "Shipping address and contact details." },
  { label: "Shipping & payment", description: "Choose courier and billing method." },
  { label: "Review order", description: "Confirm details before checkout." },
];

const CheckoutIntro = ({ activeStep = 1 }) => {
  const activeIndex = Math.min(Math.max(activeStep - 1, 0), STEPS.length - 1);
  return <Stepper steps={STEPS} activeIndex={activeIndex} />;
};

CheckoutIntro.propTypes = {
  activeStep: PropTypes.number,
};

export default CheckoutIntro;
