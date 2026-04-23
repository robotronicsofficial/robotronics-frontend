import { useState } from "react";
import { Slider, alpha, styled } from "@mui/material";
import RobogeniusCustomerInformation from "./RobogeniusCustomerInformation";
import RobogeniusPayment from "./RobogeniusPayment";
import userIcon from "../../../assets/user-circle.png";
import cardIcon from "../../../assets/credit-card.png";

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
    onClick={onClick}
    disabled={!isActive}
    className={`flex flex-col items-center space-y-2 cursor-pointer ${!isActive && "opacity-50 cursor-not-allowed"}`}
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
    <h3 className="font-bold text-[16px] text-[#362D2C] text-center sm:text-base">{title}</h3>
    <p className="font-lato mt-4 font-medium text-[14px] leading-[20px] tracking-normal text-center text-[#7E7F7C] sm:text-sm">
      {description}
    </p>
  </button>
);


const Robogeniuscustomercart = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: userIcon,
      title: "PARENT & CHILD INFORMATION",
      description: "Add your name, phone number and address.",
      content: (
        <RobogeniusCustomerInformation 
          onNext={() => setCurrentStep(1)}
        />
      ),
    },
    {
      icon: cardIcon,
      title: "SUBSCRIPTION PAYMENT",
      description: "Submit your Payment Information",
      content: <RobogeniusPayment />,
    },
  ];

  const progressMap = [50, 100];
  const progressValue = progressMap[currentStep] || 0;

  return (
    <>
      <div className="flex justify-center mt-10">
        <SuccessSlider value={progressValue} min={0} max={100} disabled />
      </div>


      <div className="flex lg:flex-row items-center justify-evenly gap-[10vw] mt-10 flex-col">
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
        <h1 className="text-2xl md:text-4xl poppins-bold text-brown text-wrap">{steps[currentStep].title}</h1>
        <p>{steps[currentStep].content}</p>
      </div>
  </>
  );
};
export default Robogeniuscustomercart;
