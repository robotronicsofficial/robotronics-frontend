import { useQuery } from "@tanstack/react-query";
import { fetchJobById, fetchJobs } from "../lib/jobs";
import { queryKeys } from "../lib/queryKeys";

export const useJobs = () =>
  useQuery({
    queryKey: queryKeys.jobs.all,
    queryFn: fetchJobs,
  });

export const useJob = (jobId) =>
  useQuery({
    queryKey: queryKeys.jobs.detail(jobId),
    queryFn: () => fetchJobById(jobId),
    enabled: Boolean(jobId),
  });
