'use client';

export default function GlobalError({
  //   error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center max-w-md p-8">
            <h2 className="text-2xl font-bold mb-4">Critical Error</h2>
            <p className="text-gray-600 mb-6">
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}