// export const metadata = {
//   title: "Luxury Fireplaces in Melbourne | European, Gas & Wood Fireplaces | Living Fire",
//   description: "Explore Melbourne’s most luxurious range of fireplaces at Living Fire. From custom-designed European fireplaces to modern gas and wood-burning styles, we bring over 60 years of expertise in elegance, craftsmanship, and innovation.",
//   keywords: "luxury fireplaces Melbourne, European fireplaces, gas fireplaces Melbourne, wood fireplaces, modern fireplaces, custom fireplaces, designer fireplaces, indoor fireplaces, outdoor fireplaces, Living Fire",
//   alternates: {
//     canonical: "https://livingfires.com.au/",
//   },
//   robots: "index, follow",
//   authors: [{ name: "Living Fire Team", url: "https://livingfires.com.au" }],
//   publisher: "Living Fire",
// };


// import Home from "./home/Home";

// export default function Page() {
//   return <Home />;
// }
// export const metadata = {
//   title: "Premium European Fireplaces Melbourne | Living Fire",
//   description: "Melbourne's finest custom European gas & wood fireplaces. 60+ years of craftsmanship. Visit our Richmond & Moorabbin showrooms for luxury fireplace designs.",
//   keywords: "luxury fireplaces Melbourne, European fireplaces Australia, custom gas fireplaces, designer wood fireplaces, fireplace showroom Melbourne",
//   alternates: {
//     canonical: "https://livingfires.com.au/",
//   },
//   openGraph: {
//     title: "Luxury Fireplace Designs | Living Fire Melbourne",
//     description: "Handcrafted European fireplaces for Australian homes. Free consultations & 5-year warranty.",
//     url: "https://livingfires.com.au",
//     siteName: "Living Fire",
//     images: [
//       {
//         url: "/og-image.jpg", // Replace with actual OG image
//         width: 1200,
//         height: 630,
//       },
//     ],
//     locale: "en_AU",
//     type: "website",
//   },
//   robots: { 
//     index: true, 
//     follow: true 
//   },
//   authors: [{ 
//     name: "Living Fire", 
//     url: "https://livingfires.com.au" 
//   }],
//   publisher: "Living Fire",
// };
// import Home from "./home/Home";
// // Add JSON-LD for LocalBusiness schema
// export default function Page() {
//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "LocalBusiness",
//             "name": "Living Fire",
//             "image": "https://livingfires.com.au/logo.jpg",
//             "address": {
//               "@type": "PostalAddress",
//               "streetAddress": "123 Showroom St",
//               "addressLocality": "Richmond",
//               "addressRegion": "VIC",
//               "postalCode": "3121",
//               "addressCountry": "AU"
//             },
//             "telephone": "+61 3 0000 0000",
//             "openingHours": "Mo-Fr 09:00-17:00",
//             "priceRange": "$$$"
//           }),
//         }}
//       />
//       <Home />
//     </>
//   );
// }



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