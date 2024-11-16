// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "living-fire-dev--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com",
      "23909229.fs1.hubspotusercontent-na1.net",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*", // Updated to match any path
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
