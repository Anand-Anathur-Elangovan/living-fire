import { NextResponse } from "next/server";
import pool from "@/src/helper/db/db";
function generateFilterUrls() {
  const filters = {
    category: [
      "fireplace",
      "fireplace-mantels",
      "fire-tools",
      "outdoor",
      "cast-iron"
    ],
    fuelType: [
      "wood",
      "electric",
      "gas",
      "hybrid-wood-electric",
      "bio-ethanol",
      "cooker"
    ],
    placement: ["freestanding", "inbuilt", "outdoor"],
    design: ["single-sided", "two-sided", "three-sided", "four-sided"],
    brand: [
      "esse",
      "gazco",
      "stovax",
      "regency",
      "morso",
      "living-fire",
      "paul-agnew-designs",
      "kalora",
      "adf",
      "austroflamm",
      "bosq",
      "eurostove",
      "heatmaster",
      "hergom"
    ]
};

  const urlCombinations = [];

  // 1. High-value: Category + Brand (e.g., /Fireplace/Esse)
  filters.category.forEach((cat) => {
    filters.brand.forEach((brand) => {
      urlCombinations.push(`/allProducts/${cat}/${brand}`);
    });
  });

  // 2. Medium-value: Category + Fuel Type (e.g., /Fireplace/Wood)
  filters.category.forEach((cat) => {
    filters.fuelType.forEach((fuel) => {
      urlCombinations.push(`/allProducts/${cat}/${fuel}`);
    });
  });

  // 3. Medium-value: Category + Placement (e.g., /Fireplace/Freestanding)
  filters.category.forEach((cat) => {
    filters.placement.forEach((place) => {
      urlCombinations.push(`/allProducts/${cat}/${place}`);
    });
  });

  // 4. Limited 3-filter combinations (avoid spammy URLs)
  const topCategories = [
    "fireplace",
    "fireplace-mantels",
    "outdoor",
    "fire-tools",
    "cast-iron",
  ];
  topCategories.forEach((cat) => {
    filters.fuelType.slice(0, 2).forEach((fuel) => {
      filters.placement.slice(0, 2).forEach((place) => {
        urlCombinations.push(`/allProducts/${cat}/${fuel}/${place}`);
      });
    });
  });

  return [...new Set(urlCombinations)]; // Remove duplicates
}

