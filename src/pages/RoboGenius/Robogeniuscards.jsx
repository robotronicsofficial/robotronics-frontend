import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { fetchPlans, setSubscriptionPlan } from "../../store/plans/planSlice";
import { useSelector, useDispatch } from "react-redux";

const Robogeniuscards = () => {
  const [isYearly, setIsYearly] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { totalPlans, loading, error } = useSelector((state) => state.plans);
  const discountMessage = "Save 60% with annual billing!";

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  useEffect(() => {
    if (totalPlans.length > 0) {
      const toggles = {};
      totalPlans.forEach(plan => {
        toggles[plan.planName] = false;
      });
      setIsYearly(toggles);
    }
  }, [totalPlans]);

  const handleRegisterClick = (plan) => {
    const isPlanYearly = isYearly[plan.planName] || false;
    const price = isPlanYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const billingCycle = isPlanYearly ? 'annual' : 'monthly';
    
    dispatch(setSubscriptionPlan({
      plan: plan.planName,
      price,
      billingCycle
    }));
    
    navigate("/Robogeniushome/Register");
  };
  
  if (loading) return <div>Loading plans...</div>;
  if (error) return <div>Error loading plans: {error}</div>;

  return (
    <div className="bg-[#ebe5e2] py-8 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center poppins-bold">
          Select your Plan
        </h2>

        <div className="flex items-center bg-[#D9D9D9] p-3 rounded-full w-fit gap-6 poppins-light">
          <button className="px-14 py-3 bg-orange-400 text-black rounded-full">
            Personal
          </button>

           <div className="relative group poppins-light">
            <button className="px-14 py-3 bg-[#F8F5EE] text-black rounded-full">
              School
            </button>

            <div className="absolute -top-7 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaClock className="text-orange-400 text-md" />
              <span className="text-lg text-orange-400 poppins-bold">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 bg-gray-200 py-10 px-4 w-full mt-6">
          {totalPlans.map((plan) => {
            const isPlanYearly = isYearly[plan.planName] || false;
            const displayPrice = isPlanYearly ? plan.yearlyPrice : plan.monthlyPrice;

            let discountMessage = "";
            if (!isPlanYearly) {
              // Set discount message based on the plan type
              if (plan.planName === "Basic") {
                discountMessage = "You can save PKR 14,400/- on Yearly Plan!";
              } else if (plan.planName === "Pro") {
                discountMessage = "You can save PKR 28,800/- on Yearly Plan!";
              }
            }
            
            return (
              <div
                key={plan._id}
                className="w-full lg:w-[26vw] max-w-md min-h-[700px] bg-[#D9D9D9] rounded-2xl p-6 flex flex-col shadow-lg mb-6 lg:mb-0 items-center"
              >
                  <h2 className="text-2xl font-bold mb-4 capitalize text-center">{plan.planName}</h2>

                  {/* Billing Toggle */}
                  <div className="flex items-center justify-center gap-4 mb-4 poppins-light">
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

                    <div className="flex flex-col items-center">
                      <span>Billed Yearly</span>
                      <span className="text-xs text-red-600 font-semibold">(60% Off)</span>
                    </div>
                  </div>

                  {/* Price */}
                  <h1 className="text-2xl font-bold mb-4 text-center">
                    PKR {displayPrice.toLocaleString()}/Child
                  </h1>

                    {/* Conditional Message Display */}
                {!isPlanYearly ? (
                  <p className="text-center mb-4 text-wrap text-red-600 font-semibold poppins-bold">
                    {discountMessage}
                  </p>
                ) : (
                  <p className="text-center mb-4 text-wrap text-green-600 poppins-bold">
                    {plan.description}
                  </p>
                )}

                   {/* Register Button */}
                   <button
                    className="bg-orange-400 text-white py-2 px-6 rounded-lg mb-4 w-fit poppins-light"
                    onClick={() => handleRegisterClick(plan)}
                  >
                    Register Now
                  </button>

                 {/* Features */}
                 <ul className="flex-1 space-y-2 text-sm mb-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 poppins-light"
                    >
                      ✅ {feature}
                    </li>
                  ))}
                </ul>

                 {/* Gift Button at Bottom */}
                 <button
                  className="bg-orange-400 text-white py-2 px-6 rounded-lg w-fit poppins-light"
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