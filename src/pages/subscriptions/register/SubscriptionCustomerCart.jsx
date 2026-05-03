import { useState } from "react";

import { CheckoutProgress, CheckoutStepButton } from "@/components/checkout/CheckoutProgress";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import SubscriptionCustomerInformation from "./SubscriptionCustomerInformation";
import SubscriptionPayment from "./SubscriptionPayment";
import userIcon from "../../../assets/user-circle.png";
import cardIcon from "../../../assets/credit-card.png";

const SubscriptionCustomerCart = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: userIcon,
      title: "Parent & child information",
      description: "Add your name, phone number and address.",
      content: <SubscriptionCustomerInformation onNext={() => setCurrentStep(1)} />,
    },
    {
      icon: cardIcon,
      title: "Subscription payment",
      description: "Submit your payment information.",
      content: <SubscriptionPayment />,
    },
  ];

  const progressMap = [50, 100];
  const progressValue = progressMap[currentStep] || 0;

  return (
    <Container size="wide" className="flex flex-col gap-10 pb-16">
      <CheckoutProgress value={progressValue} className="mt-10" />

      <div className="grid gap-6 md:grid-cols-2">
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

      <div className="flex flex-col gap-6">
        <Heading level={2} className="text-h3">
          {steps[currentStep].title}
        </Heading>
        <div>{steps[currentStep].content}</div>
      </div>
    </Container>
  );
};

export default SubscriptionCustomerCart;
