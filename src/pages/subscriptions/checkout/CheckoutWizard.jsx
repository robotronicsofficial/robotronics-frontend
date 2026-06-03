import { useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import {
  CHECKOUT_PATH,
  buildCheckoutSearch,
  getStepFromSearch,
  resolveCheckoutStep,
} from "@/lib/checkoutFlow";
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

  const { step: resolvedStep, shouldReset } = resolveCheckoutStep({
    requestedStep,
    explicitStep,
    status,
    hasPlan,
    childrenComplete,
    parentComplete,
    paymentComplete,
    hasPersistedChildren,
  });

  useEffect(() => {
    if (shouldReset) {
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
  }, [resolvedStep, requestedStep, navigate, setStep, reset, shouldReset]);

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
