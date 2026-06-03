import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchJobById, fetchJobs } from "./jobs";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("jobs API contract", () => {
  it("reads job lists from the backend data envelope", async () => {
    const jobs = [{ _id: "job-1", title: "Robotics Instructor" }];
    fetchBackendJson.mockResolvedValueOnce({ data: jobs });

    await expect(fetchJobs()).resolves.toBe(jobs);
    expect(fetchBackendJson).toHaveBeenCalledWith("/jobs");
  });

  it("reads job details from the backend data envelope", async () => {
    const job = { _id: "job-1", title: "Robotics Instructor" };
    fetchBackendJson.mockResolvedValueOnce({ data: job });

    await expect(fetchJobById("job-1")).resolves.toBe(job);
    expect(fetchBackendJson).toHaveBeenCalledWith("/jobs/job-1");
  });
});
