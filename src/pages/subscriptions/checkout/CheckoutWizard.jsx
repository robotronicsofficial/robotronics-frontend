import { useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import {
  CHECKOUT_PATH,
  buildCheckoutSearch,
  getStepFromSearch,
} from "@/components/checkout/checkoutNav";
import {
  selectHasPlan,
  selectIsChildrenComplete,
  selectIsParentComplete,
  selectIsPaymentComplete,
  useCheckoutStore,
} from "@/stores/checkoutStore";
import PlanStep from "./steps/PlanStep";
import KidsStep from "./steps/KidsStep";
import ParentStep from "./steps/ParentStep";
import PaymentStep from "./steps/PaymentStep";
import ConfirmStep from "./steps/ConfirmStep";
import WelcomeStep from "./steps/WelcomeStep";

const CheckoutWizard = () => {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const requestedStep = getStepFromSearch(search);
  const explicitStep = Boolean(search?.step);
  const setStep = useCheckoutStore((state) => state.setStep);
  const reset = useCheckoutStore((state) => state.reset);
  const status = useCheckoutStore((state) => state.status);

  const hasPlan = useCheckoutStore(selectHasPlan);
  const childrenComplete = useCheckoutStore(selectIsChildrenComplete);
  const parentComplete = useCheckoutStore(selectIsParentComplete);
  const paymentComplete = useCheckoutStore(selectIsPaymentComplete);
  const persistedChildren = useCheckoutStore((state) => state.persistedChildren);
  const hasPersistedChildren = persistedChildren.length > 0;

  /* Step gating — quietly redirect users who deep-link past prerequisites
     instead of letting them land on a step the store can't fulfill. Order
     matters: `welcome` short-circuits on `status === "active"`; otherwise
     each step requires the previous step's data to be present. */
  const shouldStartFreshCheckout =
    (status === "submitted" || status === "active") && requestedStep !== "welcome";

  const resolvedStep = (() => {
    if (shouldStartFreshCheckout) return "plan";
    if (status === "submitted" || status === "active") return "welcome";
    if (requestedStep === "welcome" && status !== "submitted" && status !== "active") return "confirm";
    if (requestedStep === "confirm" && !paymentComplete) return "payment";
    if ((requestedStep === "payment" || requestedStep === "confirm") && (!parentComplete || !hasPersistedChildren)) return "parent";
    if ((requestedStep === "parent" || requestedStep === "payment" || requestedStep === "confirm") && !childrenComplete) return "kids";
    if (requestedStep !== "plan" && !hasPlan) return "plan";
    /* User landed on /subscriptions/checkout with no `step` param and a
       plan already chosen — skip past the plan picker so they don't have
       to re-choose. They can still click "Back to plans" if they want. */
    if (!explicitStep && hasPlan) return "kids";
    return requestedStep;
  })();

  useEffect(() => {
    if (shouldStartFreshCheckout) {
      reset();
      if (requestedStep !== "plan") {
        navigate({
          to: CHECKOUT_PATH,
          search: buildCheckoutSearch("plan"),
          replace: true,
        });
        return;
      }
      setStep("plan");
      return;
    }

    if (resolvedStep !== requestedStep) {
      navigate({
        to: CHECKOUT_PATH,
        search: buildCheckoutSearch(resolvedStep),
        replace: true,
      });
      return;
    }
    setStep(resolvedStep);
  }, [resolvedStep, requestedStep, navigate, setStep, reset, shouldStartFreshCheckout]);

  switch (resolvedStep) {
    case "kids":
      return <KidsStep />;
    case "parent":
      return <ParentStep />;
    case "payment":
      return <PaymentStep />;
    case "confirm":
      return <ConfirmStep />;
    case "welcome":
      return <WelcomeStep />;
    case "plan":
    default:
      return <PlanStep />;
  }
};

export default CheckoutWizard;
