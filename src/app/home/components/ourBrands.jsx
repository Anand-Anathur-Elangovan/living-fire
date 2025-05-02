// import React from "react";
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";
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

// const Image = dynamic(() => import("next/image"), { ssr: false });

// const OurBrands = ({ brandList, allProductsRouteHandler }) => {
//   const brands = [
//     {
//       brand_id: 1,
//       image: PaulAgnewLogo,
//       title: "Paul Agnew Designs",
//       isSvg: true,
//     },
//     {
//       brand_id: 15,
//       image: CocoonLogo,
//       title: "Cocoon",
//       isSvg: true,
//     },
//     {
//       brand_id: 5,
//       image: StovaxLogo,
//       title: "Stovax",
//       isSvg: true,
//     },
//     {
//       brand_id: 7,
//       image: HergomLogo,
//       title: "Hergom",
//       isSvg: true,
//     },
//     {
//       brand_id: 10,
//       image: RegencyLogo,
//       title: "Regency",
//       isSvg: true,
//     },
//     {
//       brand_id: 11,
//       image: KaloraLogo,
//       title: "Kalora",
//       isSvg: false,
//     },
//     {
//       brand_id: 3,
//       image: AustroLogo,
//       title: "Austroflamm",
//       isSvg: true,
//     },
//     {
//       brand_id: 2,
//       image: EsseLogo,
//       title: "Esse",
//       isSvg: true,
//     },
//     { 
//       brand_id: 4, 
//       image: MorsoLogo, 
//       title: "Morso",
//       isSvg: true,
//     },
//     {
//       brand_id: 6,
//       image: HeatMasterLogo,
//       title: "HeatMaster",
//       isSvg: true,
//     },
//     {
//       brand_id: 8,
//       image: ADFLogo,
//       title: "ADF",
//       isSvg: true,
//     },
//     {
//       brand_id: 16,
//       image: eurostoveLogo,
//       title: "Eurostove",
//       isSvg: false,
//     },
//   ];

//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   const hoverEffect = {
//     scale: 1.1,
//     transition: { duration: 0.3 },
//   };

//   return (
//     <div className="flex relative justify-center flex-col px-4 sm:px-6 lg:px-8">
//       <div className="flex flex-row items-center w-full mb-4 md:mb-6">
//         <motion.h2 
//           className="heading1 w-full text-left md:text-center ml-0 md:ml-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Our Brands
//         </motion.h2>
//       </div>
      
//       <motion.div
//         className="bg-white mx-0 md:mx-8 lg:mx-16 my-4 md:my-8 p-4 md:p-6 lg:p-8 flex justify-center flex-wrap gap-4 md:gap-6 lg:gap-8 rounded-lg shadow-sm"
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, margin: "-100px" }}
//       >
//         {brands.map((brand, index) => (
//           <motion.div
//             key={`brands-${index}`}
//             className="w-[120px] h-[60px] sm:w-[120px] sm:h-[70px] md:w-[140px] md:h-[80px] lg:w-[160px] lg:h-[92px] flex items-center justify-center p-2 cursor-pointer"
//             variants={item}
//             whileHover={hoverEffect}
//             onClick={() =>
//               allProductsRouteHandler(
//                 "brandType",
//                 brand?.title,
//                 brand.brand_id
//               )
//             }
//           >
//             {brand.isSvg ? (
//               <Image
//                 src={brand.image}
//                 alt={brand.title}
//                 title={brand.title}
//                 width={160}
//                 height={92}
//                 className="grayscale hover:grayscale-0 transition-all duration-300 object-contain"
//                 loading="lazy" // Native lazy loading
//                 // quality={75}   // Adjust based on need
//                 // priority={false}
//               />
//             ) : (
//               <Image
//                 src={brand.image}
//                 alt={brand.title}
//                 title={brand.title}
//                 width={160}
//                 height={92}
//                 className="grayscale hover:grayscale-0 transition-all duration-300 object-contain"
//                 loading="lazy" // Native lazy loading
//                 // quality={75}   // Adjust based on need
//                 // priority={false}
//                 placeholder="blur"
//               />
//             )}
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default OurBrands;
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CocoonLogo from "@/public/assets/homePage/ourBrands/cocoon.svg";
import PaulAgnewLogo from "@/public/assets/homePage/ourBrands/paul-agnew.svg";
import StovaxLogo from "@/public/assets/homePage/ourBrands/stovax.svg";
import ADFLogo from "@/public/assets/homePage/ourBrands/adf.svg";
import AustroLogo from "@/public/assets/homePage/ourBrands/austroflamm.svg";
import EsseLogo from "@/public/assets/homePage/ourBrands/esse.svg";
import HeatMasterLogo from "@/public/assets/homePage/ourBrands/heatmaster.svg";
import HergomLogo from "@/public/assets/homePage/ourBrands/hergom.svg";
import KaloraLogo from "@/public/assets/homePage/ourBrands/kaloraLogo.png";
import MorsoLogo from "@/public/assets/homePage/ourBrands/morso.svg";
import RegencyLogo from "@/public/assets/homePage/ourBrands/regency.svg";
import eurostoveLogo from "@/public/assets/homePage/ourBrands/eurostoveLogo.png";
import { useRouter } from "next/navigation";

