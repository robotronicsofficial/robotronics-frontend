import { describe, expect, it } from "vitest";

import { readChildCourses } from "./childCourses";

describe("child course API contract", () => {
  it("reads active child courses from the backend data envelope", () => {
    const courses = readChildCourses({
      data: [
        {
          courseId: "course-1",
          courseName: "Python Foundations",
          Sections: [{ modules: [] }],
          progress: "40",
        },
      ],
    });

    expect(courses).toEqual([
      {
        courseId: "course-1",
        courseName: "Python Foundations",
        Sections: [{ modules: [], quiz: null }],
        progress: 40,
      },
    ]);
  });
});
