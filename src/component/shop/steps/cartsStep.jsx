import { useState } from "react";
import { Slider, alpha, styled } from "@mui/material";
import ShopCartproductList from "../shopCartproductList";
import CustomerInfomation from "../CustomerInfomation";
import ShopShipping from "../shopShipping";
import shopBag from "../../../assets/add shopping-bag.png";
import userIcon from "../../../assets/user-circle.png";
import cardIcon from "../../../assets/credit-card.png";
import reviewIcon from "../../../assets/eye.png";
import { useSelector } from "react-redux";

// Styled Slider
const SuccessSlider = styled(Slider)(({ theme }) => ({
  width: "100%",
  maxWidth: "1043px",
  height: "2px",
  position: "relative",
  color: "#362D2C",
  '& .MuiSlider-track': {
    backgroundColor: "#362D2C",
  },
  '& .MuiSlider-rail': {
    backgroundColor: "#D4D4D4",
  },
  "& .MuiSlider-thumb": {
    width: "8px",
    height: "8px",
    backgroundColor: "#362D2C",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${alpha("#362D2C", 0.16)}`,
    },
    "&.Mui-active": {
      boxShadow: `0px 0px 0px 14px ${alpha("#362D2C", 0.16)}`,
    },
  },
}));

const Step = ({ icon, title, description, isActive, onClick }) => (
  <button
    onClick={onClick}
    disabled={!isActive}
    className={`flex flex-col items-center mt-7 cursor-pointer ${!isActive && "opacity-50 cursor-not-allowed"}`}
  >
    <div
      className={`w-16 h-16 flex items-center justify-center rounded-full transition-colors shadow-md ${isActive ? "bg-[#362D2C]" : "bg-[#F6F6F6]"}`}
    >
      <img
        src={icon}
        className="w-7 h-7"
        style={{ filter: isActive ? "invert(1)" : "none" }}
      />
    </div>
    <h3 className="mt-4 font-bold text-[16px] text-[#362D2C] text-center">{title}</h3>
    <p className="font-lato mt-4 font-medium text-[14px] leading-[20px] tracking-normal text-center text-[#7E7F7C]">
      {description}
    </p>
  </button>
);

const CartsStep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { cart } = useSelector((state) => state.cart);

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
      description: "With many payment method, included yours.",
      content: <ShopShipping onNext={() => setCurrentStep(3)} />, 
    },
    {
      icon: reviewIcon,
      title: "REVIEW",
      description: "View all your information before the confirmation.",
      content: <p>This is where you would show the order summary for review.</p>,
    },
  ];

  const progressValue = cart.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex justify-center mb-6">
        <SuccessSlider value={progressValue} min={0} max={100} disabled />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {steps.map((step, index) => (
          <Step
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isActive={index <= currentStep}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>

      <div className="bg-muted p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
        <p>{steps[currentStep].content}</p>
      </div>
    </div>
  );
};

export default CartsStep;
