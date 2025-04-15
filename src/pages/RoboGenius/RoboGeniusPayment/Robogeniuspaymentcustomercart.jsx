import React, { useState } from "react";
import { FaCreditCard, FaEye, FaShoppingBag, FaUser } from "react-icons/fa";
import ShopShipping from "../../../component/shop/shopShipping";
import { BiSkipPrevious, BiSolidSkipPreviousCircle } from "react-icons/bi";
import mastercard from "../../../assets/images/mastercard.svg";
import CustomerOrder from "../../../component/shop/customerOrder";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const Robogeniuspaymentcustomercart = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCMethod, setSelectedCMethod] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSelection = (event) => {
    setSelectedService(event.target.value);
  };

  const handleCMethodSelection = (event) => {
    setSelectedCMethod(event.target.value);
  };

  const steps = [
    {
      icon: (
        <FaUser className={`${currentStep == 1 && "text-red-500"} w-6 h-6`} />
      ),
      title: "Parent and Child Information",
      description: "Add your name, phone number and address.",
      // content: <RobogeniusCustomerInformation onNext={handleNext} />,
    },
    {
      icon: (
        <FaCreditCard
          className={`${currentStep == 2 && "text-red-500"} w-6 h-6`}
        />
      ),
      title: "Subscription Payment",
      description: "Choose your payment method and complete the transaction.",
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
    <div>
      <div className=" flex lg:flex-row items-center justify-center gap-[10vw] mt-10 flex-col">
        {steps.map((step, index) => (
          <Step key={index} {...step} isActive={index <= currentStep} />
        ))}
      </div>

      <div className="lg:flex flex-row p-5 bg-gray mt-10 bg-green-400">
        {/* left */}
        <div
          className="lg:w-2/3"
          data-aos="fade-right"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          {/* shipping services */}
          <div className="lg:px-10 px-4 space-y-16 mt-8 ">
            <div className="space-y-8">
              <p className="text-4xl text-brown poppins-bold font-bold">
                SUBSCRIPTIONS PAYMENT
              </p>
              <p className="text-sm text-brown poppins-light font-bold">
                Kindly read and accept the following
              </p>
              {/* Checkbox Section */}
              <label className="flex items-center  space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-brown poppins-light pt-2">
                  I agree that my provided payment method will be charged on a{" "}
                  <strong>monthly basis</strong>.
                </span>
              </label>
            </div>
          </div>
          {/* Payment method */}
          <div className="lg:p-10 p-4 space-y-5">
            <p className="text-4xl text-brown font-bold">Payment method</p>
            <p className="text-sm text-wrap poppins-light text-brown font-bold">
              You can use all Credit card services. We can accept Visa and
              MasterCard.
            </p>
            {/* Payment method */}
            <div className="flex lg:flex-row flex-col justify-between">
              {/* Credit card */}
              <div
                className={`p-5 flex flex-row items-center justify-between border border-lightgray ${
                  selectedCMethod === "Credit card"
                    ? "bg-brown text-white"
                    : "bg-gray text-brown"
                }`}
                onClick={() => setSelectedCMethod("Credit card")}
              >
                <input
                  type="radio"
                  value="Credit card"
                  name="Payment method"
                  checked={selectedCMethod === "Credit card"}
                  onChange={handleCMethodSelection}
                />
                <div className="flex flex-col p-2 space-y-2">
                  <span className="flex justify-between w-full">
                    <p className="space-y-2">Credit Card</p>
                    <img
                      src={mastercard}
                      className="h-6 w-6"
                      alt="mastercard"
                    />
                  </span>
                  <p className="text-wrap poppins-light text-sm space-y-2">
                    You can use all Credit card services. We can accept Visa and
                    MasterCard.
                  </p>
                </div>
              </div>
              {/* EASY PAISA */}
              <div
                className={`p-5 flex flex-row items-center justify-between border border-lightgray ${
                  selectedCMethod === "easy paisa"
                    ? "bg-brown text-white"
                    : "bg-gray text-brown"
                }`}
                onClick={() => setSelectedCMethod("easy paisa")}
              >
                <input
                  type="radio"
                  value="easy paisa"
                  name="Payment method"
                  checked={selectedCMethod === "easy paisa"}
                  onChange={handleCMethodSelection}
                />
                <div className="flex flex-col p-2 space-y-2">
                  <span className="flex justify-between w-full">
                    <p className="space-y-2">Easy Paisa</p>
                    <img
                      src={mastercard}
                      className="h-6 w-6"
                      alt="mastercard"
                    />
                  </span>
                  <p className="text-wrap poppins-light text-sm space-y-2">
                    You can use all Credit card services. We can accept Visa and
                    MasterCard.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:px-10 px-4 space-y-4 lg:pt-20 pt-10 flex">
            <div className="lg:flex flex-row ">
              {/* left side */}
              <form className="lg:space-y-8 space-y-4 lg:mr-5">
                {/* Your email */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-line appearance-none dark:text-brown dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium poppins-light absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Your email
                  </label>
                </div>
                {/* Month */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="floating_Month"
                    id="floating_Month"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-line appearance-none dark:text-brown dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_Month"
                    className="peer-focus:font-medium poppins-light absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Month
                  </label>
                </div>
              </form>
              {/* right side */}
              <form className="max-w-md mx-auto space-y-4 lg:space-y-8">
                {/* Card number */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="floating_number"
                    id="floating_number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-lineappearance-none dark:text-brown dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_number"
                    className="peer-focus:font-medium poppins-light absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Card number
                  </label>
                </div>
                {/* Year & CVC */}
                <div className="grid lg:grid-cols-2 lg:gap-6">
                  {/* Year */}
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="floating_Year"
                      id="floating_Year"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-line appearance-none dark:text-brown dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_Year"
                      className="peer-focus:font-medium poppins-light absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Year
                    </label>
                  </div>
                  {/* CVC */}
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="floating_CVC"
                      id="floating_CVC"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-lineappearance-none dark:text-brown dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      required
                    />
                    <label
                      htmlFor="floating_CVC"
                      className="peer-focus:font-medium poppins-light absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      CVC
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="px-1">
          <div
            className="h-full w-0 border border-lightgray"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="4000"
          ></div>
        </div>
        {/* Right sidebar */}

        <CustomerOrder onNext={handleOpenPopup} />
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform scale-95 animate-fadeIn relative w-[30vw] py-10">
              {/* Close Button (X) */}
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                onClick={handleClosePopup}
              >
                &times;
              </button>

              {/* Heart Icon */}
              <div className="flex flex-col  items-center">
                <FaRegHeart className="text-yellow text-[4vw]" />

                {/* Message */}

                <p className="text-4xl font-medium-center my-8 ">Thank You</p>

                <p className="text-xl text-[#807D7E] mt-4 mb-6 text-wrap text-center">
                  You will receive a confirmation email within 24 working hours.
                </p>

                {/* Home Button */}
                <button
                  className="mt-4 px-4 py-2 bg-[#FFA500] text-white rounded hover:bg-[#FF8C00] transition duration-200"
                  onClick={() => navigate("/Dashboard/userInfo")}
                >
                  HOME
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <YtVideos />
    </div>
  );
};

export default Robogeniuspaymentcustomercart;
