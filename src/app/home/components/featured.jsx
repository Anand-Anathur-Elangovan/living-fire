// import React, { useState, useEffect, useRef } from "react";
// import "./featured.css";
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
// import { motion } from "framer-motion";

// const Featured = ({ headingValue, productRouteHandler, name, brand_name }) => {
//   const router = useRouter();
//   const { setNavigationState } = useNavigationState();
//   const carouselRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);

//   useEffect(() => {
//     const prefetchRoutes = async () => {
//       router.prefetch('/allProducts');
//     };
//     prefetchRoutes();
//   }, [router]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 640);
//       setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const carouselItems = [
//     {
//       p_id: "424",
//       image: featureImg1,
//       title: "Ilektro 1250",
//       description: "Paul Agnew Designs",
//       name: "Ilektro 1250 Landscape Tunnel",
//       brand_name: "Paul Agnew Designs"
//     },
//     {
//       p_id: "425",
//       image: featureImg2,
//       title: "Ilektro 2600",
//       description: "Paul Agnew Designs",
//       name: "Ilektro 2600 Landscape",
//       brand_name: "Paul Agnew Designs"
//     },
//     {
//       p_id: "426",
//       image: featureImg3,
//       title: "Ilektro integra anson",
//       description: "Paul Agnew Designs",
//       name: "HZO42 - Outdoor - LPG",
//       brand_name: "Paul Agnew Designs"
//     },
//     {
//       p_id: "427",
//       image: featureImg4,
//       title: "Pyro Siena 750GF Freestanding",
//       description: "Paul Agnew Designs",
//       name: "Siena 750GF Freestanding",
//       brand_name: "Paul Agnew Designs"
//     },
//     {
//       p_id: "428",
//       image: featureImg5,
//       title: "Heatmaster Seamless",
//       description: "Heatmaster",
//       name: "Seamless",
//       brand_name: "Heatmaster"
//     },
//     {
//       p_id: "429",
//       image: featureImg6,
//       title: "Regency FG39",
//       description: "Regency",
//       name: "FG39",
//       brand_name: "Regency"
//     },
//   ];

