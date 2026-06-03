import { fetchBackendJson } from "./api";

export const readVideoGallery = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error("Invalid video gallery response");
  }

  return payload.data;
};

export const fetchVideoGallery = async () => {
  const payload = await fetchBackendJson("/video-gallery");
  return readVideoGallery(payload);
};
