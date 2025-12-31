import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '../domain/product.types';
import { formatPrice, formatStock } from '@/src/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const stockStatus = formatStock(product.stock);
  const isOutOfStock = product.stock === 0;
  const isNew = product.id > 15; // Simple logic to mock "New" items

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <article className="h-full flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlays/Badges */}
          <div className="absolute inset-0 p-3 flex flex-col justify-between items-start">
            <div className="flex gap-2">
              {isOutOfStock ? (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  SOLD OUT
                </span>
              ) : isNew ? (
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  NEW
                </span>
              ) : null}
            </div>
          </div>

          {/* Quick Action (opacity 0 -> 1 on hover) */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 to-transparent">
            <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 shadow-lg">
              View Details
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </p>
            <h3 className="font-semibold text-gray-900 mt-1 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </div>

          <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-50">
            <div>
              <span className="block text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              <p className={`text-xs mt-0.5 font-medium ${product.stock > 10
                ? 'text-green-600'
                : product.stock > 0
                  ? 'text-yellow-600'
                  : 'text-red-500'
                }`}>
                {stockStatus}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-sm font-semibold text-yellow-700">{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}