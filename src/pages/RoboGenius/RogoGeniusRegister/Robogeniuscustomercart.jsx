import { useState } from "react";
import { FaCreditCard, FaEye, FaShoppingBag, FaUser } from "react-icons/fa";
// import ShopCartproductList from "../shopCartproductList";
// import ShopCartproductList from "../../../component/shop/shopCartproductList";
// import CustomerInfomation from "../CustomerInfomation";
// import CustomerInfomation from "../../../component/shop/CustomerInfomation";
import RobogeniusCustomerInformation from "./RobogeniusCustomerInformation";
// import ShopShipping from "../shopShipping";
import ShopShipping from "../../../component/shop/shopShipping";
import { BiSkipPrevious, BiSolidSkipPreviousCircle } from "react-icons/bi";

const Step = ({ icon, title, description, isActive }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className={`p-3 rounded-full ${isActive ? "bg-primary" : "bg-muted"}`}>
      {icon}
    </div>
    <h3 className="text-sm font-medium text-center sm:text-base">{title}</h3>
    <p className="text-xs text-center text-muted-foreground sm:text-sm">
      {description}
    </p>
  </div>
);
const Robogeniuscustomercart = ({ onNext }) => {


    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      country: "",
      companyName: "",
      streetAddress: "",
      aptSuite: "",
      city: "",
      state: "",
      phone: "",
      postalCode: "",
      deliveryInstruction: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(form);
      // Add form submission logic here
    };



  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  const steps = [
    {
      icon: (
        <FaUser className={`${currentStep == 1 && "text-red-500"} w-6 h-6`} />
      ),
      title: "Parent and Child Information",
      description: "Add your name, phone number and address.",
      content: <RobogeniusCustomerInformation onNext={handleNext} />,
    },
    {
      icon: (
        <FaCreditCard
          className={`${currentStep == 2 && "text-red-500"} w-6 h-6`}
        />
      ),
      title: "Subscriptions Payment",
      description: "Submit your Payment Information",
      content: <ShopShipping onNext={handleNext} />,
    },
    {
      icon: (
        <FaEye className={`${currentStep == 3 && "text-red-500"} w-6 h-6`} />
      ),
      title: "Order Review",
      description: "Review your order details before final confirmation.",
      content: "This is where you would show the order summary for review.",
    },
  ];

  return (
    <>
    <div className=" flex lg:flex-row items-center justify-center gap-[10vw] mt-10 flex-col bg-yellow">
        {steps.map((step, index) => (
          <Step key={index} {...step} isActive={index <= currentStep} />
        ))}
      </div>
    <div className="container mx-auto px-4 py-8 md:py-16 bg-red-500">
      <div className="bg-muted p-6 rounded-lg mb-8">
        {/* <h2 className="text-xl font-semibold mb-4">
          {steps[currentStep].title}
        </h2> */}
        <p>{steps[currentStep].content}</p>
      </div>
    
      <div className="flex justify-between">
        {/* <button
          className={`${
            currentStep === 0 ? "bg-gray" : "bg-green-400 cursor-pointer"
          } flex p-2 rounded`}
          onClick={handlePrevious}
          disabled={currentStep === 0}
        > */}
        {/* <BiSolidSkipPreviousCircle className="self-center mr-2" /> Previous */}
        {/* </button> */}
        {/* <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button> */}
      </div>
    </div>
    
    
  </>
  );
};
export default Robogeniuscustomercart;
