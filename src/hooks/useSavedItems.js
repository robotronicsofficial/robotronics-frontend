import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSavedItems,
  removeSavedItem,
  toggleSavedItem,
} from "../lib/savedItems";
import { queryKeys } from "../lib/queryKeys";
import { useAuth } from "../contexts/useAuth";

export const useSavedItems = () => {
  const { currentUser } = useAuth();
  const userId = currentUser?._id;

  return useQuery({
    queryKey: queryKeys.savedItems.user(userId),
    queryFn: fetchSavedItems,
    enabled: Boolean(userId),
    placeholderData: [],
  });
};

export const useRemoveSavedItemMutation = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: removeSavedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.savedItems.user(currentUser?._id),
      });
    },
  });
};

export const useToggleSavedItemMutation = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: toggleSavedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.savedItems.user(currentUser?._id),
      });
    },
  });
};
