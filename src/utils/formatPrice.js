export const formatMoney = (pkrAmount) => {
  const n = Number(pkrAmount) || 0;
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
};

export const useFormatMoney = () => formatMoney;
