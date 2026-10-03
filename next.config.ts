import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static HTML for Cloudflare Pages. Security headers live in public/_headers
  // because an export has no server to apply next.config headers.
  output: 'export',
  poweredByHeader: false,
  images: {
    // The default loader needs a Next server. Pages serves the original files.
    unoptimized: true,
  },
};

export default nextConfig;
