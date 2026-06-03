import { describe, expect, it } from "vitest";

import { readProductCategoryNames } from "./productCategories";

describe("product category contracts", () => {
  it("reads category names from the backend data envelope", () => {
    expect(readProductCategoryNames({
      success: true,
      data: [
        { name: " Lego Robots " },
        { name: "" },
        { name: "Curriculum Books" },
        { slug: "missing-name" },
      ],
    })).toEqual(["Lego Robots", "Curriculum Books"]);
  });
});
