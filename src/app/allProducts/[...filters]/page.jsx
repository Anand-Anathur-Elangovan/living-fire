import Filters from "./Filters";
import brandsMetaData from "@/src/components/metaData/brandsMetaData";
import fireplaceTypeMetaData from "@/src/components/metaData/FireplaceTypeMetaData";
import categoryTypeMetaData from "@/src/components/metaData/categoryTypeMetaData";
import glassorientationTypeMetaData from "@/src/components/metaData/glassorientationTypeMetaData";
import installationTypeMetaData from "@/src/components/metaData/installationTypeMetaData";

// 1. Special combinations metadata
const specialCombinationsMetaData = [
  {
    filters: ["three-sided", "wood"],
    title: "Three Sided Wood Fireplace | Living Fire Australia",
    description:
      "Experience 270° views with our three-sided wood fireplaces. Premium craftsmanship for Australian homes.",
    keywords: [
      "three sided wood fireplace",
      "panoramic wood burner",
      "living fires australia",
    ],
    ogImage: "/og/three-sided-wood.jpg",
  },
  {
    filters: ["two-sided", "wood"],
    title: "Double Sided Wood Fireplaces | Living Fire",
    description:
      "Stylish two-sided wood fireplaces creating perfect room dividers for Australian living spaces.",
    keywords: [
      "double sided wood fireplace",
      "room divider fireplace",
      "living fires australia",
    ],
    ogImage: "/og/two-sided-wood.jpg",
  },
  {
    filters: ["inbuilt", "wood"],
    title: "Built-In Wood Fireplaces | Seamless Installation | Living Fire",
    description:
      "Custom inbuilt wood fireplaces designed for Australian homes with premium materials.",
    keywords: [
      "built in wood fireplace",
      "custom fireplace installation",
      "living fires australia",
    ],
    ogImage: "/og/inbuilt-wood.jpg",
  },
  {
    filters: ["wood"],
    title: "Wood Fireplaces | Modern Wooden Fireplaces - Living Fire",
    description: "Discover the pinnacle of luxury with our wooden fireplace range, offering exquisite design and unmatched warmth for your home. Delivery across Australia.",
    keywords: ["wood fireplaces", "modern wooden fireplaces", "luxury wood heaters", "Australian made fireplaces"],
    ogImage: "/og/wood-fireplaces.jpg"
  },
  {
    filters: ["wood", "inbuilt", "single-sided"],
    title: "Single Sided Fireplaces - Living Fire",
    description: "",
    keywords: ["single sided wood fireplace", "inbuilt wood heater", "modern fireplace design"],
    ogImage: "/og/single-sided-wood.jpg"
  },
  {
    filters: ["cast-iron", "wood"],
    title: "Cast Iron - Living Fire",
    description: "Elevate your home ambiance with our durable cast iron wood stove. Efficient heating and classic design for cozy comfort. Explore our selection today!",
    keywords: ["cast iron wood stove", "vintage fireplace", "classic wood heater"],
    ogImage: "/og/cast-iron-wood.jpg"
  },
  {
    filters: ["wood", "freestanding"],
    title: "Freestanding Wood Fireplaces - Living Fire",
    description: "Elevate your home's ambiance with our exquisite free-standing wood fireplace. Timeless design meets warmth and elegance. Explore now!",
    keywords: ["freestanding wood fireplace", "standalone wood heater", "modern wood stove"],
    ogImage: "/og/freestanding-wood.jpg"
  },
  {
    filters: ["wood", "two-sided"],
    title: "Double Sided Wood Fireplaces | Living Fire",
    description: "Explore double-sided wood fireplaces for a cozy ambiance. Stylish designs, efficient heating. Perfect for any home. Transform your space today!",
    keywords: ["double sided wood fireplace", "see through wood heater", "two sided wood burner"],
    ogImage: "/og/two-sided-wood.jpg"
  },
  {
    filters: ["wood", "three-sided"],
    title: "Three Sided Wood Fireplace | Living Fire",
    description: "Experience warmth and style with our three-sided wood fireplace. Perfect for cozy gatherings, its elegant design enhances any living space.",
    keywords: ["three sided wood fireplace", "panoramic wood burner", "270 degree fireplace"],
    ogImage: "/og/three-sided-wood.jpg"
  },
  {
    filters: ["wood", "inbuilt"],
    title: "Inbuilt Wood Fireplaces - Home Décor | Living Fire Australia",
    description: "",
    keywords: ["inbuilt wood fireplace", "built in wood heater", "custom wood fireplaces"],
    ogImage: "/og/inbuilt-wood.jpg"
  },
  {
    filters: ["wood", "outdoor"],
    title: "Outdoor Wood Fireplaces | Living Fire",
    description: "Elevate your outdoor living with our stunning wood fireplaces. Embrace the warmth and charm of natural flames for unforgettable moments outdoors.",
    keywords: ["outdoor wood fireplace", "garden wood heater", "patio wood fire"],
    ogImage: "/og/outdoor-wood.jpg"
  },
  {
    filters: ["gas"],
    title: "Gas Fireplaces - Living Fire Luxury Fireplaces",
    description: "Discover our range of modern gas fireplaces. Elevate your indoor space with efficient heating and a cosy, warm ambience with a luxury gas fireplace.",
    keywords: ["gas fireplaces", "modern gas heaters", "energy efficient gas fires"],
    ogImage: "/og/gas-fireplaces.jpg"
  },
  {
    filters: ["gas", "inbuilt", "single-sided"],
    title: "Single Sided Fireplace - Living Fire",
    description: "Discover our range of single sided fireplaces",
    keywords: ["single sided gas fireplace", "built in gas heater", "wall mounted gas fire"],
    ogImage: "/og/single-sided-gas.jpg"
  },
  {
    filters: ["gas", "inbuilt", "two-sided"],
    title: "Double Sided Gas Fireplaces | Living Fire",
    description: "Elevate your living space with our stylish double-sided gas fireplace. Experience ultimate warmth and ambiance. Browse now!",
    keywords: ["double sided gas fireplace", "see through gas fire", "two sided gas heater"],
    ogImage: "/og/two-sided-gas.jpg"
  },
  {
    filters: ["gas", "inbuilt", "three-sided"],
    title: "Three Sided Gas Fireplace | Living Fire",
    description: "Experience warmth and elegance with our three-sided gas fireplace. Perfect for modern spaces, enjoy panoramic views and efficient heating.",
    keywords: ["three sided gas fireplace", "270 degree gas fire", "panoramic gas heater"],
    ogImage: "/og/three-sided-gas.jpg"
  },
  {
    filters: ["gas", "freestanding"],
    title: "Freestanding Gas Fireplaces - Living Fire",
    description: "Transform your space with our freestanding gas fireplaces. Sleek design, efficient heating, and easy installation. Explore our collection now!",
    keywords: ["freestanding gas fireplace", "standalone gas heater", "portable gas fire"],
    ogImage: "/og/freestanding-gas.jpg"
  },
  {
    filters: ["gas", "outdoor"],
    title: "Outdoor Gas Fireplace - Living Fire",
    description: "Discover the perfect centrepiece for your outdoor gatherings with our range of stylish and efficient gas fireplaces. Transform your outdoor space today!",
    keywords: ["outdoor gas fireplace", "patio gas heater", "garden gas fire pit"],
    ogImage: "/og/outdoor-gas.jpg"
  },
  {
    filters: ["gas", "inbuilt"],
    title: "Inbuilt Gas Fireplaces - Modern Design | Living Fire Australia",
    description: "Elevate your space with our inbuilt gas fireplaces, combining modern design and efficient heating. Discover the perfect centerpiece for your home.",
    keywords: ["inbuilt gas fireplace", "built in gas heater", "custom gas fire design"],
    ogImage: "/og/inbuilt-gas.jpg"
  },
  {
    filters: ["electric"],
    title: "Electric Fireplaces - Indoor Fireplaces | Living Fire",
    description: "Discover our range of luxury indoor electric fireplaces - stylish and efficient, heating solutions. Visit our showrooms in Melbourne today!",
    keywords: ["electric fireplaces", "modern electric heaters", "energy efficient electric fires"],
    ogImage: "/og/electric-fireplaces.jpg"
  },
  {
    filters: ["electric", "freestanding"],
    title: "Freestanding Suite Archives - Living Fire",
    description: "",
    keywords: ["freestanding electric fireplace", "portable electric heater", "standalone electric fire"],
    ogImage: "/og/freestanding-electric.jpg"
  },
  {
    filters: ["paul-agnew-designs"],
    title: "Paul Agnew Designs - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Paul Agnew Designs. Visit us online now for more information",
    keywords: ["Paul Agnew Designs", "luxury fireplace brands", "designer fireplaces Australia"],
    ogImage: "/og/paul-agnew-designs.jpg"
  },
  {
    filters: ["paul-agnew-designs", "pyro", "wood"],
    title: "Pyro Archives - Living Fire",
    description: "",
    keywords: ["Paul Agnew Pyro", "wood burning designer fireplace", "Pyro collection"],
    ogImage: "/og/pyro-wood.jpg"
  },
  {
    filters: ["paul-agnew-designs", "hestia"],
    title: "Hestia Archives - Living Fire",
    description: "",
    keywords: ["Paul Agnew Hestia", "Hestia fireplace collection", "modern fireplace design"],
    ogImage: "/og/hestia.jpg"
  },
  {
    filters: ["eurostove"],
    title: "Eurostove - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Eurostove. Visit us online now for more information",
    keywords: ["Eurostove fireplaces", "European wood heaters", "quality fireplace brands"],
    ogImage: "/og/eurostove.jpg"
  },
  {
    filters: ["regency"],
    title: "Regency - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Regency. Visit us online now for more information",
    keywords: ["Regency fireplaces", "quality wood heaters", "reliable fireplace brands"],
    ogImage: "/og/regency.jpg"
  },
  {
    filters: ["regency", "gas"],
    title: "Gas Archives - Living Fire",
    description: "",
    keywords: ["Regency gas fireplaces", "gas heater brands", "efficient gas fires"],
    ogImage: "/og/regency-gas.jpg"
  },
  {
    filters: ["regency", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["Regency wood heaters", "wood burning stoves", "quality wood fireplaces"],
    ogImage: "/og/regency-wood.jpg"
  },
  {
    filters: ["stovax"],
    title: "Stovax - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Stovax. Visit us online now for more information",
    keywords: ["Stovax fireplaces", "UK fireplace brands", "quality wood burners"],
    ogImage: "/og/stovax.jpg"
  },
  {
    filters: ["stovax", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["Stovax wood stoves", "wood burning fireplaces", "British wood heaters"],
    ogImage: "/og/stovax-wood.jpg"
  },
  {
    filters: ["stovax", "electric"],
    title: "Electric Archives - Living Fire",
    description: "",
    keywords: ["Stovax electric fires", "modern electric heaters", "realistic flame effect"],
    ogImage: "/og/stovax-electric.jpg"
  },
  {
    filters: ["austroflamm"],
    title: "Austroflamm - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Austroflamm. Visit us online now for more information",
    keywords: ["Austroflamm fireplaces", "Austrian wood heaters", "European quality stoves"],
    ogImage: "/og/austroflamm.jpg"
  },
  {
    filters: ["austroflamm", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["Austroflamm wood stoves", "high efficiency heaters", "clean burn technology"],
    ogImage: "/og/austroflamm-wood.jpg"
  },
  {
    filters: ["morso"],
    title: "Morsø - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Morsø. Visit us online now for more information",
    keywords: ["Morsø fireplaces", "Danish design stoves", "scandinavian wood heaters"],
    ogImage: "/og/morso.jpg"
  },
  {
    filters: ["morso", "gas"],
    title: "Gas Archives - Living Fire",
    description: "",
    keywords: ["Morsø gas fires", "Danish gas heaters", "designer gas fireplaces"],
    ogImage: "/og/morso-gas.jpg"
  },
  {
    filters: ["morso", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["Morsø wood stoves", "classic wood burners", "cast iron fireplaces"],
    ogImage: "/og/morso-wood.jpg"
  },
  {
    filters: ["heatmaster"],
    title: "Heatmaster - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Heatmaster. Visit us online now for more information",
    keywords: ["Heatmaster fireplaces", "Australian made heaters", "quality wood stoves"],
    ogImage: "/og/heatmaster.jpg"
  },
  {
    filters: ["heatmaster", "gas"],
    title: "Gas Archives - Living Fire",
    description: "",
    keywords: ["Heatmaster gas fires", "Australian gas heaters", "efficient gas log fires"],
    ogImage: "/og/heatmaster-gas.jpg"
  },
  {
    filters: ["heatmaster", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["Heatmaster wood stoves", "Australian wood heaters", "high efficiency burners"],
    ogImage: "/og/heatmaster-wood.jpg"
  },
  {
    filters: ["hergom"],
    title: "Hergóm - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Hergóm. Visit us online now for more information",
    keywords: ["Hergóm fireplaces", "Spanish wood stoves", "European quality heaters"],
    ogImage: "/og/hergom.jpg"
  },
  {
    filters: ["hergom", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["Hergóm wood stoves", "traditional Spanish heaters", "cast iron fireplaces"],
    ogImage: "/og/hergom-wood.jpg"
  },
  {
    filters: ["adf"],
    title: "ADF Fireplaces - Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including ADF fireplaces. Visit us online now for more information",
    keywords: ["ADF fireplaces", "Australian made heaters", "quality wood stoves"],
    ogImage: "/og/adf.jpg"
  },
  {
    filters: ["adf", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["ADF wood heaters", "high efficiency stoves", "clean burn technology"],
    ogImage: "/og/adf-wood.jpg"
  },
  {
    filters: ["kalora"],
    title: "Kalora - Fireplace Brands - Living Fire",
    description: "Living Fire is partnered with a range of premium fireplace brands including Kalora. Visit us online now for more information",
    keywords: ["Kalora fireplaces", "modern heater designs", "efficient wood stoves"],
    ogImage: "/og/kalora.jpg"
  },
  {
    filters: ["kalora", "gas"],
    title: "Gas Archives - Living Fire",
    description: "",
    keywords: ["Kalora gas fires", "modern gas heaters", "energy efficient models"],
    ogImage: "/og/kalora-gas.jpg"
  },
  {
    filters: ["kalora", "wood"],
    title: "Wood Archives - Living Fire",
    description: "",
    keywords: ["Kalora wood stoves", "contemporary wood heaters", "high efficiency burners"],
    ogImage: "/og/kalora-wood.jpg"
  },
  {
    filters: ["bio-ethanol"],
    title: "Bioethanol Fireplaces | Eco-Friendly Heating - Living Fire",
    description: "Find the perfect bioethanol fireplace in our online store. Eco-friendly and stylish, they provide the perfect warmth for your home. Order online today.",
    keywords: ["bioethanol fireplaces", "eco friendly heaters", "flueless fire designs"],
    ogImage: "/og/bioethanol.jpg"
  },
  {
    filters: ["bio-ethanol", "inbuilt"],
    title: "Inbuilt Suite Archives - Living Fire",
    description: "",
    keywords: ["built in bioethanol fireplace", "wall mounted ethanol fire", "custom biofuel heater"],
    ogImage: "/og/bioethanol-inbuilt.jpg"
  },
  {
    filters: ["bio-ethanol", "freestanding"],
    title: "Freestanding Suite Archives - Living Fire",
    description: "",
    keywords: ["freestanding bioethanol fireplace", "portable ethanol heater", "standalone biofuel fire"],
    ogImage: "/og/bioethanol-freestanding.jpg"
  },
  {
    filters: ["fireplace-mantels"],
    title: "Fireplace Mantel Range - Living Fire Australia",
    description: "View Our Luxury Fireplace Mantel Range Online Now. For All Enquiries About Our Fireplace Mantels, Contact The Living Fire Australia Team Today.",
    keywords: ["fireplace mantels", "hearth surrounds", "fireplace decoration"],
    ogImage: "/og/mantels.jpg"
  },
  {
    filters: ["cast-iron"],
    title: "Cast Iron Fireplace Range | Victorian Fireplaces - Living Fire",
    description: "View Our Luxury Cast Iron Fireplace Range Online Now. For All Enquiries About Our Victorian Fireplace Products Contact Us Today.",
    keywords: ["cast iron fireplaces", "victorian style heaters", "classic wood stoves"],
    ogImage: "/og/cast-iron.jpg"
  },
  {
    filters: ["fire-tools"],
    title: "Fireplace Accessories - Living Fire Luxury Fireplaces",
    description: "View Our Luxury Fireplace Accessories Range Online Now. For All Enquiries About Our Fireplace Products Contact The Living Fire Team Today",
    keywords: ["fireplace tools", "hearth accessories", "fire maintenance equipment"],
    ogImage: "/og/fire-tools.jpg"
  }
];

// 2. Create optimized metadata maps
const createMetadataMap = (data) => {
  const map = new Map();
  data.forEach((item) => {
    const key = item.name.toLowerCase().replace(/%20/g, " ");
    map.set(key, {
      ...item,
      ogImage:
        item.ogImage ||
        `/og/default-${item.type.toLowerCase().replace(/ /g, "-")}.jpg`,
    });
  });
  return map;
};

const metaDataMaps = {
  brand: createMetadataMap(brandsMetaData),
  fireplace: createMetadataMap(fireplaceTypeMetaData),
  category: createMetadataMap(categoryTypeMetaData),
  glassorientation: createMetadataMap(glassorientationTypeMetaData),
  installation: createMetadataMap(installationTypeMetaData),
};

// 3. Pre-build special combinations map
const specialCombinationsMap = new Map();
specialCombinationsMetaData.forEach((item) => {
  const key = item.filters
    .map((f) => f.toLowerCase())
    .sort()
    .join(",");
  specialCombinationsMap.set(key, item);
});

// 4. Helper functions
const formatFilter = (filter) =>
  decodeURIComponent(filter).replace(/_/g, " ").toLowerCase();

const generateSeoData = (filters, matchedMetadata = []) => {;
  const displayFilters = filters.map(
    (f) => f.charAt(0).toUpperCase() + f.slice(1)
  );
  const firstFour = displayFilters.slice(0, 4);
  let description;
  let title;
  if (filters?.length == 1) {
    title = matchedMetadata?.[0]?.title;
    description = matchedMetadata?.[0]?.description;
  } else {
    title = `${firstFour.join(" | ")} | Living Fire`;
    title = title.length < 45 ? `${title} Australia` : title;
    title =
      title.length > 65
        ? `${firstFour.slice(0, 3).join(" | ")} Fireplaces | Living Fire`
        : title;

    description = `Browse our ${firstFour.join(
      " "
    )} fireplace collection. Premium Australian-made designs.`;
    description =
      description.length < 150
        ? `${description} Free consultations available.`
        : description;
    description =
      description.length > 300
        ? `Explore ${firstFour
            .slice(0, 3)
            .join(" ")} fireplaces at Living Fire Australia.`
        : description;
  }
  // Keyword generation
  const baseKeywords = [
    ...firstFour,
    ...firstFour.map((f) => `${f} fireplace`),
    "Living Fire Australia",
  ];

  const metadataKeywords = matchedMetadata.flatMap((m) =>
    m?.keywords ? (Array.isArray(m.keywords) ? m.keywords : [m.keywords]) : []
  );

  const keywords = [...new Set([...baseKeywords, ...metadataKeywords])]
    .filter((k) => typeof k === "string" && k.trim().length > 0)
    .slice(0, 15)
    .join(", ");

  return { title, description, keywords };
};

// 5. Main metadata generator
export async function generateMetadata({ params }) {
  const defaultMetadata = {
    title: "Luxury Fireplace Collection | Living Fire Australia",
    description:
      "Australia's finest fireplace selection. Gas, wood & electric models with expert installation.",
    alternates: { canonical: "https://livingfires.com.au/allProducts" },
    robots: { index: true, follow: true },
    openGraph: {
      images: [{ url: "https://livingfires.com.au/og/default-fireplaces.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };

  if (!params?.filters) return defaultMetadata;

  // Normalize filters
  const normalizedFilters = params.filters.map(formatFilter);
  const sortedKey = [...normalizedFilters].sort().join(",");

  // Check special combinations
  if (specialCombinationsMap.has(sortedKey)) {
    const { title, description, keywords, ogImage } =
      specialCombinationsMap.get(sortedKey);
    const canonicalUrl = `https://livingfires.com.au/allProducts/${params.filters.join(
      "/"
    )}`;

    return {
      title,
      description,
      keywords,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        images: [{ url: `https://livingfires.com.au${ogImage}` }],
        siteName: "Living Fire",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`https://livingfires.com.au${ogImage}`],
      },
    };
  }

  // Find matching metadata
  const matchedMetadata = [];
  for (const [type, map] of Object.entries(metaDataMaps)) {
    for (const filter of normalizedFilters) {
      if (map.has(filter)) {
        matchedMetadata.push(map.get(filter));
        break;
      }
    }
  }

  // Generate SEO data
  const { title, description, keywords } = generateSeoData(
    normalizedFilters,
    matchedMetadata
  );
  const canonicalUrl = `https://livingfires.com.au/allProducts/${params.filters.join(
    "/"
  )}`;
  const ogImage = matchedMetadata[0]?.ogImage || "/og/default-fireplaces.jpg";

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: `https://livingfires.com.au${ogImage}` }],
      siteName: "Living Fire",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://livingfires.com.au${ogImage}`],
    },
  };
}

// 6. Static generation for popular paths
export async function generateStaticParams() {
  return [
    { filters: ["wood"] },
    { filters: ["gas"] },
    { filters: ["two-sided", "wood"] },
    { filters: ["three-sided", "wood"] },
    { filters: ["electric"] },
    { filters: ["gas"] },
    { filters: ["adf"] },
    { filters: ["regency"] },
    { filters: ["heatmaster"] },
  ];
}

// 7. Page component
export default function Page({ params }) {
  return <Filters params={params} />;
}
