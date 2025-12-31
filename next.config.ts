import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alzaf-frontend-2025.vercel.app',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;