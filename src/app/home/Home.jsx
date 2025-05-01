// "use client";
// import React, { useState, useEffect } from "react";
// import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
// import "./home.css";
// import Image from "next/image";
// import Collections from "./components/collections";
// import OurBrands from "./components/ourBrands";
// import Featured from "./components/featured";
// import Testimonials from "./components/testimonials";
// import Blog from "./components/blog";
// import useMasterValues from "../allProducts/hooks/useMasterValues";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import useHomePage from "./hooks/useHomePage";
// import { useRouter } from "next/navigation";
// import { useNavigationState } from "@/context/NavigationContext";
// import { setCookie } from "cookies-next";
// import { motion, AnimatePresence } from "framer-motion";

// const Home = () => {
//   const [hover, setHover] = useState(false);
//   const [showPanels, setShowPanels] = useState(false);
//   const [animatePanels, setAnimatePanels] = useState(false);
//   const [zoomImage, setZoomImage] = useState(false);
//   const [showButtons, setShowButtons] = useState(false);
//   const router = useRouter();
//   const { setNavigationState } = useNavigationState();

//   useEffect(() => {
//     if (hover) {
//       setTimeout(() => {
//         setShowPanels(true);
//       }, 1000);
//       setTimeout(() => {
//         setAnimatePanels(true);
//       }, 2500);
//       setTimeout(() => {
//         setZoomImage(true);
//       }, 2500);
//       setTimeout(() => {
//         setShowButtons(true);
//       }, 3000);
//     } else {
//       setShowPanels(false);
//       setAnimatePanels(false);
//       setZoomImage(false);
//     }
//   }, [hover]);

//   const {
//     brands,
//     masterValues: { fuelTypes, productTypes: allProductMenu },
//   } = useMasterValues();

//   const allProductsRouteHandler = (typeName, displayName, arguId) => {
//     setNavigationState({
//       typeName: typeName,
//       displayName: displayName,
//       id: arguId,
//     });
//     router.push(`/allProducts/${displayName}`);
//   };

//   const productRouteHandler = (ProductName, brandName) => {
//     const formattedProductName = ProductName.replace(/\s+/g, "_");
//     const formattedBrandName = brandName.replace(/\s+/g, "_");
//     router.push(`/${formattedBrandName}/${formattedProductName}`);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setHover(true);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#F7F7F5",
//         gap: "75px",
//       }}
//     >
//       <div
//         className="home-page"
//         // onMouseEnter={() => setHover(true)}
//         // onMouseLeave={() => setHover(true)}
//         // onMouseOver={() => setHover(true)}
//         // onMouseMoveCapture={() => setHover(true)}
//       >
//         {/* Base Component - this will fade out */}
//         <AnimatePresence>
//           {!hover && (
//             <motion.div
//               className="base-container"
//               initial={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <section className="hero">
//                 <motion.div
//                   className="hero-content"
//                   // initial={{ opacity: 0 }}
//                   // animate={{ opacity: 1 }}
//                   // exit={{ opacity: 0 }}
//                   // transition={{ duration: 0.3 }}
//                 >
//                   <h1>STUNNING FIREPLACES FOR ANY HOME.</h1>
//                   <p>
//                     At Living Fire, we believe our work is complete only when
//                     our clients are enjoying the warmth of their new fireplace
//                     with a glass of wine in hand. To ensure every customer
//                     across Melbourne and Australia finds their match, we have
//                     curated an exceptional selection of luxury fireplace brands.
//                     Visit our showrooms in Richmond and Moorabbin to experience
//                     our products firsthand.
//                   </p>
//                 </motion.div>
//               </section>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* White panels that will slide out */}
//         <motion.div
//           className={`panel-left ${showPanels ? "show-panelsLeft" : ""} ${
//             showPanels ? "animateLeft" : ""
//           } ${animatePanels ? "animateFutherLeft" : ""}`}
//           initial={{ x: "-100%" }}
//           animate={{
//             x: showPanels ? (animatePanels ? "-100%" : "-70%") : "-10%",
//           }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//         ></motion.div>

//         <motion.div
//           className={`panel-right ${showPanels ? "show-panelsRight" : ""} ${
//             showPanels ? "animateRight" : ""
//           } ${animatePanels ? "animateFutherRight" : ""}`}
//           initial={{ x: "100%" }}
//           animate={{ x: showPanels ? (animatePanels ? "100%" : "70%") : "10%" }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//         ></motion.div>

