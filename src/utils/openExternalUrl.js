const isSafeExternalProtocol = (protocol) =>
  protocol === "http:" || protocol === "https:";

export const resolveExternalUrl = (value) => {
  if (typeof window === "undefined" || !value) {
    return null;
  }

  try {
    const url = new URL(String(value), window.location.origin);
    return isSafeExternalProtocol(url.protocol) ? url : null;
  } catch {
    return null;
  }
};

export const openExternalUrl = (value) => {
  if (typeof window === "undefined") {
    return false;
  }

  const url = resolveExternalUrl(value);
  if (!url) {
    return false;
  }

  const openedWindow = window.open(url.toString(), "_blank", "noopener,noreferrer");

  if (openedWindow) {
    openedWindow.opener = null;
  }

  return Boolean(openedWindow);
};
