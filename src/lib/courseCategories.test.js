import { describe, expect, it } from "vitest";

import { readCourseCategoryNames } from "./courseCategories";

describe("course category contracts", () => {
  it("reads category names from the backend data envelope", () => {
    expect(readCourseCategoryNames({
      data: [
        { name: " Robotics " },
        { name: "" },
        { name: "Artificial Intelligence AI" },
        { slug: "missing-name" },
      ],
    })).toEqual(["Robotics", "Artificial Intelligence AI"]);
  });

  it("rejects legacy category envelopes", () => {
    expect(() => readCourseCategoryNames({ categories: [{ name: "Robotics" }] })).toThrow(
      "Invalid course categories response",
    );
    expect(() => readCourseCategoryNames(null)).toThrow(
      "Invalid course categories response",
    );
  });
});
