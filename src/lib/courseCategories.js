import { fetchBackendJson } from "./api";
import { readCategoryNames } from "./categoryNames";

export const readCourseCategoryNames = (payload) => (
  readCategoryNames(payload, "course categories")
);

export const fetchCourseCategoryNames = async () => (
  readCourseCategoryNames(await fetchBackendJson("/course-categories"))
);
