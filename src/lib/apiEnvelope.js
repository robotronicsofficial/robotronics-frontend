export const isRecord = (value) => (
  Boolean(value) && typeof value === "object" && !Array.isArray(value)
);

export const readDataEnvelope = (payload, isData, errorMessage) => {
  if (!isRecord(payload) || payload.success !== true || !isData(payload.data)) {
    throw new Error(errorMessage);
  }

  return payload.data;
};
