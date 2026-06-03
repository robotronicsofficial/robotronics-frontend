const STORAGE_KEY = "shop_checkout";
const PENDING_CART_STORAGE_KEY = "robotronics:pendingCart";
export const EMPTY_SHOP_CART_QUOTE = Object.freeze({
  items: [],
  requiresShipping: false,
  pricing: Object.freeze({
    subtotal: 0,
    discount: 0,
    shipping: 0,
    total: 0,
  }),
});

const getStorage = () => (
  typeof window === "undefined" ? null : window.sessionStorage
);

const getPendingCartStorage = () => (
  typeof window === "undefined" ? null : window.localStorage
);

const isBrowser = () => Boolean(getStorage());

const EMPTY_CHECKOUT = Object.freeze({
  ownerId: null,
  customer: null,
  address: null,
  payment: null,
  note: "",
});

const normalizeCheckoutOwnerId = (ownerId) => {
  const normalizedOwnerId = String(ownerId || "").trim();
  return normalizedOwnerId || null;
};

const writeShopCheckout = (checkout) => {
  getStorage()?.setItem(STORAGE_KEY, JSON.stringify(checkout));
};

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
    return { ...EMPTY_CHECKOUT };
  }

  try {
    const rawValue = getStorage()?.getItem(STORAGE_KEY);
    if (!rawValue) {
      return { ...EMPTY_CHECKOUT };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      ownerId: normalizeCheckoutOwnerId(parsedValue?.ownerId),
      customer: parsedValue?.customer ? normalizeCheckoutCustomer(parsedValue.customer) : null,
      address: parsedValue?.address ? normalizeCheckoutAddress(parsedValue.address) : null,
      payment: parsedValue?.payment ? normalizeCheckoutPayment(parsedValue.payment) : null,
      note: normalizeCheckoutNote(parsedValue?.note),
    };
  } catch {
    return { ...EMPTY_CHECKOUT };
  }
};

export const saveShopCheckout = (partialState = {}) => {
  if (!isBrowser()) {
    return { ...EMPTY_CHECKOUT };
  }

  const currentState = loadShopCheckout();
  const nextState = {
    ownerId: Object.prototype.hasOwnProperty.call(partialState, "ownerId")
      ? normalizeCheckoutOwnerId(partialState.ownerId)
      : currentState.ownerId,
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

  writeShopCheckout(nextState);
  return nextState;
};

export const clearShopCheckout = () => {
  if (!isBrowser()) {
    return;
  }

  getStorage()?.removeItem(STORAGE_KEY);
};

export const claimShopCheckoutOwner = (ownerId) => {
  if (!isBrowser()) {
    return { ...EMPTY_CHECKOUT };
  }

  const nextOwnerId = normalizeCheckoutOwnerId(ownerId);
  if (!nextOwnerId) {
    return loadShopCheckout();
  }

  const currentState = loadShopCheckout();
  const nextState = currentState.ownerId && currentState.ownerId !== nextOwnerId
    ? { ...EMPTY_CHECKOUT, ownerId: nextOwnerId }
    : { ...currentState, ownerId: nextOwnerId };

  writeShopCheckout(nextState);
  return nextState;
};

export const loadPendingCartItems = () => {
  const storage = getPendingCartStorage();
  if (!storage) {
    return [];
  }

  try {
    const rawValue = storage.getItem(PENDING_CART_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : [];
  } catch {
    return [];
  }
};

export const savePendingCartItems = (cart = []) => {
  const storage = getPendingCartStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(
      PENDING_CART_STORAGE_KEY,
      JSON.stringify(Array.isArray(cart) ? cart.filter(Boolean) : [])
    );
  } catch {
    // The checkout can still continue; the cart just cannot be restored after sign-in.
  }
};

export const clearPendingCartItems = () => {
  const storage = getPendingCartStorage();
  if (!storage) {
    return;
  }

  storage.removeItem(PENDING_CART_STORAGE_KEY);
};

export const buildCommerceCartRequestItems = (cart = []) => (
  (Array.isArray(cart) ? cart : [])
    .map((item) => ({
      itemType: item?.itemType || "",
      itemId: item?.itemId || "",
      quantity: Number(item?.quantity) || 0,
    }))
);

export const buildShopCartQuoteRequest = ({ cart = [] } = {}) => ({
  items: buildCommerceCartRequestItems(cart),
});

export const hasShopCartQuoteItems = (quote) => (
  Array.isArray(quote?.items) && quote.items.length > 0
);

export const buildShopCheckoutIntentRequest = ({
  checkout = {},
  cart = [],
  requiresShipping = false,
} = {}) => {
  return {
    customer: normalizeCheckoutCustomer(checkout?.customer || {}),
    addressId: requiresShipping ? checkout?.address?.addressId || null : null,
    address: requiresShipping ? normalizeCheckoutAddress(checkout?.address || {}) : null,
    payment: normalizeCheckoutPayment(checkout?.payment || {}),
    items: buildCommerceCartRequestItems(cart),
    note: normalizeCheckoutNote(checkout?.note),
  };
};
