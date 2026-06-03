import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CHECKOUT_STEPS } from "@/lib/checkoutFlow";

const EMPTY_CHILD = {
  checkoutChildKey: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
};

const EMPTY_PARENT = {
  streetAddress: "",
  aptSuite: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const EMPTY_PAYMENT = {
  method: "easypaisa",
  accountName: "",
  accountPhone: "",
  email: "",
  reference: "",
};

const createChildKey = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `child-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const createEmptyChild = () => ({
  ...EMPTY_CHILD,
  checkoutChildKey: createChildKey(),
});

const initialState = {
  step: "plan",
  plan: null,                     // { planId, name, price, billingCycle, courseAccess, maxQuizAttemptsPerDay }
  children: [createEmptyChild()], // always at least one row
  parent: { ...EMPTY_PARENT },    // billing address — name/email/phone come from currentUser
  payment: { ...EMPTY_PAYMENT },
  orderCode: null,
  status: "draft",                // 'draft' | 'submitted' | 'active'
  // Persisted children records returned by saveParent (have _id, childCode)
  persistedChildren: [],
};

const buildOrderCode = () => {
  const segment = (typeof crypto !== "undefined" && crypto.getRandomValues)
    ? crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().slice(0, 6).padStart(6, "0")
    : Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0");
  return `SUB-${segment}`;
};

export const useCheckoutStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      setPlan: (plan) => {
        const next = plan
          ? {
              planId: plan.planId || plan._id || plan.id,
              name: plan.name || plan.planName || "",
              price: Number(plan.price ?? plan.monthlyPrice ?? 0),
              billingCycle: plan.billingCycle || "monthly",
              courseAccess: plan.courseAccess || "all",
              maxQuizAttemptsPerDay: plan.maxQuizAttemptsPerDay,
            }
          : null;
        set({ plan: next });
      },

      setChildren: (children) =>
        set({
          children: children.length > 0
            ? children.map((child) => ({
                ...EMPTY_CHILD,
                ...child,
                checkoutChildKey: child.checkoutChildKey || createChildKey(),
              }))
            : [createEmptyChild()],
        }),

      updateChild: (index, patch) =>
        set((state) => {
          const next = [...state.children];
          next[index] = { ...next[index], ...patch };
          return { children: next };
        }),

      addChild: () =>
        set((state) => ({ children: [...state.children, createEmptyChild()] })),

      removeChild: (index) =>
        set((state) => {
          if (state.children.length <= 1) return {};
          const next = [...state.children];
          next.splice(index, 1);
          return { children: next };
        }),

      setParent: (patch) =>
        set((state) => ({ parent: { ...state.parent, ...patch } })),

      setPayment: (patch) =>
        set((state) => ({ payment: { ...state.payment, ...patch } })),

      setPersistedChildren: (children) => set({ persistedChildren: children }),

      ensureOrderCode: () => {
        if (get().orderCode) return get().orderCode;
        const code = buildOrderCode();
        set({ orderCode: code });
        return code;
      },

      setStatus: (status) => set({ status }),

      reset: () => set({ ...initialState, children: [createEmptyChild()] }),
    }),
    {
      name: "robotronics.checkout",
      storage: createJSONStorage(() => sessionStorage),
      version: 2,
      migrate: (persistedState) => ({
        ...initialState,
        ...persistedState,
        children: Array.isArray(persistedState?.children) && persistedState.children.length
          ? persistedState.children.map((child) => ({
              ...EMPTY_CHILD,
              ...child,
              checkoutChildKey: child.checkoutChildKey || createChildKey(),
            }))
          : [createEmptyChild()],
        payment: {
          ...EMPTY_PAYMENT,
          ...persistedState?.payment,
          method: persistedState?.payment?.method === "credit-card"
            ? EMPTY_PAYMENT.method
            : persistedState?.payment?.method || EMPTY_PAYMENT.method,
        },
      }),
      partialize: (state) => ({
        step: state.step,
        plan: state.plan,
        children: state.children,
        parent: state.parent,
        // Don't persist payment — sensitive
        orderCode: state.orderCode,
        status: state.status,
        persistedChildren: state.persistedChildren,
      }),
    },
  ),
);

/* Selectors */

export const selectTotalChildren = (state) => state.children.length;

export const selectTotalPrice = (state) =>
  (state.plan?.price || 0) * state.children.length;

export const selectHasPlan = (state) =>
  Boolean(state.plan?.planId && state.plan?.billingCycle);

export const selectIsChildrenComplete = (state) =>
  state.children.length > 0 &&
  state.children.every(
    (child) => child.firstName && child.lastName && child.dateOfBirth && child.gender,
  );

export const selectIsParentComplete = (state) => {
  const p = state.parent;
  return Boolean(p.streetAddress && p.city && p.state && p.postalCode && p.country);
};

export const selectIsPaymentComplete = (state) => {
  const pay = state.payment;
  return Boolean(pay.method && pay.accountName && pay.email);
};
