import { CheckoutProgress, CheckoutStepButton } from "@/components/checkout/CheckoutProgress";
import { useState } from "react";
import SubscriptionCustomerInformation from "./SubscriptionCustomerInformation";
import SubscriptionPayment from "./SubscriptionPayment";
import userIcon from "../../../assets/user-circle.png";
import cardIcon from "../../../assets/credit-card.png";

const SubscriptionCustomerCart = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: userIcon,
      title: "PARENT & CHILD INFORMATION",
      description: "Add your name, phone number and address.",
      content: (
        <SubscriptionCustomerInformation
          onNext={() => setCurrentStep(1)}
        />
      ),
    },
    {
      icon: cardIcon,
      title: "SUBSCRIPTION PAYMENT",
      description: "Submit your Payment Information",
      content: <SubscriptionPayment />,
    },
  ];

  const progressMap = [50, 100];
  const progressValue = progressMap[currentStep] || 0;

  return (
    <>
      <div className="mt-10 flex justify-center">
        <CheckoutProgress value={progressValue} />
      </div>

      <div className="mt-10 flex flex-col items-center justify-evenly gap-[10vw] lg:flex-row">
        {steps.map((step, index) => (
          <CheckoutStepButton
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isActive={index <= currentStep}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-wrap text-2xl text-foreground md:text-4xl">
          {steps[currentStep].title}
        </h1>
        <div>{steps[currentStep].content}</div>
      </div>
    </>
  );
};

export default SubscriptionCustomerCart;
