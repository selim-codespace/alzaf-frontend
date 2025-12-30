import { categoryRepository } from '../infrastructure/category.repository';
import type { Category } from '../domain/category.types';

export async function getCategories(): Promise<Category[]> {
  const response = await categoryRepository.findAll();

  // Only retur active categoris with valid slugs
  return response.categories.filter(
    (category) => category.slug && category.name.trim() !== ''
  );
}
