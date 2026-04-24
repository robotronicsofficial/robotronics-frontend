import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  verifyEmailToken,
} from "../lib/auth";
import { queryKeys } from "../lib/queryKeys";
import { clearActiveChildSession } from "../utils/childSessionRequest";

export const useVerifyEmailMutation = () =>
  useMutation({
    mutationFn: verifyEmailToken,
  });

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      clearActiveChildSession();
      queryClient.setQueryData(queryKeys.auth.user, null);
      queryClient.removeQueries({ queryKey: queryKeys.savedItems.all });
      queryClient.removeQueries({ queryKey: queryKeys.subscription.children });
      queryClient.removeQueries({ queryKey: queryKeys.payments.all });
    },
  });
};

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: registerUser,
  });

export const useRequestPasswordResetMutation = () =>
  useMutation({
    mutationFn: requestPasswordReset,
  });

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: resetPassword,
  });
