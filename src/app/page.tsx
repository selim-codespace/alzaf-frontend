import { getBanners } from "../modules/banner/application/get-banners.use-case";
import { BannerCarousel } from "../modules/banner/presentation/banner-carousel";
import { getProducts } from "../modules/product/application/get-products.use-case";
import { ProductGrid } from "../modules/product/presentation/product-grid";



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

  // Parallel data fetching for optimal performance
  const [banners, productsResult] = await Promise.all([
    getBanners(),
    getProducts({
      category: params.category,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      search: params.search,
      sort: params.sort as any,
      page: params.page ? Number(params.page) : 1,
      limit: 12,
    }),
  ]);


  return (
    <>
      <BannerCarousel banners={banners} />
      <div className="mt-8">
        <ProductGrid products={productsResult.products} />
      </div>
    </>
  );
}