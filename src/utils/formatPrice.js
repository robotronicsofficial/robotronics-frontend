import {
  getCurrencyConfig,
  selectCurrencyCode,
  useCurrencyStore,
} from "@/stores/currencyStore";

/* Pure formatter — converts a PKR-denominated amount into the requested
   currency string. Use this in non-React code or when the caller knows
   which currency to render. React components should prefer the
   `useFormatMoney` hook so the display reacts to currency changes. */
export const formatMoney = (pkrAmount, code = "PKR") => {
  const n = Number(pkrAmount) || 0;
  const config = getCurrencyConfig(code);
  const target = n * config.rate;
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: config.code,
    maximumFractionDigits: config.fractionDigits,
    minimumFractionDigits: 0,
  }).format(target);
};

/* React hook — returns a stable formatter bound to the user's selected
   currency. Components that render prices use this so a switch in the
   header re-renders every price on the page. */
export const useFormatMoney = () => {
  const code = useCurrencyStore(selectCurrencyCode);
  return (amount) => formatMoney(amount, code);
};
