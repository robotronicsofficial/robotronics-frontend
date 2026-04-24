import { fetchBackendJson } from "./api";

export const fetchBlogs = async () => {
  const payload = await fetchBackendJson("/getAllBlogs");
  return Array.isArray(payload) ? payload : [];
};

export const fetchBlogById = (blogId) =>
  fetchBackendJson(`/getBlogById/${blogId}`);
