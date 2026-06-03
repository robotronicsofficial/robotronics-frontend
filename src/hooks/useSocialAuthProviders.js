import { useQuery } from "@tanstack/react-query";
import { fetchSocialAuthProviders } from "../lib/auth";
import { queryKeys } from "../lib/queryKeys";

export const useSocialAuthProviders = () =>
  useQuery({
    queryKey: queryKeys.auth.socialProviders,
    queryFn: fetchSocialAuthProviders,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
