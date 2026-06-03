import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import {
  fetchServiceById,
  fetchServices,
  readService,
  readServices,
} from "./services";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("services API contract", () => {
  it("reads service lists from the backend data envelope", async () => {
    const services = [{ _id: "service-1", name: "Robotics" }];
    fetchBackendJson.mockResolvedValueOnce({ data: services });

    await expect(fetchServices()).resolves.toBe(services);
    expect(fetchBackendJson).toHaveBeenCalledWith("/services");
  });

  it("reads service details from the backend data envelope", async () => {
    const service = { _id: "service-1", name: "Robotics" };
    fetchBackendJson.mockResolvedValueOnce({ data: service });

    await expect(fetchServiceById("service-1")).resolves.toBe(service);
    expect(fetchBackendJson).toHaveBeenCalledWith("/services/service-1");
  });

  it("rejects legacy service envelopes", () => {
    expect(() => readServices([{ _id: "legacy-list" }])).toThrow(
      "Invalid services response",
    );
    expect(() => readService({ _id: "legacy-detail" })).toThrow(
      "Invalid service response",
    );
  });
});
