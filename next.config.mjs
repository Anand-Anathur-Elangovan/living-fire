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
        source: "/:path*", // Match any path
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

  async redirects() {
    return [
      {
        source: "/", // Redirect root path
        destination: "/home", // Redirect to /home
        permanent: true, // Use a 301 redirect for SEO
      },
    ];
  },

  serverComponentsExternalPackages: ["prisma", "pg"],

  // Enabling experimental features for server actions
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
