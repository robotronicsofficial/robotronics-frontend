import { useMutation } from "@tanstack/react-query";
import { verifyEmailToken } from "../lib/auth";

export const useVerifyEmailMutation = () =>
  useMutation({
    mutationFn: verifyEmailToken,
  });
