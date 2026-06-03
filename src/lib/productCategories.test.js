import { describe, expect, it } from "vitest";

import { readProductCategoryNames } from "./productCategories";

describe("product category contracts", () => {
  it("reads category names from the backend category payload", () => {
    expect(readProductCategoryNames({
      categories: [
        { name: " Lego Robots " },
        { name: "" },
        { name: "Curriculum Books" },
        { slug: "missing-name" },
      ],
    })).toEqual(["Lego Robots", "Curriculum Books"]);
  });

  it("rejects non-category payload shapes", () => {
    expect(readProductCategoryNames({ products: [{ category: "Derived" }] })).toEqual([]);
    expect(readProductCategoryNames(null)).toEqual([]);
  });
});
