import { fetchBackendJson } from "./api";
import { readDataEnvelope } from "./apiEnvelope";

export const readVideoGallery = (payload) => (
  readDataEnvelope(payload, Array.isArray, "Invalid video gallery response")
);

export const fetchVideoGallery = async () => {
  const payload = await fetchBackendJson("/video-gallery");
  return readVideoGallery(payload);
};
