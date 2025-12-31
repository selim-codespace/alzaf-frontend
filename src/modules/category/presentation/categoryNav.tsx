'use client';

import type { Category } from '../domain/category.types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CategoryNavProps {
  categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <nav className="sticky top-[72px] z-40 w-full glass-panel border-b-0 shadow-sm transition-all duration-300" aria-label="Category navigation">
      <div className="w-full overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto py-3 px-4 scrollbar-hide mask-fade md:justify-center">
          {/* "All" Linkss */}
          <Link
            href="/#products"
            className={`relative w-fit px-6 py-2 rounded-full text-nowrap text-sm font-semibold transition-all duration-300 group border ${!currentCategory
              ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            All Products

          </Link>
 
          <div className="hidden md:block w-px h-6 bg-gray-200 mx-2" />

          {/* Categories */}
          {categories.map((category) => {
            const isActive = currentCategory === category.slug;
            return (
              <Link
                key={category.id}
                // /products?category=Electronics
                href={`/?category=${category.slug}#products`}
                className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border ${isActive
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}