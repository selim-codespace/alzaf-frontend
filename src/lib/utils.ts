import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
  // Format price to USD currency
 
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// Format stock status with human-readable text
export function formatStock(stock: number): string {
  if (stock === 0) return 'Out of stock';
  if (stock < 5) return `Only ${stock} left!`;
  if (stock < 10) return `${stock} in stock`;
  return `${stock} available`;
}

// Validate and parse sort option
export function isValidSortOption(sort: string | undefined): sort is
  'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-asc' | 'rating-desc' {
  const validSorts = ['price-asc', 'price-desc', 'name-asc', 'name-desc', 'rating-asc', 'rating-desc'];
  return sort !== undefined && validSorts.includes(sort);
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
