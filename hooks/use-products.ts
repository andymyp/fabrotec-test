import {
  fetchCategories,
  fetchProduct,
  fetchProducts,
  Params,
} from "@/lib/apis/product";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params: Params) {
  return useQuery({
    queryKey: [
      "products",
      params.search,
      params.category,
      params.sortBy,
      params.sortOrder,
      params.skip,
      params.limit,
    ],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 30 * 60 * 1000,
  });
}
