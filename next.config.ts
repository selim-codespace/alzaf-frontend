const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alzaf-frontend-2025.vercel.app',
        pathname: '/images/**',
      },
    ],
  },
  // Forcing dynamic rendering for all pages (SSR)
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;