//         <div className={`overlay-container ${zoomImage ? "show-panels" : ""}`}>
//           <Image
//             src={homePageMainImg}
//             alt="Overlay"
//             className={`overlay-image ${zoomImage ? "zoom" : ""}`}
//             // unoptimized
//             loading="lazy"
//             placeholder="blur"
//           />
//           <motion.div
//             className={`text-group show`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//           >
//             <h1
//               className={`blur-text`}
//               onClick={() => router.push(`/allProducts`)}
//               style={{ cursor: "pointer" }}
//             >
//               LIVING FIRE
//             </h1>
//           </motion.div>

//           <motion.div
//             className={`text-group-subheading show`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//           >
//             <span className={`blur-text`}>Architectural Fireplace Design</span>
//           </motion.div>

//           <motion.div
//             className={`button-group ${showButtons ? "show" : ""}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: showButtons ? 1 : 0 }}
//             transition={{ duration: 1 }}
//           >
//             {fuelTypes?.map((fuelType, index) => {
//               if (fuelType?.fueltype_name !== "Hybrid - Wood/Electric")
//                 return (
//                   <button
//                     key={"fuelTypes" + fuelType.fueltype_id}
//                     onClick={() =>
//                       allProductsRouteHandler(
//                         "fuelType",
//                         fuelType?.fueltype_name,
//                         fuelType.fueltype_id
//                       )
//                     }
//                     className="p-0 m-0 flex gap-3"
//                   >
//                     {fuelType?.fueltype_name}
//                     {fuelTypes.length !== index + 1 && (
//                       <span className="hidden md:flex items-center text-white">
//                         |
//                       </span>
//                     )}
//                   </button>
//                 );
//             })}
//           </motion.div>
//         </div>
//       </div>

//       <Collections
//         fuelTypes={fuelTypes}
//         allProductsRouteHandler={allProductsRouteHandler}
//       />
//       <OurBrands
//         brandList={brands}
//         allProductsRouteHandler={allProductsRouteHandler}
//       />
//       <Featured
//         headingValue="Featured"
//         productRouteHandler={productRouteHandler}
//       />
//       <Testimonials />
//       <Blog />
//     </div>
//   );
// };

// export default Home;

// "use client";
// import React, { useState, useEffect, lazy, Suspense } from "react";
// import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
// import "./home.css";
// import Image from "next/image";
// import useMasterValues from "../allProducts/hooks/useMasterValues";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useRouter } from "next/navigation";
// import { useNavigationState } from "@/context/NavigationContext";
// import { motion, AnimatePresence } from "framer-motion";
// import CocoonLogo from "@/public/assets/homePage/ourBrands/cocoon.svg";
// import PaulAgnewLogo from "@/public/assets/homePage/ourBrands/paul-agnew.svg";
// import StovaxLogo from "@/public/assets/homePage/ourBrands/stovax.svg";
// import ADFLogo from "@/public/assets/homePage/ourBrands/adf.svg";
// import AustroLogo from "@/public/assets/homePage/ourBrands/austroflamm.svg";
// import EsseLogo from "@/public/assets/homePage/ourBrands/esse.svg";
// import HeatMasterLogo from "@/public/assets/homePage/ourBrands/heatmaster.svg";
// import HergomLogo from "@/public/assets/homePage/ourBrands/hergom.svg";
// import KaloraLogo from "@/public/assets/homePage/ourBrands/kaloraLogo.png";
// import MorsoLogo from "@/public/assets/homePage/ourBrands/morso.svg";
// import RegencyLogo from "@/public/assets/homePage/ourBrands/regency.svg";
// import eurostoveLogo from "@/public/assets/homePage/ourBrands/eurostoveLogo.png";
// // Dynamically load heavy components
// const Collections = lazy(() => import("./components/collections"));
// const OurBrands = lazy(() => import("./components/ourBrands"));
// const Featured = lazy(() => import("./components/featured"));
// const Testimonials = lazy(() => import("./components/testimonials"));
// const Blog = lazy(() => import("./components/blog"));

// const Home = () => {
//   const [hover, setHover] = useState(false);
//   const [showPanels, setShowPanels] = useState(false);
//   const [animatePanels, setAnimatePanels] = useState(false);
//   const [zoomImage, setZoomImage] = useState(false);
//   const [showButtons, setShowButtons] = useState(false);
//   const router = useRouter();
//   const { setNavigationState } = useNavigationState();

