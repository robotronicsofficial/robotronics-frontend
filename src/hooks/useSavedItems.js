import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSavedItems,
  removeSavedItem,
  toggleSavedItem,
} from "../lib/savedItems";
import { queryKeys } from "../lib/queryKeys";

export const useSavedItems = () =>
  useQuery({
    queryKey: queryKeys.savedItems.all,
    queryFn: fetchSavedItems,
  });

export const useRemoveSavedItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeSavedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedItems.all });
    },
  });
};

export const useToggleSavedItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleSavedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedItems.all });
    },
  });
};
