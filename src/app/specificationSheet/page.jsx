// app/specificationSheet/page.js
export const metadata = {
    title: "Product Specification Sheets | Living Fire",
    description: "Download detailed product specification sheets for fireplaces, heaters, and accessories at Living Fire. Compare features and specifications effortlessly.",
    keywords: "fireplace specifications, heater specs, Living Fire products, fireplace details, product data sheets",
    alternates: {
      canonical: "https://living-fire.vercel.app/specificationSheet",
    },
    robots: "index, follow",
    authors: [{ name: "Living Fire Team", url: "https://living-fire.vercel.app" }],
    publisher: "Living Fire",
  };
  
  import SpecificationSheet from "./SpecificationSheet";
  
  export default function Page() {
    return <SpecificationSheet />;
  }
  