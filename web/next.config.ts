import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fremcoltd.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },
      { source: "/my-account", destination: "/request-a-quote", permanent: true },
      { source: "/cart", destination: "/request-a-quote", permanent: true },
      { source: "/checkout", destination: "/request-a-quote", permanent: true },
    ];
  },
};

export default nextConfig;
