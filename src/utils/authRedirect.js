const POST_AUTH_REDIRECT_KEY = "robotronics:postAuthRedirect";

export const isSafeRedirectPath = (value) =>
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//");

export const getSafeRedirectPath = (value, fallback = null) =>
  isSafeRedirectPath(value) ? value : fallback;

export const buildAuthRedirectSearch = (redirectPath) => {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);
  return safeRedirectPath ? { redirect: safeRedirectPath } : {};
};

export const buildRedirectSearchFromLocation = (location, currentAuthPath = "/Login") => {
  const href = location?.href || `${location?.pathname || ""}${location?.searchStr || ""}${location?.hash || ""}`;
  return href && href !== currentAuthPath ? buildAuthRedirectSearch(href) : {};
};

export const savePostAuthRedirect = (redirectPath) => {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);
  if (!safeRedirectPath || typeof window === "undefined") return;
  window.localStorage.setItem(POST_AUTH_REDIRECT_KEY, safeRedirectPath);
};

export const consumePostAuthRedirect = () => {
  if (typeof window === "undefined") return null;
  const redirectPath = getSafeRedirectPath(window.localStorage.getItem(POST_AUTH_REDIRECT_KEY));
  window.localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
  return redirectPath;
};
