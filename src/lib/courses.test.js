import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchCourseById, fetchCourses } from "./courses";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("course API contract", () => {
  it("reads course lists from the backend data envelope", async () => {
    const courses = [{ _id: "course-1", title: "Python Foundations" }];
    fetchBackendJson.mockResolvedValueOnce({ data: courses });

    await expect(fetchCourses()).resolves.toBe(courses);
    expect(fetchBackendJson).toHaveBeenCalledWith("/get-courses");
  });

  it("reads course details from the backend data envelope", async () => {
    const course = { _id: "course-1", title: "Python Foundations" };
    fetchBackendJson.mockResolvedValueOnce({ data: course });

    await expect(fetchCourseById("course-1")).resolves.toBe(course);
    expect(fetchBackendJson).toHaveBeenCalledWith("/coursesById/course-1");
  });

  it("does not read legacy course envelopes", async () => {
    fetchBackendJson.mockResolvedValueOnce({
      courses: [{ _id: "legacy-list" }],
    });
    fetchBackendJson.mockResolvedValueOnce({
      _id: "legacy-detail",
    });

    await expect(fetchCourses()).resolves.toBeUndefined();
    await expect(fetchCourseById("legacy-detail")).resolves.toBeUndefined();
  });
});