//   useEffect(() => {
//     if (hover) {
//       setTimeout(() => {
//         setShowPanels(true);
//       }, 1000);
//       setTimeout(() => {
//         setAnimatePanels(true);
//       }, 2500);
//       setTimeout(() => {
//         setZoomImage(true);
//       }, 2500);
//       setTimeout(() => {
//         setShowButtons(true);
//       }, 3000);
//     } else {
//       setShowPanels(false);
//       setAnimatePanels(false);
//       setZoomImage(false);
//     }
//   }, [hover]);

//   const {
//     brands,
//     masterValues: { fuelTypes, productTypes: allProductMenu },
//   } = useMasterValues();

//   const allProductsRouteHandler = (typeName, displayName, arguId) => {
//     setNavigationState({
//       typeName: typeName,
//       displayName: displayName,
//       id: arguId,
//     });
//     router.push(`/allProducts/${displayName}`);
//   };

//   const productRouteHandler = (ProductName, brandName) => {
//     const formattedProductName = ProductName.replace(/\s+/g, "_");
//     const formattedBrandName = brandName.replace(/\s+/g, "_");
//     router.push(`/${formattedBrandName}/${formattedProductName}`);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setHover(true);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);
//    const brandsList = [
//       {
//         brand_id: 1,
//         image: PaulAgnewLogo,
//         title: "Paul Agnew Designs",
//         isSvg: true,
//       },
//       {
//         brand_id: 15,
//         image: CocoonLogo,
//         title: "Cocoon",
//         isSvg: true,
//       },
//       {
//         brand_id: 5,
//         image: StovaxLogo,
//         title: "Stovax",
//         isSvg: true,
//       },
//       {
//         brand_id: 7,
//         image: HergomLogo,
//         title: "Hergom",
//         isSvg: true,
//       },
//       {
//         brand_id: 10,
//         image: RegencyLogo,
//         title: "Regency",
//         isSvg: true,
//       },
//       {
//         brand_id: 11,
//         image: KaloraLogo,
//         title: "Kalora",
//         isSvg: false,
//       },
//       {
//         brand_id: 3,
//         image: AustroLogo,
//         title: "Austroflamm",
//         isSvg: true,
//       },
//       {
//         brand_id: 2,
//         image: EsseLogo,
//         title: "Esse",
//         isSvg: true,
//       },
//       { 
//         brand_id: 4, 
//         image: MorsoLogo, 
//         title: "Morso",
//         isSvg: true,
//       },
//       {
//         brand_id: 6,
//         image: HeatMasterLogo,
//         title: "HeatMaster",
//         isSvg: true,
//       },
//       {
//         brand_id: 8,
//         image: ADFLogo,
//         title: "ADF",
//         isSvg: true,
//       },
//       {
//         brand_id: 16,
//         image: eurostoveLogo,
//         title: "Eurostove",
//         isSvg: false,
//       },
//     ];
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#F7F7F5",
//         gap: "75px",
//       }}
//     >
//       {/* LocalBusiness Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "LocalBusiness",
//             name: "Living Fire",
//             image: [
//               "https://livingfires.com.au/logo.jpg",
//               "https://livingfires.com.au/assets/homePage/homePageMainImg.png",
//             ],
//             address: {
//               "@type": "PostalAddress",
//               streetAddress: "48-150 Cochranes Rd",
//               addressLocality: "Moorabbin",
//               addressRegion: "VIC",
//               postalCode: "3189",
//               addressCountry: "AU",
//             },
//             geo: {
//               "@type": "GeoCoordinates",
//               latitude: "-37.9399438839525",
//               longitude: "145.0849985832501",
//             },
//             telephone: "+61 3 9977 7888",
//             openingHours: [
//               {
//                 "@type": "OpeningHoursSpecification",
//                 dayOfWeek: [
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "saturday",
//                 ],
//                 opens: "08:00",
//                 closes: "17:00",
//               },
//             ],
//             priceRange: "$$$",
//           }),
//         }}
//       />

