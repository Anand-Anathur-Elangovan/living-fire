// import Filters from "./Filters";
// import  brandsMetaData  from "@/src/components/metaData/brandsMetaData";
// import  fireplaceTypeMetaData from "@/src/components/metaData/FireplaceTypeMetaData";
// import  categoryTypeMetaData  from "@/src/components/metaData/categoryTypeMetaData";
// import  glassorientationTypeMetaData from "@/src/components/metaData/glassorientationTypeMetaData";
// import  installationTypeMetaData  from "@/src/components/metaData/installationTypeMetaData";

// export async function generateMetadata({ params }) {

//   if (!params?.filters || params.filters.length === 0) {
//     return {
//       title: "Living Fire - Explore Our Fireplaces",
//       description: "Discover premium fireplaces from Living Fire.",
//     };
//   }

//   // Convert filter parameters into a readable format
//   const formatName = (name) => name.replace(/_/g, " ");

//   // Decode filters from the URL (e.g., ["gas", "wall_mounted", "modern"])
//   const filters = params?.filters.map(formatName);

//   return {
//     title: `Filtered Fireplaces: ${filters.join(", ")} | Living Fire`,
//     description: `Explore fireplaces with filters: ${filters.join(
//       ", "
//     )} at Living Fire.`,
//     keywords: filters.join(", "),
//     alternates: {
//       canonical: `https://livingfires.com.au/allProducts/${filters
//         .map(encodeURIComponent)
//         .join("/")}`,
//     },
//     robots: "index, follow",
//   };
// }

// export default async function Page({ params }) {
//   console.log("params in Page [filter]:", await params); // Debugging
//   console.log("[filter]")
//   if (!params?.filters || params.filters.length === 0) {
//     return <p>Loading...</p>;
//   }

//   const formatName = (name) => name.replace(/_/g, " ");
//   const filters = params?.filters.map(formatName);

//   return <Filters params={params} />;
// }

import Filters from "./Filters";
import brandsMetaData from "@/src/components/metaData/brandsMetaData";
import fireplaceTypeMetaData from "@/src/components/metaData/FireplaceTypeMetaData";
import categoryTypeMetaData from "@/src/components/metaData/categoryTypeMetaData";
import glassorientationTypeMetaData from "@/src/components/metaData/glassorientationTypeMetaData";
import installationTypeMetaData from "@/src/components/metaData/installationTypeMetaData";

// 1. Special combinations metadata (order-independent matches)
const specialCombinationsMetaData = [
  {
    filters: ["Three Sided", "wood"],
    title: "Three Sided Wood Fireplace | Living Fire",
    description: "Experience warmth and style with our three-sided wood fireplace. Perfect for cozy gatherings, its elegant design enhances any living space.",
    keywords: ["Three Sided", "Wood", "wood burning", "contemporary fireplaces"]
  },
  {
    filters: ["Two Sided", "wood"],
    title: "Double Sided Wood Fireplaces | Living Fire",
    description: "Explore double-sided wood fireplaces for a cozy ambiance. Stylish designs, efficient heating. Perfect for any home. Transform your space today!",
    keywords: ["Two Sided", "Wood", "wood burning", "contemporary fireplaces"]
  },
  {
    filters: ["Inbuilt", "wood"],
    title: "Inbuilt Wood Fireplaces - Home Décor | Living Fire Australia",
    description: "Transform your living space with our range of inbuilt wood fireplaces. Crafted with precision and designed to integrate into your home seamlessly.",
    keywords: ["Inbuilt", "Wood", "wood burning", "contemporary fireplaces"]
  },
  // {
  //   filters: ["gas", "wall mounted", "modern"],
  //   title: "Modern Wall Mounted Gas Fireplaces | Living Fire",
  //   description: "Contemporary wall mounted gas fireplaces with sleek designs and efficient heating. Explore our premium collection at Living Fire.",
  //   keywords: ["gas fireplace", "modern", "wall mounted", "contemporary"]
  // }
  // Add more combinations as needed
];

// 2. Pre-processed metadata maps for O(1) access
const createMetadataMap = (data) => new Map(
  data.map(item => [
    item.name.toLowerCase().replace(/%20/g, ' '), // Normalize brand names
    item
  ])
);

const metaDataMaps = {
  brand: createMetadataMap(brandsMetaData),
  fireplace: createMetadataMap(fireplaceTypeMetaData),
  category: createMetadataMap(categoryTypeMetaData),
  glassorientation: createMetadataMap(glassorientationTypeMetaData),
  installation: createMetadataMap(installationTypeMetaData)
};

