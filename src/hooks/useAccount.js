import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateSubscription,
  changeChildPin,
  createChildPin,
  fetchChildAccessList,
  fetchChildEnrollment,
  fetchParent,
  fetchPayments,
  saveParent,
  verifyChildPin,
} from "../lib/account";
import { queryKeys } from "../lib/queryKeys";

export const useParent = (userId) =>
  useQuery({
    queryKey: queryKeys.subscription.parent(userId),
    queryFn: () => fetchParent(userId),
    enabled: Boolean(userId),
  });

export const usePayments = (enabled) =>
  useQuery({
    queryKey: queryKeys.payments.all,
    queryFn: fetchPayments,
    enabled,
  });

export const useChildAccessList = (enabled) =>
  useQuery({
    queryKey: queryKeys.subscription.children,
    queryFn: fetchChildAccessList,
    enabled,
  });

export const useChildEnrollment = (childId) =>
  useQuery({
    queryKey: queryKeys.childCourses.active(childId),
    queryFn: () => fetchChildEnrollment(childId),
    enabled: Boolean(childId),
  });

export const useSaveParentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveParent,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscription.parent(variables?.parent?.userId),
      });
    },
  });
};

export const useActivateSubscriptionMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.parent(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.children });
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
    },
  });
};

export const useCreateChildPinMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChildPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.parent(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.children });
    },
  });
};

export const useChangeChildPinMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeChildPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.parent(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.children });
    },
  });
};

export const useVerifyChildPinMutation = () =>
  useMutation({
    mutationFn: verifyChildPin,
  });
