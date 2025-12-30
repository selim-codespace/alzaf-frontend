import type { Category } from '../domain/category.types';
import Link from 'next/link';

interface CategoryNavProps {
  categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <ul className="flex gap-8 overflow-x-auto py-4">
          <li>
            <Link href="/" className="hover:text-blue-600 whitespace-nowrap">
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/?category=${category.slug}`}
                className="hover:text-blue-600 whitespace-nowrap"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}