// 3. Special combinations lookup map
const specialCombinationsMap = new Map(
  specialCombinationsMetaData.map(item => [
    item.filters.map(f => f.toLowerCase()).sort().join(','), 
    item
  ])
);

// 4. Helper functions
const formatFilter = (filter) => 
  decodeURIComponent(filter).replace(/_/g, ' ').toLowerCase();

const generateOptimalTitle = (filters) => {
  const relevantFilters = filters.slice(0, 4);
  let baseTitle = `${relevantFilters.join(" | ")} | Living Fire`;
  
  // SEO length optimization (30-65 chars)
  if (baseTitle.length < 30) {
    baseTitle = `${baseTitle} | Premium Fireplace Collection`;
  } 
  else if (baseTitle.length > 65) {
    baseTitle = `${relevantFilters.slice(0, 3).join(" | ")} Fireplaces | Living Fire`;
  }
  
  return baseTitle;
};

const generateOptimalDescription = (filters) => {
  const relevantFilters = filters.slice(0, 4);
  let baseDescription = `Explore our ${relevantFilters.join(" ")} fireplace collection. ` +
                       `Premium quality, innovative designs at Living Fire.`;
  
  // SEO length optimization (120-320 chars)
  if (baseDescription.length < 120) {
    baseDescription += ` Discover the perfect fireplace for your home with expert advice.`;
  } 
  else if (baseDescription.length > 320) {
    baseDescription = `Browse ${relevantFilters.slice(0, 3).join(" ")} fireplaces. ` +
                     `Premium quality and innovative designs at Living Fire Australia.`;
  }
  
  return baseDescription;
};

// 5. Main metadata generator
export async function generateMetadata({ params }) {
  // Default metadata
  const defaultMetadata = {
    title: "Premium Fireplaces Collection | Living Fire Australia",
    description: "Discover Australia's finest fireplace collection. Gas, wood & electric fireplaces with premium designs and expert installation.",
    alternates: {
      canonical: "https://livingfires.com.au/allProducts"
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false
      }
    }
  };

  const awaitedParams = await params;
  const filters = await awaitedParams?.filters || [];

  if (filters?.length === 0) {
    return defaultMetadata;
  }

  // Normalize and sort filters
  const normalizedFilters = await params?.filters.map(formatFilter);
  const sortedFilterKey = [...normalizedFilters].sort().join(',');

  // Check for special combinations first
  if (specialCombinationsMap.has(sortedFilterKey)) {
    const { title, description, keywords } = specialCombinationsMap.get(sortedFilterKey);
    return {
      title,
      description,
      keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
      alternates: {
        canonical: `https://livingfires.com.au/allProducts/${params?.filters.join("/")}`
      },
      robots: defaultMetadata.robots
    };
  }

  // Find matching metadata
  const matchedMetadata = [];
  for (const [type, map] of Object.entries(metaDataMaps)) {
    for (const filter of normalizedFilters) {
      if (map.has(filter)) {
        matchedMetadata.push(map.get(filter));
        break; // Only first match per type
      }
    }
  }

  // Prepare metadata
  const displayFilters = normalizedFilters.map(f => 
    f.charAt(0).toUpperCase() + f.slice(1)
  );

  // Single exact match case
  if (matchedMetadata.length === 1) {
    const meta = matchedMetadata[0];
    return {
      title: meta.title || generateOptimalTitle(displayFilters),
      description: meta.description || generateOptimalDescription(displayFilters),
      keywords: Array.isArray(meta.keywords) ? 
               meta.keywords.join(", ") : 
               meta.keywords || displayFilters.join(", "),
      alternates: {
        canonical: `https://livingfires.com.au/allProducts/${params?.filters?.join("/")}`
      },
      robots: defaultMetadata.robots
    };
  }

  // Multiple filters case
  return {
    title: generateOptimalTitle(displayFilters),
    description: generateOptimalDescription(displayFilters),
    keywords: matchedMetadata.length > 0 ?
      matchedMetadata
        .map(m => Array.isArray(m.keywords) ? m.keywords.join(", ") : m.keywords)
        .filter(Boolean)
        .join(", ") :
      displayFilters.join(", "),
    alternates: {
      canonical: `https://livingfires.com.au/allProducts/${params?.filters?.join("/")}`
    },
    robots: defaultMetadata.robots
  };
}

// 6. Page component
export default async function Page({ params }) {
  // Safely await params
  // const awaitedParams = await params;
  // const filters = awaitedParams?.filters || [];
  const filters = params?.filters || [];

  if (filters.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Loading Fireplace Collection...</h1>
      </div>
    );
  }

  return <Filters params={{ filters } } />;
}