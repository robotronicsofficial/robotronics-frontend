const PASSWORD_NUMBER_PATTERN = /\d/;
const PASSWORD_SYMBOL_PATTERN = /[!@#$%^&*(),.?":{}|<>]/;

export const PASSWORD_POLICY_MESSAGE = (
  "Password must be at least 8 characters long and include at least one number and one symbol."
);

export const getPasswordValidationState = (password, confirmPassword = "") => ({
  length: password.length >= 8,
  number: PASSWORD_NUMBER_PATTERN.test(password),
  symbol: PASSWORD_SYMBOL_PATTERN.test(password),
  match: password === confirmPassword && confirmPassword !== "",
});

export const hasValidPasswordRequirements = (validationState) => (
  validationState.length && validationState.number && validationState.symbol
);
