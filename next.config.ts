import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve the standalone branded 404 for unmatched routes.
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  images: { minimumCacheTTL: 86400 },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    }];
  },
  async redirects() {
    return [
      { source: "/reservar", destination: "/reservation", permanent: true },
      { source: "/en/reservar", destination: "/en/reservation", permanent: true },
      { source: "/nl/reservar", destination: "/nl/reservation", permanent: true },
    ];
  },
};

export default nextConfig;