//       <div className="home-page">
//         <AnimatePresence>
//           {!hover && (
//             <motion.div
//               className="base-container"
//               initial={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <section className="hero" aria-label="Premium Fireplace Showroom">
//                 <motion.div className="hero-content">
//                   {/* <h1>Luxury Custom Fireplaces in Melbourne</h1>
//                   <p>
//                     <strong>Living Fire</strong> designs{" "}
//                     <strong>European-inspired fireplaces</strong> for Australian
//                     homes. Explore our{" "}
//                     <strong>gas, wood, and designer collections</strong> at our
//                     Melbourne showrooms (Richmond & Moorabbin).{" "}
//                     <a href="/contact" className="text-link">
//                       Book a free consultation
//                     </a>
//                     .
//                   </p>
//                   <a href="/allProducts" className="cta-button">
//                     View Collections
//                   </a> */}
//                   <h1>STUNNING FIREPLACES FOR ANY HOME.</h1>
//                   <p>
//                     At Living Fire, we believe our work is complete only when
//                     our clients are enjoying the warmth of their new fireplace
//                     with a glass of wine in hand. To ensure every customer
//                     across Melbourne and Australia finds their match, we have
//                     curated an exceptional selection of luxury fireplace brands.
//                     Visit our showrooms in Richmond and Moorabbin to experience
//                     our products firsthand.
//                   </p>
//                 </motion.div>
//               </section>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.div
//           className={`panel-left ${showPanels ? "show-panelsLeft" : ""} ${
//             showPanels ? "animateLeft" : ""
//           } ${animatePanels ? "animateFutherLeft" : ""}`}
//           initial={{ x: "-100%" }}
//           animate={{
//             x: showPanels ? (animatePanels ? "-100%" : "-70%") : "-10%",
//           }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//           aria-hidden="true"
//         ></motion.div>

//         <motion.div
//           className={`panel-right ${showPanels ? "show-panelsRight" : ""} ${
//             showPanels ? "animateRight" : ""
//           } ${animatePanels ? "animateFutherRight" : ""}`}
//           initial={{ x: "100%" }}
//           animate={{ x: showPanels ? (animatePanels ? "100%" : "70%") : "10%" }}
//           transition={{ duration: 1, ease: "easeInOut" }}
//           aria-hidden="true"
//         ></motion.div>

//         <div className={`overlay-container ${zoomImage ? "show-panels" : ""}`}>
//           <Image
//             src={homePageMainImg}
//             alt="Luxury European Fireplace Display at Living Fire Melbourne Showroom"
//             className={`overlay-image ${zoomImage ? "zoom" : ""}`}
//             loading="lazy"
//             placeholder="blur"
//             width={1200}
//             height={800}
//             quality={85}
//             priority
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />
//           <motion.div
//             className={`text-group show`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//           >
//             <h1
//               className={`blur-text`}
//               onClick={() => router.push(`/allProducts`)}
//               style={{ cursor: "pointer" }}
//             >
//               LIVING FIRE
//             </h1>
//           </motion.div>

//           <motion.div
//             className={`text-group-subheading show`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//           >
//             <span className={`blur-text`}>Architectural Fireplace Design</span>
//           </motion.div>

//           <motion.div
//             className={`button-group ${showButtons ? "show" : ""}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: showButtons ? 1 : 0 }}
//             transition={{ duration: 1 }}
//           >
//             {fuelTypes?.map((fuelType, index) => {
//               if (fuelType?.fueltype_name !== "Hybrid - Wood/Electric")
//                 return (
//                   <button
//                     key={"fuelTypes" + fuelType.fueltype_id}
//                     onClick={() =>
//                       allProductsRouteHandler(
//                         "fuelType",
//                         fuelType?.fueltype_name,
//                         fuelType.fueltype_id
//                       )
//                     }
//                     className="p-0 m-0 flex gap-3"
//                     aria-label={`Browse ${fuelType.fueltype_name} fireplaces`}
//                   >
//                     {fuelType?.fueltype_name}
//                     {fuelTypes.length !== index + 1 && (
//                       <span className="hidden md:flex items-center text-white">
//                         |
//                       </span>
//                     )}
//                   </button>
//                 );
//             })}
//           </motion.div>
//         </div>
//       </div>

//       <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
//         <Collections
//           fuelTypes={fuelTypes}
//           allProductsRouteHandler={allProductsRouteHandler}
//         />
//         <OurBrands
//           brandList={brands}
//           allProductsRouteHandler={allProductsRouteHandler}
//         />
//         <Featured
//           headingValue="Featured"
//           productRouteHandler={productRouteHandler}
//         />
//         <Testimonials />
//         <Blog />
//       </Suspense>

