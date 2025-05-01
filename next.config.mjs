
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Image optimization settings
//   images: {
//     domains: [
//       "living-fire-dev--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com",
//       "23909229.fs1.hubspotusercontent-na1.net",
//       "www.livingfires.com.au" // Added your domain for local images
//     ],
//     formats: ['image/avif', 'image/webp'], // Modern image formats
//     minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week cache
//   },

//   // Security and CORS headers
//   async headers() {
//     return [
//       {
//         source: "/:path*",
//         headers: [
//           // Security headers
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff"
//           },
//           {
//             key: "X-Frame-Options",
//             value: "SAMEORIGIN"
//           },
//           {
//             key: "X-XSS-Protection",
//             value: "1; mode=block"
//           },
//           // CORS headers
//           {
//             key: "Access-Control-Allow-Origin",
//             value: process.env.NODE_ENV === 'development' ? "*" : "https://www.livingfires.com.au",
//           },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET, POST, OPTIONS",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value: "Content-Type, Authorization, X-Requested-With",
//           },
//           // Cache headers
//           {
//             key: "Cache-Control",
//             value: "public, max-age=3600, stale-while-revalidate=86400"
//           }
//         ],
//       },
//       // Specific headers for SEO files
//       {
//         source: "/sitemap",
//         headers: [
//           { key: "Content-Type", value: "application/xml" },
//           { key: "Cache-Control", value: "public, max-age=86400, immutable" }
//         ],
//       },
//       {
//         source: "/robots",
//         headers: [
//           { key: "Content-Type", value: "text/plain" },
//           { key: "Cache-Control", value: "public, max-age=86400, immutable" }
//         ],
//       },
//       // Static assets caching
//       {
//         source: "/:all*(svg|jpg|png|webp|avif|woff2)",
//         headers: [
//           {
//             key: "Cache-Control",
//             value: "public, max-age=31536000, immutable"
//           }
//         ]
//       }
//     ];
//   },

//   // Redirects for SEO
//   async redirects() {
//     return [
//       // {
//       //   source: "/",
//       //   destination: "/home",
//       //   permanent: true, // 301 redirect
//       // },
//       // Example product redirect (uncomment when needed)
//       // {
//       //   source: "/fireplace-brands/wood-yunca/regency-city-series-san-francisco-bay-40-gas-fireplace/",
//       //   destination: "/products/regency/san-francisco-bay-40",
//       //   permanent: true,
//       // },
//       // Ensure trailing slashes are consistent
//       {
//         source: "/:path+/",
//         destination: "/:path+",
//         permanent: true
//       }
//     ];
//   },

//   // Rewrites for cleaner URLs (if needed)
//   async rewrites() {
//     return [
//       {
//         source: '/products/:brand/:product',
//         destination: '/product-page?brand=:brand&product=:product' // Example only
//       }
//     ];
//   },

//   // Server components configuration
//   serverComponentsExternalPackages: ["prisma", "pg"],

//   // Experimental features
//   experimental: {
//     serverActions: true,
//     optimizeCss: true, // CSS optimization
//     nextScriptWorkers: true, // Better script loading
//     scrollRestoration: true, // Better scroll behavior
//   },

//   // Production optimizations
//   productionBrowserSourceMaps: false, // Disable for production
//   compress: true, // Enable compression
//   reactStrictMode: true, // Recommended for Next.js
//   swcMinify: true, // Faster minification
//   poweredByHeader: false, // Remove X-Powered-By header

//   // Internationalization (if needed in future)
//   // i18n: {
//   //   locales: ['en-AU'],
//   //   defaultLocale: 'en-AU',
//   // }
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enhanced Image Optimization
  images: {
    domains: [
      "living-fire-dev--use1-az4--x-s3.s3express-use1-az4.us-east-1.amazonaws.com",
      "23909229.fs1.hubspotusercontent-na1.net",
      "www.livingfires.com.au",
      "livingfires.com.au" // Added root domain
    ],
    formats: ['image/webp'], // Removed avif for wider compatibility
    minimumCacheTTL: 60 * 60 * 24 * 30, // Increased to 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Added more sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Thumbnail sizes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.livingfires.com.au',
      },
    ],
  },

  // Security and CORS headers (optimized)
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
      }
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders.concat([
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
            // process.env.NODE_ENV === 'development' 
            //   ? '*' 
            //   : 'https://www.livingfires.com.au'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ])
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|gif|ico|svg|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Enhanced Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/fireplaces/:path*',
        destination: '/products/:path*',
        permanent: true
      },
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true
      }
    ];
  },

  // Production Optimizations
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Advanced Experimental Features
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: true,
    scrollRestoration: true,
    serverActions: true,
    optimizeServerReact: true,
    largePageDataBytes: 256 * 1024, // 256KB
    turbo: true,
    // {
    //   loaders: {
    //     '.svg': ['@svgr/webpack'],
    //   },
    // },
    instrumentationHook: true,
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Client-side only optimizations
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 244 * 1024, // 244KB
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // SVG optimization
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack'],
    // });

    return config;
  },

  // Environment variables
  env: {
    SITE_URL: process.env.NODE_ENV === 'development'
      ? 'https://www.livingfires.com.au'
      : 'http://localhost:3000',
  }
};

export default nextConfig;