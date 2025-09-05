import React, { useState, useEffect, useRef } from "react";
import "./featured.css";
import featureImg1 from "@/public/assets/homePage/feature/1.webp";
import featureImg2 from "@/public/assets/homePage/feature/22.webp";
import featureImg3 from "@/public/assets/homePage/feature/3.webp";
import featureImg33 from "@/public/assets/homePage/feature/33.webp";
import featureImg4 from "@/public/assets/homePage/feature/4.png";
import featureImg5 from "@/public/assets/homePage/feature/5.png";
import featureImg6 from "@/public/assets/homePage/feature/6.jpg";
import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { generateSlug } from "@/src/helper/slug/slug";

const Featured = ({ headingValue, productRouteHandler, name, brand_name }) => {
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const prefetchRoutes = async () => {
      router.prefetch("/allProducts");
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const carouselItems = [
    {
      p_id: "424",
      image: featureImg1,
      title: "Ilektro 1250",
      range: "Paul Agnew Designs",
      description:
        "Ilektro 1250 Landscape Tunnel by Paul Agnew Designs with lifelike flame effect and efficient heating. Premium electric fireplace offering realistic flame effect and reliable energy-efficient heating",
      name: "Ilektro 1250 Landscape Tunnel",
      brand_name: "Paul Agnew Designs",
    },
    {
      p_id: "425",
      image: featureImg2,
      title: "Ilektro 2600",
      range: "Paul Agnew Designs",
      description:
        "Ilektro 2600 Landscape from Paul Agnew Designs with premium design, realistic flame effect and efficient heating. Premium electric fireplace offering realistic flame effect and reliable energy-efficient heating",
      name: "Ilektro 2600 Landscape",
      brand_name: "Paul Agnew Designs",
    },
    {
      p_id: "426",
      image: featureImg33,
      title: "HZO42 - Outdoor - LPG",
      range: "Regency",
      description:
      "Regency HZO42 delivers stunning outdoor fire design with reflective stainless steel body and picture frame faceplate. Outdoor linear gas fire combining modern style, durability, and exceptional flame presentation",
        // "Sleek integrated design with advanced heating technology, Premium electric fire with realistic flame effect and efficient heating, Premium electric fire with realistic flame effect and efficient heating, Premium electric fire with realistic flame effect and efficient heating",
      name: "HZO42 - Outdoor - LPG",
      brand_name: "Regency",
    },
    {
      p_id: "427",
      image: featureImg4,
      title: "Pyro Siena 750GF Freestanding",
      range: "Paul Agnew Designs",
      description:
        "Paul Agnew Designs Siena 750GF blends classic charm with efficient, modern heating. Stylish freestanding gas fireplace offering timeless design and reliable warmth.",
      name: "siena-750-g4-freestanding",
      brand_name: "Paul Agnew Designs",
    },
    {
      p_id: "428",
      image: featureImg5,
      title: "Heatmaster Seamless",
      range: "Heatmaster",
      description:
        "Heatmaster Seamless combines minimalist design with exceptional heating performance. Contemporary gas fire offering clean lines, premium build quality, and efficient heating.",
      name: "seamless-body",
      brand_name: "Heatmaster",
    },
    {
      p_id: "429",
      image: featureImg6,
      title: "Regency FG39",
      range: "Regency",
      description:
        "Regency FG39 delivers powerful heating performance with timeless traditional design. Premium gas fire combining efficiency, authentic log visuals, and reliable warmth.",
      name: "FG39",
      brand_name: "Regency",
    },
  ];

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 280 : isTablet ? 320 : 360;
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
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
  //     className={`flex relative justify-center flex-col gap-6 md:gap-16 ml-0 mr-0 md:ml-20 md:mr-20 ${
  //   isDesktop ? "desktop-feature-container" : ""
  // }`}
className={`featured-container ${isDesktop ? "desktop-feature-container" : "standard-margins"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      // style={{
      //   ...(isDesktop && {
      //     // padding: "40px 340px",
      //     padding: "40px clamp(120px, 17.7vw, 340px)", 
      //     margin: 0,
      //     background:
      //       "linear-gradient(to bottom, white 60%, rgb(247, 247, 245) 50%)",
      //     minHeight: "100vh",
      //     width: "100%",
      //   }),
      // }}
    >
      <div className="flex flex-row items-center w-full">
        <h2 className="heading1 flex w-full justify-start md:justify-center md:ml-0 text-2xl md:text-[3rem]">
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
        <div className="grid grid-cols-3 gap-8 w-full">
        {/* // <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full px-4 md:px-6 lg:px-8"> */}
          {/* First Row */}
          <div className="grid grid-cols-3 gap-8 col-span-3">
            {carouselItems.slice(0, 3).map((item, index) => (
              // <motion.div
              //   className="w-full flex flex-col gap-6 px-6"
              //   key={`featured-desktop-${item.p_id}-${index}`}
              //   onClick={() => productRouteHandler(item.name, item?.brand_name)}
              //   variants={itemVariants}
              //   // whileHover={{ y: -5, transition: { duration: 0.2 } }}
              // >
              //   <div className="relative overflow-hidden aspect-square group">
              //     <Image
              //       src={item.image}
              //       alt={item.title}
              //       fill
              //       // className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              //       className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out cursor-pointer"
              //       sizes="(max-width: 1024px) 30vw, 25vw"
              //       quality={95}
              //       placeholder="blur"
              //     />
              //     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              //       <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
              //         <FiArrowRight className="text-white text-2xl" />
              //       </div>
              //     </div>
              //   </div>
              //   <div className="font-sans text-left">
              //     <h3 className="leading-6 text-base md:text-lg font-extralight cursor-pointer">
              //       {item.title}
              //     </h3>
              //     <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F] cursor-pointer">
              //       {item.range}
              //     </p>
              //     <p className="font-normal leading-5 text-sm mt-2 text-[#333] cursor-pointer">
              //       {item.description}
              //     </p>
              //   </div>
              // </motion.div>
              <Link
                href={`/${generateSlug(item.brand_name)}/${generateSlug(
                  item.name
                )}`}
                passHref
                legacyBehavior
                key={`featured-desktop-${item.p_id}-${index}`}
              >
                <motion.a
                  className="w-full flex flex-col gap-6 px-6"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden aspect-square group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out"
                      sizes="(max-width: 1024px) 30vw, 25vw"
                      quality={95}
                      placeholder="blur"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
                        <FiArrowRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="leading-6 text-base md:text-lg font-extralight hover:underline">
                      {item.title}
                    </h3>
                    <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F]">
                      {item.range}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333]">
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-8 col-span-3 mt-8">
            {carouselItems.slice(3, 6).map((item, index) => (
              // <motion.div
              //   className="w-full flex flex-col gap-4 px-2"
              //   key={`featured-desktop-${item.p_id}-${index + 3}`}
              //   onClick={() => productRouteHandler(item.name, item?.brand_name)}
              //   variants={itemVariants}
              // >
              //   <div className="relative overflow-hidden aspect-square group">
              //     <Image
              //       src={item.image}
              //       alt={item.title}
              //       fill
              //       className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out cursor-pointer"
              //       sizes="(max-width: 1024px) 30vw, 25vw"
              //       quality={95}
              //       placeholder="blur"
              //     />
              //     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              //       <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
              //         <FiArrowRight className="text-white text-2xl" />
              //       </div>
              //     </div>
              //   </div>
              //   <div className="font-sans text-left">
              //     <h3 className="leading-6 text-base md:text-lg font-extralight cursor-pointer">
              //       {item.title}
              //     </h3>
              //     <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F] cursor-pointer">
              //       {item.range}
              //     </p>
              //     <p className="font-normal leading-5 text-sm mt-2 text-[#333] cursor-pointer">
              //       {item.description}
              //     </p>
              //   </div>
              // </motion.div>
              <Link
                href={`/${generateSlug(item.brand_name)}/${generateSlug(
                  item.name
                )}`}
                passHref
                legacyBehavior
                key={`featured-desktop-${item.p_id}-${index + 3}`}
              >
                <motion.a
                  className="w-full flex flex-col gap-4 px-2"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden aspect-square group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out"
                      sizes="(max-width: 1024px) 30vw, 25vw"
                      quality={95}
                      placeholder="blur"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
                        <FiArrowRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="leading-6 text-base md:text-lg font-extralight hover:underline" style={{ fontFamily: '"Public Sans", sans-serif' }}
>
                      {item.title}
                    </h3>
                    <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F]"
                    style={{ fontFamily: '"Public Sans", sans-serif' }}
>
                      {item.range}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333]">
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              </Link>
            ))}
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
              //             <motion.div
              //               className="w-full flex flex-col gap-3 md:gap-5"
              //               key={`featured-${item.p_id}-${index}`}
              //               onClick={() => productRouteHandler(item.name, item?.brand_name)}
              //               variants={itemVariants}
              //               // whileHover={{ y: -5, transition: { duration: 0.2 } }}
              //             >
              //               <div className="relative overflow-hidden rounded-lg aspect-square group">
              //                 <Image
              //                   src={item.image}
              //                   alt={item.title}
              //                   fill
              //                   // className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              //                    className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out cursor-pointer"
              //                   sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
              //                   loading={index < 2 ? "eager" : "lazy"}
              //                   quality={85}
              //                   placeholder="blur"
              //                 />
              //                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              //   <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
              //     <FiArrowRight className="text-white text-2xl" />
              //   </div>
              // </div>
              //               </div>
              //               <div className="font-sans text-left">
              //                 <h3
              //                   className="leading-6 text-base md:text-lg font-extralight cursor-pointer"
              //                   style={{ fontFamily: "Satoru, sans-serif" }}
              //                 >
              //                   {item.title}
              //                 </h3>
              //                 <p
              //                   className="font-medium leading-5 text-xs md:text-sm text-[#94999F] cursor-pointer"
              //                   style={{ fontFamily: "Satoru, sans-serif" }}
              //                 >
              //                   {item.range}
              //                 </p>
              //                 <p className="font-normal leading-5 text-sm mt-2 text-[#333] cursor-pointer">
              //                   {item.description}
              //                 </p>
              //               </div>
              //             </motion.div>
              <Link
                href={`/${generateSlug(item.brand_name)}/${generateSlug(
                  item.name
                )}`}
                passHref
                legacyBehavior
                key={`featured-${item.p_id}-${index}`}
              >
                <motion.a
                  className="w-full flex flex-col gap-3 md:gap-5"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out"
                      sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                      loading={index < 2 ? "eager" : "lazy"}
                      quality={85}
                      placeholder="blur"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
                        <FiArrowRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3
                      className="leading-6 text-base md:text-lg font-extralight hover:underline"
                      style={{ fontFamily: '"Public Sans", sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-medium leading-5 text-xs md:text-sm text-[#94999F]"
                      style={{ fontFamily: '"Public Sans", sans-serif' }}

                    >
                      {item.range}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333]">
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              </Link>
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
      <div className="w-full flex flex-col items-center gap-4 mt-8 md:mt-12">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* <motion.button
            className="px-8 py-3 bg-black text-white font-sans font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300  flex items-center gap-2"
            onClick={() => {
              setNavigationState(null);
              router.push(`/allProducts`);
            }}
            onMouseEnter={() => router.prefetch("/allProducts")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SHOP ALL
          </motion.button> */}
          <Link href="/allProducts" passHref legacyBehavior>
            <motion.a
              className="px-8 py-3 bg-black text-white font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300  flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => router.prefetch("/allProducts")}
            >
              SHOP ALL
            </motion.a>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <motion.a
              className="px-8 py-3 bg-white text-black border border-black font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300  flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => router.prefetch("/contact")}
            >
              CONTACT US
            </motion.a>
          </Link>

          {/* <motion.button
            className="px-8 py-3 bg-white text-black border border-black font-sans font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300  flex items-center gap-2"
            onClick={() => router.push("/contact")}
            onMouseEnter={() => router.prefetch("/contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTACT US
            
          </motion.button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Featured);
