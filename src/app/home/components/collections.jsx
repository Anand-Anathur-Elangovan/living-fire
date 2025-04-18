// "use client";
// import React, { useState, useEffect, useRef } from "react";
// // import "./collections.css";
// import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
// import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
// import collectionImg3 from "@/public/assets/homePage/collections/collectionsImg3.svg";
// import collectionImg4 from "@/public/assets/homePage/collections/collectionsImg4.svg";
// import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
// import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
// import Image from "next/image";

// const Collections = ({ fuelTypes, allProductsRouteHandler }) => {
//   const [hoverIndex, setHoverIndex] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     async function fetchImageUrl() {
//       const response = await fetch("/api/s3Url", {
//         method: "GET",
//         headers: {
//           "content-type": "application/json",
//         },
//       });
//       const data = await response.json();
//       setImageUrl(data.url);
//     }

//     fetchImageUrl();
//   }, []);

//   const carouselItems = [
//     {
//       fueltype_id: 5,
//       image: collectionImg1,
//       title: "Electric Fireplaces",
//       description:
//         "Discover our range of luxury indoor electric fireplaces and transform your home into a cosy haven of warmth and style. Visit our Melbourne showroom.",
//     },
//     {
//       fueltype_id: 3,
//       image: collectionImg2,
//       title: "Gas Fireplaces",
//       description:
//         "Explore our indoor gas fireplaces and turn your home into a warm and inviting retreat. Whatever your interior style, we have the perfect gas fireplace to enhance your living space.",
//     },
//     {
//       fueltype_id: 4,
//       image: collectionImg3,
//       title: "Wood Fireplaces",
//       description:
//         "Experience warmth and elegance with our indoor luxury wood fireplaces, blending timeless craftsmanship with contemporary modern design.",
//     },
//     {
//       fueltype_id: 2,
//       image: collectionImg4,
//       title: "Bio-Ethanol Fireplaces",
//       description:
//         "Explore our collection of Bio-Ethanol fireplaces, offering efficient and stylish heating solutions for your home. Enjoy the warmth and ambiance of a real flame, with the convenience and clean-burning performance of LPG. ",
//     },
//     {
//       fueltype_id: 1,
//       image: collectionImg2,
//       title: "Hybrid - Wood/Electric Fireplaces",
//       description:
//         "Transform your home with modern Hybrid - Wood/Electric fireplaces...",
//     },
//   ];

//   const mergeInputs = (arr1, arr2) => {
//     return arr1.map((item1) => {
//       const match = arr2.find(
//         (item2) => item2.fueltype_id === item1.fueltype_id
//       );
//       if (match) {
//         return {
//           ...item1,
//           fueltype_name: match.fueltype_name,
//           is_active: match.is_active,
//         };
//       }
//       return item1;
//     });
//   };

//   const handleScroll = (direction) => {
//     if (carouselRef.current) {
//       const scrollAmount = 300;
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
//   const mergedOutput = mergeInputs(carouselItems, fuelTypes);
//   return (
//     <div className="flex relative justify-center flex-col ml-0 mr-0 md:ml-16 md:mr-16">
//       <div className="flex flex-row items-center w-full mb-10">
//         <div className="heading1 flex w-full justify-start ml-8 md:justify-center md:ml-0">
//           Collections
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
//         className="grid grid-flow-col auto-cols-[100%] gap-1 overflow-x-auto overscroll-x-contain element-snaps hide-scrollbar
//         md:auto-cols-[25%]"
//       >
//         {
//           // imageUrl &&
//           mergedOutput?.map((item, index) => (
//             <div key={index}>
//               <div className="element" key={"collections" + index}>
//                 <Image
//                   src={item?.image?.src}
//                   alt={item.title}
//                   className="element-image"
//                   width={300}
//                   height={600}
//                   onClick={() =>
//                     allProductsRouteHandler(
//                       "fuelType",
//                       item?.fueltype_name,
//                       item.fueltype_id
//                     )
//                   }
//                   style={{ cursor: "pointer" }}
//                   unoptimized
//                 />
//                 <div className="overlay">
//                   <h3
//                     className="font-sans font-extralight leading-6 text-lg text-wrap"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       allProductsRouteHandler(
//                         "fuelType",
//                         item?.fueltype_name,
//                         item.fueltype_id
//                       )
//                     }
//                   >
//                     {item.title}
//                   </h3>
//                   <p className="font-sans font-normal leading-5 text-sm">
//                     {item.description}
//                   </p>
//                   <div
//                     className="uppercase font-medium font-sans text-base underline"
//                     // href="#"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       allProductsRouteHandler(
//                         "fuelType",
//                         item?.fueltype_name,
//                         item.fueltype_id
//                       )
//                     }
//                   >
//                     View Collection
//                   </div>
//                 </div>
//               </div>
//               <div className="mr-8 ml-8 gap-4 flex flex-col md:hidden">
//                 <h3
//                   className="font-sans font-medium leading-6 text-base text-wrap"
//                   style={{ cursor: "pointer" }}
//                   onClick={() =>
//                     allProductsRouteHandler(
//                       "fuelType",
//                       item?.fueltype_name,
//                       item.fueltype_id
//                     )
//                   }
//                 >
//                   {item.title}
//                 </h3>
//                 <p className="font-sans font-normal leading-5 text-sm">
//                   {item.description}
//                 </p>
//                 <div
//                   className="uppercase font-medium font-sans text-base underline"
//                   // href="#"
//                   style={{ cursor: "pointer" }}
//                   onClick={() =>
//                     allProductsRouteHandler(
//                       "fuelType",
//                       item?.fueltype_name,
//                       item.fueltype_id
//                     )
//                   }
//                 >
//                   View Collection
//                 </div>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// };

