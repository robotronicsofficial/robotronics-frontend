import { fetchBackendJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";

export const readCourses = (payload) => (
  readDataEnvelope(payload, Array.isArray, "Invalid courses response")
);

export const readCourse = (payload) => (
  readDataEnvelope(payload, isRecord, "Invalid course response")
);

export const fetchCourses = async () => {
  const payload = await fetchBackendJson("/courses");
  return readCourses(payload);
};

export const fetchCourseById = async (courseId) => {
  const payload = await fetchBackendJson(`/courses/${courseId}`);
  return readCourse(payload);
};
