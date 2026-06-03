import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  downloadChildCourseContent,
  downloadChildCertificate,
  fetchChildCourseDetail,
  fetchChildCourses,
  fetchChildProgress,
  fetchSelectableChildCourses,
  generateChildCertificate,
  saveChildCourses,
  updateChildCourseProgress,
} from "../lib/childCourses";
import { queryKeys } from "../lib/queryKeys";

export const useSelectableChildCourses = (childId) =>
  useQuery({
    queryKey: queryKeys.childCourses.selectable(childId),
    queryFn: () => fetchSelectableChildCourses(childId),
    enabled: Boolean(childId),
  });

export const useChildCourses = (childId) =>
  useQuery({
    queryKey: queryKeys.childCourses.active(childId),
    queryFn: () => fetchChildCourses(childId),
    enabled: Boolean(childId),
  });

export const useChildCourseDetail = ({ childId, courseId }) =>
  useQuery({
    queryKey: queryKeys.childCourses.detail(childId, courseId),
    queryFn: () => fetchChildCourseDetail({ childId, courseId }),
    enabled: Boolean(childId && courseId),
  });

export const useChildProgress = (childId) =>
  useQuery({
    queryKey: queryKeys.childCourses.progress(childId),
    queryFn: () => fetchChildProgress(childId),
    enabled: Boolean(childId),
  });

export const useSaveChildCoursesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveChildCourses,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.childCourses.active(variables.childId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.childCourses.selectable(variables.childId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.childCourses.progress(variables.childId),
      });
    },
  });
};

export const useUpdateChildCourseProgressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChildCourseProgress,
    onSuccess: (payload, variables) => {
      queryClient.setQueryData(
        queryKeys.childCourses.detail(variables.childId, variables.courseId),
        (current) => current
          ? { ...current, childCourse: payload?.data || current.childCourse }
          : current,
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.childCourses.progress(variables.childId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.childCourses.active(variables.childId),
      });
    },
  });
};

export const useDownloadChildCourseContentMutation = () =>
  useMutation({
    mutationFn: downloadChildCourseContent,
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
