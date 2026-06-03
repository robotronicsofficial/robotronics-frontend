import { fetchBackendBlob, fetchBackendJson } from "./api";
import { fetchCourses } from "./courses";
import {
  ensureArray,
  normalizeChildCourse,
  normalizeCourseDetail,
  normalizeProgressPayload,
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

export const readChildCourses = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error("Invalid child courses response");
  }

  return payload.data.map(normalizeChildCourse);
};

export const readChildProgress = (payload) => {
  if (!payload?.data || typeof payload.data !== "object" || Array.isArray(payload.data)) {
    throw new Error("Invalid child progress response");
  }

  return normalizeProgressPayload(payload.data);
};

export const readChildPlan = (payload) => {
  if (!payload?.data || typeof payload.data !== "object" || Array.isArray(payload.data)) {
    throw new Error("Invalid child plan response");
  }

  return payload.data;
};

export const fetchChildPlan = async (childId) => {
  const payload = await fetchBackendJson(
    `/children/${childId}/plan`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );
  return readChildPlan(payload);
};

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
    `/children/${childId}/courses`,
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
    `/children/${childId}/courses`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );

  return readChildCourses(payload);
};

export const fetchChildCourseDetail = async ({ childId, courseId }) => {
  const payload = await fetchBackendJson(
    `/children/${childId}/courses/${courseId}`,
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
    `/children/${childId}/courses/${courseId}/progress`,
    buildRequiredChildRequest({
      method: "PUT",
      childId,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
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
    `/children/${childId}/courses/${courseId}/content/${contentId}/download`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );

export const fetchChildProgress = async (childId) => {
  const payload = await fetchBackendJson(
    `/${childId}/progress`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );

  return readChildProgress(payload);
};

export const generateChildCertificate = ({ childId, courseId }) =>
  fetchBackendJson(
    "/generate",
    buildRequiredChildRequest({
      method: "POST",
      childId,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        childId,
        courseId,
      },
    }),
  );

export const downloadChildCertificate = ({ childId, downloadUrl, certificateId }) =>
  fetchBackendBlob(
    downloadUrl || `/certificates/download/${certificateId}`,
    buildRequiredChildRequest({ method: "GET", childId }),
  );
