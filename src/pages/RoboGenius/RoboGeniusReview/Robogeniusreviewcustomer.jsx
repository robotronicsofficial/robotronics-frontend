import React, { useState } from "react";
import { FaCreditCard, FaEye, FaUser } from "react-icons/fa";
import ShopShipping from "../../../component/shop/shopShipping";
import { useNavigate } from "react-router-dom";
import CustomerOrder from "../../../component/shop/customerOrder";
import YtVideos from "../../../component/course/courseDetailPage/ytVideos";

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

const Robogeniusreviewcustomer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCMethod, setSelectedCMethod] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleConfirmOrder = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSelection = (event) => {
    setSelectedService(event.target.value);
  };

  const handleCMethodSelection = (event) => {
    setSelectedCMethod(event.target.value);
  };

  const steps = [
    {
      icon: <FaUser className={`${currentStep === 0} w-6 h-6`} />,
      title: "Parent and Child Information",
      description: "Add your name, phone number and address.",
    },
    {
      icon: <FaCreditCard className={`${currentStep === 1} w-6 h-6`} />,
      title: "Subscription Payment",
      description: "Choose your payment method and complete the transaction.",
      content: <ShopShipping onNext={() => setCurrentStep(2)} />,
    },
    {
      icon: <FaEye className={`${currentStep === 2} w-6 h-6`} />,
      title: "Order Review",
      description: "Review your order details before final confirmation.",
    },
  ];

  return (
    <div>
      <div className="w-[100vw] flex lg:flex-row items-center justify-center gap-[10vw] mt-10 flex-col">
        {steps.map((step, index) => (
          <Step key={index} {...step} isActive={index <= currentStep} />
        ))}
      </div>

      <div className="lg:flex flex-row p-5 bg-gray mt-10">
        {/* Left Content */}
        <div className="lg:w-2/3">
          <div className="lg:px-10 lg:py-8 py-5 lg:space-y-16 space-y-8">
            <div className="space-y-8">
              <p className="text-4xl text-brown poppins-light poppins-extrabold font-bold">
                REVIEW YOUR DETAILS
              </p>
              <p className="text-sm text-brown">
                Please check before you finalize your order.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 text-lg bg-brown text-white p-6 rounded-lg shadow">
              <div className="font-semibold">Order Code</div>
              <div>#0123_45678</div>
              <div className="font-semibold">Date</div>
              <div>October 19, 2024</div>
              <div className="font-semibold">Total</div>
              <div>PKR,5,000.00</div>
              <div className="font-semibold">Payment method:</div>
              <div>Credit Card</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 text-lg bg-white p-6 rounded-lg shadow">
              <div className="font-semibold">FULL NAME</div>
              <div>HAMZA NOOR</div>
              <div className="font-semibold">PHONE</div>
              <div>+92-123-1234566</div>
              <div className="font-semibold">ADDRESS</div>
              <div>ST #1223</div>
              <div className="font-semibold">ZIP CODE</div>
              <div>54000</div>
              <div className="font-semibold">COURSE</div>
              <div>PYTHON</div>
            </div>

            <button
              type="submit"
              className="w-[20vw] lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-10 px-5"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <CustomerOrder />
      </div>

      <YtVideos />

      {/* Popup */}
      {/* Popup */}
{isPopupVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
    <div className="w-[90vw] max-w-2xl bg-[#fbfbfb] rounded-xl flex items-center justify-center py-6 md:py-10">
      <div className="flex flex-col items-center gap-6 w-[30vw] px-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-4">
            Thank You! 🎉
          </h2>
          <p className="text-center mb-4 text-wrap">
            For Subscribing. You will receive a confirmation email within 24
            working hours.
          </p>
          <div className="flex items-center justify-between my-4 space-x-2">
            {[
              "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
              "https://images.unsplash.com/photo-1525904097878-94fb15835963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
            ].map((url, index) => (
              <div
                key={index}
                className="w-[20vw] h-[20vw] md:w-[6vw] md:h-[6vw] bg-red-400 bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url('${url}')` }}
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-lg bg-gray-100 p-4 rounded-lg">
            <div className="font-semibold">Order Code:</div>
            <div>#0123_45678</div>
            <div className="font-semibold">Date:</div>
            <div>October 19, 2024</div>
            <div className="font-semibold">Total:</div>
            <div>PKR,33,345.00</div>
            <div className="font-semibold">Payment Method:</div>
            <div>Credit Card</div>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-4 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="bg-yellow text-white py-2 px-4 rounded-lg"
          >
            Back to Home Page
          </button>
          <button
            onClick={() => navigate("/Login")}
            className="bg-yellow text-white py-2 px-4 rounded-lg"
          >
            View My Account
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Robogeniusreviewcustomer;
