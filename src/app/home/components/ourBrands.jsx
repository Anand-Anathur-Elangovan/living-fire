import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
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
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

const OurBrands = ({ brandList, allProductsRouteHandler }) => {
  const router = useRouter();
  const [prefetchedBrands, setPrefetchedBrands] = useState(new Set());
  const carouselRef = useRef(null);
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const brands = [
    {
      brand_id: 1,
      image: PaulAgnewLogo,
      title: "Paul Agnew Designs",
      isSvg: true,
      slug: "paul-agnew-designs",
    },
    {
      brand_id: 15,
      image: CocoonLogo,
      title: "Cocoon",
      isSvg: true,
      slug: "cocoon",
    },
    {
      brand_id: 5,
      image: StovaxLogo,
      title: "Stovax",
      isSvg: true,
      slug: "stovax",
    },
    {
      brand_id: 7,
      image: HergomLogo,
      title: "Hergom",
      isSvg: true,
      slug: "hergom",
    },
    {
      brand_id: 10,
      image: RegencyLogo,
      title: "Regency",
      isSvg: true,
      slug: "regency",
    },
    {
      brand_id: 11,
      image: KaloraLogo,
      title: "Kalora",
      isSvg: false,
      slug: "kalora",
    },
    {
      brand_id: 3,
      image: AustroLogo,
      title: "Austroflamm",
      isSvg: true,
      slug: "austroflamm",
    },
    {
      brand_id: 2,
      image: EsseLogo,
      title: "Esse",
      isSvg: true,
      slug: "esse",
    },
    {
      brand_id: 4,
      image: MorsoLogo,
      title: "Morso",
      isSvg: true,
      slug: "morso",
    },
    {
      brand_id: 6,
      image: HeatMasterLogo,
      title: "HeatMaster",
      isSvg: true,
      slug: "heatmaster",
    },
    {
      brand_id: 8,
      image: ADFLogo,
      title: "ADF",
      isSvg: true,
      slug: "adf",
    },
    {
      brand_id: 16,
      image: eurostoveLogo,
      title: "Eurostove",
      isSvg: false,
      slug: "eurostove",
    },
  ];

  // Auto-scroll animation for desktop
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prev) => (prev + 1) % brands.length);
        controls.start({
          x: `-${(currentIndex + 1) * 200}px`,
          transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering, controls, brands.length, isMobile]);

  // Prefetch brand route on hover
  const handleBrandHover = (brand) => {
    if (!prefetchedBrands.has(brand.brand_id)) {
      router?.prefetch(brand.route);
      setPrefetchedBrands((prev) => new Set(prev).add(brand.brand_id));
    }
  };

  // Manual scroll handlers for desktop
  const scrollLeft = () => {
    if (isMobile) return;
    setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length);
    controls.start({
      x: `-${((currentIndex - 1 + brands.length) % brands.length) * 200}px`,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    });
  };

  const scrollRight = () => {
    if (isMobile) return;
    setCurrentIndex((prev) => (prev + 1) % brands.length);
    controls.start({
      x: `-${((currentIndex + 1) % brands.length) * 200}px`,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  return (
    <section
      className={`relative w-full ${
        isMobile ? "bg-transparent" : "bg-white"
      } py-8 md:py-12 overflow-hidden`}
    >
      {/* <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4' : 'px-4 sm:px-6 lg:px-8'}`}> */}
      <div
        className={`${isMobile ? "max-w-7xl px-4" : "w-[90vw] mx-auto"} ${
          isMobile ? "" : "px-4 sm:px-6 lg:px-8"
        }`}
      >
        <motion.h2
          className="heading1 text-left md:text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Our Brands
        </motion.h2>

        {isMobile ? (
          // Mobile View - Original Grid Layout
          <motion.div
            className="bg-white mx-0 md:mx-8 my-4 md:my-8 p-4 md:p-6 lg:p-8 flex justify-center flex-wrap gap-4 md:gap-6 lg:gap-8 rounded-lg shadow-sm"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px" }}
          >
            {brands.map((brand) => (
              <motion.div
                key={`brands-${brand.brand_id}`}
                className="brand-item w-[120px] h-[60px] sm:w-[120px] sm:h-[70px] md:w-[140px] md:h-[80px] lg:w-[160px] lg:h-[92px] flex items-center justify-center p-2 cursor-pointer grayscale hover:grayscale-0"
                variants={item}
                onClick={() =>
                  allProductsRouteHandler(
                    "brandType",
                    brand.title,
                    brand.brand_id,
                    brand.slug
                  )
                }
                onMouseEnter={() => handleBrandHover(brand)}
                onFocus={() => handleBrandHover(brand)}
                tabIndex={0}
                aria-label={`View ${brand.title} products`}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <Image
                  src={brand.image}
                  alt={brand.title}
                  width={160}
                  height={92}
                  className="object-contain"
                  loading={brand.brand_id <= 4 ? "eager" : "lazy"}
                  quality={85}
                  {...(!brand.isSvg && { placeholder: "blur" })}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Desktop View - Enhanced Carousel
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Navigation Arrows */}
            {/* <AnimatePresence>
              {isHovering && (
                <>
                  <motion.button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full  hover:bg-white transition-all"
                    onClick={scrollLeft}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Scroll brands left"
                  >
                    <FiChevronLeft className="w-6 h-6 text-gray-700" />
                  </motion.button>
                  <motion.button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full  hover:bg-white transition-all"
                    onClick={scrollRight}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Scroll brands right"
                  >
                    <FiChevronRight className="w-6 h-6 text-gray-700" />
                  </motion.button>
                </>
              )}
            </AnimatePresence> */}

            {/* Desktop Carousel Container */}
            {/* <div className="relative overflow-hidden py-6"> */}
            <div className="relative overflow-hidden py-6 w-full">
              <motion.div
                className="flex items-center"
                ref={carouselRef}
                animate={controls}
                initial={{ x: 0 }}
                style={{ width: `${brands.length * 300 * 3}px` }}
              >
                {[...brands, ...brands, ...brands].map((brand, index) => (
                  <React.Fragment
                    key={`brand-fragment-${brand.brand_id}-${index}`}
                  >
                    <motion.div
                      key={`brand-${brand.brand_id}-${index}`}
                      className="brand-item mx-6 w-[180px] h-[110px] flex-shrink-0 flex items-center justify-center p-3 cursor-pointer grayscale hover:grayscale-0 relative group"
                      variants={item}
                      onClick={() =>
                        allProductsRouteHandler(
                          "brandType",
                          brand.title,
                          brand.brand_id,
                          brand.slug
                        )
                      }
                      onMouseEnter={() => handleBrandHover(brand)}
                      onFocus={() => handleBrandHover(brand)}
                      tabIndex={0}
                      aria-label={`View ${brand.title} products`}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                      <Image
                        src={brand.image}
                        alt={brand.title}
                        width={160}
                        height={90}
                        className="object-contain transform transition-transform duration-300 group-hover:scale-110"
                        loading={brand.brand_id <= 4 ? "eager" : "lazy"}
                        quality={90}
                        {...(!brand.isSvg && { placeholder: "blur" })}
                      />
                    </motion.div>
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
            <div className="flex flex-col items-center mt-4 mb-4 gap-8">
              <div className="flex space-x-4 mb-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Scroll brands left"
                >
                  <FiArrowLeft className="w-8 h-8 text-black-600" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Scroll brands right"
                >
                  <FiArrowRight className="w-8 h-8 text-black-600" />
                </button>
              </div>
              <div className="w-[85%] h-[2px] bg-black"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(OurBrands);
