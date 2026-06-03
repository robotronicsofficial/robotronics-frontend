import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchCourseById, fetchCourses, readCourse, readCourses } from "./courses";

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

  it("rejects legacy course envelopes", () => {
    expect(() => readCourses({ courses: [{ _id: "legacy-list" }] })).toThrow(
      "Invalid courses response",
    );
    expect(() => readCourse({ _id: "legacy-detail" })).toThrow(
      "Invalid course response",
    );
  });
});
