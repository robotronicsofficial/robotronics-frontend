import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Robogeniuscards = () => {
  const [isBasicYearly, setIsBasicYearly] = useState(false);
  const [isProYearly, setIsProYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#ebe5e2] py-6 px-24">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-semibold mb-8">
          Plans for you or your organization
        </h2>
        <div className="flex items-center bg-[#D9D9D9] p-3 rounded-full w-fit gap-6">
          <button className="px-14 py-3 bg-orange-400 text-black rounded-full">
            Personal
          </button>
          <button className="px-14 py-3 bg-[#F8F5EE] text-black rounded-full">
            School
          </button>
        </div>

        <div className="flex justify-center items-center gap-10 bg-gray-200 py-10">
          {/* Basic Plan */}
          <div className="w-[26vw] h-[90vh] bg-[#D9D9D9] rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Basic</h2>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2 mb-4">
              <span>Billed Monthly</span>
              <div
                className={`w-14 h-7 bg-white rounded-full flex items-center cursor-pointer p-1 ${
                  isBasicYearly ? "justify-end" : "justify-start"
                }`}
                onClick={() => setIsBasicYearly(!isBasicYearly)}
              >
                <div className="w-5 h-5 bg-orange-400 rounded-full"></div>
              </div>
              <span>Billed Yearly</span>
            </div>

            <p className="text-center mb-4 text-wrap">
              Learn a single topic or skill and earn a credential
            </p>

            {/* Register Button */}
            <button
              className="bg-orange-400 text-white py-2 px-6 rounded-lg mb-6"
              onClick={() => navigate("/Robogeniushome/Register")}
            >
              Register Now
            </button>

            {/* Features */}
            <ul className="space-y-2 text-sm">
              {Array(7)
                .fill("Quiz-based Assessment")
                .map((item, index) => (
                  <li key={index} className="flex items-center ">
                    ✅ {item}
                  </li>
                ))}
            </ul>

            {/* Gift Program Button */}
            <button
              className="bg-orange-400 text-white py-2 px-6 rounded-lg mt-6"
              onClick={() => navigate("/Robogeniushome/GiftCourse")}
            >
              Gift This Program
            </button>
          </div>

          {/* Pro Plan */}
          <div className="w-[26vw] h-[90vh] bg-[#D9D9D9] rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Pro</h2>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2 mb-4">
              <span>Billed Monthly</span>
              <div
                className={`w-14 h-7 bg-white rounded-full flex items-center cursor-pointer p-1 ${
                    isProYearly ? "justify-end" : "justify-start"
                }`}
                onClick={() => setIsProYearly(!isProYearly)}
              >
                <div className="w-5 h-5 bg-orange-400 rounded-full"></div>
              </div>
              <span>Billed Yearly</span>
            </div>

            <p className="text-center mb-4 text-wrap">
              Learn a single topic or skill and earn a credential
            </p>

            {/* Register Button */}
            <button
              className="bg-orange-400 text-white py-2 px-6 rounded-lg mb-6"
              onClick={() => navigate("/Robogeniushome/Register")}
            >
              Register Now
            </button>

            {/* Features */}
            <ul className="space-y-2 text-sm">
              {Array(7)
                .fill("Quiz-based Assessment")
                .map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    ✅ {item}
                  </li>
                ))}
            </ul>

            {/* Gift Program Button */}
            <button
              className="bg-orange-400 text-white py-2 px-6 rounded-lg mt-6"
              onClick={() => navigate("/Robogeniushome/GiftCourse")}
            >
              Gift This Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robogeniuscards;
