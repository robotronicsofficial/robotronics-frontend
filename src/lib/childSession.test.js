import { describe, expect, it } from "vitest";

import { readChildSessionVerification } from "./childSession";

describe("child session api readers", () => {
  it("reads child sessions from the backend data envelope", () => {
    expect(readChildSessionVerification({
      success: true,
      message: "Login successful",
      data: {
        isValid: true,
        sessionId: "session-1",
      },
    })).toEqual({
      message: "Login successful",
      isValid: true,
      sessionId: "session-1",
    });
  });
});