//       {/* Product Schema for Featured Items */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "ItemList",
//             itemListElement: brands?.map((brand, index) => ({
//               "@type": "ListItem",
//               position: index + 1,
//               item: {
//                 "@type": "Product",
//                 name: `${brand?.brand_name} Fireplace`,
//                 url: `https://livingfires.com.au/allProducts/${brand?.brand_name.replace(
//                   /\s+/g,
//                   "_"
//                 )}`,
//                 image:
//                 brandsList.find(b => b.brand_id === brand.brand_id)?.image ||
//                   brand?.image_url ||
//                   "https://livingfires.com.au/placeholder-product.jpg",
//                 description: brand?.brand_desc || `Premium ${brand?.brand_name} fireplace collection`,
//                 brand: {
//                   "@type": "Brand",
//                   name: brand?.brand_name,
//                 },
//               },
//             })),
//           }),
//         }}
//       />
//     </div>
//   );
// };

// export default Home;


"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
import "./home.css";
import Image from "next/image";
import useMasterValues from "../allProducts/hooks/useMasterValues";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/src/helper/loader/Loader";

// Brand logos (optimized imports)
const brandLogos = {
  cocoon: () => import("@/public/assets/homePage/ourBrands/cocoon.svg"),
  paulAgnew: () => import("@/public/assets/homePage/ourBrands/paul-agnew.svg"),
  stovax: () => import("@/public/assets/homePage/ourBrands/stovax.svg"),
  adf: () => import("@/public/assets/homePage/ourBrands/adf.svg"),
  austro: () => import("@/public/assets/homePage/ourBrands/austroflamm.svg"),
  esse: () => import("@/public/assets/homePage/ourBrands/esse.svg"),
  heatmaster: () => import("@/public/assets/homePage/ourBrands/heatmaster.svg"),
  hergom: () => import("@/public/assets/homePage/ourBrands/hergom.svg"),
  kalora: () => import("@/public/assets/homePage/ourBrands/kaloraLogo.png"),
  morso: () => import("@/public/assets/homePage/ourBrands/morso.svg"),
  regency: () => import("@/public/assets/homePage/ourBrands/regency.svg"),
  eurostove: () => import("@/public/assets/homePage/ourBrands/eurostoveLogo.png")
};

// Dynamically load components
const Collections = lazy(() => import("./components/collections"));
const OurBrands = lazy(() => import("./components/ourBrands"));
const Featured = lazy(() => import("./components/featured"));
const Testimonials = lazy(() => import("./components/testimonials"));
const Blog = lazy(() => import("./components/blog"));

