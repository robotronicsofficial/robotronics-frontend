import { useQuery } from "@tanstack/react-query";
import { fetchPlans } from "../lib/plans";
import { queryKeys } from "../lib/queryKeys";

export const usePlans = () =>
  useQuery({
    queryKey: queryKeys.subscription.plans,
    queryFn: fetchPlans,
  });
