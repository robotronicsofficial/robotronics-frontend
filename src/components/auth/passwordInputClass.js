export const getPasswordInputClassName = (isDirty, isValid) => (
  `w-full rounded-xl border bg-background p-2 ${
    isDirty ? (isValid ? "border-success/20" : "border-destructive/20") : "border-border"
  }`
);