const Home = () => {
  const [hover, setHover] = useState(false);
  const [showPanels, setShowPanels] = useState(false);
  const [animatePanels, setAnimatePanels] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();
  const { setNavigationState } = useNavigationState();

  // Animation sequence
  useEffect(() => {
    if (hover) {
      const timers = [
        setTimeout(() => setShowPanels(true), 1000),
        setTimeout(() => setAnimatePanels(true), 2500),
        setTimeout(() => setZoomImage(true), 2500),
        setTimeout(() => setShowButtons(true), 3000)
      ];
      return () => timers.forEach(timer => clearTimeout(timer));
    } else {
      setShowPanels(false);
      setAnimatePanels(false);
      setZoomImage(false);
    }
  }, [hover]);

  const { brands, masterValues: { fuelTypes } } = useMasterValues();

  const allProductsRouteHandler = (typeName, displayName, arguId) => {
    setNavigationState({ typeName, displayName, id: arguId });
    router.push(`/allProducts/${displayName}`);
  };

  const productRouteHandler = (ProductName, brandName) => {
    router.push(`/${brandName.replace(/\s+/g, "_")}/${ProductName.replace(/\s+/g, "_")}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHover(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const brandsList = [
    { brand_id: 1, imageKey: "paulAgnew", title: "Paul Agnew Designs", isSvg: true },
    { brand_id: 15, imageKey: "cocoon", title: "Cocoon", isSvg: true },
    { brand_id: 5, imageKey: "stovax", title: "Stovax", isSvg: true },
    { brand_id: 7, imageKey: "hergom", title: "Hergom", isSvg: true },
    { brand_id: 10, imageKey: "regency", title: "Regency", isSvg: true },
    { brand_id: 11, imageKey: "kalora", title: "Kalora", isSvg: false },
    { brand_id: 3, imageKey: "austro", title: "Austroflamm", isSvg: true },
    { brand_id: 2, imageKey: "esse", title: "Esse", isSvg: true },
    { brand_id: 4, imageKey: "morso", title: "Morso", isSvg: true },
    { brand_id: 6, imageKey: "heatmaster", title: "HeatMaster", isSvg: true },
    { brand_id: 8, imageKey: "adf", title: "ADF", isSvg: true },
    { brand_id: 16, imageKey: "eurostove", title: "Eurostove", isSvg: false },
  ];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#F7F7F5",
      gap: "75px"
    }}>
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Living Fire",
            image: [
              "https://livingfires.com.au/logo.webp", // Convert to WebP
              "https://livingfires.com.au/assets/homePage/homePageMainImg.webp"
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "48-150 Cochranes Rd",
              addressLocality: "Moorabbin",
              addressRegion: "VIC",
              postalCode: "3189",
              addressCountry: "AU"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "-37.9399438839525",
              longitude: "145.0849985832501"
            },
            telephone: "+61 3 9977 7888",
            openingHoursSpecification: [{
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              opens: "08:00",
              closes: "17:00"
            }],
            priceRange: "$$$"
          })
        }}
      />

      {/* Hero Section */}
      <div className="home-page">
        <AnimatePresence>
          {!hover && (
            <motion.div
              className="base-container"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <section className="hero" aria-label="Premium Fireplace Showroom">
                <motion.div className="hero-content">
                  <h1>STUNNING FIREPLACES FOR ANY HOME.</h1>
                  <p>
                    At Living Fire, we believe our work is complete only when
                    our clients are enjoying the warmth of their new fireplace
                    with a glass of wine in hand. To ensure every customer
                    across Melbourne and Australia finds their match, we have
                    curated an exceptional selection of luxury fireplace brands.
                    Visit our showrooms in Richmond and Moorabbin to experience
                    our products firsthand.
                  </p>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Panels */}
        <motion.div
          className={`panel-left ${showPanels ? "show-panelsLeft" : ""}`}
          initial={{ x: "-100%" }}
          animate={{ x: showPanels ? (animatePanels ? "-100%" : "-70%") : "-10%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <motion.div
          className={`panel-right ${showPanels ? "show-panelsRight" : ""}`}
          initial={{ x: "100%" }}
          animate={{ x: showPanels ? (animatePanels ? "100%" : "70%") : "10%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Optimized Hero Image */}
        <div className={`overlay-container ${zoomImage ? "show-panels" : ""}`}>
          <Image
            src={homePageMainImg}
            alt="Luxury European Fireplace Display at Living Fire Melbourne Showroom"
            className={`overlay-image ${zoomImage ? "zoom" : ""}`}
            priority
            quality={75}
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
          />
          
          <motion.div className="text-group show" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <h1 className="blur-text" onClick={() => router.push(`/allProducts`)} style={{ cursor: "pointer" }}>
              LIVING FIRE
            </h1>
          </motion.div>

          <motion.div className="text-group-subheading show" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <span className="blur-text">Architectural Fireplace Design</span>
          </motion.div>

          <motion.div className={`button-group ${showButtons ? "show" : ""}`} initial={{ opacity: 0 }} animate={{ opacity: showButtons ? 1 : 0 }} transition={{ duration: 1 }}>
            {fuelTypes?.map((fuelType, index) => (
              fuelType?.fueltype_name !== "Hybrid - Wood/Electric" && (
                <button
                  key={`fuelType-${fuelType.fueltype_id}`}
                  onClick={() => allProductsRouteHandler("fuelType", fuelType.fueltype_name, fuelType.fueltype_id)}
                  className="p-0 m-0 flex gap-3"
                  aria-label={`Browse ${fuelType.fueltype_name} fireplaces`}
                >
                  {fuelType.fueltype_name}
                  {index < fuelTypes.length - 1 && (
                    <span className="hidden md:flex items-center text-white">|</span>
                  )}
                </button>
              )
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dynamically Loaded Sections */}
      <Suspense fallback={<div className="loading-spinner"><Loader /></div>}>
        <Collections fuelTypes={fuelTypes} allProductsRouteHandler={allProductsRouteHandler} />
        <OurBrands brandList={brandsList} allProductsRouteHandler={allProductsRouteHandler} />
        <Featured headingValue="Featured" productRouteHandler={productRouteHandler} />
        <Testimonials />
        <Blog />
      </Suspense>

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: brandsList.map((brand, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: `${brand.title} Fireplace`,
                url: `https://livingfires.com.au/allProducts/${brand.title.replace(/\s+/g, "_")}`,
                image: `https://livingfires.com.au/assets/homePage/ourBrands/${brand.imageKey}.${brand.isSvg ? 'svg' : 'png'}`,
                description: `Premium ${brand.title} fireplace collection`,
                brand: { "@type": "Brand", name: brand.title }
              }
            }))
          })
        }}
      />
    </div>
  );
};

export default Home;