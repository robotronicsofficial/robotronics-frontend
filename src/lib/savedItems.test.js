import { describe, expect, it } from "vitest";

import { readSavedItems } from "./savedItems";

describe("saved item api readers", () => {
  it("reads saved items from the backend data envelope", () => {
    expect(readSavedItems({
      success: true,
      data: {
        user: "user-1",
        items: [
          {
            itemType: "course",
            itemId: "course-1",
            name: "Python Foundations",
          },
        ],
      },
    })).toEqual([
      {
        itemType: "course",
        itemId: "course-1",
        name: "Python Foundations",
      },
    ]);
  });
});