const OurBrands = ({ brandList, allProductsRouteHandler }) => {
  const router = useRouter();
  const [prefetchedBrands, setPrefetchedBrands] = useState(new Set());

  const brands = [
    {
      brand_id: 1,
      image: PaulAgnewLogo,
      title: "Paul Agnew Designs",
      isSvg: true,
      route: "/brand/paul-agnew-designs"
    },
    {
      brand_id: 15,
      image: CocoonLogo,
      title: "Cocoon",
      isSvg: true,
      route: "/brand/cocoon"
    },
    {
      brand_id: 5,
      image: StovaxLogo,
      title: "Stovax",
      isSvg: true,
      route: "/brand/stovax"
    },
    {
      brand_id: 7,
      image: HergomLogo,
      title: "Hergom",
      isSvg: true,
      route: "/brand/hergom"
    },
    {
      brand_id: 10,
      image: RegencyLogo,
      title: "Regency",
      isSvg: true,
      route: "/brand/regency"
    },
    {
      brand_id: 11,
      image: KaloraLogo,
      title: "Kalora",
      isSvg: false,
      route: "/brand/kalora"
    },
    {
      brand_id: 3,
      image: AustroLogo,
      title: "Austroflamm",
      isSvg: true,
      route: "/brand/austroflamm"
    },
    {
      brand_id: 2,
      image: EsseLogo,
      title: "Esse",
      isSvg: true,
      route: "/brand/esse"
    },
    { 
      brand_id: 4, 
      image: MorsoLogo, 
      title: "Morso",
      isSvg: true,
      route: "/brand/morso"
    },
    {
      brand_id: 6,
      image: HeatMasterLogo,
      title: "HeatMaster",
      isSvg: true,
      route: "/brand/heatmaster"
    },
    {
      brand_id: 8,
      image: ADFLogo,
      title: "ADF",
      isSvg: true,
      route: "/brand/adf"
    },
    {
      brand_id: 16,
      image: eurostoveLogo,
      title: "Eurostove",
      isSvg: false,
      route: "/brand/eurostove"
    },
  ];

  // Prefetch brand route on hover
  const handleBrandHover = (brand) => {
    if (!prefetchedBrands.has(brand.brand_id)) {
      router.prefetch(brand.route);
      setPrefetchedBrands(prev => new Set(prev).add(brand.brand_id));
    }
  };

  // CSS-based hover effect
  const brandItemStyle = `
    .brand-item {
      transition: transform 0.2s ease-out, filter 0.3s ease;
    }
    .brand-item:hover {
      transform: scale(1.05);
      filter: grayscale(0);
    }
    .brand-item:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;

  // Animation variants (simplified)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 }, // Smaller initial movement
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }, // Faster animation
  };

  return (
    <section className="flex relative justify-center flex-col px-4 sm:px-6 lg:px-8">
      <style>{brandItemStyle}</style>
      
      <div className="flex flex-row items-center w-full mb-4 md:mb-6">
        <motion.h2 
          className="heading1 w-full text-left md:text-center ml-0 md:ml-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Our Brands
        </motion.h2>
      </div>
      
      <motion.div
        className="bg-white mx-0 md:mx-8 lg:mx-16 my-4 md:my-8 p-4 md:p-6 lg:p-8 flex justify-center flex-wrap gap-4 md:gap-6 lg:gap-8 rounded-lg shadow-sm"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px" }} // Load immediately when in view
      >
        {brands.map((brand) => (
          <motion.div
            key={`brands-${brand.brand_id}`}
            className="brand-item w-[120px] h-[60px] sm:w-[120px] sm:h-[70px] md:w-[140px] md:h-[80px] lg:w-[160px] lg:h-[92px] flex items-center justify-center p-2 cursor-pointer grayscale"
            variants={item}
            onClick={() => allProductsRouteHandler("brandType", brand.title, brand.brand_id)}
            onMouseEnter={() => handleBrandHover(brand)}
            onFocus={() => handleBrandHover(brand)}
            tabIndex={0}
            aria-label={`View ${brand.title} products`}
          >
            <Image
              src={brand.image}
              alt={brand.title}
              width={160}
              height={92}
              className="object-contain"
              loading={brand.brand_id <= 4 ? "eager" : "lazy"} // Eager load first 4
              quality={85}
              {...(!brand.isSvg && { placeholder: "blur" })}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default React.memo(OurBrands);