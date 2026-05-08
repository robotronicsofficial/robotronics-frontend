import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  activateSubscription,
  changeChildPin,
  createChildPin,
  createSubscriptionCheckoutIntent,
  fetchChildAccounts,
  fetchChildEnrollment,
  fetchCurrentParent,
  fetchPayments,
  resetChildPin,
  saveParent,
  verifyChildPin,
} from "../lib/account";
import { queryKeys } from "../lib/queryKeys";

export const useCurrentParent = (userId) =>
  useQuery({
    queryKey: queryKeys.subscription.currentParent(userId),
    queryFn: fetchCurrentParent,
    enabled: Boolean(userId),
  });

export const useChildAccounts = (userId) =>
  useQuery({
    queryKey: queryKeys.subscription.childAccounts(userId),
    queryFn: () => fetchChildAccounts(userId),
    enabled: Boolean(userId),
  });

export const usePayments = (enabled) =>
  useQuery({
    queryKey: queryKeys.payments.all,
    queryFn: fetchPayments,
    enabled,
  });

export const useChildEnrollment = (childId) =>
  useQuery({
    queryKey: queryKeys.childCourses.enrollment(childId),
    queryFn: () => fetchChildEnrollment(childId),
    enabled: Boolean(childId),
  });

export const useSaveParentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveParent,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscription.currentParent(variables?.parent?.userId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscription.childAccounts(variables?.parent?.userId),
      });
    },
  });
};

export const useActivateSubscriptionMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.currentParent(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.childAccounts(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.payments.all });
    },
  });
};

export const useCreateSubscriptionCheckoutIntentMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscriptionCheckoutIntent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.currentParent(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.childAccounts(userId) });
    },
  });
};

export const useCreateChildPinMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChildPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.currentParent(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.childAccounts(userId) });
    },
  });
};

export const useChangeChildPinMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeChildPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.currentParent(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription.childAccounts(userId) });
    },
  });
};

export const useVerifyChildPinMutation = () =>
  useMutation({
    mutationFn: verifyChildPin,
  });

export const useResetChildPinMutation = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetChildPin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.subscription.childAccounts(userId),
      });
    },
  });
};
