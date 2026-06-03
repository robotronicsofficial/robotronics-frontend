import { fetchBackendJson } from "./api";

export const readCourseCategoryNames = (payload) => (
  Array.isArray(payload?.categories)
    ? payload.categories
        .map((category) => String(category?.name || "").trim())
        .filter(Boolean)
    : []
);

export const fetchCourseCategoryNames = async () => (
  readCourseCategoryNames(await fetchBackendJson("/course-categories"))
);
