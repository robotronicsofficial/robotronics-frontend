/* PKR price formatter — used across pricing surfaces.
   `formatPKR(2499)` → "PKR 2,499"; pass `withSymbol: false` to omit the
   prefix when rendering currency separately. */
export const formatPKR = (amount, { withSymbol = true } = {}) => {
  const n = Number(amount) || 0;
  const value = n.toLocaleString("en-PK");
  return withSymbol ? `PKR ${value}` : value;
};
