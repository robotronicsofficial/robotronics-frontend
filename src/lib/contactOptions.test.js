import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchContactOptions, readContactOptions } from "./contactOptions";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("contact options API contract", () => {
  it("reads backend-owned contact options from the data envelope", async () => {
    const options = {
      userTypes: [{ value: "parent", label: "Parent" }],
      serviceOptions: {
        parent: [{ code: "learning-subscription", label: "Learning Subscription" }],
      },
    };
    fetchBackendJson.mockResolvedValueOnce({ success: true, data: options });

    await expect(fetchContactOptions()).resolves.toBe(options);
    expect(fetchBackendJson).toHaveBeenCalledWith("/contact/options");
  });

  it("rejects malformed contact option payloads", () => {
    expect(() => readContactOptions({ data: { userTypes: [], serviceOptions: [] } }))
      .toThrow("Invalid contact options response");
  });
});
