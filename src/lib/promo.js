/* Single source for promo windows so the countdown never disagrees with
   itself across pages. End of the current calendar month is the honest
   default — a real cadence the marketing team can write campaigns
   against, not a perpetual reset. */
export const getCurrentMonthEndIso = () => {
  const now = new Date();
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );
  return end.toISOString();
};
