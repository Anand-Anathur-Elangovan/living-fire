export const metadata = {
  title: "Premium European Fireplaces Melbourne | Living Fire",
  description: "Melbourne's finest custom European gas & wood fireplaces. 60+ years of craftsmanship. Visit our Richmond & Moorabbin showrooms.",
  keywords: "luxury fireplaces Melbourne, European fireplaces, gas fireplaces Melbourne, wood fireplaces, modern fireplaces, custom fireplaces, designer fireplaces, indoor fireplaces, outdoor fireplaces, Living Fire",
  alternates: {
    canonical: "https://livingfires.com.au/",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://livingfires.com.au" }],
  publisher: "Living Fire",
};
import Home from "./home/Home";
export default function Page() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Living Fire",
    "image": [
      "https://livingfires.com.au/assets/homePage/rightSideLogo.svg",
      "https://livingfires.com.au/assets/homePage/homePageMainImg.png", 
      "https://livingfires.com.au/assets/homePage/collections/collectionsImg1.svg"
    ],
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "148-150 Cochranes Rd",
      "addressLocality": "Moorabbin",
      "addressRegion": "VIC",
      "postalCode": "3189",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-37.9399438839525",
      "longitude": "145.0849985832501"
    },
    "telephone": "+61 3 9977 7888",
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday"],
      "opens": "08:00",
      "closes": "17:00"
    }]
    // ,
    // "sameAs": [
    //   "https://www.facebook.com/yourpage",
    //   "https://www.instagram.com/yourprofile"
    // ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Home />
    </>
  );
}