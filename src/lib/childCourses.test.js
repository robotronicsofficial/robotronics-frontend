import { describe, expect, it } from "vitest";

import {
  readChildCourses,
  readChildCourseDetail,
  readChildCourseProgressUpdate,
  readGeneratedChildCertificate,
  readChildPlan,
  readChildProgress,
} from "./childCourses";

describe("child course API contract", () => {
  it("reads active child courses from the backend data envelope", () => {
    const courses = readChildCourses({
      success: true,
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
      success: true,
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

  it("reads child course details from the backend data envelope", () => {
    const detail = readChildCourseDetail({
      success: true,
      data: {
        course: {
          courseId: "course-1",
          Sections: [{ modules: [] }],
          progress: "75",
        },
        courseDetails: {
          _id: "course-1",
          title: "Python Foundations",
          sections: [{ modules: [{ learningObjectives: [], contents: [] }] }],
        },
        plan: { planId: "plan-1" },
      },
    });

    expect(detail).toEqual({
      childCourse: {
        courseId: "course-1",
        Sections: [{ modules: [], quiz: null }],
        progress: 75,
      },
      courseDetails: {
        _id: "course-1",
        title: "Python Foundations",
        sections: [{ modules: [{ learningObjectives: [], contents: [] }] }],
        reviews: 0,
      },
      plan: { planId: "plan-1" },
    });
  });

  it("reads child course progress updates from the backend envelope", () => {
    expect(readChildCourseProgressUpdate({
      success: true,
      message: "Child course progress updated successfully",
      data: {
        courseId: "course-1",
        Sections: [{ modules: [] }],
        progress: "100",
      },
      quiz: {
        score: 3,
        total: 3,
        passed: true,
        details: {
          question1: true,
        },
      },
    })).toEqual({
      childCourse: {
        courseId: "course-1",
        Sections: [{ modules: [], quiz: null }],
        progress: 100,
      },
      quiz: {
        score: 3,
        total: 3,
        passed: true,
        details: {
          question1: true,
        },
      },
    });
  });

  it("reads generated child certificates from the backend data envelope", () => {
    expect(readGeneratedChildCertificate({
      success: true,
      data: {
        certificateId: "cert-1",
        downloadUrl: "/api/certificates/download/cert-1",
        alreadyExists: false,
      },
    })).toEqual({
      certificateId: "cert-1",
      downloadUrl: "/api/certificates/download/cert-1",
      alreadyExists: false,
    });
  });
});
