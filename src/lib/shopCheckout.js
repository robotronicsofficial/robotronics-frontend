const STORAGE_KEY = "shop_checkout";
export const SHIPPING_COST = 500;
export const DISCOUNT_RATE = 0.1;

const getStorage = () => (
  typeof window === "undefined" ? null : window.sessionStorage
);

const isBrowser = () => Boolean(getStorage());

export const normalizeCheckoutAddress = (address = {}) => ({
  firstName: address?.firstName || "",
  lastName: address?.lastName || "",
  country: address?.country || "",
  companyName: address?.companyName || "",
  streetAddress: address?.streetAddress || "",
  aptSuite: address?.aptSuite || "",
  city: address?.city || "",
  state: address?.state || "",
  phone: address?.phone || "",
  postalCode: address?.postalCode || "",
  deliveryInstruction: address?.deliveryInstruction || "",
});

export const normalizeCheckoutPayment = (payment = {}) => ({
  shippingService: payment?.shippingService || "TCS Express",
  paymentMethod: payment?.paymentMethod || "Credit Card",
  billingEmail: payment?.billingEmail || "",
  cardholderName: payment?.cardholderName || "",
  accountLast4: String(payment?.accountLast4 || "").slice(-4),
  expiryMonth: String(payment?.expiryMonth || "").slice(0, 2),
  expiryYear: String(payment?.expiryYear || "").slice(0, 4),
});

export const hasCheckoutAddress = (address) =>
  Boolean(
    address?.firstName &&
      address?.lastName &&
      address?.country &&
      address?.streetAddress &&
      address?.city &&
      address?.state &&
      address?.phone &&
      address?.postalCode
  );

export const hasCheckoutPayment = (payment) =>
  Boolean(
    payment?.shippingService &&
      payment?.paymentMethod &&
      payment?.billingEmail &&
      payment?.cardholderName &&
      payment?.accountLast4
  );

export const loadShopCheckout = () => {
  if (!isBrowser()) {
    return { address: null, payment: null };
  }

  try {
    const rawValue = getStorage()?.getItem(STORAGE_KEY);
    if (!rawValue) {
      return { address: null, payment: null };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      address: parsedValue?.address ? normalizeCheckoutAddress(parsedValue.address) : null,
      payment: parsedValue?.payment ? normalizeCheckoutPayment(parsedValue.payment) : null,
    };
  } catch {
    return { address: null, payment: null };
  }
};

export const saveShopCheckout = (partialState = {}) => {
  if (!isBrowser()) {
    return { address: null, payment: null };
  }

  const currentState = loadShopCheckout();
  const nextState = {
    address: partialState.address
      ? normalizeCheckoutAddress(partialState.address)
      : currentState.address,
    payment: partialState.payment
      ? normalizeCheckoutPayment(partialState.payment)
      : currentState.payment,
  };

  getStorage()?.setItem(STORAGE_KEY, JSON.stringify(nextState));
  return nextState;
};

export const clearShopCheckout = () => {
  if (!isBrowser()) {
    return;
  }

  getStorage()?.removeItem(STORAGE_KEY);
};

export const formatShopCurrency = (amount) =>
  `PKR ${Number(amount || 0).toLocaleString()}`;

export const calculateCartSummary = (cart = []) => {
  const subtotal = cart.reduce(
    (runningTotal, item) => runningTotal + (Number(item?.price) || 0) * (Number(item?.quantity) || 0),
    0
  );
  const discount = subtotal * DISCOUNT_RATE;
  const total = subtotal - discount + SHIPPING_COST;

  return {
    subtotal,
    discount,
    shipping: SHIPPING_COST,
    total,
  };
};
