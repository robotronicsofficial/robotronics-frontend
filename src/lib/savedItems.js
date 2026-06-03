import { fetchSessionJson, sendSessionJson } from "./api";

const SAVED_ITEMS_ENDPOINT = "/wishlists/wishlist";

export const readSavedItems = (payload) => {
  if (!Array.isArray(payload?.items)) {
    throw new Error("Invalid saved items response");
  }

  return payload.items;
};

export const fetchSavedItems = async () => {
  const payload = await fetchSessionJson(SAVED_ITEMS_ENDPOINT);
  return readSavedItems(payload);
};

export const getSavedItems = fetchSavedItems;

export const saveItem = ({ itemType, itemId }) =>
  sendSessionJson(SAVED_ITEMS_ENDPOINT, {
    method: "POST",
    body: { itemType, itemId },
  });

export const removeSavedItem = ({ itemType, itemId }) =>
  fetchSessionJson(`${SAVED_ITEMS_ENDPOINT}/${itemType}/${itemId}`, {
    method: "DELETE",
  });

export const toggleSavedItem = async ({ itemType, itemId, isSaved }) => {
  if (isSaved) {
    await removeSavedItem({ itemType, itemId });
    return false;
  }

  await saveItem({ itemType, itemId });
  return true;
};