//   const handleScroll = (direction) => {
//     if (carouselRef.current) {
//       const scrollAmount = isMobile ? 280 : (isTablet ? 320 : 360);
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

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   return (
//     <motion.div 
//       className="flex relative justify-center flex-col gap-6 md:gap-10 ml-0 mr-0 md:ml-20 md:mr-20 px-4 md:px-0"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//       variants={containerVariants}
//     >
//       <div className="flex flex-row items-center w-full">
//         <h2 className="heading1 flex w-full justify-start md:justify-center md:ml-0 text-2xl md:text-3xl">
//           {headingValue}
//         </h2>
//         {!isMobile && (
//           <div className="flex flex-row items-center gap-2 absolute right-5 cursor-pointer">
//             <Image
//               src={RightArrow}
//               alt="Scroll left"
//               width={24}
//               height={24}
//               onClick={() => handleScroll("left")}
//               className="hover:opacity-70 transition-opacity"
//               loading="eager"
//               priority
//             />
//             <Image
//               src={LeftArrow}
//               alt="Scroll right"
//               width={24}
//               height={24}
//               onClick={() => handleScroll("right")}
//               className="hover:opacity-70 transition-opacity"
//               loading="eager"
//               priority
//             />
//           </div>
//         )}
//       </div>

//       <div
//         ref={carouselRef}
//         className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[25%] gap-4 md:gap-[36px] overflow-x-auto overscroll-x-contain feature-snaps hide-scrollbar"
//       >
//         {carouselItems.map((item, index) => (
//           <motion.div
//             className="w-full flex flex-col gap-3 md:gap-5"
//             key={`featured-${item.p_id}-${index}`}
//             onClick={() => productRouteHandler(item.name, item?.brand_name)}
//             variants={itemVariants}
//             whileHover={{ y: -5, transition: { duration: 0.2 } }}
//           >
//             <div className="relative overflow-hidden rounded-lg aspect-square">
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 fill
//                 className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
//                 sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
//                 loading={index < 2 ? "eager" : "lazy"}
//                 quality={85}
//                 placeholder="blur"
//               />
//             </div>
//             <div className="font-sans text-left">
//               <h3 className="leading-6 text-base md:text-lg font-extralight cursor-pointer">
//                 {item.title}
//               </h3>
//               <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F] cursor-pointer">
//                 {item.description}
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {isMobile && (
//         <div className="flex justify-center gap-4 mt-4">
//           <button 
//             className="p-2 rounded-full bg-gray-100 cursor-pointer"
//             onClick={() => handleScroll("left")}
//             aria-label="Scroll left"
//           >
//             <Image
//               src={RightArrow}
//               alt=""
//               width={20}
//               height={20}
//               loading="eager"
//               priority
//             />
//           </button>
//           <button 
//             className="p-2 rounded-full bg-gray-100 cursor-pointer"
//             onClick={() => handleScroll("right")}
//             aria-label="Scroll right"
//           >
//             <Image
//               src={LeftArrow}
//               alt=""
//               width={20}
//               height={20}
//               loading="eager"
//               priority
//             />
//           </button>
//         </div>
//       )}

//       <div
//         className="w-full md:w-[524px] font-sans font-medium text-sm md:text-base leading-[140%] underline uppercase text-black cursor-pointer text-center md:text-left hover:text-gray-600 transition-colors"
//         onClick={() => {
//           setNavigationState(null);
//           router.push(`/allProducts`);
//         }}
//         onMouseEnter={() => router.prefetch('/allProducts')}
//       >
//         SHOP ALL
//       </div>
//     </motion.div>
//   );
// };

// export default React.memo(Featured);

import React, { useState, useEffect, useRef } from "react";
import "./featured.css";
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

const Featured = ({ headingValue, productRouteHandler, name, brand_name }) => {
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const prefetchRoutes = async () => {
      router.prefetch('/allProducts');
    };
    prefetchRoutes();
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
      setIsDesktop(window.innerWidth > 1024);
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
      range: "Paul Agnew Designs",
      description: "Premium electric fire with realistic flame effect and efficient heating",
      name: "Ilektro 1250 Landscape Tunnel",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "425",
      image: featureImg2,
      title: "Ilektro 2600",
      range: "Paul Agnew Designs",
      description: "Large format electric fire with stunning visual effects",
      name: "Ilektro 2600 Landscape",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "426",
      image: featureImg3,
      title: "Ilektro integra anson",
      range: "Paul Agnew Designs",
      description: "Sleek integrated design with advanced heating technology",
      name: "HZO42 - Outdoor - LPG",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "427",
      image: featureImg4,
      title: "Pyro Siena 750GF Freestanding",
      range: "Paul Agnew Designs",
      description: "Freestanding gas fire with elegant traditional styling",
      name: "Siena 750GF Freestanding",
      brand_name: "Paul Agnew Designs"
    },
    {
      p_id: "428",
      image: featureImg5,
      title: "Heatmaster Seamless",
      range: "Heatmaster",
      description: "Modern seamless design with powerful heat output",
      name: "Seamless",
      brand_name: "Heatmaster"
    },
    {
      p_id: "429",
      image: featureImg6,
      title: "Regency FG39",
      range: "Regency",
      description: "High-efficiency gas fireplace with realistic log set",
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
        <h2 className="heading1 flex w-full justify-start md:justify-center md:ml-0 text-2xl md:text-3xl">
          {headingValue}
        </h2>
        {!isMobile && !isDesktop && (
          <div className="flex flex-row items-center gap-2 absolute right-5 cursor-pointer">
            <Image
              src={RightArrow}
              alt="Scroll left"
              width={24}
              height={24}
              onClick={() => handleScroll("left")}
              className="hover:opacity-70 transition-opacity"
              loading="eager"
              priority
            />
            <Image
              src={LeftArrow}
              alt="Scroll right"
              width={24}
              height={24}
              onClick={() => handleScroll("right")}
              className="hover:opacity-70 transition-opacity"
              loading="eager"
              priority
            />
          </div>
        )}
      </div>

      {isDesktop ? (
        // Desktop View - 2 rows of 3 products
        <div className="grid grid-cols-3 gap-6 md:gap-8 w-full">
          <div className="grid grid-rows-2 gap-6 md:gap-8 col-span-3">
            {/* First Row */}
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              {carouselItems.slice(0, 3).map((item, index) => (
                <motion.div
                  className="w-full flex flex-col gap-3 md:gap-4"
                  key={`featured-desktop-${item.p_id}-${index}`}
                  onClick={() => productRouteHandler(item.name, item?.brand_name)}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square">
                    {/* <div className="relative overflow-hidden rounded-lg aspect-[4/3] h-[280px]"> */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      sizes="(max-width: 1024px) 30vw, 25vw"
                      // loading={index < 2 ? "eager" : "lazy"}
                      quality={95}
                      placeholder="blur"
                    />
                  </div>
                  <div className="font-sans text-left">
                    <h3 className="leading-6 text-base md:text-lg font-extralight cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F] cursor-pointer">
                      {item.range}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333] cursor-pointer">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Second Row */}
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              {carouselItems.slice(3, 6).map((item, index) => (
                <motion.div
                  className="w-full flex flex-col gap-3 md:gap-4"
                  key={`featured-desktop-${item.p_id}-${index+3}`}
                  onClick={() => productRouteHandler(item.name, item?.brand_name)}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square">
                    {/* <div className="relative overflow-hidden rounded-lg aspect-[4/3] h-[280px]"> */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      sizes="(max-width: 1024px) 30vw, 25vw"
                      // loading="lazy"
                      quality={95}
                      placeholder="blur"
                    />
                  </div>
                  <div className="font-sans text-left">
                    <h3 className="leading-6 text-base md:text-lg font-extralight cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F] cursor-pointer">
                      {item.range}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333] cursor-pointer">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Mobile/Tablet View - Carousel
        <>
          <div
            ref={carouselRef}
            className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[25%] gap-4 md:gap-[36px] overflow-x-auto overscroll-x-contain feature-snaps hide-scrollbar"
          >
            {carouselItems.map((item, index) => (
              <motion.div
                className="w-full flex flex-col gap-3 md:gap-5"
                key={`featured-${item.p_id}-${index}`}
                onClick={() => productRouteHandler(item.name, item?.brand_name)}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                    sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    quality={85}
                    placeholder="blur"
                  />
                </div>
                <div className="font-sans text-left">
                  <h3 className="leading-6 text-base md:text-lg font-extralight cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F] cursor-pointer">
                    {item.range}
                  </p>
                  <p className="font-normal leading-5 text-sm mt-2 text-[#333] cursor-pointer">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {isMobile && (
            <div className="flex justify-center gap-4 mt-4">
              <button 
                className="p-2 rounded-full bg-gray-100 cursor-pointer"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                <Image
                  src={RightArrow}
                  alt=""
                  width={20}
                  height={20}
                  loading="eager"
                  priority
                />
              </button>
              <button 
                className="p-2 rounded-full bg-gray-100 cursor-pointer"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <Image
                  src={LeftArrow}
                  alt=""
                  width={20}
                  height={20}
                  loading="eager"
                  priority
                />
              </button>
            </div>
          )}
        </>
      )}

      <div
        className="w-full md:w-[524px] font-sans font-medium text-sm md:text-base leading-[140%] underline uppercase text-black cursor-pointer text-center md:text-left hover:text-gray-600 transition-colors"
        onClick={() => {
          setNavigationState(null);
          router.push(`/allProducts`);
        }}
        onMouseEnter={() => router.prefetch('/allProducts')}
      >
        SHOP ALL
      </div>
    </motion.div>
  );
};

export default React.memo(Featured);