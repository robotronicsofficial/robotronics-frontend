import { describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import { fetchVideoGallery } from "./videoGallery";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
}));

describe("video gallery API contract", () => {
  it("reads video gallery entries from the backend data envelope", async () => {
    const entries = [{ _id: "video-1", workshopName: "Robotics Expo" }];
    fetchBackendJson.mockResolvedValueOnce({ success: true, data: entries });

    await expect(fetchVideoGallery()).resolves.toBe(entries);
    expect(fetchBackendJson).toHaveBeenCalledWith("/video-gallery");
  });
});
