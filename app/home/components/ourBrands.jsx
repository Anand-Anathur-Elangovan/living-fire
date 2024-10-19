import React from "react";
import CocoonLogo from "@/app/assets/homePage/ourBrands/cocoon.svg";
import PaulAgnewLogo from "@/app/assets/homePage/ourBrands/paul-agnew.svg";
import StovaxLogo from "@/app/assets/homePage/ourBrands/stovax.svg";
import FireFoxLogo from "@/app/assets/homePage/ourBrands/firefox.svg";
import ADFLogo from "@/app/assets/homePage/ourBrands/adf.svg";
import AustroLogo from "@/app/assets/homePage/ourBrands/austroflamm.svg";
import CharnwoodLogo from "@/app/assets/homePage/ourBrands/charnwood.svg";
import EsseLogo from "@/app/assets/homePage/ourBrands/esse.svg";
import HeatMasterLogo from "@/app/assets/homePage/ourBrands/heatmaster.svg";
import HergomLogo from "@/app/assets/homePage/ourBrands/hergom.svg";
import KaloraLogo from "@/app/assets/homePage/ourBrands/kalora.svg";
import MorsoLogo from "@/app/assets/homePage/ourBrands/morso.svg";
import RegencyLogo from "@/app/assets/homePage/ourBrands/regency.svg";

import Image from "next/image";

const OurBrands = () => {
  const brands = [
    {
      image: PaulAgnewLogo,
      title: "Paul Agnew",
    },
    {
      image: CocoonLogo,
      title: "Cocoon",
    },
    {
      image: StovaxLogo,
      title: "Stovax",
    },
    {
      image: CharnwoodLogo,
      title: "Cocoon",
    },
    {
      image: HergomLogo,
      title: "Paul Agnew",
    },
    {
      image: RegencyLogo,
      title: "Stovax",
    },
    {
      image: KaloraLogo,
      title: "Cocoon",
    },
    {
      image: AustroLogo,
      title: "Paul Agnew",
    },
    {
      image: EsseLogo,
      title: "Stovax",
    },
    {
      image: MorsoLogo,
      title: "Cocoon",
    },
    {
      image: HeatMasterLogo,
      title: "Paul Agnew",
    },
    {
      image: ADFLogo,
      title: "Stovax",
    },
    {
      image: FireFoxLogo,
      title: "Stovax",
    },
  ];
  return (
    <div className="flex relative justify-center flex-col">
      <div className="flex flex-row items-center w-full mt-4">
        <div className="heading1 flex w-full justify-center uppercase">
          Our Brands
        </div>
      </div>
      <div className="bg-white h-[470px] mx-16 my-8 flex justify-center bg-red flex-wrap flex-row px-[40px] py-[50px] gap-[48px] ">
        {brands.map((brand, index) => {
          return (
            <div className="w-[160px] h-[92px]">
              <Image
                src={brand.image}
                alt={brand.title}
                width={160}
                height={92}
                className="grayscale hover:grayscale-0 hover:scale-125 transition ease-in-out"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurBrands;
