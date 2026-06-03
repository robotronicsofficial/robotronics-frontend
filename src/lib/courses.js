import { fetchBackendJson } from "./api";

export const fetchCourses = async () => {
  const payload = await fetchBackendJson("/get-courses");
  return payload?.data;
};

export const fetchCourseById = async (courseId) => {
  const payload = await fetchBackendJson(`/coursesById/${courseId}`);
  return payload?.data;
};
