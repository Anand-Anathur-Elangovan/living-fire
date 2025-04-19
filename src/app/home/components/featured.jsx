// import React, { useState, useEffect, useRef } from "react";
// import "./featured.css"; // Add your styles here
// import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
// import featureImg1 from "@/public/assets/homePage/feature/1.webp";
// import featureImg2 from "@/public/assets/homePage/feature/22.webp";
// import featureImg3 from "@/public/assets/homePage/feature/3.webp";
// import featureImg4 from "@/public/assets/homePage/feature/4.png";
// import featureImg5 from "@/public/assets/homePage/feature/5.png";
// import featureImg6 from "@/public/assets/homePage/feature/6.jpg";
// import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
// import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useNavigationState } from "@/context/NavigationContext";
// import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

// const Featured = ({ headingValue, productRouteHandler, name, brand_name }) => {
//   const router = useRouter();
//   const { setNavigationState } = useNavigationState();
//   const carouselRef = useRef(null);
//   const carouselItems = [
//     {
//       p_id: "424",
//       image: featureImg1,
//       title: "Ilektro 1250",
//       description: "Paul Agnew Designs",
//       name:"Ilektro 1250 Landscape Tunnel", 
//       brand_name:"Paul Agnew Designs"
//     },
//     {
//       p_id: "424",
//       image: featureImg2,
//       // collectionImg2,
//       title: "Ilektro 2600",
//       description: "Paul Agnew Designs",
//       name:"Ilektro 2600 Landscape", 
//       brand_name:"Paul Agnew Designs"
//     },
//     {
//       p_id: "424",
//       image: featureImg3,
//       // collectionImg3,
//       title: "Ilektro integra anson",
//       description: "Paul Agnew Designs",
//       name:"HZO42 - Outdoor - LPG", 
//       brand_name:"Paul Agnew Designs"
//     },
//     {
//       p_id: "424",
//       image: featureImg4,
//       title: "Pyro Siena 750GF Freestanding",
//       description: "Paul Agnew Designs",
//       name:"Siena 750GF Freestanding", 
//       brand_name:"Paul Agnew Designs"
//     },
//     {
//       p_id: "424",
//       image: featureImg5,
//       title: "Heatmaster Seamless",
//       description: "Heatmaster",
//       name:"Seamless", 
//       brand_name:"Heatmaster"
//     },
//     {
//       p_id: "424",
//       image: featureImg6,
//       title: "Regency FG39",
//       description: "Regency",
//       name:"FG39", 
//       brand_name:"Regency"
//     },
//   ];
//   const handleScroll = (direction) => {
//     if (carouselRef.current) {
//       const scrollAmount = 320; // Adjust the scroll amount as needed
//       if (direction === "left") {
//         carouselRef.current.scrollBy({
//           left: -scrollAmount,
//           behavior: "smooth",
//         });
//       } else if (direction === "right") {
//         carouselRef.current.scrollBy({
//           left: scrollAmount,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   return (
//     <div className="flex relative justify-center flex-col gap-10 ml-0 mr-0 md:ml-20 md:mr-20">
//       <div className="flex flex-row items-center w-full">
//         <div className="heading1 flex w-full justify-start ml-8 md:justify-center md:ml-0">
//           {headingValue}
//         </div>
//         <div className="flex flex-row items-center gap-2 absolute right-5 cursor-pointer">
//           <Image
//             src={RightArrow}
//             alt="Right Arrow"
//             onClick={() => handleScroll("left")}
//             unoptimized
//           />
//           <Image
//             src={LeftArrow}
//             alt="Left Arrow"
//             onClick={() => handleScroll("right")}
//             unoptimized
//           />
//         </div>
//       </div>

//       <div
//         ref={carouselRef}
//         className="grid grid-flow-col auto-cols-[100%] gap-[36px] overflow-x-auto overscroll-x-contain feature-snaps before:px-1 hide-scrollbar ml-8  md:auto-cols-[25%]"
//       >
//         {carouselItems.map((item, index) => (
//           <div
//             className="w-[323px] flex flex-col gap-5"
//             key={"featured" + index}
//             onClick={() => productRouteHandler(item.name,item?.brand_name )}
//           >
//             <Image
//               src={item.image}
//               alt={item.title}
//               className="w-[360px] md:w-80"
//               key={index}
//               //width={323} // specify your desired width
//               //height={323} // specify your desired height
//               //   layout="fill" // or any other layout you need
//               style={{ cursor: "pointer" }}
//               unoptimized
//             />
//             <div
//               className="font-sans  text-left"
//               style={{ cursor: "pointer" }}
//             >
//               <h3 className="leading-6 text-lg font-extralight">
//                 {item.title}
//               </h3>
//               <p className="font-medium leading-5 text-sm text-[#94999F]">
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div
//         className="relative w-[524px] h-[22px] font-sans font-medium text-[16px] leading-[140%] underline uppercase text-black cursor-pointer ml-8 md:ml-0"
//         onClick={() => {
//           setNavigationState(null);
//           router.push(`/allProducts`);
//         }}
//       >
//         SHOP ALL
//       </div>
//     </div>
//   );
// };

