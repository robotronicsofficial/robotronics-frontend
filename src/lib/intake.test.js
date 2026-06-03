import { describe, expect, it } from "vitest";

import {
  readContactSubmission,
  readGiftCourseSubmission,
  readQuickContactSubmission,
} from "./intake";

describe("intake api readers", () => {
  it("reads contact submissions from the backend data envelope", () => {
    expect(readContactSubmission({
      success: true,
      message: "Contact form submitted successfully",
      data: {
        contact: { _id: "contact-1" },
        crmSyncQueued: true,
      },
    })).toEqual({
      message: "Contact form submitted successfully",
      contact: { _id: "contact-1" },
      crmSyncQueued: true,
    });
  });

  it("reads quick contact submissions from the backend data envelope", () => {
    expect(readQuickContactSubmission({
      success: true,
      message: "Your contact form has been submitted successfully!",
      data: {
        quickContact: { _id: "quick-1" },
        crmSyncQueued: false,
      },
    })).toEqual({
      message: "Your contact form has been submitted successfully!",
      quickContact: { _id: "quick-1" },
      crmSyncQueued: false,
    });
  });

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
