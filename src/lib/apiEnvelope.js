export const isRecord = (value) => (
  Boolean(value) && typeof value === "object" && !Array.isArray(value)
);

export const readSuccessEnvelope = (payload, errorMessage) => {
  if (!isRecord(payload) || payload.success !== true) {
    throw new Error(errorMessage);
  }

  return payload;
};

export const readDataEnvelope = (payload, isData, errorMessage) => {
  const envelope = readSuccessEnvelope(payload, errorMessage);

  if (!isData(envelope.data)) {
    throw new Error(errorMessage);
  }

  return envelope.data;
};
