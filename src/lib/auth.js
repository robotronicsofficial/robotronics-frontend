import {
  fetchBackendJson,
  fetchSessionJson,
  sendJson,
  sendSessionJson,
} from "./api";

const AUTH_USER_PATH = "/auth/user";
const AUTH_LOGIN_PATH = "/auth/login";
const AUTH_REGISTER_PATH = "/auth/register";
const AUTH_LOGOUT_PATH = "/auth/logout";
const AUTH_SOCIAL_PROVIDERS_PATH = "/auth/social-providers";
const INVALID_SOCIAL_PROVIDERS_RESPONSE = "Invalid social auth providers response";
const INVALID_AUTH_USER_RESPONSE = "Invalid auth user response";
const INVALID_AUTH_MESSAGE_RESPONSE = "Invalid auth message response";

const readRequiredText = (value) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(INVALID_SOCIAL_PROVIDERS_RESPONSE);
  }

  return value.trim();
};

const readAuthPath = (value) => {
  const authPath = readRequiredText(value);

  if (!authPath.startsWith("/auth/")) {
    throw new Error(INVALID_SOCIAL_PROVIDERS_RESPONSE);
  }

  return authPath;
};

export const readSocialAuthProviders = (payload) => {
  if (!Array.isArray(payload?.data)) {
    throw new Error(INVALID_SOCIAL_PROVIDERS_RESPONSE);
  }

  return payload.data.map((provider) => ({
    provider: readRequiredText(provider?.provider),
    label: readRequiredText(provider?.label),
    authPath: readAuthPath(provider?.authPath),
    enabled: provider?.enabled === true,
  }));
};

export const readCurrentAuthUser = (payload) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error(INVALID_AUTH_USER_RESPONSE);
  }

  if (payload.data === null) {
    return null;
  }

  if (!payload.data || typeof payload.data !== "object" || Array.isArray(payload.data)) {
    throw new Error(INVALID_AUTH_USER_RESPONSE);
  }

  return payload.data;
};

export const readAuthMessage = (payload) => {
  if (
    payload?.success !== true
    || typeof payload?.message !== "string"
    || !payload.message.trim()
  ) {
    throw new Error(INVALID_AUTH_MESSAGE_RESPONSE);
  }

  return { message: payload.message.trim() };
};

export const verifyEmailToken = async (token) =>
  readAuthMessage(
    await fetchBackendJson(`/auth/verify-email?token=${encodeURIComponent(token)}`),
  );

export const fetchCurrentUser = async () => (
  readCurrentAuthUser(await fetchSessionJson(AUTH_USER_PATH))
);

export const fetchSocialAuthProviders = async () =>
  readSocialAuthProviders(await fetchBackendJson(AUTH_SOCIAL_PROVIDERS_PATH));

export const loginUser = async ({ email, password, rememberMe }) => (
  readCurrentAuthUser(await sendSessionJson(AUTH_LOGIN_PATH, {
    method: "POST",
    body: { email, password, rememberMe },
  }))
);

export const logoutUser = () =>
  sendSessionJson(AUTH_LOGOUT_PATH, {
    method: "POST",
  });

export const registerUser = async (body) =>
  readAuthMessage(await sendJson(AUTH_REGISTER_PATH, {
    method: "POST",
    body,
  }));

export const requestPasswordReset = async (email) =>
  readAuthMessage(await sendJson("/auth/forgot-password", {
    method: "POST",
    body: { email },
  }));

export const resetPassword = async ({ token, password }) =>
  readAuthMessage(await sendJson("/auth/reset-password", {
    method: "POST",
    body: { token, password },
  }));

export const resendVerificationEmail = async (email) =>
  readAuthMessage(await sendJson("/auth/resend-verification", {
    method: "POST",
    body: { email },
  }));
