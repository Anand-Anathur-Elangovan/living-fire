import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import collectionImg3 from "@/public/assets/homePage/collections/collectionsImg3.svg";
import collectionImg4 from "@/public/assets/homePage/collections/collectionsImg4.svg";
import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
import CircleArrow from "@/public/assets/homePage/collections/circle-arrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Collections = ({ fuelTypes, allProductsRouteHandler }) => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const [prefetchedRoutes, setPrefetchedRoutes] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);

  const carouselItems = [
    {
      fueltype_id: 5,
      image: collectionImg1,
      title: "Electric Fireplaces",
      description:
        "Discover our range of luxury indoor electric fireplaces and transform your home into a cosy haven of warmth and style. Visit our Melbourne showroom.",
      route: "/allProducts/electric",
    },
    {
      fueltype_id: 3,
      image: collectionImg2,
      title: "Gas Fireplaces",
      description:
        "Explore our indoor gas fireplaces and turn your home into a warm and inviting retreat. Whatever your interior style, we have the perfect gas fireplace to enhance your living space.",
      route: "/allProducts/gas",
    },
    {
      fueltype_id: 4,
      image: collectionImg3,
      title: "Wood Fireplaces",
      description:
        "Experience warmth and elegance with our indoor luxury wood fireplaces, blending timeless craftsmanship with contemporary modern design.",
      route: "/allProducts/wood",
    },
    {
      fueltype_id: 2,
      image: collectionImg4,
      title: "Bio-Ethanol Fireplaces",
      description:
        "Explore our collection of Bio-Ethanol fireplaces, offering efficient and stylish heating solutions for your home. Enjoy the warmth and ambiance of a real flame, with the convenience and clean-burning performance of LPG.",
      route: "/allProducts/bio-ethanol",
    },
    {
      fueltype_id: 6,
      image: collectionImg2,
      title: "Cooker",
      description:
        "Experience warmth and elegance with our indoor luxury wood fireplaces, blending timeless craftsmanship with contemporary modern design.",
      route: "/allProducts/cooker",
    },
  ];

  const handleRoutePrefetch = (route) => {
    if (!prefetchedRoutes.has(route)) {
      router.prefetch(route);
      setPrefetchedRoutes((prev) => new Set(prev).add(route));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const hoverStyle = `
    .collection-item {
      transition: all 0.3s ease-out;
      position: relative;
    }
    .collection-image-container {
      overflow: hidden;
      position: relative;
    }
    .collection-image {
      transition: transform 0.5s ease;
      will-change: transform;
    }
    .collection-item:hover .collection-image {
      transform: scale(1.05);
    }
    .circle-arrow {
      transition: all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
    .collection-item:hover .circle-arrow {
      transform: translateX(5px);
    }
    .description-container {
      height: 60px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    @media (max-width: 768px) {
      .description-container {
        height: 72px;
        -webkit-line-clamp: 4;
      }
    }
  `;

  const mergedOutput = carouselItems.map((item) => {
    const match = fuelTypes.find((ft) => ft.fueltype_id === item.fueltype_id);
    return match
      ? {
          ...item,
          fueltype_name: match.fueltype_name,
          is_active: match.is_active,
          slug:  match.slug
        }
      : item;
  });

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={containerVariants}
      className="flex relative justify-center flex-col ml-0 mr-0 md:ml-16 md:mr-16"
    >
      <style>{hoverStyle}</style>

      <div className="flex flex-row items-center w-full mb-10">
        <motion.h2
          variants={itemVariants}
          className="heading1 flex w-full justify-start ml-8 md:justify-center md:ml-0"
        >
          Collections
        </motion.h2>
      </div>

      {/* Desktop View - Grid Layout */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-6 md:px-4">
        {mergedOutput?.map((item, index) => (
          <motion.div
            key={`collection-${item.fueltype_id}`}
            variants={itemVariants}
            className="collection-item"
            onMouseEnter={() => {
              setHoveredItem(item.fueltype_id);
              handleRoutePrefetch(item.route);
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="collection-image-container rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={800}
                className="collection-image w-full h-auto aspect-[3/4] object-cover"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item.slug
                  );
                }}
                loading={index < 2 ? "eager" : "lazy"}
                quality={85}
                sizes="(max-width: 768px) 100vw, 20vw"
              />

              {hoveredItem === item.fueltype_id && (
                <motion.div
                  className="circle-arrow absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
                  variants={arrowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={CircleArrow}
                    alt="Click to view"
                    width={24}
                    height={24}
                  />
                </motion.div>
              )}
            </div>

            <div className="mt-4 gap-8 flex flex-col px-2">
              <div className="gap-4 flex flex-col"> 
              <h2
                className="font-sans font-medium leading-6 text-base text-wrap cursor-pointer hover:underline"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id, 
                    item?.slug
                  );
                }}
                tabIndex={0}
                style={{ fontFamily: 'Satoru, sans-serif' }}
              >
                {item.title}
              </h2>
              <div className="description-container">
                <p className="font-sans font-normal leading-5 text-sm text-gray-700" style={{ fontFamily: '"Public Sans", sans-serif' }}>
                  {item.description}
                </p>
              </div>
              </div>
              <button
                className="font-medium font-sans text-sm cursor-pointer focus:outline-none hover:underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 w-fit mt-1"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item?.slug
                  );
                }}
                style={{ fontFamily: 'Satoru, sans-serif' }}
              >
                View Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View - Carousel */}
      <div
        ref={carouselRef}
        className="md:hidden grid grid-flow-col auto-cols-[100%] gap-6 overflow-x-auto overscroll-x-contain element-snaps hide-scrollbar px-4"
      >
        {mergedOutput?.map((item, index) => (
          <motion.div
            key={`collection-${item.fueltype_id}`}
            variants={itemVariants}
            className="collection-item"
            onMouseEnter={() => {
              setHoveredItem(item.fueltype_id);
              handleRoutePrefetch(item.route);
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="collection-image-container rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={800}
                className="collection-image w-full h-auto aspect-[3/4] object-cover"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item?.slug
                  );
                }}
                loading={index < 2 ? "eager" : "lazy"}
                quality={85}
                sizes="(max-width: 768px) 100vw, 100vw"
              />

              {hoveredItem === item.fueltype_id && (
                <motion.div
                  className="circle-arrow absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
                  variants={arrowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={CircleArrow}
                    alt="Click to view"
                    width={24}
                    height={24}
                  />
                </motion.div>
              )}
            </div>

            <div className="mt-4 gap-2 flex flex-col px-2">
              <h2
                className="font-sans font-medium leading-6 text-base text-wrap cursor-pointer hover:underline"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item?.slug
                  );
                }}
                tabIndex={0}
              >
                {item.title}
              </h2>
              <div className="description-container">
                <p className="font-sans font-normal leading-5 text-sm text-gray-700">
                  {item.description}
                </p>
              </div>
              <button
                className="uppercase font-medium font-sans text-sm underline cursor-pointer focus:outline-none hover:no-underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 w-fit mt-1"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item?.slug
                  );
                }}
              >
                View Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {/* <div className="hidden md:flex justify-center gap-8 mt-12">
        <button
          className="uppercase font-medium font-sans text-sm underline cursor-pointer focus:outline-none hover:no-underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1"
          onClick={() => router.push("/allProducts")}
        >
          View All
        </button>  
        <button
          className="uppercase font-medium font-sans text-sm underline cursor-pointer focus:outline-none hover:no-underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1"
          onClick={() => router.push("/contact")}
        >
          Contact Us
        </button>
      </div> */}
      <div className="collection-custom-button flex flex-col md:flex-row items-center gap-4 justify-center mt-[50px]">
        <motion.button
          className="px-8 py-3 bg-black text-white rounded-full font-sans font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 shadow-lg flex items-center gap-2"
          onClick={() => {
            setNavigationState(null);
            router.push(`/allProducts`);
          }}
          onMouseEnter={() => router.prefetch("/allProducts")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          VIEW ALL
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.button>

        <motion.button
          className="px-8 py-3 bg-white text-black border border-black rounded-full font-sans font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center gap-2"
          onClick={() => router.push("/contact")}
          onMouseEnter={() => router.prefetch("/contact")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          CONTACT US
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </motion.button>
      </div>
      {/* Mobile Buttons */}
      <div className="md:hidden flex flex-col sm:flex-row gap-4 justify-center mt-8 px-4">
        <button
          className="uppercase font-medium font-sans text-sm underline cursor-pointer focus:outline-none hover:no-underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 w-fit"
          onClick={() => router.push("/allProducts")}
        >
          View All
        </button>
        <button
          className="uppercase font-medium font-sans text-sm underline cursor-pointer focus:outline-none hover:no-underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 w-fit"
          onClick={() => router.push("/contact")}
        >
          Contact Us
        </button>
      </div>
    </motion.section>
  );
};

export default React.memo(Collections);
