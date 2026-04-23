import { fetchBackendJson } from "./api";

const JOBS_PATH = "/api/jobs";

const isMissingSpecificJob = (error) => {
  const message = String(error?.payload?.message || error?.message || "");
  return /job/i.test(message) && /not found/i.test(message);
};

export const fetchJobs = () => fetchBackendJson(JOBS_PATH);

export const fetchJobById = (jobId) => fetchBackendJson(`${JOBS_PATH}/${jobId}`);

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
