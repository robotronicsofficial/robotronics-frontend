import PropTypes from "prop-types";
import step1 from "../../assets/images/stepAddShoppingBag.svg";
import step2 from "../../assets/images/stepUserCircle.svg";
import step3 from "../../assets/images/stepCreditCard.svg";
import step4 from "../../assets/images/stepeye.svg";
import { cn } from "../../lib/utils";

const STEPS = [
  {
    icon: step1,
    title: "SHOPPING CART",
    description: "Review your selected products and update quantities.",
  },
  {
    icon: step2,
    title: "CUSTOMER INFORMATION",
    description: "Add your shipping address and contact details.",
  },
  {
    icon: step3,
    title: "SHIPPING & PAYMENT",
    description: "Choose the courier and save your billing method.",
  },
  {
    icon: step4,
    title: "REVIEW ORDER",
    description: "Confirm the saved checkout details before finishing.",
  },
];
const STEP_DOT_POSITIONS = [
  "left-0",
  "left-[33.333333%] -translate-x-1/2",
  "left-[66.666667%] -translate-x-1/2",
  "right-0",
];

const CheckoutIntro = ({ activeStep = 1 }) => {
  const activeIndex = Math.min(Math.max(activeStep - 1, 0), STEPS.length - 1);

  return (
    <div className="shopCarthero" id="shopCarthero">
      <div className="flex flex-col lg:py-20 py-10">
        <div className="items-center" data-aos="fade-up">
          <p className="text-foreground font-bold lg:text-5xl text-2xl text-center self-center">
            SHOPPING CART
          </p>
          <p className="text-foreground lg:text-l text-center text-wrap self-center">
            FOLLOW THE CHECKOUT STEPS TO COMPLETE YOUR ORDER
          </p>
        </div>

        <div className="self-center w-full max-w-6xl px-4 lg:px-8">
          <div className="p-2">
            <div className="relative h-0 border border-foreground">
              {STEPS.map((_, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full",
                      index <= activeIndex ? "bg-foreground" : "bg-background",
                      STEP_DOT_POSITIONS[index],
                    )}
                  />
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 py-6 lg:grid-cols-4">
            {STEPS.map((step, index) => {
              const isActive = index <= activeIndex;

              return (
                <div key={step.title} className="justify-center text-center">
                  <img
                    className={`mx-auto rounded-full p-3 ${isActive ? "bg-foreground" : "bg-border"}`}
                    src={step.icon}
                    alt={step.title}
                  />
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="lg:text-xl text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-sm text-wrap text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutIntro.propTypes = {
  activeStep: PropTypes.number,
};

export default CheckoutIntro;
