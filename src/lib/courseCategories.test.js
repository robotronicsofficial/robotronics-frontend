import { describe, expect, it } from "vitest";

import { readCourseCategoryNames } from "./courseCategories";

describe("course category contracts", () => {
  it("reads category names from the backend data envelope", () => {
    expect(readCourseCategoryNames({
      success: true,
      data: [
        { name: " Robotics " },
        { name: "" },
        { name: "Artificial Intelligence AI" },
        { slug: "missing-name" },
      ],
    })).toEqual(["Robotics", "Artificial Intelligence AI"]);
  });
});
