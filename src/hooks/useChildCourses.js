import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  downloadChildCertificate,
  fetchChildProgress,
  generateChildCertificate,
} from "../lib/childCourses";
import { queryKeys } from "../lib/queryKeys";

export const useChildProgress = (childId) =>
  useQuery({
    queryKey: queryKeys.childCourses.progress(childId),
    queryFn: () => fetchChildProgress(childId),
    enabled: Boolean(childId),
  });

export const useDownloadChildCertificateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ childId, courseId }) => {
      const certificate = await generateChildCertificate({ childId, courseId });
      const blob = await downloadChildCertificate({
        childId,
        downloadUrl: certificate.downloadUrl,
        certificateId: certificate.certificateId,
      });

      return { blob, certificate };
    },
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.childCourses.progress(variables.childId),
      });
    },
  });
};
