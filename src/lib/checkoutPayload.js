const trimString = (value) => (typeof value === "string" ? value.trim() : "");

const PAYMENT_LABELS = Object.freeze({
  easypaisa: "EasyPaisa",
  invoice: "Invoice / bank transfer",
});

const buildCheckoutChildPayload = (child) => ({
  checkoutChildKey: child.checkoutChildKey,
  firstName: child.firstName,
  lastName: child.lastName,
  dateOfBirth: child.dateOfBirth,
  gender: child.gender,
});

export const buildParentRegistrationPayload = ({
  currentUser,
  parent,
  children,
  plan,
}) => ({
  parent: {
    ...parent,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
    userId: currentUser._id,
  },
  children: children.map(buildCheckoutChildPayload),
  plan: {
    planId: plan.planId,
    billingCycle: plan.billingCycle,
  },
});

export const getPersistedCheckoutChildren = (response) => (
  Array.isArray(response?.checkoutChildren) ? response.checkoutChildren : []
);

export const getPersistedCheckoutChildIds = (persistedChildren = []) => (
  persistedChildren
    .map((child) => trimString(child.childCode) || trimString(child._id?.toString?.()) || trimString(child._id))
    .filter(Boolean)
);

export const buildSubscriptionCheckoutIntentPayload = ({
  plan,
  childIds,
  payment,
  checkoutReference,
}) => ({
  planId: plan.planId,
  billingCycle: plan.billingCycle,
  childIds,
  payment: {
    method: payment.method,
    label: PAYMENT_LABELS[payment.method] || payment.method,
    email: payment.email,
    contactName: payment.accountName,
    contactPhone: payment.accountPhone,
    reference: payment.reference,
  },
  checkoutReference,
});
