// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       "living-fire-dev--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com",
//       "23909229.fs1.hubspotusercontent-na1.net",
//     ],
//   },

//   async headers() {
//     return [
//       {
//         source: "/:path*", // Match any path
//         headers: [
//           {
//             key: "Access-Control-Allow-Origin",
//             value: "*",
//           },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET, POST, OPTIONS",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value: "Content-Type, Authorization",
//           },
//         ],
//       },
//       {
//         source: "/api/sitemap",
//         headers: [{ key: "Content-Type", value: "application/xml" }],
//       },
//       {
//         source: "/api/robots",
//         headers: [{ key: "Content-Type", value: "text/plain" }],
//       },
//     ];
//   },

//   async redirects() {
//     return [
//       {
//         source: "/", // Redirect root path
//         destination: "/home", // Redirect to /home
//         permanent: true, // Use a 301 redirect for SEO
//       },
//       // {
//       //   source:
//       //     "/fireplace-brands/wood-yunca/regency-city-series-san-francisco-bay-40-gas-fireplace/",
//       //   destination: "/product/470",
//       //   permanent: true, // 301 redirect to new path
//       // },
//       // Add more redirections as needed
//     ];
//   },

//   serverComponentsExternalPackages: ["prisma", "pg"],

//   // Enabling experimental features for server actions
//   experimental: {
//     serverActions: true,
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    domains: [
      "living-fire-dev--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com",
      "23909229.fs1.hubspotusercontent-na1.net",
      "www.livingfires.com.au" // Added your domain for local images
    ],
    formats: ['image/avif', 'image/webp'], // Modern image formats
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week cache
  },

  // Security and CORS headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          // CORS headers
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NODE_ENV === 'development' ? "*" : "https://www.livingfires.com.au",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          // Cache headers
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400"
          }
        ],
      },
      // Specific headers for SEO files
      {
        source: "/api/sitemap",
        headers: [
          { key: "Content-Type", value: "application/xml" },
          { key: "Cache-Control", value: "public, max-age=86400, immutable" }
        ],
      },
      {
        source: "/api/robots",
        headers: [
          { key: "Content-Type", value: "text/plain" },
          { key: "Cache-Control", value: "public, max-age=86400, immutable" }
        ],
      },
      // Static assets caching
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // 301 redirect
      },
      // Example product redirect (uncomment when needed)
      // {
      //   source: "/fireplace-brands/wood-yunca/regency-city-series-san-francisco-bay-40-gas-fireplace/",
      //   destination: "/products/regency/san-francisco-bay-40",
      //   permanent: true,
      // },
      // Ensure trailing slashes are consistent
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true
      }
    ];
  },

  // Rewrites for cleaner URLs (if needed)
  async rewrites() {
    return [
      {
        source: '/products/:brand/:product',
        destination: '/product-page?brand=:brand&product=:product' // Example only
      }
    ];
  },

  // Server components configuration
  serverComponentsExternalPackages: ["prisma", "pg"],

  // Experimental features
  experimental: {
    serverActions: true,
    optimizeCss: true, // CSS optimization
    nextScriptWorkers: true, // Better script loading
    scrollRestoration: true, // Better scroll behavior
  },

  // Production optimizations
  productionBrowserSourceMaps: false, // Disable for production
  compress: true, // Enable compression
  reactStrictMode: true, // Recommended for Next.js
  swcMinify: true, // Faster minification
  poweredByHeader: false, // Remove X-Powered-By header

  // Internationalization (if needed in future)
  // i18n: {
  //   locales: ['en-AU'],
  //   defaultLocale: 'en-AU',
  // }
};

export default nextConfig;