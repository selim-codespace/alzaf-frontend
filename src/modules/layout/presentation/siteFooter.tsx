import Link from "next/link"
import { Category } from "../../category/domain/category.types"

const Footer = ({ categories }: { categories: Category[] }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white mb-6 block">Alzaf Store</Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevating your shopping experience with curated products and exceptional service. Quality you can trust.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer">
                <span className="text-xs">fb</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                <span className="text-xs">tw</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 tracking-wide uppercase text-sm">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">All Products</Link></li>
              <li><Link href="/?sort=rating-desc" className="hover:text-blue-400 transition-colors">Top Rated</Link></li>
              <li><Link href="/?sort=price-asc" className="hover:text-blue-400 transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 tracking-wide uppercase text-sm">Categories</h3>
            <ul className="space-y-4 text-sm">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/?category=${category.slug}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 tracking-wide uppercase text-sm">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Alzaf Store. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer