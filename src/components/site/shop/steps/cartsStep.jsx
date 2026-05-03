import { useState } from "react";

import { CheckoutProgress, CheckoutStepButton } from "@/components/checkout/CheckoutProgress";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import ShopCartproductList from "../shopCartproductList";
import CustomerInfomation from "../CustomerInfomation";
import ShopPaymentMethod from "../shopPaymentMethod";
import ShopShipping from "../shopShipping";
import shopBag from "@/assets/add shopping-bag.png";
import userIcon from "@/assets/user-circle.png";
import cardIcon from "@/assets/credit-card.png";
import eyeIcon from "@/assets/eye.png";

const CartsStep = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: shopBag,
      title: "Cart",
      description: "Review all your products and edit quantities.",
      content: <ShopCartproductList onNext={() => setCurrentStep(1)} />,
    },
    {
      icon: userIcon,
      title: "Customer information",
      description: "Add your name, phone number and address.",
      content: <CustomerInfomation onNext={() => setCurrentStep(2)} />,
    },
    {
      icon: cardIcon,
      title: "Shipping & payment",
      description: "Choose your courier and billing method.",
      content: <ShopPaymentMethod onNext={() => setCurrentStep(3)} />,
    },
    {
      icon: eyeIcon,
      title: "Review order",
      description: "Confirm the saved checkout details and cart items.",
      content: (
        <ShopShipping
          onEditCustomer={() => setCurrentStep(1)}
          onEditPayment={() => setCurrentStep(2)}
        />
      ),
    },
  ];

  const progressMap = [0, 33, 67, 100];
  const progressValue = progressMap[currentStep] || 0;

  return (
    <Container size="wide" className="flex flex-col gap-10 pb-16">
      <CheckoutProgress value={progressValue} className="mt-10" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

export default CartsStep;
