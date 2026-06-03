import { sendFormData, sendJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";

const readSubmissionData = (payload, key, errorMessage) => {
  const data = readDataEnvelope(payload, isRecord, errorMessage);
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (
    !message ||
    !isRecord(data[key])
  ) {
    throw new Error(errorMessage);
  }

  return {
    message,
    [key]: data[key],
    crmSyncQueued: Boolean(data.crmSyncQueued),
  };
};

export const readContactSubmission = (payload) =>
  readSubmissionData(payload, "contact", "Invalid contact response");

export const readQuickContactSubmission = (payload) =>
  readSubmissionData(payload, "quickContact", "Invalid quick contact response");

export const submitContactRequest = async (body) =>
  readContactSubmission(await sendJson("/contact", {
    method: "POST",
    body,
  }));

export const submitSchoolLead = async (body) =>
  readContactSubmission(await sendJson("/school-leads", {
    method: "POST",
    body: { ...body, source: "for-schools" },
  }));

export const submitQuickContactRequest = async (body) =>
  readQuickContactSubmission(await sendJson("/quickContact", {
    method: "POST",
    body,
  }));

export const readGiftCourseSubmission = (payload) => {
  const data = readDataEnvelope(
    payload,
    isRecord,
    "Invalid gift course response",
  );
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!message) {
    throw new Error("Invalid gift course response");
  }

  return {
    message,
    giftCourse: data.giftCourse,
    crmSyncQueued: Boolean(data.crmSyncQueued),
    crmSyncSkippedReason: data.crmSyncSkippedReason || null,
  };
};

export const submitGiftCourseRequest = async (body) => {
  const payload = await sendJson("/gift-courses", {
    method: "POST",
    body,
  });

  return readGiftCourseSubmission(payload);
};

export const submitJobApplication = (body) =>
  sendFormData("/job-applications", {
    method: "POST",
    body,
  });
