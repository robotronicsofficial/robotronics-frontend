import { fetchBackendJson } from "./api";

export const verifyEmailToken = (token) =>
  fetchBackendJson(`/auth/verify-email?token=${encodeURIComponent(token)}`);
