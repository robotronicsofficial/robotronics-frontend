import PropTypes from "prop-types";
import { useState } from "react";
import { Slider, alpha, styled } from "@mui/material";
import ShopCartproductList from "../shopCartproductList";
import CustomerInfomation from "../CustomerInfomation";
import ShopPaymentMethod from "../shopPaymentMethod";
import ShopShipping from "../shopShipping";
import shopBag from "../../../assets/add shopping-bag.png";
import userIcon from "../../../assets/user-circle.png";
import cardIcon from "../../../assets/credit-card.png";
import eyeIcon from "../../../assets/eye.png";
import { cn } from "../../../lib/utils";

// Styled Slider
const SuccessSlider = styled(Slider)(() => ({
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
    type="button"
    onClick={onClick}
    disabled={!isActive}
    className={cn(
      "flex cursor-pointer flex-col items-center gap-2",
      !isActive && "cursor-not-allowed opacity-50",
    )}
  >
    <div
      className={cn(
        "flex size-16 items-center justify-center rounded-full shadow-md transition-colors",
        isActive ? "bg-[#362D2C]" : "bg-[#F6F6F6]",
      )}
    >
      <img
        src={icon}
        alt=""
        className={cn("size-7", isActive && "invert")}
      />
    </div>
    <h3 className="font-bold text-[16px] text-[#362D2C] text-center sm:text-base">{title}</h3>
    <p className="font-lato mt-4 font-medium text-[14px] leading-[20px] tracking-normal text-center text-[#7E7F7C] sm:text-sm">
      {description}
    </p>
  </button>
);

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
        <SuccessSlider value={progressValue} min={0} max={100} disabled />
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-[10vw] lg:flex-row">
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

      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-wrap text-4xl poppins-bold text-brown">{steps[currentStep].title}</h1>
        <div>{steps[currentStep].content}</div>
      </div>
    </>
  );
};

Step.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CartsStep;
