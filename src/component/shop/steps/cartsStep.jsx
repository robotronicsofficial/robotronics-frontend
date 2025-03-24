
import { useState } from "react";
import { FaCreditCard, FaEye, FaShoppingBag, FaUser } from "react-icons/fa";
import ShopCartproductList from "../shopCartproductList";
import CustomerInfomation from "../CustomerInfomation";
import ShopShipping from "../shopShipping";

const Step = ({ icon, title, description, isActive }) => (
  <div className="flex flex-col items-center space-y-2">
    <div
      className={`p-3 rounded-full transition-colors ${
        isActive ? "bg-[rgb(249,159,14)] text-red-700" : "bg-muted text-gray-500"
      }`}
    >
      {icon}
    </div>
    <h3 className="text-sm font-medium text-center sm:text-base">{title}</h3>
    <p className="text-xs text-center text-muted-foreground sm:text-sm">
      {description}
    </p>
  </div>
);

const CartsStep = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <FaShoppingBag className="w-6 h-6" />,
      title: "Add to Cart",
      description: "Select your items and add them to your shopping cart.",
      content: <ShopCartproductList onNext={() => setCurrentStep(1)} />,
    },
    {
      icon: <FaUser className="w-6 h-6" />,
      title: "Customer Information",
      description: "Add your name, phone number, and address.",
      content: <CustomerInfomation onNext={() => setCurrentStep(2)} />,
    },
    {
      icon: <FaCreditCard className="w-6 h-6" />,
      title: "Payment",
      description: "Choose your payment method and complete the transaction.",
      content: <ShopShipping onNext={() => setCurrentStep(3)} />,
    },
    {
      icon: <FaEye className="w-6 h-6" />,
      title: "Order Review",
      description: "Review your order details before final confirmation.",
      content: <p>This is where you would show the order summary for review.</p>,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Step Indicator */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {steps.map((step, index) => (
          <Step
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isActive={index <= currentStep}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-muted p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {steps[currentStep].title}
        </h2>
        <p className="" >{steps[currentStep].content}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
      </div>
    </div>
  );
};

export default CartsStep;
