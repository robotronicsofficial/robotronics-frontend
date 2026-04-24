import { fetchBackendBlob, fetchBackendJson } from "./api";
import { fetchCourses } from "./courses";
import {
  ensureArray,
  normalizeChildCourse,
  normalizeCourseDetail,
} from "./subscription";
import { buildChildSessionRequest } from "../utils/childSessionRequest";

const buildRequiredChildRequest = ({ childId, ...request }) => {
  if (!childId) {
    throw new Error("Child ID not found in URL");
  }

  const childSessionRequest = buildChildSessionRequest({
    ...request,
    childId,
  });

  if (!childSessionRequest) {
    throw new Error("Child session not found. Please re-enter the PIN.");
  }

  return childSessionRequest;
};

export const extractActiveCourses = (payload) => {
  if (Array.isArray(payload?.data?.activeCourses)) return payload.data.activeCourses;
  if (Array.isArray(payload?.activeCourses)) return payload.activeCourses;
  if (Array.isArray(payload?.courses)) return payload.courses;
  return [];
};

export const fetchChildPlan = (childId) =>
  fetchBackendJson(
    `/getChildPlan/${childId}`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );

export const fetchSelectableChildCourses = async (childId) => {
  const childData = await fetchChildPlan(childId);
  const includedCourseIds = ensureArray(childData?.plan?.includedCourseIds);
  const courses = await fetchCourses();

  return {
    courses,
    maxCourses: childData?.plan?.courseAccess === "specific"
      ? includedCourseIds.length
      : Infinity,
  };
};

export const saveChildCourses = ({ childId, courseIds }) =>
  fetchBackendJson(
    `/${childId}/courses`,
    buildRequiredChildRequest({
      method: "PUT",
      childId,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        courses: courseIds.map((courseId) => ({ courseId })),
      },
    }),
  );

export const fetchChildCourses = async (childId) => {
  const payload = await fetchBackendJson(
    `/child/${childId}/courses`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );

  return extractActiveCourses(payload);
};

export const fetchChildCourseDetail = async ({ childId, courseId }) => {
  const payload = await fetchBackendJson(
    `/getChildById/${childId}/ByCourseId/${courseId}`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );

  return {
    courseDetails: normalizeCourseDetail(payload?.courseDetails),
    childCourse: normalizeChildCourse(payload?.course),
    plan: payload?.plan || null,
  };
};

export const updateChildCourseProgress = async ({ childId, courseId, sectionIndex, answers }) => {
  const payload = await fetchBackendJson(
    `/updateChildCourse/${childId}`,
    buildRequiredChildRequest({
      method: "PUT",
      childId,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        courseId,
        sectionIndex,
        answers,
      },
    }),
  );

  return {
    ...payload,
    data: normalizeChildCourse(payload?.data),
  };
};

export const downloadChildCourseContent = ({ childId, courseId, contentId }) =>
  fetchBackendBlob(
    `/child/${childId}/courses/${courseId}/content/${contentId}/download`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );
