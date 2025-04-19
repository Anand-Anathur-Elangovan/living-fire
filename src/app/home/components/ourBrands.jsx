// import React from "react";
// import CocoonLogo from "@/public/assets/homePage/ourBrands/cocoon.svg";
// import PaulAgnewLogo from "@/public/assets/homePage/ourBrands/paul-agnew.svg";
// import StovaxLogo from "@/public/assets/homePage/ourBrands/stovax.svg";
// import FireFoxLogo from "@/public/assets/homePage/ourBrands/firefox.svg";
// import ADFLogo from "@/public/assets/homePage/ourBrands/adf.svg";
// import AustroLogo from "@/public/assets/homePage/ourBrands/austroflamm.svg";
// import CharnwoodLogo from "@/public/assets/homePage/ourBrands/charnwood.svg";
// import EsseLogo from "@/public/assets/homePage/ourBrands/esse.svg";
// import HeatMasterLogo from "@/public/assets/homePage/ourBrands/heatmaster.svg";
// import HergomLogo from "@/public/assets/homePage/ourBrands/hergom.svg";
// import KaloraLogo from "@/public/assets/homePage/ourBrands/kaloraLogo.png";
// import MorsoLogo from "@/public/assets/homePage/ourBrands/morso.svg";
// import RegencyLogo from "@/public/assets/homePage/ourBrands/regency.svg";
// import eurostoveLogo from "@/public/assets/homePage/ourBrands/eurostoveLogo.png";

// import Image from "next/image";

// const OurBrands = ({ brandList, allProductsRouteHandler }) => {
//   const brands = [
//     {
//       brand_id: 1,
//       image: PaulAgnewLogo,
//       title: "Paul Agnew Designs",
//     },
//     {
//       brand_id: 15,
//       image: CocoonLogo,
//       title: "Cocoon",
//     },
//     {
//       brand_id: 5,
//       image: StovaxLogo,
//       title: "Stovax",
//     },
//     // {

//     //   image: CharnwoodLogo,
//     //   title: "Cocoon",
//     // },
//     {
//       brand_id: 7,
//       image: HergomLogo,
//       title: "HergomLogo",
//     },
//     {
//       brand_id: 10,
//       image: RegencyLogo,
//       title: "RegencyLogo",
//     },
//     {
//       brand_id: 11,
//       image: KaloraLogo,
//       title: "KaloraLogo",
//     },
//     {
//       brand_id: 3,
//       image: AustroLogo,
//       title: "AustroLogo",
//     },
//     {
//       brand_id: 2,
//       image: EsseLogo,
//       title: "EsseLogo",
//     },
//     { brand_id: 4, image: MorsoLogo, title: "MorsoLogo" },
//     {
//       brand_id: 6,
//       image: HeatMasterLogo,
//       title: " HeatMaster",
//     },
//     {
//       brand_id: 8,
//       image: ADFLogo,
//       title: "ADF",
//     },
//     // {
//     //   image: FireFoxLogo,
//     //   title: "Stovax",
//     // },
//     {
//       brand_id: 16,
//       image: eurostoveLogo,
//       title: "Eurostove",
//     },
//   ];
//   return (
//     <div className="flex relative justify-center flex-col">
//       <div className="flex flex-row items-center w-full mb-4">
//         <div className="heading1 flex w-full justify-start ml-8 md:justify-center">
//           Our Brands
//         </div>
//       </div>
//       <div className="bg-white h-[625px] md:h-[470px] mx-[80px] md:mx-16 my-8 flex p-3  justify-around md:justify-center bg-red flex-wrap flex-row gap-y-6 gap-x-2 md:px-[40px] md:py-[50px] md:gap-[48px] basis-1/6 grow">
//         {brands.map((brand, index) => {
//           return (
//             <div
//               key={"brands" + index}
//               className="w-[120px] h-[70px] md:w-[160px] md:h-[92px]"
//               onClick={() =>
//                 allProductsRouteHandler(
//                   "brandType",
//                   brand?.title,
//                   brand.brand_id
//                 )
//               }
//             >
//               <Image
//                 src={brand.image}
//                 alt={brand.title}
//                 width={160}
//                 height={92}
//                 className="grayscale hover:grayscale-0 hover:scale-125 transition ease-in-out"
//                 unoptimized
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default OurBrands;
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
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

const Image = dynamic(() => import("next/image"), { ssr: false });

