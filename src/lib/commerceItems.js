export const COMMERCE_ITEM_TYPES = Object.freeze({
  product: "product",
  course: "course",
});

export const COMMERCE_FULFILLMENT_TYPES = Object.freeze({
  shipping: "shipping",
  digital: "digital",
});

const trimString = (value) => (
  typeof value === "string" ? value.trim() : ""
);

const normalizeImages = (payload = {}) => {
  if (Array.isArray(payload.images)) {
    return payload.images.filter(Boolean);
  }

  const image = trimString(payload.image) || trimString(payload.thumbnail);
  return image ? [image] : [];
};

export const getCommerceItemKey = (item = {}) => (
  `${item.itemType}:${item.itemId}`
);

export const getCommerceItemRoute = (item = {}) => (
  item.itemType === COMMERCE_ITEM_TYPES.course
    ? `/CoursesProduct/${item.itemId}`
    : `/ProductDetailPage/${item.itemId}`
);

export const isShippableCommerceItem = (item = {}) => (
  item.fulfillmentType === COMMERCE_FULFILLMENT_TYPES.shipping
);

export const hasShippableCommerceItems = (items = []) => (
  (Array.isArray(items) ? items : []).some(isShippableCommerceItem)
);

export const createProductCommerceItem = (product = {}) => {
  const itemId = trimString(product.itemId ?? product._id ?? product.id);

  if (!itemId) {
    return null;
  }

  return {
    itemType: COMMERCE_ITEM_TYPES.product,
    itemId,
    name: product.name ?? "Product",
    description: product.description ?? "",
    price: Number(product.price) || 0,
    category: product.category ?? null,
    images: normalizeImages(product),
    fulfillmentType: COMMERCE_FULFILLMENT_TYPES.shipping,
    quantity: Number(product.quantity) || 1,
  };
};

export const createCourseCommerceItem = (course = {}) => {
  const itemId = trimString(course.itemId ?? course._id ?? course.id);

  if (!itemId) {
    return null;
  }

  return {
    itemType: COMMERCE_ITEM_TYPES.course,
    itemId,
    name: course.name ?? course.title ?? "Course",
    description: course.description ?? "",
    price: Number(course.price) || 0,
    category: course.category ?? null,
    images: normalizeImages(course),
    fulfillmentType: COMMERCE_FULFILLMENT_TYPES.digital,
    quantity: Number(course.quantity) || 1,
  };
};

export const normalizeCommerceCartItem = (item = {}) => {
  if (item.itemType === COMMERCE_ITEM_TYPES.product) {
    return createProductCommerceItem(item);
  }

  if (item.itemType === COMMERCE_ITEM_TYPES.course) {
    return createCourseCommerceItem(item);
  }

  return null;
};
