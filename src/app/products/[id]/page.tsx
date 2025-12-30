import { getProductDetails } from "@/src/modules/product/application/get-product-details.use-case";
import { ProductGrid } from "@/src/modules/product/presentation/product-grid";

 

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.id);
  const details = await getProductDetails(productId);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={details.product.image}
            alt={details.product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500">{details.product.brand}</p>
          <h1 className="text-3xl font-bold mt-2">{details.product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">★</span>
            <span>{details.product.rating}</span>
          </div>
          <p className="text-3xl font-bold mt-4">${details.product.price}</p>
          <p className="mt-4 text-gray-600">{details.product.description}</p>
          <p className="mt-4 text-sm">
            Stock: <span className="font-medium">{details.product.stock}</span>
          </p>
        </div>
      </div>

      {details.similarProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <ProductGrid products={details.similarProducts} />
        </div>
      )}
    </div>
  );
}