import { fetchBackendJson } from "./api";

const JOBS_PATH = "/jobs";

const isMissingSpecificJob = (error) => {
  const message = String(error?.payload?.message || error?.message || "");
  return /job/i.test(message) && /not found/i.test(message);
};

export const readJobs = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error("Invalid jobs response");
  }

  return payload.data;
};

export const readJob = (payload) => {
  if (!payload?.data || typeof payload.data !== "object" || Array.isArray(payload.data)) {
    throw new Error("Invalid job response");
  }

  return payload.data;
};

export const fetchJobs = async () => {
  const payload = await fetchBackendJson(JOBS_PATH);
  return readJobs(payload);
};

export const fetchJobById = async (jobId) => {
  const payload = await fetchBackendJson(`${JOBS_PATH}/${jobId}`);
  return readJob(payload);
};

export const getJobsErrorMessage = (error, { detail = false } = {}) => {
  if (error?.status === 404 && isMissingSpecificJob(error)) {
    return detail
      ? "This job listing could not be found."
      : "No open roles are available right now.";
  }

  if (error?.status === 404 || error?.status >= 500) {
    return detail
      ? "Job details are unavailable right now because the jobs service is not responding yet. Please try again from the careers page later."
      : "Open roles are temporarily unavailable because the jobs service is not responding yet. Please try again later.";
  }

  return error?.message || (detail ? "Failed to load job details." : "Failed to load open roles.");
};
