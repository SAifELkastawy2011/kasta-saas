import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack is now top-level (not inside experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Cross-origin for analytics
  crossOrigin: 'anonymous',
  
  // React strict mode
  reactStrictMode: true,
}

export default nextConfig