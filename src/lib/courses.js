import { fetchBackendJson } from "./api";

export const readCourses = (payload) => {
  if (payload?.success !== true || !Array.isArray(payload?.data)) {
    throw new Error("Invalid courses response");
  }

  return payload.data;
};

export const readCourse = (payload) => {
  if (
    payload?.success !== true ||
    !payload?.data ||
    typeof payload.data !== "object" ||
    Array.isArray(payload.data)
  ) {
    throw new Error("Invalid course response");
  }

  return payload.data;
};

export const fetchCourses = async () => {
  const payload = await fetchBackendJson("/courses");
  return readCourses(payload);
};

export const fetchCourseById = async (courseId) => {
  const payload = await fetchBackendJson(`/courses/${courseId}`);
  return readCourse(payload);
};
