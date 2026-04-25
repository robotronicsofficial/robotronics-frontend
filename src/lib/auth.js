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

export const verifyEmailToken = (token) =>
  fetchBackendJson(`/auth/verify-email?token=${encodeURIComponent(token)}`);

export const fetchCurrentUser = () => fetchSessionJson(AUTH_USER_PATH);

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
