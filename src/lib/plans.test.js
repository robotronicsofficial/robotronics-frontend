import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchPlans, readPlans } from "./plans";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("plans API contract", () => {
  it("reads plans from the backend data envelope", async () => {
    const plans = [{ _id: "plan-1", planName: "Parent Plan" }];
    fetchBackendJson.mockResolvedValueOnce({ data: plans });

    await expect(fetchPlans()).resolves.toBe(plans);
    expect(fetchBackendJson).toHaveBeenCalledWith("/plans");
  });

  it("rejects legacy plan envelopes", () => {
    expect(() => readPlans({ plans: [] })).toThrow("Invalid plans response");
  });
});
