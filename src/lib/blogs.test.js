import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchBlogById, fetchBlogs } from "./blogs";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("blog API contract", () => {
  it("reads blog lists from the backend data envelope", async () => {
    const blogs = [{ _id: "blog-1", title: "Robotics Update" }];
    fetchBackendJson.mockResolvedValueOnce({ success: true, data: blogs });

    await expect(fetchBlogs()).resolves.toBe(blogs);
    expect(fetchBackendJson).toHaveBeenCalledWith("/blogs");
  });

  it("reads blog details from the backend data envelope", async () => {
    const blog = { _id: "blog-1", title: "Robotics Update" };
    fetchBackendJson.mockResolvedValueOnce({ success: true, data: blog });

    await expect(fetchBlogById("blog-1")).resolves.toBe(blog);
    expect(fetchBackendJson).toHaveBeenCalledWith("/blogs/blog-1");
  });
});
