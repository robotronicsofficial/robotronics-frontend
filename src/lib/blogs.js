import { fetchBackendJson } from "./api";

export const readBlogs = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error("Invalid blogs response");
  }

  return payload.data;
};

export const readBlog = (payload) => {
  if (!payload?.data || typeof payload.data !== "object" || Array.isArray(payload.data)) {
    throw new Error("Invalid blog response");
  }

  return payload.data;
};

export const fetchBlogs = async () => {
  const payload = await fetchBackendJson("/blogs");
  return readBlogs(payload);
};

export const fetchBlogById = async (blogId) => {
  const payload = await fetchBackendJson(`/blogs/${blogId}`);
  return readBlog(payload);
};
