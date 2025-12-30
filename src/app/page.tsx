import { getBanners } from "../modules/banner/application/get-banners.use-case";
import { BannerCarousel } from "../modules/banner/presentation/banner-carousel";
import { getProducts } from "../modules/product/application/get-products.use-case";
import { ProductGrid } from "../modules/product/presentation/product-grid";

 

interface HomePageProps {
  searchParams: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sort?: string;
    page?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Parallel data fetching for optimal performance
  const [banners, productsResult] = await Promise.all([
    getBanners(),
    getProducts({
      category: searchParams.category,
      minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      search: searchParams.search,
      sort: searchParams.sort as any,
      page: searchParams.page ? Number(searchParams.page) : 1,
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