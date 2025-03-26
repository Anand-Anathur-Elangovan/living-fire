import React, { useState, useEffect, useRef } from "react";
import "../home.css"; // Add your styles here
import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
import featureImg1 from "@/public/assets/homePage/feature/1.webp";
import featureImg2 from "@/public/assets/homePage/feature/22.webp";
import featureImg3 from "@/public/assets/homePage/feature/3.webp";
import featureImg5 from "@/public/assets/homePage/feature/5.png";
import featureImg6 from "@/public/assets/homePage/feature/6.jpg";
import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const Featured = ({ headingValue, productRouteHandler, name, brand_name }) => {
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  const carouselRef = useRef(null);
  const carouselItems = [
    {
      p_id: "424",
      image: featureImg1,
      title: "Ilektro 1250",
      description: "ESSE",
      name:"HZO42 - Outdoor - LPG", 
      brand_name:"Paul Agnew Designs"
    },
    {
      p_id: "424",
      image: featureImg2,
      // collectionImg2,
      title: "Ilektro 2600",
      description: "Paul Agnew Designs",
      name:"HZO42 - Outdoor - LPG", 
      brand_name:"Paul Agnew Designs"
    },
    {
      p_id: "424",
      image: featureImg3,
      // collectionImg3,
      title: "Ilektro integra anson",
      description: "EUROSTOVE",
      name:"HZO42 - Outdoor - LPG", 
      brand_name:"Paul Agnew Designs"
    },
    {
      p_id: "424",
      image: collectionImg1,
      title: "Pyro Siena GF",
      description: "ESSE",
      name:"HZO42 - Outdoor - LPG", 
      brand_name:"Regency"
    },
    {
      p_id: "424",
      image: featureImg5,
      title: "Heatmaster Seamless",
      description: "ESSE",
      name:"HZO42 - Outdoor - LPG", 
      brand_name:"Heatmaster"
    },
    {
      p_id: "424",
      image: featureImg6,
      title: "Regency FG39",
      description: "ESSE",
      name:"HZO42 - Outdoor - LPG", 
      brand_name:"Regency"
    },
  ];
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Adjust the scroll amount as needed
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

  return (
    <div className="flex relative justify-center flex-col gap-10 ml-0 mr-0 md:ml-20 md:mr-20">
      <div className="flex flex-row items-center w-full">
        <div className="heading1 flex w-full justify-start ml-8 md:justify-center md:ml-0">
          {headingValue}
        </div>
        <div className="flex flex-row items-center gap-2 absolute right-5 cursor-pointer">
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
        </div>
      </div>

      <div
        ref={carouselRef}
        className="grid grid-flow-col auto-cols-[100%] gap-[36px] overflow-x-auto overscroll-x-contain feature-snaps before:px-1 hide-scrollbar ml-8  md:auto-cols-[25%]"
      >
        {carouselItems.map((item, index) => (
          <div
            className="w-[323px] flex flex-col gap-5"
            key={"featured" + index}
            onClick={() => productRouteHandler(item.name,item?.brand_name )}
          >
            <Image
              src={item.image}
              alt={item.title}
              className="w-[360px] md:w-80"
              key={index}
              //width={323} // specify your desired width
              //height={323} // specify your desired height
              //   layout="fill" // or any other layout you need
              style={{ cursor: "pointer" }}
              unoptimized
            />
            <div
              className="font-sans  text-left"
              style={{ cursor: "pointer" }}
            >
              <h3 className="leading-6 text-lg font-extralight">
                {item.title}
              </h3>
              <p className="font-medium leading-5 text-sm text-[#94999F]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="relative w-[524px] h-[22px] font-sans font-medium text-[16px] leading-[140%] underline uppercase text-black cursor-pointer ml-8 md:ml-0"
        onClick={() => {
          setNavigationState(null);
          router.push(`/allProducts`);
        }}
      >
        SHOP ALL
      </div>
    </div>
  );
};

export default Featured;
