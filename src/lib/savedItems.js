import { BACKEND_BASE_URL } from "./api";
const SAVED_ITEMS_ENDPOINT = `${BACKEND_BASE_URL}/wishlists/wishlist`;

const parseSavedItemsResponse = async (response, fallbackMessage) => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Please log in to save items.");
    }

    throw new Error(payload?.message || fallbackMessage);
  }

  return payload;
};

export const fetchSavedItems = async () => {
  const response = await fetch(SAVED_ITEMS_ENDPOINT, {
    credentials: "include",
  });

  if (response.status === 401) {
    return [];
  }

  const payload = await parseSavedItemsResponse(response, "Failed to load saved items.");
  return Array.isArray(payload?.items) ? payload.items : [];
};

export const saveItem = async ({ itemType, itemId }) => {
  const response = await fetch(SAVED_ITEMS_ENDPOINT, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemType, itemId }),
  });

  await parseSavedItemsResponse(response, "Failed to save item.");
};

export const removeSavedItem = async ({ itemType, itemId }) => {
  const response = await fetch(`${SAVED_ITEMS_ENDPOINT}/${itemType}/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await parseSavedItemsResponse(response, "Failed to remove saved item.");
};

export const toggleSavedItem = async ({ itemType, itemId, isSaved }) => {
  if (isSaved) {
    await removeSavedItem({ itemType, itemId });
    return false;
  }

  await saveItem({ itemType, itemId });
  return true;
};
