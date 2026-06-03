import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import {
  fetchServiceById,
  fetchServices,
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
});
