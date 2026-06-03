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

export const submitGiftCourseRequest = (body) =>
  sendJson("/gift-courses", {
    method: "POST",
    body,
  });

export const submitJobApplication = (body) =>
  sendFormData("/job-applications", {
    method: "POST",
    body,
  });
