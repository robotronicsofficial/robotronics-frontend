import { fetchSessionJson, sendSessionJson } from "./api";

const SAVED_ITEMS_ENDPOINT = "/wishlists/wishlist";

export const fetchSavedItems = async () => {
  const data = await fetchSessionJson(SAVED_ITEMS_ENDPOINT);
  return Array.isArray(data?.items) ? data.items : [];
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
