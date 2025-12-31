import { Pagination } from "@/src/shared/domain/types";
import { Product } from "../domain/product.types"; 
import { apiClient } from "@/src/shared/infrastructure/http/api-client";
import { ProductFilters } from "../domain/productFilter.types";



interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
  filters: {
    categories: string[];
    appliedFilters: ProductFilters;
  };
}

interface ProductDetailsResponse {
  product: Product;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
  };
  similarProducts: Product[];
}

export const productRepository = {
  async findAll(filters: ProductFilters): Promise<ProductsResponse> {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice !== undefined) params.append('minPrice', String(filters.minPrice));
    if (filters.maxPrice !== undefined) params.append('maxPrice', String(filters.maxPrice));
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const queryString = params.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';

    return apiClient.get<ProductsResponse>(endpoint);
  },

  async findById(id: number): Promise<ProductDetailsResponse> {
    return apiClient.get<ProductDetailsResponse>(`/products/${id}`);
  },
};