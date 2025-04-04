import React from "react";
import CocoonLogo from "@/public/assets/homePage/ourBrands/cocoon.svg";
import PaulAgnewLogo from "@/public/assets/homePage/ourBrands/paul-agnew.svg";
import StovaxLogo from "@/public/assets/homePage/ourBrands/stovax.svg";
import FireFoxLogo from "@/public/assets/homePage/ourBrands/firefox.svg";
import ADFLogo from "@/public/assets/homePage/ourBrands/adf.svg";
import AustroLogo from "@/public/assets/homePage/ourBrands/austroflamm.svg";
import CharnwoodLogo from "@/public/assets/homePage/ourBrands/charnwood.svg";
import EsseLogo from "@/public/assets/homePage/ourBrands/esse.svg";
import HeatMasterLogo from "@/public/assets/homePage/ourBrands/heatmaster.svg";
import HergomLogo from "@/public/assets/homePage/ourBrands/hergom.svg";
import KaloraLogo from "@/public/assets/homePage/ourBrands/kaloraLogo.png";
import MorsoLogo from "@/public/assets/homePage/ourBrands/morso.svg";
import RegencyLogo from "@/public/assets/homePage/ourBrands/regency.svg";
import eurostoveLogo from "@/public/assets/homePage/ourBrands/eurostoveLogo.png";

import Image from "next/image";

const OurBrands = ({ brandList, allProductsRouteHandler }) => {
  const brands = [
    {
      brand_id: 1,
      image: PaulAgnewLogo,
      title: "Paul Agnew",
    },
    {
      brand_id: 15,
      image: CocoonLogo,
      title: "Cocoon",
    },
    {
      brand_id: 5,
      image: StovaxLogo,
      title: "Stovax",
    },
    // {

    //   image: CharnwoodLogo,
    //   title: "Cocoon",
    // },
    {
      brand_id: 7,
      image: HergomLogo,
      title: "HergomLogo",
    },
    {
      brand_id: 10,
      image: RegencyLogo,
      title: "RegencyLogo",
    },
    {
      brand_id: 11,
      image: KaloraLogo,
      title: "KaloraLogo",
    },
    {
      brand_id: 3,
      image: AustroLogo,
      title: "AustroLogo",
    },
    {
      brand_id: 2,
      image: EsseLogo,
      title: "EsseLogo",
    },
    { brand_id: 4, image: MorsoLogo, title: "MorsoLogo" },
    {
      brand_id: 6,
      image: HeatMasterLogo,
      title: " HeatMaster",
    },
    {
      brand_id: 8,
      image: ADFLogo,
      title: "ADF",
    },
    // {
    //   image: FireFoxLogo,
    //   title: "Stovax",
    // },
    {
      brand_id: 16,
      image: eurostoveLogo,
      title: "Eurostove",
    },
  ];
  return (
    <div className="flex relative justify-center flex-col">
      <div className="flex flex-row items-center w-full mb-4">
        <div className="heading1 flex w-full justify-start ml-8 md:justify-center">
          Our Brands
        </div>
      </div>
      <div className="bg-white h-[625px] md:h-[470px] mx-[80px] md:mx-16 my-8 flex p-3  justify-around md:justify-center bg-red flex-wrap flex-row gap-y-6 gap-x-2 md:px-[40px] md:py-[50px] md:gap-[48px] basis-1/6 grow">
        {brands.map((brand, index) => {
          return (
            <div
              key={"brands" + index}
              className="w-[120px] h-[70px] md:w-[160px] md:h-[92px]"
              onClick={() =>
                allProductsRouteHandler(
                  "brandType",
                  brand?.title,
                  brand.brand_id
                )
              }
            >
              <Image
                src={brand.image}
                alt={brand.title}
                width={160}
                height={92}
                className="grayscale hover:grayscale-0 hover:scale-125 transition ease-in-out"
                unoptimized
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurBrands;
