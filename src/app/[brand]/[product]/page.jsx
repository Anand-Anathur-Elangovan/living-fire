// import Product from "./Product";

// export async function generateMetadata({ params }) {
//   const formatName =  (name) => (name?.includes("_") ? name.replace(/_/g, " ") : name);

//   const brand =  params?.brand ? formatName(params?.brand) : "Premium";
//   const product = params?.product ? formatName(params?.product) : "Fireplace";

//   return {
//       title: `${product} by ${brand} Brand | Living Fire`,
//       description: `Discover the ${product} by ${brand}, a premium fireplace designed for elegance and performance.`,
//       keywords: `${product}, ${brand} fireplaces, modern ${product}, luxury fireplaces, ${brand} heating solutions, designer fireplaces`,
//       alternates: {
//           canonical: `https://livingfires.com.au/${encodeURIComponent(brand)}/${encodeURIComponent(product)}`,
//       },
//       robots: "index, follow",
//   };
// }

// export default function Page({ params }) {
//   return <Product params={params}/>;
// }
// import Product from "./Product";
// import { cookies } from 'next/headers';
// // Helper function to format text for URLs and display
// const formatName = (name) => 
//   name ? decodeURIComponent(name).replace(/_/g, " ").trim() : "";

// // Preload critical product data (adjust based on your CMS/database)
// const preloadProductData = async (brand, product) => {
//   // Replace with actual data fetching logic
//   return {
//     brandName: brand || "Premium",
//     productName: product || "Fireplace",
//     category: "Fireplace", // Example: "Gas Fireplace", "Wood Burner"
//     features: ["energy-efficient", "modern design"] // Example features
//   };
// };

// export async function generateMetadata({ params }) {
//   const { brand, product } = params;
//   const { brandName, productName, category, features } = await preloadProductData(
//     formatName(brand),
//     formatName(product)
//   );
//   const cookieStore = cookies();
//   const fuelTypeName = cookieStore.get("fuelTypeName")?.value;
//   // SEO-optimized strings
//   const seoTitle = `${productName} | ${brandName} ${category} | Living Fire Australia`;
//   const seoDescription = `Explore the ${productName} ${category.toLowerCase()} by ${brandName}. ${features.join(", ")}. Premium quality for Australian homes.`;
//   const canonicalUrl = `https://livingfires.com.au/${encodeURIComponent(brandName.replace(/ /g, "_"))}/${encodeURIComponent(productName.replace(/ /g, "_"))}`;

//   return {
//     title: seoTitle,
//     description: seoDescription,
//     keywords: [
//       `${productName}`,
//       `${brandName} ${category}`,
//       `${category} Australia`,
//       `buy ${productName}`,
//       ...features.map(f => `${f} ${category}`),
//       "Living Fire"
//     ].join(", "),
//     alternates: {
//       canonical: canonicalUrl,
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: false,
//       googleBot: {
//         index: true,
//         follow: true,
//         noimageindex: false,
//       },
//     },
//     openGraph: {
//       title: seoTitle,
//       description: seoDescription,
//       url: canonicalUrl,
//       siteName: "Living Fires",
//       images: [
//         {
//           url: `https://livingfires.com.au/api/og?title=${encodeURIComponent(productName)}&brand=${encodeURIComponent(brandName)}`, // Dynamic OG image
//           width: 1200,
//           height: 630,
//           alt: `${productName} by ${brandName}`,
//         },
//       ],
//       locale: "en_AU",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seoTitle,
//       description: seoDescription,
//       images: [
//         {
//           url: `https://livingfires.com.au/api/og?title=${encodeURIComponent(productName)}&brand=${encodeURIComponent(brandName)}`,
//           alt: `${productName} by ${brandName}`,
//         },
//       ],
//     },
//   };
// }

// // Performance optimization: Statically generate popular pages
// export async function generateStaticParams() {
//   // Replace with actual top products from your CMS/database
//   const topProducts = [
//     { brand: "Regency", product: "FG39" },
//     { brand: "Paul_Agnew_Designs", product: "Ilektro_1250_Landscape_Tunnel" },
//   ];
  
//   return topProducts.map(({ brand, product }) => ({
//     brand: brand.toLowerCase(),
//     product: product.toLowerCase(),
//   }));
// }

// export default function Page({ params }) {
//   return <Product params={params} />;
// }


import Product from "./Product";
import { cookies } from 'next/headers';
import { regencyProductsMetaData } from '@/src/components/metaData/regencyProductsMetaData';
import { hergomProductsMetaData } from '@/src/components/metaData/hergomProductsMetaData';
import { morsoProductsMetaData } from '@/src/components/metaData/morsoProductsMetaData';
import { adfProductsMetaData } from '@/src/components/metaData/adfProductsMetaData';
import { austroflammProductsMetaData } from '@/src/components/metaData/austroflammProductsMetaData';
import { kaloraProductsMetaData } from '@/src/components/metaData/kaloraProductsMetaData';
import { paulAgnewProductsMetaData } from '@/src/components/metaData/paulAgnewProductsMetaData';
import { simpleProductLayoutMetaData } from '@/src/components/metaData/simpleProductLayoutMetaData';
import { heatmasterProductsMetaData } from '@/src/components/metaData/heatmasterProductsMetaData';

import { eurostoveProductsMetaData } from '@/src/components/metaData/eurostoveProductsMetaData';
// Combine all metadata arrays into one searchable collection
const allProductsMetaData = [
  ...regencyProductsMetaData,
  ...hergomProductsMetaData,
  ...morsoProductsMetaData,
  ...adfProductsMetaData,
  ...austroflammProductsMetaData,
  ...kaloraProductsMetaData,
  ...paulAgnewProductsMetaData,
  ...simpleProductLayoutMetaData,
  ...heatmasterProductsMetaData, 
  ...eurostoveProductsMetaData
];

export async function generateMetadata({ params }) {
  const { brand, product } = params;
  const slug = product.toLowerCase();
  
  // Find matching product metadata
  const productMeta = allProductsMetaData.find(
    item => item.slug === slug && item.brand.toLowerCase().replace(/ /g, '-') === brand.toLowerCase()
  );

  // Fallback metadata if product not found
  if (!productMeta) {
    return {
      title: `${product.replace(/-/g, ' ')} | ${brand.replace(/-/g, ' ')} | Living Fire Australia`,
      description: `Explore our premium ${brand.replace(/-/g, ' ')} ${product.replace(/-/g, ' ')} fireplace at Living Fire.`,
      alternates: {
        canonical: `https://livingfires.com.au/${brand}/${product}`,
      },
      robots: {
        index: false, // Don't index if product not found
        follow: true,
      }
    };
  }

  const canonicalUrl = `https://livingfires.com.au/${brand}/${product}`;
  const imageUrl = `https://livingfires.com.au/image/${product}`;

  return {
    title: productMeta.title,
    description: productMeta.description,
    keywords: productMeta.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    openGraph: {
      title: productMeta.title,
      description: productMeta.description,
      url: canonicalUrl,
      siteName: "Living Fire Australia",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: productMeta.title,
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: productMeta.title,
      description: productMeta.description,
      images: [
        {
          url: imageUrl,
          alt: productMeta.title,
        },
      ],
    },
    additionalMetaTags: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#ffffff",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
    ],
  };
}

export async function generateStaticParams() {
  // Generate static paths for all products
  return allProductsMetaData.map(product => ({
    brand: product.brand.toLowerCase().replace(/ /g, '-'),
    product: product.slug,
  }));
}

export default function Page({ params }) {
  return <Product params={params} />;
}