// export default Featured;
import React, { useState, useEffect, useRef } from "react";
import "./featured.css";
import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
import featureImg1 from "@/public/assets/homePage/feature/1.webp";
import featureImg2 from "@/public/assets/homePage/feature/22.webp";
import featureImg3 from "@/public/assets/homePage/feature/3.webp";
import featureImg4 from "@/public/assets/homePage/feature/4.png";
import featureImg5 from "@/public/assets/homePage/feature/5.png";
import featureImg6 from "@/public/assets/homePage/feature/6.jpg";
import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { motion } from "framer-motion";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const Featured = ({ headingValue, productRouteHandler, name, brand_name }) => {
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const carouselItems = [
    {
      p_id: "424",
      image: featureImg1,
      title: "Ilektro 1250",
      description: "Paul Agnew Designs",
      name: "Ilektro 1250 Landscape Tunnel",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "424",
      image: featureImg2,
      title: "Ilektro 2600",
      description: "Paul Agnew Designs",
      name: "Ilektro 2600 Landscape",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "424",
      image: featureImg3,
      title: "Ilektro integra anson",
      description: "Paul Agnew Designs",
      name: "HZO42 - Outdoor - LPG",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "424",
      image: featureImg4,
      title: "Pyro Siena 750GF Freestanding",
      description: "Paul Agnew Designs",
      name: "Siena 750GF Freestanding",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "424",
      image: featureImg5,
      title: "Heatmaster Seamless",
      description: "Heatmaster",
      name: "Seamless",
      brand_name: "Heatmaster"
    },
    {
      p_id: "424",
      image: featureImg6,
      title: "Regency FG39",
      description: "Regency",
      name: "FG39",
      brand_name: "Regency"
    },
  ];

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 280 : (isTablet ? 320 : 360);
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="flex relative justify-center flex-col gap-6 md:gap-10 ml-0 mr-0 md:ml-20 md:mr-20 px-4 md:px-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="flex flex-row items-center w-full">
        <div className="heading1 flex w-full justify-start md:justify-center md:ml-0 text-2xl md:text-3xl">
          {headingValue}
        </div>
        {!isMobile && (
          <div className="flex flex-row items-center gap-2 absolute right-5 cursor-pointer">
            <Image
              src={RightArrow}
              alt="Right Arrow"
              onClick={() => handleScroll("left")}
              unoptimized
              className="hover:opacity-70 transition-opacity"
            />
            <Image
              src={LeftArrow}
              alt="Left Arrow"
              onClick={() => handleScroll("right")}
              unoptimized
              className="hover:opacity-70 transition-opacity"
            />
          </div>
        )}
      </div>

      <div
        ref={carouselRef}
        className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[25%] gap-4 md:gap-[36px] overflow-x-auto overscroll-x-contain feature-snaps hide-scrollbar"
      >
        {carouselItems.map((item, index) => (
          <motion.div
            className="w-full flex flex-col gap-3 md:gap-5"
            key={"featured" + index}
            onClick={() => productRouteHandler(item.name, item?.brand_name)}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative overflow-hidden rounded-lg aspect-square">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                loading="lazy"
                quality={85}
              />
            </div>
            <div className="font-sans text-left">
              <h3 className="leading-6 text-base md:text-lg font-extralight">
                {item.title}
              </h3>
              <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F]">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {isMobile && (
        <div className="flex justify-center gap-4 mt-4">
          <div 
            className="p-2 rounded-full bg-gray-100 cursor-pointer"
            onClick={() => handleScroll("left")}
          >
            <Image
              src={RightArrow}
              alt="Right Arrow"
              width={20}
              height={20}
              unoptimized
            />
          </div>
          <div 
            className="p-2 rounded-full bg-gray-100 cursor-pointer"
            onClick={() => handleScroll("right")}
          >
            <Image
              src={LeftArrow}
              alt="Left Arrow"
              width={20}
              height={20}
              unoptimized
            />
          </div>
        </div>
      )}

      <div
        className="w-full md:w-[524px] font-sans font-medium text-sm md:text-base leading-[140%] underline uppercase text-black cursor-pointer text-center md:text-left hover:text-gray-600 transition-colors"
        onClick={() => {
          setNavigationState(null);
          router.push(`/allProducts`);
        }}
      >
        SHOP ALL
      </div>
    </motion.div>
  );
};

export default Featured;