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
            value: "rajeshtiwari.com",
          },
        ],
        destination: "https://www.rajeshtiwari.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