// export default Collections;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import collectionImg3 from "@/public/assets/homePage/collections/collectionsImg3.svg";
import collectionImg4 from "@/public/assets/homePage/collections/collectionsImg4.svg";
import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
import Image from "next/image";

const Collections = ({ fuelTypes, allProductsRouteHandler }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchImageUrl() {
      const response = await fetch("/api/s3Url", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setImageUrl(data.url);
    }

    fetchImageUrl();
  }, []);

  const carouselItems = [
    {
      fueltype_id: 5,
      image: collectionImg1,
      title: "Electric Fireplaces",
      description:
        "Discover our range of luxury indoor electric fireplaces and transform your home into a cosy haven of warmth and style. Visit our Melbourne showroom.",
    },
    {
      fueltype_id: 3,
      image: collectionImg2,
      title: "Gas Fireplaces",
      description:
        "Explore our indoor gas fireplaces and turn your home into a warm and inviting retreat. Whatever your interior style, we have the perfect gas fireplace to enhance your living space.",
    },
    {
      fueltype_id: 4,
      image: collectionImg3,
      title: "Wood Fireplaces",
      description:
        "Experience warmth and elegance with our indoor luxury wood fireplaces, blending timeless craftsmanship with contemporary modern design.",
    },
    {
      fueltype_id: 2,
      image: collectionImg4,
      title: "Bio-Ethanol Fireplaces",
      description:
        "Explore our collection of Bio-Ethanol fireplaces, offering efficient and stylish heating solutions for your home. Enjoy the warmth and ambiance of a real flame, with the convenience and clean-burning performance of LPG. ",
    },
    {
      fueltype_id: 1,
      image: collectionImg2,
      title: "Hybrid - Wood/Electric Fireplaces",
      description:
        "Transform your home with modern Hybrid - Wood/Electric fireplaces...",
    },
  ];

  const mergeInputs = (arr1, arr2) => {
    return arr1.map((item1) => {
      const match = arr2.find(
        (item2) => item2.fueltype_id === item1.fueltype_id
      );
      if (match) {
        return {
          ...item1,
          fueltype_name: match.fueltype_name,
          is_active: match.is_active,
        };
      }
      return item1;
    });
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const mergedOutput = mergeInputs(carouselItems, fuelTypes);
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="flex relative justify-center flex-col ml-0 mr-0 md:ml-16 md:mr-16"
    >
      <div className="flex flex-row items-center w-full mb-10">
        <motion.div 
          variants={itemVariants}
          className="heading1 flex w-full justify-start ml-8 md:justify-center md:ml-0"
        >
          Collections
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="flex flex-row items-center gap-2 absolute right-5 cursor-pointer"
        >
          <Image
            src={RightArrow}
            alt="Right Arrow"
            onClick={() => handleScroll("left")}
            unoptimized
          />
          <Image
            src={LeftArrow}
            alt="Left Arrow"
            onClick={() => handleScroll("right")}
            unoptimized
          />
        </motion.div>
      </div>

      <div
        ref={carouselRef}
        className="grid grid-flow-col auto-cols-[100%] gap-1 overflow-x-auto overscroll-x-contain element-snaps hide-scrollbar
        md:auto-cols-[25%]"
      >
        {mergedOutput?.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div 
              className="element" 
              key={"collections" + index}
              variants={hoverVariants}
            >
              <Image
                src={item?.image?.src}
                alt={item.title}
                className="element-image"
                width={300}
                height={600}
                onClick={() =>
                  allProductsRouteHandler(
                    "fuelType",
                    item?.fueltype_name,
                    item.fueltype_id
                  )
                }
                style={{ cursor: "pointer" }}
                unoptimized
              />
              <div className="overlay">
                <h3
                  className="font-sans font-extralight leading-6 text-lg text-wrap"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    allProductsRouteHandler(
                      "fuelType",
                      item?.fueltype_name,
                      item.fueltype_id
                    )
                  }
                >
                  {item.title}
                </h3>
                <p className="font-sans font-normal leading-5 text-sm">
                  {item.description}
                </p>
                <div
                  className="uppercase font-medium font-sans text-base underline"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    allProductsRouteHandler(
                      "fuelType",
                      item?.fueltype_name,
                      item.fueltype_id
                    )
                  }
                >
                  View Collection
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="mr-8 ml-8 gap-4 flex flex-col md:hidden"
              variants={itemVariants}
            >
              <h3
                className="font-sans font-medium leading-6 text-base text-wrap"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  allProductsRouteHandler(
                    "fuelType",
                    item?.fueltype_name,
                    item.fueltype_id
                  )
                }
              >
                {item.title}
              </h3>
              <p className="font-sans font-normal leading-5 text-sm">
                {item.description}
              </p>
              <div
                className="uppercase font-medium font-sans text-base underline"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  allProductsRouteHandler(
                    "fuelType",
                    item?.fueltype_name,
                    item.fueltype_id
                  )
                }
              >
                View Collection
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Collections;