async function getAllPages() {
  // Your existing product data
 const products = [
  { brand: "eurostove", product: "churchill-5-convection-dual-control" },
  { brand: "living-fire", product: "kosi-no-25" },
  { brand: "kalora", product: "425r" },
  { brand: "morso", product: "ignis-grill-grate" },
  { brand: "gazco", product: "estudio-es165r" },
  { brand: "kalora", product: "600c" },
  { brand: "living-fire", product: "nero-framed-slimline-black-fascia-1450mm" },
  { brand: "adf", product: "linea-100-insert" },
  { brand: "living-fire", product: "aeris-hanging-black-shell-s-s-pole" },
  { brand: "living-fire", product: "slimline-firebox-2000-black-fascia" },
  { brand: "living-fire", product: "double-sided-slimline-firebox-1350-brushed-s-s-fascia" },
  { brand: "living-fire", product: "kosi-no-35" },
  { brand: "adf", product: "linea-85-b-freestanding" },
  { brand: "adf", product: "linea-85-insert" },
  { brand: "adf", product: "linea-100-insert-duo" },
  { brand: "adf", product: "hayra-85vl-freestanding" },
  { brand: "gazco", product: "estudio-es60r" },
  { brand: "adf", product: "hayra-85vp-freestanding" },
  { brand: "adf", product: "linea-100-l-freestanding-with-steel-base" },
  { brand: "adf", product: "linea-100-b-duo-l-freestanding-heater-inc-open-base" },
  { brand: "regency", product: "bellerive" },
  { brand: "bosq", product: "aere-70s-freestanding" },
  { brand: "kalora", product: "fusion" },
  { brand: "austroflamm", product: "dexter-door-hinge-left" },
  { brand: "regency", product: "hzo42-outdoor" },
  { brand: "paul-agnew-designs", product: "vue-1410-bay" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-2000-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-950-aspect" },
  { brand: "regency", product: "gfi750" },
  { brand: "eurostove", product: "churchill-5-dual-control" },
  { brand: "eurostove", product: "churchill-5-convection-dual-control-logstore" },
  { brand: "esse", product: "700-wood-heater" },
  { brand: "esse", product: "ironheart-outside-air-dry" },
  { brand: "esse", product: "700-wood-heater-outside-air" },
  { brand: "esse", product: "775-wood-heater-outside-air" },
  { brand: "esse", product: "vector" },
  { brand: "living-fire", product: "cocoon-pedestal-standing-black-shell-s-s-stand" },
  { brand: "esse", product: "ironheart-outside-air-wet" },
  { brand: "esse", product: "ironheart-dry" },
  { brand: "gazco", product: "onyx-150rw" },
  { brand: "esse", product: "ironheart-wet" },
  { brand: "esse", product: "bakeheart-outside-air-dry" },
  { brand: "esse", product: "bakeheart-outside-air-wet" },
  { brand: "esse", product: "warmheart-s-outside-air-dry" },
  { brand: "esse", product: "warmheart-s-outside-air-wet" },
  { brand: "esse", product: "1000-h" },
  { brand: "esse", product: "1000-w" },
  { brand: "gazco", product: "onyx-110rw" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf" },
  { brand: "regency", product: "chicago-corner-40-right" },
  { brand: "gazco", product: "riva2" },
  { brand: "heatmaster", product: "seamless-gas-log-fireplace" },
  { brand: "gazco", product: "estudio-es135r" },
  { brand: "morso", product: "kamino-outdoor-fireplace" },
  { brand: "gazco", product: "estudio-es105r" },
  { brand: "hergom", product: "glance-l-freestanding" },
  { brand: "morso", product: "1410-freestanding" },
  { brand: "hergom", product: "hergom-fire-pit-meteor" },
  { brand: "regency", product: "renmark" },
  { brand: "regency", product: "new-york-view-40" },
  { brand: "bosq", product: "aere-70s-insert" },
  { brand: "heatmaster", product: "b750-uninsulated-firebox" },
  { brand: "regency", product: "san-francisco-bay-60" },
  { brand: "heatmaster", product: "enviro-ng-logs" },
  { brand: "stovax", product: "studio-2-freestanding" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "gazco", product: "estudio-es85r" },
  { brand: "living-fire", product: "vellum-wall-mounted-s-s" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-50in-1270mm" },
  { brand: "regency", product: "berwick" },
  { brand: "paul-agnew-designs", product: "alto-tunnel" },
  { brand: "paul-agnew-designs", product: "vue-1250-bay" },
  { brand: "regency", product: "ei25-electric-insert" },
  { brand: "regency", product: "gf1500lst-lpg" },
  { brand: "paul-agnew-designs", product: "vue-1250-right-corner" },
  { brand: "regency", product: "san-san-francisco-bay-40" },
  { brand: "regency", product: "hume" },
  { brand: "regency", product: "windsor" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-glass-fronted" },
  { brand: "regency", product: "fg39" },
  { brand: "paul-agnew-designs", product: "sie-750-tunnel-freestanding" },
  { brand: "morso", product: "morso-brush-and-scraper-set" },
  { brand: "regency", product: "cardinia" },
  { brand: "regency", product: "alterra" },
  { brand: "regency", product: "gosford" },
  { brand: "living-fire", product: "2-tier-wood-rack-w-firetools-large" },
  { brand: "austroflamm", product: "clou-xtra" },
  { brand: "regency", product: "gf1500l" },
  { brand: "austroflamm", product: "s120-45s-cassette" },
  { brand: "regency", product: "montrose" },
  { brand: "stovax", product: "studio-2-insert" },
  { brand: "regency", product: "new-york-view-60" },
  { brand: "regency", product: "dvi34l" },
  { brand: "regency", product: "chicago-corner-40-left" },
  { brand: "regency", product: "gf950-lpg" },
  { brand: "regency", product: "hzo42-outdoor-lpg" },
  { brand: "regency", product: "gf950l" },
  { brand: "regency", product: "albany" },
  { brand: "regency", product: "narrabri" },
  { brand: "gazco", product: "onyx-190rw" },
  { brand: "regency", product: "mansfield" },
  { brand: "regency", product: "pg36" },
  { brand: "morso", product: "morso-culi-bbq-grill-fork" },
  { brand: "kalora", product: "500c" },
  { brand: "austroflamm", product: "dexter-door-hinge-right" },
  { brand: "morso", product: "grill-71" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape-tunnel" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-black" },
  { brand: "paul-agnew-designs", product: "ilektro-freestanding" },
  { brand: "hergom", product: "glance" },
  { brand: "living-fire", product: "black-brass-trim-4pc-set" },
  { brand: "hergom", product: "e-30-freestanding" },
  { brand: "living-fire", product: "fire-grate-745mm" },
  { brand: "hergom", product: "e-40-freestanding" },
  { brand: "morso", product: "7970-wall-mounted" },
  { brand: "morso", product: "6143-freestanding" },
  { brand: "living-fire", product: "black-pewter-handle-4pc-set" },
  { brand: "morso", product: "1440-freestanding" },
  { brand: "morso", product: "6148-freestanding" },
  { brand: "morso", product: "7943-freestanding" },
  { brand: "morso", product: "7948-freestanding" },
  { brand: "morso", product: "8843-freestanding" },
  { brand: "bosq", product: "aere-70s-freestanding-l-black-steel-base" },
  { brand: "paul-agnew-designs", product: "850-classic-fascia-black" },
  { brand: "adf", product: "hayra-85vb-freestanding" },
  { brand: "adf", product: "linea-100-b-freestanding" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "kalora", product: "accent" },
  { brand: "adf", product: "linea-100-duo-freestanding" },
  { brand: "austroflamm", product: "woody" },
  { brand: "kalora", product: "500bx-woodstack" },
  { brand: "kalora", product: "600bx-woodstack" },
  { brand: "living-fire", product: "black-pewter-trim-4pc-set" },
  { brand: "kalora", product: "chalet-5" },
  { brand: "kalora", product: "chalet-6" },
  { brand: "kalora", product: "urban-ls" },
  { brand: "kalora", product: "urban-pt" },
  { brand: "kalora", product: "sorrento" },
  { brand: "kalora", product: "zenith-electric-fire-36in" },
  { brand: "kalora", product: "zenith-electric-fire-42in" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "morso", product: "morso-culi-bbq-grill-tongs" },
  { brand: "kalora", product: "zenith-electric-fire-60in" },
  { brand: "kalora", product: "zenith-electric-fire-72in" },
  { brand: "kalora", product: "zenith-electric-fire-88in" },
  { brand: "kalora", product: "nexus-electric-fire-36in" },
  { brand: "living-fire", product: "3-fold-squared-fire-screen" },
  { brand: "kalora", product: "nexus-electric-fire-50in" },
  { brand: "kalora", product: "nexus-electric-fire-60in" },
  { brand: "morso", product: "forno-garden-set" },
  { brand: "kalora", product: "nexus-electric-fire-74in" },
  { brand: "paul-agnew-designs", product: "ilektro-1650-landscape" },
  { brand: "living-fire", product: "black-3pc-set" },
  { brand: "paul-agnew-designs", product: "ilektro-2600-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-insert" },
  { brand: "paul-agnew-designs", product: "ilektro-950-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-950lt" },
  { brand: "living-fire", product: "4-fold-fire-screen-black-w-pewter-finish" },
  { brand: "paul-agnew-designs", product: "ilektro-woodland-stove" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-50in-1270mm" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-60in-1524mm" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-72in-1828mm" },
  { brand: "paul-agnew-designs", product: "alto-glass-fronted" },
  { brand: "living-fire", product: "black-4pc-set" },
  { brand: "paul-agnew-designs", product: "quadro-800-glass-fronted" },
  { brand: "paul-agnew-designs", product: "quadro-800-tunnel" },
  { brand: "paul-agnew-designs", product: "vue-1250-glass-fronted" },
  { brand: "paul-agnew-designs", product: "vue-1250-left-corner" },
  { brand: "living-fire", product: "black-with-scraper-4pc-set" },
  { brand: "paul-agnew-designs", product: "vue-1410-glass-fronted" },
  { brand: "paul-agnew-designs", product: "vue-1410-left-corner" },
  { brand: "paul-agnew-designs", product: "vue-1410-right-corner" },
  { brand: "paul-agnew-designs", product: "vue-1410-peninsula" },
  { brand: "morso", product: "forno-outdoor-oven" },
  { brand: "paul-agnew-designs", product: "vue-1410-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1000-bay-guillotine" },
  { brand: "morso", product: "grill-71-table" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2l" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2r" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-glass-fronted" },
  { brand: "paul-agnew-designs", product: "hestia-1000-peninsula-guillotine" },
  { brand: "morso", product: "ignis-outdoor-fire-pit" },
  { brand: "morso", product: "morso-faro-lantern-80h" },
  { brand: "paul-agnew-designs", product: "i700-stove" },
  { brand: "paul-agnew-designs", product: "modica-600-freestanding" },
  { brand: "paul-agnew-designs", product: "sie-750gf-freestanding" },
  { brand: "paul-agnew-designs", product: "sie-750gf2r" },
  { brand: "living-fire", product: "3-fold-rounded-black-w-nickel-plated-top-frame" },
  { brand: "paul-agnew-designs", product: "siena-750gf2l" },
  { brand: "paul-agnew-designs", product: "siena-750gf3" },
  { brand: "paul-agnew-designs", product: "siena-750-g4-freestanding" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "paul-agnew-designs", product: "700-square-w-motif-fascia-black" },
  { brand: "living-fire", product: "curved-stand-4pc-set" },
  { brand: "morso", product: "grill-forno-ii-outdoor-oven" },
  { brand: "living-fire", product: "fire-grate-915mm" },
  { brand: "living-fire", product: "fire-grates-premium-range-600mm" },
  { brand: "living-fire", product: "fire-grates-premium-range-8-bar-750mm" },
  { brand: "living-fire", product: "fixed-wing-sloping-large-fire-screen" },
  { brand: "living-fire", product: "fixed-wing-sloping-fire-screen-small" },
  { brand: "living-fire", product: "flaming-magic-30g" },
  { brand: "living-fire", product: "heavy-duty-classic-black-brass-4pc-set" },
  { brand: "living-fire", product: "tongio-forging-tongs" },
  { brand: "living-fire", product: "tongio-forging-deluxe-3pc-set" },
  { brand: "living-fire", product: "tongio-forging-deluxe-poker-log-roller" },
  { brand: "living-fire", product: "tongio-forging-rake" },
  { brand: "living-fire", product: "tongio-forging-riviera-3pc-set" },
  { brand: "living-fire", product: "tongio-forging-tongs-4pc-set" },
  { brand: "living-fire", product: "tongio-forging-deluxe-4pc-set" },
  { brand: "living-fire", product: "wood-storage-wood-ring-with-tray" },
  { brand: "living-fire", product: "gated-fire-screen" },
  { brand: "morso", product: "forno-s-s-fire-divide" },
  { brand: "morso", product: "forno-terra-set" },
  { brand: "morso", product: "forno-terra-table" },
  { brand: "morso", product: "forno-outdoor-garden-table" },
  { brand: "morso", product: "forno-door" },
  { brand: "morso", product: "forno-garden-table-cover" },
  { brand: "morso", product: "grill-forno-cover" },
  { brand: "morso", product: "grill-forno-door" },
  { brand: "hergom", product: "hergom-fire-pit-ignis" },
  { brand: "eurostove", product: "loxton-5-standard" },
  { brand: "hergom", product: "hergom-fire-pit-zenith" },
  { brand: "morso", product: "morso-culi-bbq-grill-turner-spatula" },
  { brand: "morso", product: "morso-faro-lantern-30h" },
  { brand: "morso", product: "morso-faro-lantern-55h" },
  { brand: "morso", product: "forno-cover" },
  { brand: "morso", product: "forno-flue-pipe" },
  { brand: "morso", product: "morso-fire-tongs" },
  { brand: "morso", product: "morso-frying-dish-and-serving-plate" },
  { brand: "morso", product: "morso-garden-table-shelf" },
  { brand: "morso", product: "morso-kamino-cover" },
  { brand: "morso", product: "morso-multi-cocotte-4-6l-w-griddle-lid" },
  { brand: "morso", product: "morso-outdoor-side-table" },
  { brand: "morso", product: "morso-pizza-herb-cutter" },
  { brand: "morso", product: "morso-pizza-peel" },
  { brand: "morso", product: "morso-smokeeper" },
  { brand: "morso", product: "morso-smoker-box" },
  { brand: "morso", product: "morso-steel-handle" },
  { brand: "morso", product: "morso-grill-17" },
  { brand: "morso", product: "morso-table-cover" },
  { brand: "morso", product: "morso-tuscan-grill" },
  { brand: "morso", product: "morso-tuscan-plancha" },
  { brand: "paul-agnew-designs", product: "6000-pattern-square-fascia-black" },
  { brand: "morso", product: "morso-vetro-pizza-frying-plate" },
  { brand: "morso", product: "morso-grill-cover" },
  { brand: "morso", product: "forno-brick-set" },
  { brand: "morso", product: "forno-terra-table-shelf" },
  { brand: "morso", product: "morso-ash-scraper" },
  { brand: "paul-agnew-designs", product: "athena-black-granite-1500" },
  { brand: "paul-agnew-designs", product: "riversdale-white-1500" },
  { brand: "paul-agnew-designs", product: "bouvet-italian-carrara-1310" },
  { brand: "paul-agnew-designs", product: "chilton-white-1370" },
  { brand: "paul-agnew-designs", product: "hampshire-standard-raw-1500" },
  { brand: "paul-agnew-designs", product: "milos-lu-grey-1310" },
  { brand: "paul-agnew-designs", product: "700-victorian-fascia-polished" },
  { brand: "paul-agnew-designs", product: "new-william-iv-italian-cararra-1500" },
  { brand: "paul-agnew-designs", product: "paros-lu-grey-1459" },
  { brand: "paul-agnew-designs", product: "naxos-mantel-luna-grey-1420" },
  { brand: "paul-agnew-designs", product: "victorian-arched-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "victorian-arched-mocha-beige-1650" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1470" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1500" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-white-1470" },
  { brand: "paul-agnew-designs", product: "windsor-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "hampshire-large-raw-1650" },
  { brand: "paul-agnew-designs", product: "700-classic-fascia-black" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-arched-polished" },
  { brand: "paul-agnew-designs", product: "700-decorative-square-fascia-polished" },
  { brand: "paul-agnew-designs", product: "850-victorian-arch-fascia-black" },
  { brand: "paul-agnew-designs", product: "camden-insert-black" },
  { brand: "paul-agnew-designs", product: "dublin-insert-black" },
  { brand: "paul-agnew-designs", product: "550-classic-fascia-black" },
  { brand: "paul-agnew-designs", product: "integra-anson" },
  { brand: "paul-agnew-designs", product: "malvern-insert-black" },
  { brand: "paul-agnew-designs", product: "royal-arch-insert-black" }
];

  // Construct product URLs
  const productUrls = products.map(
    ({ brand, product }) =>
      `/${encodeURIComponent(brand)}/${encodeURIComponent(product)}`
  );
  const filters = [
  ["fireplace"],
  ["fireplace-mantels"],
  ["fire-tools"],
  ["outdoor"],
  ["cast-iron"],
  ["hybrid-wood-electric"],
  ["bio-ethanol"],
  ["gas"],
  ["wood"],
  ["electric"],
  ["outdoor"],
  ["inbuilt"],
  ["freestanding"],
  ["three-sided"],
  ["two-sided"],
  ["single-sided"],
  ["four-sided"],
  ["esse"],
  ["kalora"],
  ["adf"],
  ["austroflamm"],
  ["bosq"],
  ["eurostove"],
  ["gazco"],
  ["heatmaster"],
  ["hergom"],
  ["living-fire"],
  ["paul-agnew-designs"],
  ["regency"],
  ["morso"],
  ["stovax"],
  ["firepit"],
  ["studio-2"],
  ["greenfire"],
  ["city-series"],
  ["heatmaster-gas"],
  ["ilektro-freestanding"],
  ["aerion"],
  ["ilektro-insert"],
  ["hestia"],
  ["pyro"],
  ["ilektro"],
  ["ilektro-slimline"],
  ["ironheart-range"],
  ["aere"],
  ["churchill"],
  ["e-series"],
  ["estudio"],
  ["glance"],
  ["hayra"],
  ["linea"],
  ["nero"],
  ["onyx"],
  ["siena"],
  ["slimline"],
  ["zenitth"],
  ["cocoon-pedestal"],
  ["vellum"],
  ["1000"],
  ["regency-wood"],
  ["regency-gas"],
  ["regency-electric"],
  ["forno"],
  ["ignis"],
  ["kamino"],
  ["lanterns"],
  ["morso-grill-17"],
  ["tuscan"],
  ["austroflamm-wood"],
  ["dexter"],
  ["kalora-wood"]
];

  const filterSingleUrls = filters.map(
    (filterArray) =>
      `/allProducts/${filterArray.map(encodeURIComponent).join("/")}`
  );

  // Generate SEO-optimized filter URLs
  const filterUrls = generateFilterUrls();

  // Static pages (with corrected paths)
  const staticPages = [
    "/",
    "/home",
    "/our-story",
    "/maintenance-service",
    "/about",
    "/contact",
    "/warranty",
    "/terms",
    "/specificationSheet",
    "/privacy-policy",
    "/specification-sheet", // Changed from specificationSheet
    "/blog", // Added for content marketing
    "/showrooms", // Added if applicable
  ];

  return [...staticPages, ...productUrls, ...filterUrls, ...filterSingleUrls];
}


// Helper function to verify images with Googlebot

export async function GET() {
  const siteUrl = "https://livingfires.com.au";
  const lastModDate = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  const pages = await getAllPages();
  const urlSet = new Set();

  for (const page of pages) {
    if (!page || typeof page !== "string") continue;

    const cleanedUrl = page.replace(/\/{2,}/g, "/").replace(/\/$/, "");

    if (urlSet.has(cleanedUrl)) continue;
    urlSet.add(cleanedUrl);

     const products = [
  { brand: "eurostove", product: "churchill-5-convection-dual-control" },
  { brand: "living-fire", product: "kosi-no-25" },
  { brand: "kalora", product: "425r" },
  { brand: "morso", product: "ignis-grill-grate" },
  { brand: "gazco", product: "estudio-es165r" },
  { brand: "kalora", product: "600c" },
  { brand: "living-fire", product: "nero-framed-slimline-black-fascia-1450mm" },
  { brand: "adf", product: "linea-100-insert" },
  { brand: "living-fire", product: "aeris-hanging-black-shell-s-s-pole" },
  { brand: "living-fire", product: "slimline-firebox-2000-black-fascia" },
  { brand: "living-fire", product: "double-sided-slimline-firebox-1350-brushed-s-s-fascia" },
  { brand: "living-fire", product: "kosi-no-35" },
  { brand: "adf", product: "linea-85-b-freestanding" },
  { brand: "adf", product: "linea-85-insert" },
  { brand: "adf", product: "linea-100-insert-duo" },
  { brand: "adf", product: "hayra-85vl-freestanding" },
  { brand: "gazco", product: "estudio-es60r" },
  { brand: "adf", product: "hayra-85vp-freestanding" },
  { brand: "adf", product: "linea-100-l-freestanding-with-steel-base" },
  { brand: "adf", product: "linea-100-b-duo-l-freestanding-heater-inc-open-base" },
  { brand: "regency", product: "bellerive" },
  { brand: "bosq", product: "aere-70s-freestanding" },
  { brand: "kalora", product: "fusion" },
  { brand: "austroflamm", product: "dexter-door-hinge-left" },
  { brand: "regency", product: "hzo42-outdoor" },
  { brand: "paul-agnew-designs", product: "vue-1410-bay" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-2000-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-950-aspect" },
  { brand: "regency", product: "gfi750" },
  { brand: "eurostove", product: "churchill-5-dual-control" },
  { brand: "eurostove", product: "churchill-5-convection-dual-control-logstore" },
  { brand: "esse", product: "700-wood-heater" },
  { brand: "esse", product: "ironheart-outside-air-dry" },
  { brand: "esse", product: "700-wood-heater-outside-air" },
  { brand: "esse", product: "775-wood-heater-outside-air" },
  { brand: "esse", product: "vector" },
  { brand: "living-fire", product: "cocoon-pedestal-standing-black-shell-s-s-stand" },
  { brand: "esse", product: "ironheart-outside-air-wet" },
  { brand: "esse", product: "ironheart-dry" },
  { brand: "gazco", product: "onyx-150rw" },
  { brand: "esse", product: "ironheart-wet" },
  { brand: "esse", product: "bakeheart-outside-air-dry" },
  { brand: "esse", product: "bakeheart-outside-air-wet" },
  { brand: "esse", product: "warmheart-s-outside-air-dry" },
  { brand: "esse", product: "warmheart-s-outside-air-wet" },
  { brand: "esse", product: "1000-h" },
  { brand: "esse", product: "1000-w" },
  { brand: "gazco", product: "onyx-110rw" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf" },
  { brand: "regency", product: "chicago-corner-40-right" },
  { brand: "gazco", product: "riva2" },
  { brand: "heatmaster", product: "seamless-gas-log-fireplace" },
  { brand: "gazco", product: "estudio-es135r" },
  { brand: "morso", product: "kamino-outdoor-fireplace" },
  { brand: "gazco", product: "estudio-es105r" },
  { brand: "hergom", product: "glance-l-freestanding" },
  { brand: "morso", product: "1410-freestanding" },
  { brand: "hergom", product: "hergom-fire-pit-meteor" },
  { brand: "regency", product: "renmark" },
  { brand: "regency", product: "new-york-view-40" },
  { brand: "bosq", product: "aere-70s-insert" },
  { brand: "heatmaster", product: "b750-uninsulated-firebox" },
  { brand: "regency", product: "san-francisco-bay-60" },
  { brand: "heatmaster", product: "enviro-ng-logs" },
  { brand: "stovax", product: "studio-2-freestanding" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "gazco", product: "estudio-es85r" },
  { brand: "living-fire", product: "vellum-wall-mounted-s-s" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-50in-1270mm" },
  { brand: "regency", product: "berwick" },
  { brand: "paul-agnew-designs", product: "alto-tunnel" },
  { brand: "paul-agnew-designs", product: "vue-1250-bay" },
  { brand: "regency", product: "ei25-electric-insert" },
  { brand: "regency", product: "gf1500lst-lpg" },
  { brand: "paul-agnew-designs", product: "vue-1250-right-corner" },
  { brand: "regency", product: "san-san-francisco-bay-40" },
  { brand: "regency", product: "hume" },
  { brand: "regency", product: "windsor" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-glass-fronted" },
  { brand: "regency", product: "fg39" },
  { brand: "paul-agnew-designs", product: "sie-750-tunnel-freestanding" },
  { brand: "morso", product: "morso-brush-and-scraper-set" },
  { brand: "regency", product: "cardinia" },
  { brand: "regency", product: "alterra" },
  { brand: "regency", product: "gosford" },
  { brand: "living-fire", product: "2-tier-wood-rack-w-firetools-large" },
  { brand: "austroflamm", product: "clou-xtra" },
  { brand: "regency", product: "gf1500l" },
  { brand: "austroflamm", product: "s120-45s-cassette" },
  { brand: "regency", product: "montrose" },
  { brand: "stovax", product: "studio-2-insert" },
  { brand: "regency", product: "new-york-view-60" },
  { brand: "regency", product: "dvi34l" },
  { brand: "regency", product: "chicago-corner-40-left" },
  { brand: "regency", product: "gf950-lpg" },
  { brand: "regency", product: "hzo42-outdoor-lpg" },
  { brand: "regency", product: "gf950l" },
  { brand: "regency", product: "albany" },
  { brand: "regency", product: "narrabri" },
  { brand: "gazco", product: "onyx-190rw" },
  { brand: "regency", product: "mansfield" },
  { brand: "regency", product: "pg36" },
  { brand: "morso", product: "morso-culi-bbq-grill-fork" },
  { brand: "kalora", product: "500c" },
  { brand: "austroflamm", product: "dexter-door-hinge-right" },
  { brand: "morso", product: "grill-71" },
  { brand: "paul-agnew-designs", product: "ilektro-1250-landscape-tunnel" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-black" },
  { brand: "paul-agnew-designs", product: "ilektro-freestanding" },
  { brand: "hergom", product: "glance" },
  { brand: "living-fire", product: "black-brass-trim-4pc-set" },
  { brand: "hergom", product: "e-30-freestanding" },
  { brand: "living-fire", product: "fire-grate-745mm" },
  { brand: "hergom", product: "e-40-freestanding" },
  { brand: "morso", product: "7970-wall-mounted" },
  { brand: "morso", product: "6143-freestanding" },
  { brand: "living-fire", product: "black-pewter-handle-4pc-set" },
  { brand: "morso", product: "1440-freestanding" },
  { brand: "morso", product: "6148-freestanding" },
  { brand: "morso", product: "7943-freestanding" },
  { brand: "morso", product: "7948-freestanding" },
  { brand: "morso", product: "8843-freestanding" },
  { brand: "bosq", product: "aere-70s-freestanding-l-black-steel-base" },
  { brand: "paul-agnew-designs", product: "850-classic-fascia-black" },
  { brand: "adf", product: "hayra-85vb-freestanding" },
  { brand: "adf", product: "linea-100-b-freestanding" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "kalora", product: "accent" },
  { brand: "adf", product: "linea-100-duo-freestanding" },
  { brand: "austroflamm", product: "woody" },
  { brand: "kalora", product: "500bx-woodstack" },
  { brand: "kalora", product: "600bx-woodstack" },
  { brand: "living-fire", product: "black-pewter-trim-4pc-set" },
  { brand: "kalora", product: "chalet-5" },
  { brand: "kalora", product: "chalet-6" },
  { brand: "kalora", product: "urban-ls" },
  { brand: "kalora", product: "urban-pt" },
  { brand: "kalora", product: "sorrento" },
  { brand: "kalora", product: "zenith-electric-fire-36in" },
  { brand: "kalora", product: "zenith-electric-fire-42in" },
  { brand: "living-fire", product: "black-heavy-duty-4pc-set" },
  { brand: "morso", product: "morso-culi-bbq-grill-tongs" },
  { brand: "kalora", product: "zenith-electric-fire-60in" },
  { brand: "kalora", product: "zenith-electric-fire-72in" },
  { brand: "kalora", product: "zenith-electric-fire-88in" },
  { brand: "kalora", product: "nexus-electric-fire-36in" },
  { brand: "living-fire", product: "3-fold-squared-fire-screen" },
  { brand: "kalora", product: "nexus-electric-fire-50in" },
  { brand: "kalora", product: "nexus-electric-fire-60in" },
  { brand: "morso", product: "forno-garden-set" },
  { brand: "kalora", product: "nexus-electric-fire-74in" },
  { brand: "paul-agnew-designs", product: "ilektro-1650-landscape" },
  { brand: "living-fire", product: "black-3pc-set" },
  { brand: "paul-agnew-designs", product: "ilektro-2600-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-insert" },
  { brand: "paul-agnew-designs", product: "ilektro-950-landscape" },
  { brand: "paul-agnew-designs", product: "ilektro-950lt" },
  { brand: "living-fire", product: "4-fold-fire-screen-black-w-pewter-finish" },
  { brand: "paul-agnew-designs", product: "ilektro-woodland-stove" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-50in-1270mm" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-60in-1524mm" },
  { brand: "paul-agnew-designs", product: "ilektro-slimline-72in-1828mm" },
  { brand: "paul-agnew-designs", product: "alto-glass-fronted" },
  { brand: "living-fire", product: "black-4pc-set" },
  { brand: "paul-agnew-designs", product: "quadro-800-glass-fronted" },
  { brand: "paul-agnew-designs", product: "quadro-800-tunnel" },
  { brand: "paul-agnew-designs", product: "vue-1250-glass-fronted" },
  { brand: "paul-agnew-designs", product: "vue-1250-left-corner" },
  { brand: "living-fire", product: "black-with-scraper-4pc-set" },
  { brand: "paul-agnew-designs", product: "vue-1410-glass-fronted" },
  { brand: "paul-agnew-designs", product: "vue-1410-left-corner" },
  { brand: "paul-agnew-designs", product: "vue-1410-right-corner" },
  { brand: "paul-agnew-designs", product: "vue-1410-peninsula" },
  { brand: "morso", product: "forno-outdoor-oven" },
  { brand: "paul-agnew-designs", product: "vue-1410-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1400-guillotine-tunnel" },
  { brand: "paul-agnew-designs", product: "hestia-1000-bay-guillotine" },
  { brand: "morso", product: "grill-71-table" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2l" },
  { brand: "paul-agnew-designs", product: "hestia-1000-gf2r" },
  { brand: "paul-agnew-designs", product: "hestia-1200-guillotine-glass-fronted" },
  { brand: "paul-agnew-designs", product: "hestia-1000-peninsula-guillotine" },
  { brand: "morso", product: "ignis-outdoor-fire-pit" },
  { brand: "morso", product: "morso-faro-lantern-80h" },
  { brand: "paul-agnew-designs", product: "i700-stove" },
  { brand: "paul-agnew-designs", product: "modica-600-freestanding" },
  { brand: "paul-agnew-designs", product: "sie-750gf-freestanding" },
  { brand: "paul-agnew-designs", product: "sie-750gf2r" },
  { brand: "living-fire", product: "3-fold-rounded-black-w-nickel-plated-top-frame" },
  { brand: "paul-agnew-designs", product: "siena-750gf2l" },
  { brand: "paul-agnew-designs", product: "siena-750gf3" },
  { brand: "paul-agnew-designs", product: "siena-750-g4-freestanding" },
  { brand: "living-fire", product: "3-fold-rounded-fire-screen" },
  { brand: "paul-agnew-designs", product: "700-square-w-motif-fascia-black" },
  { brand: "living-fire", product: "curved-stand-4pc-set" },
  { brand: "morso", product: "grill-forno-ii-outdoor-oven" },
  { brand: "living-fire", product: "fire-grate-915mm" },
  { brand: "living-fire", product: "fire-grates-premium-range-600mm" },
  { brand: "living-fire", product: "fire-grates-premium-range-8-bar-750mm" },
  { brand: "living-fire", product: "fixed-wing-sloping-large-fire-screen" },
  { brand: "living-fire", product: "fixed-wing-sloping-fire-screen-small" },
  { brand: "living-fire", product: "flaming-magic-30g" },
  { brand: "living-fire", product: "heavy-duty-classic-black-brass-4pc-set" },
  { brand: "living-fire", product: "tongio-forging-tongs" },
  { brand: "living-fire", product: "tongio-forging-deluxe-3pc-set" },
  { brand: "living-fire", product: "tongio-forging-deluxe-poker-log-roller" },
  { brand: "living-fire", product: "tongio-forging-rake" },
  { brand: "living-fire", product: "tongio-forging-riviera-3pc-set" },
  { brand: "living-fire", product: "tongio-forging-tongs-4pc-set" },
  { brand: "living-fire", product: "tongio-forging-deluxe-4pc-set" },
  { brand: "living-fire", product: "wood-storage-wood-ring-with-tray" },
  { brand: "living-fire", product: "gated-fire-screen" },
  { brand: "morso", product: "forno-s-s-fire-divide" },
  { brand: "morso", product: "forno-terra-set" },
  { brand: "morso", product: "forno-terra-table" },
  { brand: "morso", product: "forno-outdoor-garden-table" },
  { brand: "morso", product: "forno-door" },
  { brand: "morso", product: "forno-garden-table-cover" },
  { brand: "morso", product: "grill-forno-cover" },
  { brand: "morso", product: "grill-forno-door" },
  { brand: "hergom", product: "hergom-fire-pit-ignis" },
  { brand: "eurostove", product: "loxton-5-standard" },
  { brand: "hergom", product: "hergom-fire-pit-zenith" },
  { brand: "morso", product: "morso-culi-bbq-grill-turner-spatula" },
  { brand: "morso", product: "morso-faro-lantern-30h" },
  { brand: "morso", product: "morso-faro-lantern-55h" },
  { brand: "morso", product: "forno-cover" },
  { brand: "morso", product: "forno-flue-pipe" },
  { brand: "morso", product: "morso-fire-tongs" },
  { brand: "morso", product: "morso-frying-dish-and-serving-plate" },
  { brand: "morso", product: "morso-garden-table-shelf" },
  { brand: "morso", product: "morso-kamino-cover" },
  { brand: "morso", product: "morso-multi-cocotte-4-6l-w-griddle-lid" },
  { brand: "morso", product: "morso-outdoor-side-table" },
  { brand: "morso", product: "morso-pizza-herb-cutter" },
  { brand: "morso", product: "morso-pizza-peel" },
  { brand: "morso", product: "morso-smokeeper" },
  { brand: "morso", product: "morso-smoker-box" },
  { brand: "morso", product: "morso-steel-handle" },
  { brand: "morso", product: "morso-grill-17" },
  { brand: "morso", product: "morso-table-cover" },
  { brand: "morso", product: "morso-tuscan-grill" },
  { brand: "morso", product: "morso-tuscan-plancha" },
  { brand: "paul-agnew-designs", product: "6000-pattern-square-fascia-black" },
  { brand: "morso", product: "morso-vetro-pizza-frying-plate" },
  { brand: "morso", product: "morso-grill-cover" },
  { brand: "morso", product: "forno-brick-set" },
  { brand: "morso", product: "forno-terra-table-shelf" },
  { brand: "morso", product: "morso-ash-scraper" },
  { brand: "paul-agnew-designs", product: "athena-black-granite-1500" },
  { brand: "paul-agnew-designs", product: "riversdale-white-1500" },
  { brand: "paul-agnew-designs", product: "bouvet-italian-carrara-1310" },
  { brand: "paul-agnew-designs", product: "chilton-white-1370" },
  { brand: "paul-agnew-designs", product: "hampshire-standard-raw-1500" },
  { brand: "paul-agnew-designs", product: "milos-lu-grey-1310" },
  { brand: "paul-agnew-designs", product: "700-victorian-fascia-polished" },
  { brand: "paul-agnew-designs", product: "new-william-iv-italian-cararra-1500" },
  { brand: "paul-agnew-designs", product: "paros-lu-grey-1459" },
  { brand: "paul-agnew-designs", product: "naxos-mantel-luna-grey-1420" },
  { brand: "paul-agnew-designs", product: "victorian-arched-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "victorian-arched-mocha-beige-1650" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1470" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-mocha-beige-1500" },
  { brand: "paul-agnew-designs", product: "victorian-corbel-white-1470" },
  { brand: "paul-agnew-designs", product: "windsor-italian-cararra-1650" },
  { brand: "paul-agnew-designs", product: "hampshire-large-raw-1650" },
  { brand: "paul-agnew-designs", product: "700-classic-fascia-black" },
  { brand: "paul-agnew-designs", product: "700-decorative-fascia-arched-polished" },
  { brand: "paul-agnew-designs", product: "700-decorative-square-fascia-polished" },
  { brand: "paul-agnew-designs", product: "850-victorian-arch-fascia-black" },
  { brand: "paul-agnew-designs", product: "camden-insert-black" },
  { brand: "paul-agnew-designs", product: "dublin-insert-black" },
  { brand: "paul-agnew-designs", product: "550-classic-fascia-black" },
  { brand: "paul-agnew-designs", product: "integra-anson" },
  { brand: "paul-agnew-designs", product: "malvern-insert-black" },
  { brand: "paul-agnew-designs", product: "royal-arch-insert-black" }
];
    const productNames = products.map((p) => p.product);
    let priority = "0.7"; // Default priority
    if (cleanedUrl === "/" || !cleanedUrl) {
      priority = "1.0"; // Highest priority for homepage
    } else if (cleanedUrl.includes("/home")) {
      priority = "1.0";
    } else if (cleanedUrl.includes("/allProducts")) {
      priority = "0.8";
    } else if (productNames?.some((product) => cleanedUrl.includes(product))) {
      priority = "0.9";
    }
    let changefreq = "monthly"; // default

    if (priority === "1.0") {
      changefreq = "daily";
    } else if (priority === "0.9") {
      changefreq = "weekly";
    } else if (priority === "0.8") {
      changefreq = "weekly";
    } else if (priority === "0.7") {
      changefreq = "monthly";
    }


    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}${cleanedUrl}</loc>\n`;
    xml += `    <lastmod>${lastModDate}</lastmod>\n`;
    xml += `    <changefreq>${
      changefreq ? changefreq : "monthly"
    }</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;

    // Add images for product pages
    if (
      cleanedUrl.includes("/paul-agnew-designs/") ||
      cleanedUrl.match(/\/[^/]+\/[^/]+/)
    ) {
      const [brand, product] = cleanedUrl.split("/").filter(Boolean);

      try {
        const { rows } = await pool.query(
          `SELECT hero_image FROM tbl_master 
           WHERE product_slug = $1`,
          [product]
        );

        if (rows[0]?.hero_image) {
          const images = Array.isArray(rows[0].hero_image)
            ? rows[0].hero_image
            : [rows[0].hero_image];

          images
            .filter((img) => img?.value)
            .forEach((img) => {
              xml += `    <image:image>\n`;
              xml += `      <image:loc>${img.value}</image:loc>\n`;
              xml += `      <image:title>${brand} ${product}</image:title>\n`;
              xml += `    </image:image>\n`;
            });
        }
      } catch (error) {
        console.error(`Error fetching images for ${cleanedUrl}:`, error);
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}