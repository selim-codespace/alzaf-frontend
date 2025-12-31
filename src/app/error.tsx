'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md"> 
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
