import { fetchBackendJson } from "./api";
import { isRecord, readDataEnvelope } from "./apiEnvelope";

const isOption = (value) =>
  value &&
  typeof value === "object" &&
  typeof value.value === "string" &&
  typeof value.label === "string";

const isServiceOption = (value) =>
  value &&
  typeof value === "object" &&
  typeof value.code === "string" &&
  typeof value.label === "string";

export const readContactOptions = (payload) => {
  const data = readDataEnvelope(
    payload,
    isRecord,
    "Invalid contact options response",
  );
  const serviceOptions = data?.serviceOptions;

  if (
    !Array.isArray(data.userTypes) ||
    !data.userTypes.every(isOption) ||
    !serviceOptions ||
    typeof serviceOptions !== "object" ||
    Array.isArray(serviceOptions) ||
    !Object.values(serviceOptions).every(
      (options) => Array.isArray(options) && options.every(isServiceOption),
    )
  ) {
    throw new Error("Invalid contact options response");
  }

  return data;
};

export const fetchContactOptions = async () => {
  const payload = await fetchBackendJson("/contact/options");
  return readContactOptions(payload);
};
