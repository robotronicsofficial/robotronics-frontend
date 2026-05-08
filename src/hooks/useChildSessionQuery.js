import { useQuery } from "@tanstack/react-query";
import { verifyChildSession } from "../lib/childSession";
import { queryKeys } from "../lib/queryKeys";

export const useChildSessionVerification = ({ childId, sessionId, enabled }) =>
  useQuery({
    queryKey: queryKeys.childSession.verify(childId, sessionId),
    queryFn: () => verifyChildSession({ childId, sessionId }),
    enabled: Boolean(enabled && childId && sessionId),
    refetchInterval: 30_000,
    retry: false,
  });
