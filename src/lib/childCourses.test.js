import { describe, expect, it } from "vitest";

import {
  readChildCourses,
  readChildPlan,
  readChildProgress,
} from "./childCourses";

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

  it("reads child progress from the backend data envelope", () => {
    expect(readChildProgress({
      data: {
        childName: "Ava",
        courses: [
          {
            id: "course-1",
            name: "Python Foundations",
            completed: 2,
            certificateAvailable: true,
          },
        ],
      },
    })).toEqual({
      childName: "Ava",
      courses: [
        {
          id: "course-1",
          name: "Python Foundations",
          completed: 2,
          status: "active",
          certificateAvailable: true,
        },
      ],
    });
  });

  it("reads child plan from the backend data envelope", () => {
    const plan = {
      planId: "plan-1",
      courseAccess: "specific",
      includedCourseIds: ["course-1"],
    };

    expect(readChildPlan({
      success: true,
      data: {
        childId: "P-5001-01",
        plan,
      },
    })).toEqual({
      childId: "P-5001-01",
      plan,
    });
  });
});
