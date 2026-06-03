import { fetchBackendJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";

export const readBlogs = (payload) => (
  readDataEnvelope(payload, Array.isArray, "Invalid blogs response")
);

export const readBlog = (payload) => (
  readDataEnvelope(payload, isRecord, "Invalid blog response")
);

export const fetchBlogs = async () => {
  const payload = await fetchBackendJson("/blogs");
  return readBlogs(payload);
};

export const fetchBlogById = async (blogId) => {
  const payload = await fetchBackendJson(`/blogs/${blogId}`);
  return readBlog(payload);
};
