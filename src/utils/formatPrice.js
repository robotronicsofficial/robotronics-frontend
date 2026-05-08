import {
  getCurrencyConfig,
  selectCurrencyCode,
  useCurrencyStore,
} from "@/stores/currencyStore";

export const formatMoney = (pkrAmount, code = "PKR") => {
  const n = Number(pkrAmount) || 0;
  const config = getCurrencyConfig(code);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: config.code,
    maximumFractionDigits: config.fractionDigits,
    minimumFractionDigits: 0,
  }).format(n * config.rate);
};

export const useFormatMoney = () => {
  const code = useCurrencyStore(selectCurrencyCode);

  return (amount) => formatMoney(amount, code);
};
