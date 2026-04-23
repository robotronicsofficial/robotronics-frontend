import { ensureArray, normalizeChildProfile, normalizeParentRecord } from "./robogenius";

const STORAGE_KEY = "robogenius_checkout";
const DEFAULT_PAYMENT_METHOD = "credit-card";

const getStorage = () => (
  typeof window === "undefined" ? null : window.sessionStorage
);

const isBrowser = () => Boolean(getStorage());

const buildRandomSegment = () => {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0].toString(36).toUpperCase().slice(0, 6).padStart(6, "0");
  }

  return Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0");
};

const createOrderCode = () => `RG-${buildRandomSegment()}`;

const normalizePlan = (plan = {}) => ({
  name: plan?.name || "",
  price: Number(plan?.price) || 0,
  billingCycle: plan?.billingCycle || "",
});

export const getCheckoutPaymentLabel = (method = DEFAULT_PAYMENT_METHOD) => {
  switch (method) {
    case "easypaisa":
      return "EasyPaisa";
    case "bank-transfer":
      return "Bank Transfer";
    case "credit-card":
    default:
      return "Credit Card";
  }
};

export const normalizeCheckoutPayment = (payment = {}) => {
  const method = payment?.method || DEFAULT_PAYMENT_METHOD;

  return {
    method,
    label: getCheckoutPaymentLabel(method),
    email: payment?.email || "",
    cardholderName: payment?.cardholderName || "",
    cardLast4: String(payment?.cardLast4 || "").replace(/\D/g, "").slice(-4),
    expiryMonth: String(payment?.expiryMonth || "").replace(/\D/g, "").slice(0, 2),
    expiryYear: String(payment?.expiryYear || "").replace(/\D/g, "").slice(0, 4),
  };
};

const normalizeChildren = (children = []) =>
  ensureArray(children).map((child) => ({
    ...normalizeChildProfile(child),
    roboChildId: child?.roboChildId || "",
    plan: normalizePlan(child?.plan),
  }));

export const buildRobogeniusCheckout = (checkout = {}) => {
  const normalizedParent = normalizeParentRecord(checkout?.parent || {});
  const normalizedChildren = normalizeChildren(
    checkout?.children?.length ? checkout.children : normalizedParent.children
  );
  const normalizedPlan = normalizePlan(checkout?.plan || normalizedChildren[0]?.plan);
  const normalizedPayment = normalizeCheckoutPayment(checkout?.payment);

  return {
    orderCode: checkout?.orderCode || createOrderCode(),
    orderDate: checkout?.orderDate || new Date().toISOString(),
    status: checkout?.status || "pending",
    parent: {
      ...normalizedParent,
      children: normalizedChildren,
    },
    children: normalizedChildren,
    plan: normalizedPlan,
    payment: normalizedPayment,
    totalChildren: normalizedChildren.length,
    totalPrice: normalizedChildren.length * normalizedPlan.price,
  };
};

export const loadRobogeniusCheckout = () => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = getStorage()?.getItem(STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    return buildRobogeniusCheckout(JSON.parse(rawValue));
  } catch {
    return null;
  }
};

export const saveRobogeniusCheckout = (checkout) => {
  if (!isBrowser()) {
    return null;
  }

  const normalizedCheckout = buildRobogeniusCheckout(checkout);
  getStorage()?.setItem(STORAGE_KEY, JSON.stringify(normalizedCheckout));
  return normalizedCheckout;
};

export const updateRobogeniusCheckout = (partialCheckout = {}) => {
  const currentCheckout = loadRobogeniusCheckout();
  return saveRobogeniusCheckout({
    ...currentCheckout,
    ...partialCheckout,
    parent: {
      ...(currentCheckout?.parent || {}),
      ...(partialCheckout?.parent || {}),
    },
    payment: {
      ...(currentCheckout?.payment || {}),
      ...(partialCheckout?.payment || {}),
    },
    children: partialCheckout?.children || currentCheckout?.children || [],
    plan: {
      ...(currentCheckout?.plan || {}),
      ...(partialCheckout?.plan || {}),
    },
  });
};

export const clearRobogeniusCheckout = () => {
  if (isBrowser()) {
    getStorage()?.removeItem(STORAGE_KEY);
  }
};

export const formatCheckoutCurrency = (amount) =>
  `PKR ${Number(amount || 0).toLocaleString()}`;
