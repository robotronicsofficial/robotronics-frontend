import { fetchBackendJson } from "./api";

export const fetchVideoGallery = async () => {
  const payload = await fetchBackendJson("/allVideoGallery");
  return Array.isArray(payload?.data) ? payload.data : [];
};
