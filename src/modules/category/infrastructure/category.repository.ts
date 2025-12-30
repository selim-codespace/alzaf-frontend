 
import { apiClient } from '@/src/shared/infrastructure/http/api-client';
import type { Category } from '../domain/category.types';

interface CategoriesResponse {
  categories: Category[];
  total: number;
}

export const categoryRepository = {
  async findAll(): Promise<CategoriesResponse> {
    return apiClient.get<CategoriesResponse>('/categories');
  },
};
