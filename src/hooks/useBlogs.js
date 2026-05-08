import { useQuery } from "@tanstack/react-query";
import { fetchBlogById, fetchBlogs } from "../lib/blogs";
import { queryKeys } from "../lib/queryKeys";

export const useBlogs = () =>
  useQuery({
    queryKey: queryKeys.blogs.all,
    queryFn: fetchBlogs,
  });

export const useBlog = (blogId) =>
  useQuery({
    queryKey: queryKeys.blogs.detail(blogId),
    queryFn: () => fetchBlogById(blogId),
    enabled: Boolean(blogId),
  });
