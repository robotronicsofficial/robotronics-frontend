import { create } from "zustand";
import { persist } from "zustand/middleware";

/* PKR is the base because every price in the database is stored as a PKR
   integer. Rates here are conversion factors from PKR to the target —
   `1 PKR ≈ rate × target`. Refresh quarterly; if these go stale by more
   than ~5% we should switch to a live FX feed. */
export const SUPPORTED_CURRENCIES = [
  { code: "PKR", label: "Pakistani Rupee", rate: 1, fractionDigits: 0 },
  { code: "USD", label: "US Dollar", rate: 0.0036, fractionDigits: 2 },
  { code: "AED", label: "UAE Dirham", rate: 0.0132, fractionDigits: 2 },
  { code: "GBP", label: "British Pound", rate: 0.0028, fractionDigits: 2 },
  { code: "EUR", label: "Euro", rate: 0.0033, fractionDigits: 2 },
];

const DEFAULT_CODE = "PKR";

export const getCurrencyConfig = (code) =>
  SUPPORTED_CURRENCIES.find((c) => c.code === code) ?? SUPPORTED_CURRENCIES[0];

export const useCurrencyStore = create(
  persist(
    (set) => ({
      code: DEFAULT_CODE,
      setCode: (code) => {
        if (SUPPORTED_CURRENCIES.some((c) => c.code === code)) {
          set({ code });
        }
      },
    }),
    { name: "robotronics-currency" },
  ),
);

export const selectCurrencyCode = (state) => state.code;
