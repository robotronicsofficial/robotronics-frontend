import { fetchBackendJson } from "./api";

export const normalizeCoursesPayload = (payload) => {
  if (Array.isArray(payload?.courses)) {
    return payload.courses;
  }

  return Array.isArray(payload) ? payload : [];
};

export const fetchCourses = async () => {
  const payload = await fetchBackendJson("/get-courses");
  return normalizeCoursesPayload(payload);
};
