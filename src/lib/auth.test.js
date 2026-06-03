import { afterEach, describe, expect, it, vi } from "vitest";

import {
  fetchBackendJson,
  fetchSessionJson,
  sendSessionJson,
} from "./api";
import {
  fetchCurrentUser,
  loginUser,
  readCurrentAuthUser,
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

  it("reads current auth users from the backend data envelope", () => {
    const user = {
      _id: "user-1",
      email: "parent@example.com",
      firstName: "Parent",
    };

    expect(readCurrentAuthUser({ success: true, data: user })).toEqual(user);
    expect(readCurrentAuthUser({ success: true, data: null })).toBeNull();
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

  it("fetches the current user from the backend auth envelope", async () => {
    const user = { _id: "user-1", email: "parent@example.com" };
    fetchSessionJson.mockResolvedValueOnce({ success: true, data: user });

    await expect(fetchCurrentUser()).resolves.toEqual(user);
    expect(fetchSessionJson).toHaveBeenCalledWith("/auth/user");
  });

  it("reads local login sessions from the backend auth envelope", async () => {
    const user = { _id: "user-1", email: "parent@example.com" };
    sendSessionJson.mockResolvedValueOnce({ success: true, data: user });

    await expect(loginUser({
      email: "parent@example.com",
      password: "correct horse battery staple",
      rememberMe: true,
    })).resolves.toEqual(user);
    expect(sendSessionJson).toHaveBeenCalledWith("/auth/login", {
      method: "POST",
      body: {
        email: "parent@example.com",
        password: "correct horse battery staple",
        rememberMe: true,
      },
    });
  });
});
