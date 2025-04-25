// app/specificationSheet/page.js
export const metadata = {
    title: "Product Specification Sheets | Living Fire",
    description: "Download detailed product specification sheets for fireplaces, heaters, and accessories at Living Fire. Compare features and specifications effortlessly.",
    keywords: "fireplace specifications, heater specs, Living Fire products, fireplace details, product data sheets",
    alternates: {
      canonical: "https://livingfires.com.au/specificationSheet",
    },
    robots: "index, follow",
    authors: [{ name: "Living Fire Team", url: "https://livingfires.com.au" }],
    publisher: "Living Fire",
  };
  
  import SpecificationSheet from "./SpecificationSheet";
  
  export default function Page() {
    return <SpecificationSheet />;
  }
  