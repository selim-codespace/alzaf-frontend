'use client';

import { useEffect } from 'react';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product page error:', error);
  }, [error]);

  const isServerError = error.message.includes('500') || error.message.includes('Server');

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isServerError ? 'Server Error' : 'Something went wrong'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isServerError
            ? 'This product is currently unavailable. (Note: Product ID 1 always returns 500)'
            : error.message}
        </p>
        <button
          onClick={reset}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}