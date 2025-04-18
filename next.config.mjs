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
      {
        source: "/api/sitemap",
        headers: [{ key: "Content-Type", value: "application/xml" }],
      },
      {
        source: "/api/robots",
        headers: [{ key: "Content-Type", value: "text/plain" }],
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
      // {
      //   source:
      //     "/fireplace-brands/wood-yunca/regency-city-series-san-francisco-bay-40-gas-fireplace/",
      //   destination: "/product/470",
      //   permanent: true, // 301 redirect to new path
      // },
      // Add more redirections as needed
    ];
  },

  serverComponentsExternalPackages: ["prisma", "pg"],

  // Enabling experimental features for server actions
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
