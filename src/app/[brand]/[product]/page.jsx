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
import Product from "./Product";
import { cookies } from 'next/headers';
// Helper function to format text for URLs and display
const formatName = (name) => 
  name ? decodeURIComponent(name).replace(/_/g, " ").trim() : "";

// Preload critical product data (adjust based on your CMS/database)
const preloadProductData = async (brand, product) => {
  // Replace with actual data fetching logic
  return {
    brandName: brand || "Premium",
    productName: product || "Fireplace",
    category: "Fireplace", // Example: "Gas Fireplace", "Wood Burner"
    features: ["energy-efficient", "modern design"] // Example features
  };
};

export async function generateMetadata({ params }) {
  const { brand, product } = params;
  const { brandName, productName, category, features } = await preloadProductData(
    formatName(brand),
    formatName(product)
  );
  const cookieStore = cookies();
  const fuelTypeName = cookieStore.get("fuelTypeName")?.value;
  console.log("fuelTypeName", fuelTypeName&&fuelTypeName)
  // SEO-optimized strings
  const seoTitle = `${productName} | ${brandName} ${category} | Living Fire Australia`;
  const seoDescription = `Explore the ${productName} ${category.toLowerCase()} by ${brandName}. ${features.join(", ")}. Premium quality for Australian homes.`;
  const canonicalUrl = `https://livingfires.com.au/${encodeURIComponent(brandName.replace(/ /g, "_"))}/${encodeURIComponent(productName.replace(/ /g, "_"))}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      `${productName}`,
      `${brandName} ${category}`,
      `${category} Australia`,
      `buy ${productName}`,
      ...features.map(f => `${f} ${category}`),
      "Living Fire"
    ].join(", "),
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
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: "Living Fires",
      images: [
        {
          url: `https://livingfires.com.au/api/og?title=${encodeURIComponent(productName)}&brand=${encodeURIComponent(brandName)}`, // Dynamic OG image
          width: 1200,
          height: 630,
          alt: `${productName} by ${brandName}`,
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: `https://livingfires.com.au/api/og?title=${encodeURIComponent(productName)}&brand=${encodeURIComponent(brandName)}`,
          alt: `${productName} by ${brandName}`,
        },
      ],
    },
  };
}

// Performance optimization: Statically generate popular pages
export async function generateStaticParams() {
  // Replace with actual top products from your CMS/database
  const topProducts = [
    { brand: "Regency", product: "FG39" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_1250_Landscape_Tunnel" },
  ];
  
  return topProducts.map(({ brand, product }) => ({
    brand: brand.toLowerCase(),
    product: product.toLowerCase(),
  }));
}

export default function Page({ params }) {
  return <Product params={params} />;
}