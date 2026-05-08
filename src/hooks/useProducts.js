import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../lib/products";
import { queryKeys } from "../lib/queryKeys";

export const useProducts = () =>
  useQuery({
    queryKey: queryKeys.products.all,
    queryFn: fetchProducts,
  });

export const useProduct = (productId) =>
  useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => fetchProductById(productId),
    enabled: Boolean(productId),
  });
