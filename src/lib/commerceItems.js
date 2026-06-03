import {
  COURSE_PRODUCT_DETAIL_PATH,
  PRODUCT_DETAIL_PATH,
} from "@/router/paths";

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

const normalizeImageList = (images) => {
  if (!Array.isArray(images)) {
    return [];
  }

  return images.map(trimString).filter(Boolean);
};

const createCommerceCartItem = ({
  itemType,
  itemId,
  name,
  description = "",
  price,
  category = null,
  images = [],
  fulfillmentType,
  quantity = 1,
}) => {
  const normalizedItemId = trimString(itemId);

  if (!normalizedItemId) {
    return null;
  }

  return {
    itemType,
    itemId: normalizedItemId,
    name: trimString(name) || "Item",
    description: trimString(description),
    price: Number(price) || 0,
    category,
    images: normalizeImageList(images),
    fulfillmentType,
    quantity: Number(quantity) || 1,
  };
};

export const getCommerceItemKey = (item = {}) => (
  `${item.itemType}:${item.itemId}`
);

export const getProductDetailRoute = (productId) => {
  const id = trimString(productId);
  return id ? { to: PRODUCT_DETAIL_PATH, params: { id } } : null;
};

export const getCourseDetailRoute = (courseId) => {
  const id = trimString(courseId);
  return id ? { to: COURSE_PRODUCT_DETAIL_PATH, params: { id } } : null;
};

export const getCommerceItemRoute = (item = {}) => (
  item.itemType === COMMERCE_ITEM_TYPES.course
    ? getCourseDetailRoute(item.itemId)
    : getProductDetailRoute(item.itemId)
);

export const isShippableCommerceItem = (item = {}) => (
  item.fulfillmentType === COMMERCE_FULFILLMENT_TYPES.shipping
);

export const hasShippableCommerceItems = (items = []) => (
  (Array.isArray(items) ? items : []).some(isShippableCommerceItem)
);

export const createProductCommerceItem = (product = {}) => {
  return createCommerceCartItem({
    itemType: COMMERCE_ITEM_TYPES.product,
    itemId: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category ?? null,
    images: product.images,
    fulfillmentType: COMMERCE_FULFILLMENT_TYPES.shipping,
    quantity: product.quantity,
  });
};

export const createCourseCommerceItem = (course = {}) => {
  return createCommerceCartItem({
    itemType: COMMERCE_ITEM_TYPES.course,
    itemId: course._id,
    name: course.title,
    description: course.description,
    price: course.price,
    category: course.category ?? null,
    images: trimString(course.thumbnail) ? [course.thumbnail] : [],
    fulfillmentType: COMMERCE_FULFILLMENT_TYPES.digital,
    quantity: course.quantity,
  });
};

export const normalizeCommerceCartItem = (item = {}) => {
  if (
    item.itemType !== COMMERCE_ITEM_TYPES.product &&
    item.itemType !== COMMERCE_ITEM_TYPES.course
  ) {
    return null;
  }

  return createCommerceCartItem({
    itemType: item.itemType,
    itemId: item.itemId,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category ?? null,
    images: item.images,
    fulfillmentType: item.fulfillmentType,
    quantity: item.quantity,
  });
};
