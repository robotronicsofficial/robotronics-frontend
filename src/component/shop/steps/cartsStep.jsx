import { CheckoutProgress, CheckoutStepButton } from "@/components/checkout/CheckoutProgress";
import { useState } from "react";
import ShopCartproductList from "../shopCartproductList";
import CustomerInfomation from "../CustomerInfomation";
import ShopPaymentMethod from "../shopPaymentMethod";
import ShopShipping from "../shopShipping";
import shopBag from "../../../assets/add shopping-bag.png";
import userIcon from "../../../assets/user-circle.png";
import cardIcon from "../../../assets/credit-card.png";
import eyeIcon from "../../../assets/eye.png";

const CartsStep = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: shopBag,
      title: "CART",
      description: "Review all your product and edit the number.",
      content: <ShopCartproductList onNext={() => setCurrentStep(1)} />,
    },
    {
      icon: userIcon,
      title: "CUSTOMER INFORMATION",
      description: "Add your name, phone number and address.",
      content: <CustomerInfomation onNext={() => setCurrentStep(2)} />,
    },
    {
      icon: cardIcon,
      title: "SHIPPING & PAYMENT",
      description: "Choose your courier and billing method.",
      content: <ShopPaymentMethod onNext={() => setCurrentStep(3)} />,
    },
    {
      icon: eyeIcon,
      title: "REVIEW ORDER",
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
    <>
      <div className="mt-10 flex justify-center">
        <CheckoutProgress value={progressValue} />
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-[10vw] lg:flex-row">
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
        <h1 className="text-wrap text-4xl poppins-bold text-foreground">{steps[currentStep].title}</h1>
        <div>{steps[currentStep].content}</div>
      </div>
    </>
  );
};

export default CartsStep;
