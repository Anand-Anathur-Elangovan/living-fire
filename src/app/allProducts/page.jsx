"use client";
import React, { useState } from "react";
import OurDifference from "./components/OurDifference";
import OurShowrooms from "./components/ourShowrooms";
import Products from "./components/products";

const Page = () => {
  const [productMenuIndex, setproductMenuIndex] = useState(null);
  const allProductMenu = [
    "Fireplaces",
    "Firepits",
    "Fireplace Mantels",
    "Range Cookers",
    "Fireplace Accessories",
    "Warehouse Clearance",
  ];

  return (
    <div className="flex flex-col px-16 gap-5 bg-[#F7F7F5]">
      <div className="heading1 flex w-full justify-center items-center w-full mt-[5.5rem] uppercase font-[Satoru]">
        All Products
      </div>
      <div className="flex flex-row justify-center items-center w-full gap-14 p-3">
        {allProductMenu.map((productMenu, index) => (
          <div
            className={`flex flex-col gap-1 items-center text-center cursor-pointer after:justify-center after:content-['']  after:w-${
              index === productMenuIndex ? "2/4" : "1"
            } after:block after:border-b-[3.5px] after:border-solid after:border-black after:rounded after:transistion after:ease-in-out after:duration-300`}
            key={"productMenu" + index}
            onClick={() => setproductMenuIndex(index)}
          >
            {productMenu}
          </div>
        ))}
      </div>
      <Products />
      <OurDifference />
      <OurShowrooms />
    </div>
  );
};

export default Page;
