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
  Array.isArray(response?.parent?.children) ? response.parent.children : []
);
