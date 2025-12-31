import { Suspense } from 'react';
import { getBanners } from '../modules/banner/application/getBanners.useCase';
import { BannerCarousel } from '../modules/banner/presentation/bannerCarousel';
import { getProducts } from '../modules/product/application/getProducts.useCase';
import { ProductGrid } from '../modules/product/presentation/productGrid';
import { Pagination } from '../shared/presentation/pagination';
import { ProductFilters } from '../shared/presentation/productFillters';
import { isValidSortOption } from '../lib/utils';

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  // Validate sort parameter
  const sort = isValidSortOption(params.sort) ? params.sort : undefined;

  // Parallel data fetching for optimal performance
  const [banners, productsResult] = await Promise.all([
    getBanners(),
    getProducts({
      category: params.category,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      search: params.search,
      sort,
      page: params.page ? Number(params.page) : 1,
      limit: 12,
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Banner Carousel */}
      <BannerCarousel banners={banners} />

      {/* Filters */}
      <section>
        <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse rounded-lg" />}>
          <ProductFilters />
        </Suspense>
      </section>

      {/* Products Section */}
      <section id="products" className="scroll-mt-32">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {params.category ? `Category: ${params.category}` : 'All Products'}
          </h2>
          <p className="text-gray-500">
            {productsResult.pagination.totalProducts} products found
          </p>
        </div>

        <ProductGrid products={productsResult.products} />

        {/* Pagination */}
        <Suspense fallback={null}>
          <Pagination pagination={productsResult.pagination} />
        </Suspense>
      </section>
    </div>
  );
}