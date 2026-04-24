export const getPasswordInputClassName = (isDirty, isValid) => (
  `w-full rounded-xl border bg-gray p-2 ${
    isDirty ? (isValid ? "border-green-500" : "border-red-500") : "border-line"
  }`
);
