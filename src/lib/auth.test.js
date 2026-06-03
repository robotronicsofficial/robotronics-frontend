import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchBackendJson } from "./api";
import {
  fetchSocialAuthProviders,
  readSocialAuthProviders,
} from "./auth";

vi.mock("./api", () => ({
  fetchBackendJson: vi.fn(),
  fetchSessionJson: vi.fn(),
  sendJson: vi.fn(),
  sendSessionJson: vi.fn(),
}));

describe("auth API contracts", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("reads social auth provider readiness from the backend envelope", () => {
    expect(
      readSocialAuthProviders({
        data: [
          {
            provider: "google",
            label: "Google",
            authPath: "/auth/google",
            enabled: true,
          },
          {
            provider: "facebook",
            label: "Facebook",
            authPath: "/auth/facebook",
            enabled: false,
          },
        ],
      }),
    ).toEqual([
      {
        provider: "google",
        label: "Google",
        authPath: "/auth/google",
        enabled: true,
      },
      {
        provider: "facebook",
        label: "Facebook",
        authPath: "/auth/facebook",
        enabled: false,
      },
    ]);
  });

  it("rejects malformed social auth provider payloads", () => {
    expect(() => readSocialAuthProviders({ providers: [] })).toThrow(
      "Invalid social auth providers response",
    );
    expect(() =>
      readSocialAuthProviders({
        data: [{ provider: "google", label: "Google", authPath: "/oauth/google" }],
      }),
    ).toThrow("Invalid social auth providers response");
  });

  it("fetches the backend-owned social provider contract", async () => {
    fetchBackendJson.mockResolvedValueOnce({
      data: [
        {
          provider: "google",
          label: "Google",
          authPath: "/auth/google",
          enabled: true,
        },
      ],
    });

    await expect(fetchSocialAuthProviders()).resolves.toEqual([
      {
        provider: "google",
        label: "Google",
        authPath: "/auth/google",
        enabled: true,
      },
    ]);
    expect(fetchBackendJson).toHaveBeenCalledWith("/auth/social-providers");
  });
});
