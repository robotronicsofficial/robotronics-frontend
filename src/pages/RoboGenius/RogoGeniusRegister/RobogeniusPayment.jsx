import { useNavigate } from "react-router-dom";
import Shippingpencilalt from "../../../assets/images/Shippingpencilalt.svg";
import pencilaltBlack from "../../../assets/images/pencilaltBlack.svg";
import mastercard from "../../../assets/images/mastercard.svg";
import robo from "../../../assets/child.png";
import { useSelector } from "react-redux";

const RobogeniusPayment = ({ onNext, savedChildren = [] }) => {
  const navigate = useNavigate();

  const { plan, price, billingCycle } = useSelector((state) => state.plans);

  const totalPrice = savedChildren.length * price;

  const handleCompletePayment = () => {
    navigate("/Dashboard/ChildProfile");
  };


  return (
    <div className="lg:flex flex-row bg-gray">
      {/* Left Section - Registration Review */}
      <div className="flex flex-col lg:w-2/5">
        <div className="lg:p-14 p-5 lg:space-y-16 space-y-8">
          <div className="lg:space-y-8 space-y-4">
            <p className="lg:text-4xl poppins-bold text-brown">YOUR REGISTRATION</p>
            <p className="font-lato font-medium text-base leading-5 text-[#7E7F7C]">
              Review all the Registered Children
            </p>
          </div>

          {/* Saved Children Cards */}
          {savedChildren.length > 0 ? (
            savedChildren.map((child, index) => (
              <div key={index} className="lg:space-y-5 space-y-2 poppins-extralight">
                <div className="flex flex-row space-x-3">
                  <img className="lg:h-24 lg:w-24" src={robo} alt="img" />
                  <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
                    <p className="text-wrap">
                      <span className="font-bold">Plan:</span> <span className="font-normal">{plan}</span>
                    </p>
                    <p className="text-wrap">
                      <span className="font-bold">Name:</span>{" "}
                      <span className="font-normal">{child.firstName} {child.lastName}</span>
                    </p>
                    <p className="text-wrap">
                      <span className="font-bold">Payment Plan:</span>{" "}
                      <span className="font-normal">{billingCycle}</span>
                    </p>
                  </div>
                  <p className="text-wrap">
                    <span className="font-bold">Price:</span>{" "}
                    <span className="font-normal">{price?.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="lg:space-y-5 space-y-2 poppins-extralight">
              <p className="font-poppins font-medium text-[16px] leading-[20px] tracking-[0] text-[#7E7F7C]">
                No children registered yet
              </p>
            </div>
          )}

          <div className="h-0 border border-[#D4D4D4]"></div>

          {/* Payment Summary */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-[#7E7F7C] font-lato text-base">Number of Children</p>
              <p className="font-lato text-[20px]">
                {savedChildren.length}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#7E7F7C] font-lato text-base">Price per Child</p>
              <p className="font-lato text-[20px]">
                PKR {price?.toLocaleString() || '0'}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#7E7F7C] font-lato text-base">Total Price</p>
              <p className="font-lato text-[20px] font-extrabold">
                PKR {totalPrice?.toLocaleString() || '0'}
              </p>
            </div>
          </div>

          <div className="h-0 border border-[#D4D4D4]"></div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="px-1">
        <div className="h-full w-0 border border-[#D4D4D4] ml-8"></div>
      </div>

      {/* Right Section - Payment Information */}
      <div className="lg:w-3/5">
        <div className="lg:p-14 p-5 lg:space-y-16 space-y-8">
          {/* Shipping Information */}
          <div className="lg:space-y-8 space-y-4">
            <p className="text-3xl text-brown poppins-light poppins-extrabold font-bold">
              SHIPPING INFORMATION
            </p>
            <p className="text-sm text-brown">
              Please check before you finalize your order
            </p>
          </div>
          
          {/* Shipping Card */}
          <div className="bg-brown">
            <div className="p-3 space-y-4">
              <div className="flex flex-row justify-between">
                <p className="text-l poppins-extrabold text-white">Shoaib Ali</p>
                <a href="">
                  <img src={Shippingpencilalt} alt="" />
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm poppins-light text-white">(480) 555-0103</p>
                <p className="text-sm poppins-light text-white">
                  2972 H Block Johar Town Lahore
                </p>
              </div>
              <div className="h-0 w-full border border-white"></div>
              <div className="flex flex-row">
                <div className="flex-1">
                  <p className="font-bold text-white poppins-extrabold text-l">FedEx</p>
                  <p className="text-white text-wrap poppins-light text-sm">
                    Estimated delivery time: Jul 20 - Aug 03
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white poppins-light text-right">Free shipping</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full h-0 border border-[#D4D4D4]"></div>
          
          {/* Payment Method */}
          <div className="lg:space-y-8 space-y-8">
            <p className="text-3xl text-brown poppins-bold font-bold">PAYMENT METHOD</p>
            <p className="text-sm text-brown poppins-semibold">
              Please check before you finalize your order
            </p>
          </div>
          
          {/* Payment Card */}
          <div className="bg-white flex flex-row justify-between p-5">
            <div className="flex flex-row">
              <img src={mastercard} alt="" />
              <div className="flex flex-col lg:px-4 px-2">
                <p className="text-brown text-l poppins-regular font-bold">Credit Card</p>
                <p className="text-brown poppins-extralight text-sm">**** 7282 - Expired 8/2022</p>
              </div>
            </div>
            <div>
              <img src={pencilaltBlack} alt="" />
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              type="button"
              className="text-center lg:text-xl text-sm poppins-bold text-[#F5AB34] bg-[#362D2C] py-2 lg:px-20 px-5"
              onClick={handleCompletePayment}
              >
              COMPLETE PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobogeniusPayment;