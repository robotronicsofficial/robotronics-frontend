import { sendFormData, sendJson } from "./api";

export const submitContactRequest = (body) =>
  sendJson("/contact", {
    method: "POST",
    body,
  });

export const submitSchoolLead = (body) =>
  sendJson("/school-leads", {
    method: "POST",
    body: { ...body, source: "for-schools" },
  });

export const submitQuickContactRequest = (body) =>
  sendJson("/quickContact", {
    method: "POST",
    body,
  });

export const readGiftCourseSubmission = (payload) => {
  const data = payload?.data;
  const message = typeof payload?.message === "string" ? payload.message.trim() : "";

  if (!message || !data || typeof data !== "object" || Array.isArray(data)) {
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
