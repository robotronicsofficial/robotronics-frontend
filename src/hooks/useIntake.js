import { useMutation } from "@tanstack/react-query";
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
