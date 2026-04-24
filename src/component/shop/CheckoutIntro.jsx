import step1 from "../../assets/images/stepAddShoppingBag.svg";
import step2 from "../../assets/images/stepUserCircle.svg";
import step3 from "../../assets/images/stepCreditCard.svg";
import step4 from "../../assets/images/stepeye.svg";

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

const CheckoutIntro = ({ activeStep = 1 }) => {
  const activeIndex = Math.min(Math.max(activeStep - 1, 0), STEPS.length - 1);

  return (
    <div className="shopCarthero" id="shopCarthero">
      <div className="flex flex-col lg:py-20 py-10">
        <div className="items-center" data-aos="fade-up">
          <p className="text-brown font-bold lg:text-5xl text-2xl text-center self-center">
            SHOPPING CART
          </p>
          <p className="text-brown lg:text-l text-center text-wrap self-center">
            FOLLOW THE CHECKOUT STEPS TO COMPLETE YOUR ORDER
          </p>
        </div>

        <div className="self-center w-full max-w-6xl px-4 lg:px-8">
          <div className="p-2">
            <div className="relative h-0 border border-black">
              {STEPS.map((_, index) => {
                const stepCount = STEPS.length - 1;
                const position =
                  index === 0 ? "left-0" : index === STEPS.length - 1 ? "right-0" : "";
                const dynamicStyle =
                  index > 0 && index < STEPS.length - 1
                    ? { left: `${(index / stepCount) * 100}%`, transform: "translate(-50%, -50%)" }
                    : undefined;

                return (
                  <div
                    key={index}
                    className={`absolute top-1/2 h-4 w-4 rounded-full ${
                      index <= activeIndex ? "bg-black" : "bg-gray"
                    } ${position}`}
                    style={dynamicStyle}
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
                    className={`mx-auto rounded-full p-3 ${isActive ? "bg-brown" : "bg-[#D4D4D4]"}`}
                    src={step.icon}
                    alt={step.title}
                  />
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="lg:text-xl text-sm font-semibold text-brown">{step.title}</p>
                    <p className="text-sm text-wrap text-[#7E7F7C]">{step.description}</p>
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

export default CheckoutIntro;
