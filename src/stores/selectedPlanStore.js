import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialSelectedPlan = {
  planId: null,
  plan: null,
  price: 0,
  billingCycle: "",
};

export const useSelectedPlanStore = create(
  persist(
    (set) => ({
      ...initialSelectedPlan,
      setSelectedPlan: ({ planId, plan, price, billingCycle }) => {
        set({
          planId,
          plan,
          price,
          billingCycle: ["monthly", "annual"].includes(billingCycle) ? billingCycle : "",
        });
      },
      resetSelectedPlan: () => set(initialSelectedPlan),
    }),
    {
      name: "robotronics.selectedPlan",
      partialize: ({ planId, plan, price, billingCycle }) => ({
        planId,
        plan,
        price,
        billingCycle,
      }),
    },
  ),
);
