import { useQuery } from "@tanstack/react-query";
import { fetchCourseById, fetchCourses } from "../lib/courses";
import { queryKeys } from "../lib/queryKeys";

export const useCourses = () =>
  useQuery({
    queryKey: queryKeys.courses.all,
    queryFn: fetchCourses,
  });

export const useCourse = (courseId) =>
  useQuery({
    queryKey: queryKeys.courses.detail(courseId),
    queryFn: () => fetchCourseById(courseId),
    enabled: Boolean(courseId),
  });
