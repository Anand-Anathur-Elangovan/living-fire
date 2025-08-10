"use client";

import React from "react";
import OurShowroom1 from "@/public/assets/allProducts/ourShowroom1.png";
import OurShowroom2 from "@/public/assets/allProducts/ourShowroom2.png";
import Image from "next/image";

const OurShowrooms = () => {
  return (
    <div className="px-8 md:px-20 py-10 md:py-24 flex flex-col md:flex-row justify-between">
      <div className="md:my-21 md:w-[35%] flex flex-col gap-6">
        <span className="uppercase font-[Satoru] font-normal md:font-medium leading-9 text-[32px] md:text-4xl">
          Our Showrooms
        </span>
        <p className="font-sans font-light md:font-normal leading-5 text-sm text-justify text-black">
          At Living Fire, we believe our work is complete only when our clients
          are enjoying the warmth of their new fireplace with a glass of wine in
          hand. To ensure every customer across Melbourne and Australia finds
          their perfect match, we&apos;ve curated an exceptional selection of
          luxury fireplace brands. Visit our showrooms in Richmond and Moorabbin
          to experience our products firsthand.
        </p>
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <div className="flex flex-col gap-5">
            <h6 className="uppercase font-sans font-medium text-sm md:text-base">
              Richmond Showroom
            </h6>
            <div className="flex flex-col font-sans font-normal text-xs md:text-sm">
              <span>359-361 Swan Street,</span>
              <span>Richmond, Victoria 3121</span>
              <span>{"Monday - Friday: 9am - 5pm"}</span>
              <span>{"Saturday: 10am - 4pm"}</span>
            </div>
            <div className="flex flex-col font-sans font-normal text-xs md:text-sm">
              <span>info@livingfire.com.au</span>
              <span>(03) 9977 7886</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h6 className="uppercase font-sans font-medium text-sm md:text-base">
              Moorabbin Showroom
            </h6>
            <div className="flex flex-col font-sans font-normal text-xs md:text-sm">
              <span>148-150 Cochranes Road,</span>
              <span>Moorabbin, Victoria 3189</span>
              <span>{"Monday - Friday: 8:30am - 4:30pm"}</span>
              <span>{"Saturday: 10am - 4pm"}</span>
            </div>
            <div className="flex flex-col font-sans font-normal text-xs md:text-sm">
              <span>info@livingfire.com.au</span>
              <span>(03) 9977 7887</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="flex items-end relative w-full h-96">
          <Image
            src={OurShowroom2}
            alt="OurShowroomPic"
            // width={250}
            // height={300}
            className="w-[12.1rem] h-[15.125rem] md:w-[18rem] md:h-[22.5rem] z-1 absolute md:relative right-0 top-0 md:left-[5rem] md:top-[5rem] "
            // style={{ zIndex: 1, height: 300 }}
            unoptimized
          />
          <Image
            src={OurShowroom1}
            alt="OurShowroomPic"
            // width={250}
            className="w-[12.1rem] h-[15.125rem] md:w-[18.5rem] md:h-[23.2rem] absolute md:-left-[150px] md:-top-[50px] z-1"
            // style={{ position: "absolute", left: -150, top: -50, zIndex: 0 }}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default OurShowrooms;

{
  /* <div className="flex flex-row gap-5 justify-between">
            <div className="flex flex-col gap-5">
              <span className="uppercase font-sans font-normal text-base">
                Richmond Showroom
              </span>
              <div className="flex flex-col">
                <span>359-361 Swan Street,</span>
                <span>Richmond, Victoria 3121</span>
                <span>{"Monday - Friday: 9am - 5pm"}</span>
                <span>{"Saturday: 10am - 4pm"}</span>
              </div>
              <div>
                <span>info@livingfire.com.au</span>
                <span>(03) 9977 7886</span>
              </div>
            </div>
            <div className="flex flex-col gap-5"></div>
          </div> */
}
