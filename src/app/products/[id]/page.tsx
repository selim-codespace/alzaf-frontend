import { ProductDetails } from "@/src/modules/product/domain/product-filter.types";
import { ProductGrid } from "@/src/modules/product/presentation/product-grid";
import { getProductDetails } from "@/src/modules/product/application/get-product-details.use-case";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const productId = Number(id);
    const details = await getProductDetails(productId);

    return <ProductDetailsView details={details} />;
}

interface ProductDetailsViewProps {
    details: ProductDetails;
}

export function ProductDetailsView({ details }: ProductDetailsViewProps) {
    const { product, category, similarProducts } = details;

    return (
        <div className="space-y-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500">
                <ol className="flex items-center gap-2">
                    <li>Home</li>
                    <li>/</li>
                    <li>{category.name}</li>
                    <li>/</li>
                    <li className="text-gray-900">{product.name}</li>
                </ol>
            </nav>

            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="space-y-6">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">
                            {product.brand}
                        </p>
                        <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-lg ${i < Math.floor(product.rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating} out of 5
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="border-t border-b py-4">
                        <p className="text-4xl font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="font-semibold text-lg mb-2">Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Stock & Category */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Stock:</span>
                            <span
                                className={`font-medium ${product.stock > 10
                                        ? 'text-green-600'
                                        : product.stock > 0
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                    }`}
                            >
                                {product.stock > 0
                                    ? `${product.stock} available`
                                    : 'Out of stock'}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                        <button
                            disabled={product.stock === 0}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
                    <ProductGrid products={similarProducts} />
                </div>
            )}
        </div>
    );
}
