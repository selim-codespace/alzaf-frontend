import Image from 'next/image';
import Link from 'next/link';
import { ProductDetails } from '@/src/modules/product/domain/productFillter.types';
import { ProductGrid } from '@/src/modules/product/presentation/productGrid';
import { getProductDetails } from '@/src/modules/product/application/getProductDetails.usCase';
import { formatPrice, formatStock } from '@/src/lib/utils';
import type { Metadata } from 'next';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    try {
        const { id } = await params;
        const details = await getProductDetails(Number(id));
        return {
            title: `${details.product.name} | Alzaf Stor`,
            description: details.product.description,
            openGraph: {
                title: details.product.name,
                description: details.product.description,
                images: [{ url: details.product.image }],
            },
        };
    } catch {
        return {
            title: 'Product Not Found | Alzaf Store',
        };
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const details = await getProductDetails(Number(id));
    return <ProductDetailsView details={details} />;
}

interface ProductDetailsViewProps {
    details: ProductDetails;
}

function ProductDetailsView({ details }: ProductDetailsViewProps) {
    const { product, category, similarProducts } = details;


    const stockStatus = formatStock(product.stock);
    const isOutOfStock = product.stock === 0;

    return (
        <div className="space-y-16 lg:space-y-24">
            {/* Breadcrumb */}
            <nav className="text-sm font-medium" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-gray-500">
                    <li>
                        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                    </li>
                    <li className="text-gray-300">/</li>
                    <li>
                        <Link href={`/?category=${category.slug}`} className="hover:text-green-600 transition-colors">
                            {category.name}
                        </Link>
                    </li>
                    <li className="text-gray-300">/</li>
                    <li className="text-gray-200 truncate max-w-[200px]">{product.name}</li>
                </ol>
            </nav>

            {/* Product Details*/}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                {/* Left Column */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="aspect-square relative bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-100">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-contain p-8 hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {isOutOfStock && (
                            <div className="absolute top-6 right-6">
                                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                                    SOLD OUT
                                </span>
                            </div>
                        )}
                        {product.id > 15 && !isOutOfStock && (
                            <div className="absolute top-6 left-6">
                                <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                                    NEW ARRIVAL
                                </span>
                            </div>
                        )}
                    </div>
                    {/* Placeholder for Thumbnails (Optional in future) */}
                    <div className="grid grid-cols-4 gap-4">
                        {[product.image, product.image, product.image].map((img, i) => (
                            <div key={i} className="aspect-square relative bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:border-blue-500 transition-colors">
                                <Image src={img} alt="" fill className="object-contain p-2" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
                    <div>
                        <Link
                            href={`/?category=${category.slug}`}
                            className="text-green-600 font-semibold tracking-wide uppercase text-sm hover:underline"
                        >
                            {category.name}
                        </Link>
                        <h1 className="text-3xl lg:text-5xl font-bold text-gray-200 mt-3 leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100"> 
                                <span className="font-bold text-yellow-800">{product.rating.toFixed(1)}</span>
                                <span className="text-yellow-600 text-sm ml-1">(128 reviews)</span>
                            </div>
                            <span className="w-px h-6 bg-gray-200"></span>
                            <span className="font-medium text-gray-500">{product.brand}</span>
                        </div>
                    </div>

                    <div className="border-y border-gray-100 py-8 space-y-6">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Price</p>
                                <p className="text-5xl font-bold text-gray-200 tracking-tight">
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                            <div className={`text-right ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                <p className="font-medium">{stockStatus}</p>
                                {product.stock > 0 && product.stock < 10 && (
                                    <p className="text-xs text-orange-500 mt-1 font-medium animate-pulse">Low Stock - Order Soon!</p>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-blue text-gray-600 leading-relaxed">
                            <h3 className="text-lg font-semibold text-gray-200 mb-2">Description</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <button
                            disabled={isOutOfStock}
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed transition-all transform active:scale-95"
                        >
                            {isOutOfStock ? 'Notify Me When Available' : `Add to Cart • ${formatPrice(product.price)}`}
                        </button>
                        <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
                            Add to Wishlist
                        </button>
                    </div>

                    {/* Features / Benefits (Mock) */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">

                            Free Shipping
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            2 Year Warranty
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            30-Day Returns
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Products Section - Enhanced */}
            {similarProducts.length > 0 && (
                <section className="pt-16 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-200">You Might Also Like</h2>
                        <Link href={`/?category=${category.slug}`} className="text-green-600 font-medium hover:underline">
                            View All {category.name} →
                        </Link>
                    </div>
                    <ProductGrid products={similarProducts} />
                </section>
            )}
        </div>
    );
}
