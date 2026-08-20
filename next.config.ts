import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 75, 95],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "rajeshtiwari.in",
          },
        ],
        destination: "https://www.rajeshtiwari.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
