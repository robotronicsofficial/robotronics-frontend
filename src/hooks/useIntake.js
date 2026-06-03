import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchContactOptions } from "../lib/contactOptions";
import { queryKeys } from "../lib/queryKeys";
import {
  submitContactRequest,
  submitGiftCourseRequest,
  submitJobApplication,
  submitQuickContactRequest,
  submitSchoolLead,
} from "../lib/intake";

export const useContactRequestMutation = () =>
  useMutation({
    mutationFn: submitContactRequest,
  });

export const useContactOptionsQuery = () =>
  useQuery({
    queryKey: queryKeys.contact.options,
    queryFn: fetchContactOptions,
  });

export const useSchoolLeadMutation = () =>
  useMutation({
    mutationFn: submitSchoolLead,
  });

export const useQuickContactRequestMutation = () =>
  useMutation({
    mutationFn: submitQuickContactRequest,
  });

export const useGiftCourseRequestMutation = () =>
  useMutation({
    mutationFn: submitGiftCourseRequest,
  });

export const useJobApplicationMutation = () =>
  useMutation({
    mutationFn: submitJobApplication,
  });
