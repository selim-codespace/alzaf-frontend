import type { Product } from '../domain/product.types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h3 className="font-medium mt-1 group-hover:text-blue-600">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold">${product.price}</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
      </div>
    </Link>
  );
}