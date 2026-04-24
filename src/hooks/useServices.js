import { useQuery } from "@tanstack/react-query";
import { fetchServiceById, fetchServices } from "../lib/services";
import { queryKeys } from "../lib/queryKeys";

export const useServices = () =>
  useQuery({
    queryKey: queryKeys.services.all,
    queryFn: fetchServices,
  });

export const useService = (serviceId, initialService) =>
  useQuery({
    queryKey: queryKeys.services.detail(serviceId),
    queryFn: () => fetchServiceById(serviceId),
    enabled: Boolean(serviceId),
    initialData: initialService?._id === serviceId ? initialService : undefined,
  });
