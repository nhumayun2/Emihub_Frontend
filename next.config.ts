import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // This was likely already here

  // Add this 'images' configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // Allow any path on this host
      },
    ],
  },
};

export default nextConfig;