const OurBrands = ({ brandList, allProductsRouteHandler }) => {
  const brands = [
    {
      brand_id: 1,
      image: PaulAgnewLogo,
      title: "Paul Agnew Designs",
      isSvg: true,
    },
    {
      brand_id: 15,
      image: CocoonLogo,
      title: "Cocoon",
      isSvg: true,
    },
    {
      brand_id: 5,
      image: StovaxLogo,
      title: "Stovax",
      isSvg: true,
    },
    {
      brand_id: 7,
      image: HergomLogo,
      title: "HergomLogo",
      isSvg: true,
    },
    {
      brand_id: 10,
      image: RegencyLogo,
      title: "RegencyLogo",
      isSvg: true,
    },
    {
      brand_id: 11,
      image: KaloraLogo,
      title: "KaloraLogo",
      isSvg: false,
    },
    {
      brand_id: 3,
      image: AustroLogo,
      title: "AustroLogo",
      isSvg: true,
    },
    {
      brand_id: 2,
      image: EsseLogo,
      title: "EsseLogo",
      isSvg: true,
    },
    { 
      brand_id: 4, 
      image: MorsoLogo, 
      title: "MorsoLogo",
      isSvg: true,
    },
    {
      brand_id: 6,
      image: HeatMasterLogo,
      title: "HeatMaster",
      isSvg: true,
    },
    {
      brand_id: 8,
      image: ADFLogo,
      title: "ADF",
      isSvg: true,
    },
    {
      brand_id: 16,
      image: eurostoveLogo,
      title: "Eurostove",
      isSvg: false,
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const hoverEffect = {
    scale: 1.1,
    transition: { duration: 0.3 },
  };

  return (
    <div className="flex relative justify-center flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row items-center w-full mb-4 md:mb-6">
        <motion.h2 
          className="heading1 w-full text-left md:text-center ml-0 md:ml-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Brands
        </motion.h2>
      </div>
      
      <motion.div
        className="bg-white mx-0 md:mx-8 lg:mx-16 my-4 md:my-8 p-4 md:p-6 lg:p-8 flex justify-center flex-wrap gap-4 md:gap-6 lg:gap-8 rounded-lg shadow-sm"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {brands.map((brand, index) => (
          <motion.div
            key={`brands-${index}`}
            className="w-[120px] h-[60px] sm:w-[120px] sm:h-[70px] md:w-[140px] md:h-[80px] lg:w-[160px] lg:h-[92px] flex items-center justify-center p-2 cursor-pointer"
            variants={item}
            whileHover={hoverEffect}
            onClick={() =>
              allProductsRouteHandler(
                "brandType",
                brand?.title,
                brand.brand_id
              )
            }
          >
            {brand.isSvg ? (
              <Image
                src={brand.image}
                alt={brand.title}
                width={160}
                height={92}
                className="grayscale hover:grayscale-0 transition-all duration-300 object-contain"
                loading="lazy"
              />
            ) : (
              <Image
                src={brand.image}
                alt={brand.title}
                width={160}
                height={92}
                className="grayscale hover:grayscale-0 transition-all duration-300 object-contain"
                loading="lazy"
                placeholder="blur"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OurBrands;

// import React from "react";
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";
// // ... (keep your existing imports)

// const Image = dynamic(() => import("next/image"), { ssr: false });

// const OurBrands = ({ brandList, allProductsRouteHandler }) => {
//   // ... (keep your existing brands array and animation variants)

//   return (
//     <div className="w-full flex flex-col items-center px-4 sm:px-6 max-w-[1280px] mx-auto">
//       <div className="w-full mb-8 md:mb-12">
//         <motion.h2 
//           className="heading1 text-center uppercase tracking-wider text-2xl md:text-3xl"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           OUR BRANDS
//         </motion.h2>
//       </div>
      
//       <motion.div
//         className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, margin: "-100px" }}
//       >
//         {brands.map((brand, index) => (
//           <motion.div
//             key={`brands-${index}`}
//             className="flex items-center justify-center"
//             variants={item}
//             whileHover={hoverEffect}
//             onClick={() => allProductsRouteHandler("brandType", brand?.title, brand.brand_id)}
//           >
//             <div className="w-[120px] h-[80px] md:w-[160px] md:h-[100px] relative">
//               {brand.isSvg ? (
//                 <Image
//                   src={brand.image}
//                   alt={brand.title}
//                   fill
//                   className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
//                   loading="lazy"
//                 />
//               ) : (
//                 <Image
//                   src={brand.image}
//                   alt={brand.title}
//                   fill
//                   className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
//                   loading="lazy"
//                   placeholder="blur"
//                 />
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default OurBrands;