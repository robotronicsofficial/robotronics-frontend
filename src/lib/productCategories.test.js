import { describe, expect, it } from "vitest";

import { readProductCategoryNames } from "./productCategories";

describe("product category contracts", () => {
  it("reads category names from the backend data envelope", () => {
    expect(readProductCategoryNames({
      data: [
        { name: " Lego Robots " },
        { name: "" },
        { name: "Curriculum Books" },
        { slug: "missing-name" },
      ],
    })).toEqual(["Lego Robots", "Curriculum Books"]);
  });

  it("rejects legacy category envelopes", () => {
    expect(() => readProductCategoryNames({ categories: [{ name: "Lego Robots" }] })).toThrow(
      "Invalid product categories response",
    );
    expect(() => readProductCategoryNames(null)).toThrow(
      "Invalid product categories response",
    );
  });
});
