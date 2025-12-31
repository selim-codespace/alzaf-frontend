import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="text-center max-w-md"> 
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
          It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/?sort=rating-desc"
            className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Top Products
          </Link>
        </div>
      </div>
    </div>
  );
}