import { fetchSessionJson, sendSessionJson } from "./api";

const SAVED_ITEMS_ENDPOINT = "/wishlists/wishlist";

export const readSavedItems = (payload) => {
  if (!Array.isArray(payload?.data?.items)) {
    throw new Error("Invalid saved items response");
  }

  return payload.data.items;
};

export const fetchSavedItems = async () => {
  const payload = await fetchSessionJson(SAVED_ITEMS_ENDPOINT);
  return readSavedItems(payload);
};

export const getSavedItems = fetchSavedItems;

export const saveItem = async ({ itemType, itemId }) => {
  const payload = await sendSessionJson(SAVED_ITEMS_ENDPOINT, {
    method: "POST",
    body: { itemType, itemId },
  });

  return readSavedItems(payload);
};

export const removeSavedItem = async ({ itemType, itemId }) => {
  const payload = await fetchSessionJson(`${SAVED_ITEMS_ENDPOINT}/${itemType}/${itemId}`, {
    method: "DELETE",
  });

  return readSavedItems(payload);
};

export const toggleSavedItem = async ({ itemType, itemId, isSaved }) => {
  if (isSaved) {
    await removeSavedItem({ itemType, itemId });
    return false;
  }

  await saveItem({ itemType, itemId });
  return true;
};
