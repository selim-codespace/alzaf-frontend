import { Product } from "./product.types";

export type SortOption = 
  | 'price-asc' 
  | 'price-desc' 
  | 'name-asc' 
  | 'name-desc' 
  | 'rating-asc' 
  | 'rating-desc';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface ProductDetails {
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