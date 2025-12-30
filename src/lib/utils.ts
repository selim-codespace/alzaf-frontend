import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function formatStock(stock: number): string {
  if (stock === 0) return 'Out of stock';
  if (stock < 10) return `Only ${stock} left`;
  return `${stock} in stock`;
}
