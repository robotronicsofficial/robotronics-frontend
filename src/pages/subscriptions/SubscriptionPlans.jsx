import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPlans, setSubscriptionPlan } from "../../store/plans/planSlice";
import { useSelector, useDispatch } from "react-redux";

const SubscriptionPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { totalPlans, loading, error } = useSelector((state) => state.plans);
  const membership = totalPlans[0] || null;

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const handleRegisterClick = (plan) => {
    const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
    const billingCycle = isAnnual ? "annual" : "monthly";
    
    dispatch(setSubscriptionPlan({
      planId: plan._id,
      plan: plan.planName,
      price,
      billingCycle
    }));
    
    navigate("/subscriptions/register");
  };
  
  if (loading) return <div>Loading membership...</div>;
  if (error) return <div>Error loading membership: {error}</div>;
  if (!membership) return <div>Membership is not available right now.</div>;

  const displayPrice = isAnnual ? membership.yearlyPrice : membership.monthlyPrice;
  const annualSavings = Number(membership.monthlyPrice || 0) * 12 - Number(membership.yearlyPrice || 0);

  return (
    <div className="bg-[#ebe5e2] py-8 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center poppins-bold">
          Course Membership
        </h2>

        <div className="flex justify-center bg-gray-200 py-10 px-4 w-full mt-6">
          <div className="w-full max-w-xl min-h-[560px] bg-[#D9D9D9] rounded-2xl p-6 flex flex-col shadow-lg items-center">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {membership.planName || "Course Membership"}
            </h3>

            <div className="flex items-center justify-center gap-4 mb-4 poppins-light">
              <span>Monthly</span>

              <button
                type="button"
                className={`w-14 h-7 bg-white rounded-full flex items-center p-1 ${
                  isAnnual ? "justify-end" : "justify-start"
                }`}
                onClick={() => setIsAnnual((currentValue) => !currentValue)}
                aria-label="Toggle billing cycle"
              >
                <span className="block w-5 h-5 bg-orange-400 rounded-full" />
              </button>

              <span>Annual</span>
            </div>

            <h4 className="text-2xl font-bold mb-4 text-center">
              PKR {Number(displayPrice || 0).toLocaleString()}/Child
            </h4>

            <p className="text-center mb-4 text-wrap text-[#362D2C] poppins-light">
              {membership.description}
            </p>
            {isAnnual && annualSavings > 0 ? (
              <p className="text-center mb-4 text-wrap text-green-700 font-semibold poppins-bold">
                Save PKR {annualSavings.toLocaleString()} with annual billing.
              </p>
            ) : null}

            <button
              className="bg-orange-400 text-white py-2 px-6 rounded-lg mb-4 w-fit poppins-light"
              onClick={() => handleRegisterClick(membership)}
            >
              Start Membership
            </button>

            <ul className="flex-1 space-y-2 text-sm mb-4">
              {(membership.features || []).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 poppins-light"
                >
                  <span className="font-bold text-orange-500">+</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
