import { ApiError } from '@/src/shared/infrastructure/http/api-error';
import { ProductDetails } from '../domain/product-filter.types';
import { productRepository } from '../infrastructure/product.repository'; 

export async function getProductDetails(id: number): Promise<ProductDetails> {
  try {
    const response = await productRepository.findById(id);

    // Business rule: Validate product data
    if (!response.product || response.product.price <= 0) {
      throw new ApiError(404, 'Product not found or invalid');
    }

    return response;
  } catch (error) {
    // Handle the special case where product ID 1 always returns 500
    if (id === 1 && ApiError.isServerError(error)) {
      throw new ApiError(
        500,
        'This product is currently unavailable (Server Error)',
        `/products/${id}`
      );
    }
    throw error;
  }
}