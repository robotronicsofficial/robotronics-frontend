import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Robogeniuscards = () => {
  const [plans, setPlans] = useState([]);
  const [isYearly, setIsYearly] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/getAllPlans")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        const toggles = {};
        data.forEach(plan => {
          toggles[plan.planName] = false;
        });
        setIsYearly(toggles);
      })
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  return (
    <div className="bg-[#ebe5e2] py-8 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col items-center justify-center">
        
        {/* Responsive Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center">
          Plans for you or your organization
        </h2>

        {/* Toggle Buttons Section (UNCHANGED) */}
        <div className="flex items-center bg-[#D9D9D9] p-3 rounded-full w-fit gap-6">
          <button className="px-14 py-3 bg-orange-400 text-black rounded-full">
            Personal
          </button>
          <button className="px-14 py-3 bg-[#F8F5EE] text-black rounded-full">
            School
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 bg-gray-200 py-10 px-4 w-full mt-6">
          {plans.map((plan) => {
            const isPlanYearly = isYearly[plan.planName] || false;
            const displayPrice = isPlanYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan._id}
                className="w-full lg:w-[26vw] max-w-md h-auto lg:h-[90vh] bg-[#D9D9D9] rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg mb-6 lg:mb-0"
              >
                <h2 className="text-2xl font-bold mb-4 capitalize">{plan.planName}</h2>

                <div className="flex items-center gap-2 mb-4">
                  <span>Billed Monthly</span>
                  <div
                    className={`w-14 h-7 bg-white rounded-full flex items-center cursor-pointer p-1 ${
                      isPlanYearly ? "justify-end" : "justify-start"
                    }`}
                    onClick={() =>
                      setIsYearly((prev) => ({
                        ...prev,
                        [plan.planName]: !prev[plan.planName],
                      }))
                    }
                  >
                    <div className="w-5 h-5 bg-orange-400 rounded-full"></div>
                  </div>
                  <span>Billed Yearly</span>
                </div>

                <h1 className="text-2xl font-bold mb-4">PKR {displayPrice.toLocaleString()}</h1>
                <p className="text-center mb-4 text-wrap">{plan.description}</p>

                <button
                  className="bg-orange-400 text-white py-2 px-6 rounded-lg mb-6"
                  onClick={() => navigate("/Robogeniushome/Register")}
                >
                  Register Now
                </button>

                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="bg-orange-400 text-white py-2 px-6 rounded-lg mt-6"
                  onClick={() => navigate("/Robogeniushome/GiftCourse")}
                >
                  Gift This Program
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default Robogeniuscards;
