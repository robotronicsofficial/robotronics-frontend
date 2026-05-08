import { describe, expect, it } from "vitest";

import {
  buildAuthRedirectQuery,
  buildAuthRedirectSearch,
  getSafeRedirectPath,
  isSafeRedirectPath,
} from "./authRedirect";

describe("auth redirect contracts", () => {
  it("accepts same-origin app paths", () => {
    expect(isSafeRedirectPath("/subscriptions/checkout?step=kids")).toBe(true);
    expect(getSafeRedirectPath("/Dashboard/userInfo")).toBe("/Dashboard/userInfo");
  });

  it("rejects external or protocol-relative redirects", () => {
    expect(isSafeRedirectPath("https://evil.example")).toBe(false);
    expect(isSafeRedirectPath("//evil.example/path")).toBe(false);
    expect(getSafeRedirectPath("https://evil.example", "/")).toBe("/");
  });

  it("builds redirect search and OAuth query from the same safe contract", () => {
    expect(buildAuthRedirectSearch("/subscriptions/checkout?step=kids")).toEqual({
      redirect: "/subscriptions/checkout?step=kids",
    });
    expect(buildAuthRedirectQuery("/subscriptions/checkout?step=kids")).toBe(
      "?redirect=%2Fsubscriptions%2Fcheckout%3Fstep%3Dkids",
    );
    expect(buildAuthRedirectQuery("https://evil.example")).toBe("");
  });
});
