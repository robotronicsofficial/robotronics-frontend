import { describe, expect, it } from "vitest";

import { readGiftCourseSubmission } from "./intake";

describe("intake api readers", () => {
  it("reads gift course submissions from the backend data envelope", () => {
    expect(readGiftCourseSubmission({
      success: true,
      message: "Gift course created successfully",
      data: {
        giftCourse: { _id: "gift-1" },
        crmSyncQueued: true,
        crmSyncSkippedReason: null,
      },
    })).toEqual({
      message: "Gift course created successfully",
      giftCourse: { _id: "gift-1" },
      crmSyncQueued: true,
      crmSyncSkippedReason: null,
    });
  });
});
