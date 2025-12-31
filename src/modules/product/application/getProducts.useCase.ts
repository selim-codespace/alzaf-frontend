import { Pagination } from '@/src/shared/domain/types';
import { Product } from '../domain/product.types';
import { productRepository } from '../infrastructure/productRepository';
import { ProductFilters } from '../domain/productFillter.types';

interface GetProductsResult {
  products: Product[];
  pagination: Pagination;
}

export async function getProducts(
  filters: ProductFilters = {}
): Promise<GetProductsResult> {
  const response = await productRepository.findAll(filters);

  const validProducts = response.products.filter(
    (product) =>
      product.price > 0 &&
      product.name.trim() !== '' &&
      product.stock >= 0
  );

  return {
    products: validProducts,
    pagination: response.pagination,
  };
}
