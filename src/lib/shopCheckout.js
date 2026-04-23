import { hasShippableCommerceItems } from "./commerceItems";

const STORAGE_KEY = "shop_checkout";
export const SHIPPING_COST = 500;
export const DISCOUNT_RATE = 0.1;

const getStorage = () => (
  typeof window === "undefined" ? null : window.sessionStorage
);

const isBrowser = () => Boolean(getStorage());

export const normalizeCheckoutNote = (note = "") => (
  typeof note === "string" ? note : ""
);

export const normalizeCheckoutCustomer = (customer = {}) => ({
  firstName: customer?.firstName || "",
  lastName: customer?.lastName || "",
  phone: customer?.phone || "",
});

export const normalizeCheckoutAddress = (address = {}) => ({
  addressId: address?.addressId || address?._id || "",
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
  notes: address?.notes || "",
});

export const normalizeCheckoutPayment = (payment = {}) => ({
  shippingService: payment?.shippingService || "",
  paymentMethod: payment?.paymentMethod || "Credit Card",
  billingEmail: payment?.billingEmail || "",
  cardholderName: payment?.cardholderName || "",
  accountLast4: String(payment?.accountLast4 || "").slice(-4),
  expiryMonth: String(payment?.expiryMonth || "").slice(0, 2),
  expiryYear: String(payment?.expiryYear || "").slice(0, 4),
});

export const hasCheckoutCustomer = (customer) =>
  Boolean(
    customer?.firstName &&
      customer?.lastName &&
      customer?.phone
  );

export const hasCheckoutAddress = (address, { requiresShipping = true } = {}) =>
  !requiresShipping ||
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

export const hasCheckoutPayment = (payment, { requiresShipping = true } = {}) =>
  Boolean(
    (!requiresShipping || payment?.shippingService) &&
      payment?.paymentMethod &&
      payment?.billingEmail &&
      payment?.cardholderName &&
      payment?.accountLast4
  );

export const loadShopCheckout = () => {
  if (!isBrowser()) {
    return { customer: null, address: null, payment: null, note: "" };
  }

  try {
    const rawValue = getStorage()?.getItem(STORAGE_KEY);
    if (!rawValue) {
      return { customer: null, address: null, payment: null, note: "" };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      customer: parsedValue?.customer ? normalizeCheckoutCustomer(parsedValue.customer) : null,
      address: parsedValue?.address ? normalizeCheckoutAddress(parsedValue.address) : null,
      payment: parsedValue?.payment ? normalizeCheckoutPayment(parsedValue.payment) : null,
      note: normalizeCheckoutNote(parsedValue?.note),
    };
  } catch {
    return { customer: null, address: null, payment: null, note: "" };
  }
};

export const saveShopCheckout = (partialState = {}) => {
  if (!isBrowser()) {
    return { customer: null, address: null, payment: null, note: "" };
  }

  const currentState = loadShopCheckout();
  const nextState = {
    customer: Object.prototype.hasOwnProperty.call(partialState, "customer")
      ? (partialState.customer ? normalizeCheckoutCustomer(partialState.customer) : null)
      : currentState.customer,
    address: Object.prototype.hasOwnProperty.call(partialState, "address")
      ? (partialState.address ? normalizeCheckoutAddress(partialState.address) : null)
      : currentState.address,
    payment: Object.prototype.hasOwnProperty.call(partialState, "payment")
      ? (partialState.payment ? normalizeCheckoutPayment(partialState.payment) : null)
      : currentState.payment,
    note: Object.prototype.hasOwnProperty.call(partialState, "note")
      ? normalizeCheckoutNote(partialState.note)
      : currentState.note,
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

export const buildShopCheckoutIntentRequest = ({ checkout = {}, cart = [] } = {}) => {
  const requiresShipping = hasShippableCommerceItems(cart);

  return {
    customer: normalizeCheckoutCustomer(checkout?.customer || {}),
    addressId: requiresShipping ? checkout?.address?.addressId || null : null,
    address: requiresShipping ? normalizeCheckoutAddress(checkout?.address || {}) : null,
    payment: normalizeCheckoutPayment(checkout?.payment || {}),
    items: (Array.isArray(cart) ? cart : [])
      .map((item) => ({
        itemType: item?.itemType || "",
        itemId: item?.itemId || "",
        quantity: Number(item?.quantity) || 0,
      }))
      .filter((item) => item.itemType && item.itemId && item.quantity > 0),
    note: normalizeCheckoutNote(checkout?.note),
  };
};

export const formatShopCurrency = (amount) =>
  `PKR ${Number(amount || 0).toLocaleString()}`;

export const calculateCartSummary = (cart = []) => {
  const subtotal = cart.reduce(
    (runningTotal, item) => runningTotal + (Number(item?.price) || 0) * (Number(item?.quantity) || 0),
    0
  );
  const discount = subtotal * DISCOUNT_RATE;
  const requiresShipping = hasShippableCommerceItems(cart);
  const shipping = requiresShipping ? SHIPPING_COST : 0;
  const total = subtotal - discount + shipping;

  return {
    subtotal,
    discount,
    shipping,
    total,
    requiresShipping,
  };
};
