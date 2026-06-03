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

export const verifyEmailToken = (token) =>
  fetchBackendJson(`/auth/verify-email?token=${encodeURIComponent(token)}`);

export const fetchCurrentUser = () => fetchSessionJson(AUTH_USER_PATH);

export const fetchSocialAuthProviders = async () =>
  readSocialAuthProviders(await fetchBackendJson(AUTH_SOCIAL_PROVIDERS_PATH));

export const loginUser = ({ email, password, rememberMe }) =>
  sendSessionJson(AUTH_LOGIN_PATH, {
    method: "POST",
    body: { email, password, rememberMe },
  });

export const logoutUser = () =>
  sendSessionJson(AUTH_LOGOUT_PATH, {
    method: "POST",
  });

export const registerUser = (body) =>
  sendJson(AUTH_REGISTER_PATH, {
    method: "POST",
    body,
  });

export const requestPasswordReset = (email) =>
  sendJson("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });

export const resetPassword = ({ token, password }) =>
  sendJson("/auth/reset-password", {
    method: "POST",
    body: { token, password },
  });

export const resendVerificationEmail = (email) =>
  sendJson("/auth/resend-verification", {
    method: "POST",
    body: { email },
  });
