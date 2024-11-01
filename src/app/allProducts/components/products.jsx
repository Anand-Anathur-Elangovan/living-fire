"use client";
import React, { useState } from "react";
import RightArrowIcon from "@/public/assets/allProducts/rightArrow.svg";
import LeftArrowIcon from "@/public/assets/allProducts/leftArrow.svg";
import CrossIcon from "@/public/assets/allProducts/cross.svg";
import MinusIcon from "@/public/assets/allProducts/minus.svg";
import PlusIcon from "@/public/assets/allProducts/plus.svg";
import Image from "next/image";
import useAllProducts from "../hooks/useAllProducts";
import ProductCard from "./productCard";

const Products = () => {
  const allProducts = Array(70)
    .fill()
    .map((_, i) => i);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(
    allProducts.slice(0, 12)
  );
  const { data } = useAllProducts();
  console.log(data, "data");
  const maxPageCount = Math.trunc(allProducts.length / 12) + 1;

  const onPageIndexClick = (index) => {
    setPageIndex(index);
    if (index === maxPageCount)
      setFilteredProducts(() =>
        allProducts.slice(index * 12, allProducts.length)
      );
    setFilteredProducts(allProducts.slice(index * 12, (index + 1) * 12));
  };

  const fireplaceTypes = ["Wood", "Electric", "Gas", "LPG"];
  const ranges = [];
  const brands = [
    "Paul Agnew Designs",
    "Esse",
    "Austroflamm",
    "Morso",
    "Stovax",
    "Heatmaster",
    "Hergom",
    "ADF",
    "Firefox",
    "Regency",
    "Kalora",
    "Pacific Energy",
    "Charnwood",
  ];
  return (
    <>
      <div
        className={`flex ${
          isFilter ? "" : "flex-col"
        } px-1 border-t border-solid border-[#D3C6BB] w-full gap-5 transistion ease-in-out duration-300`}
      >
        {!isFilter && (
          <div className="flex flex-row pt-3">
            <span className="flex gap-4 uppercase font-sans font-normal text-base">
              Filters{" "}
              <Image
                src={PlusIcon}
                alt="clear"
                className="pt-1 cursor-pointer"
                onClick={() => setIsFilter(true)}
              />
            </span>
          </div>
        )}
        {isFilter && (
          <div className="flex flex-col gap-4 w-10/12">
            <div className="flex flex-row py-3 justify-between border-b border-solid border-[#D3C6BB]">
              <span className="flex gap-4 uppercase font-sans font-normal text-base">
                Filters{" "}
                <Image
                  src={MinusIcon}
                  alt="clear"
                  className="pt-1 cursor-pointer"
                  onClick={() => setIsFilter(false)}
                />
              </span>
              <span className="flex items-center gap-4 font-sans font-normal text-base">
                Clear{" "}
                <Image
                  src={CrossIcon}
                  alt="clear"
                  className="pt-1 cursor-pointer"
                />
              </span>
            </div>
            <div className="flex flex-col border-b boder-solid border-[#D3C6BB]">
              <div className="flex flex-col gap-3 py-3 mr-10 border-b boder-solid border-[#D3C6BB]">
                <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                  Fireplace Type{" "}
                  <Image
                    src={CrossIcon}
                    alt="clear"
                    className="pt-1 cursor-pointer"
                  />
                </span>
                {fireplaceTypes.map((val, index) => (
                  <span
                    key={"types" + index}
                    className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transistion ease-in-out"
                  >
                    {val}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 py-3 mr-10 ">
                <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                  Brands{" "}
                  <Image
                    src={CrossIcon}
                    alt="clear"
                    className="pt-1 cursor-pointer"
                  />
                </span>
                {brands.map((val, index) => (
                  <span
                    key={"brands" + index}
                    className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transistion ease-in-out"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 py-3">
              <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                Sort By{" "}
                <Image
                  src={MinusIcon}
                  alt="clear"
                  className="pt-1 cursor-pointer"
                />
              </span>
              <span className="font-sans font-small leading-5 text-normal">
                Price: Low to High
              </span>
              <span className="font-sans font-small leading-5 text-normal">
                Price: High to Low
              </span>
              <span className="font-sans font-small leading-5 text-normal">
                A-Z
              </span>
              <span className="font-sans font-small leading-5 text-normal">
                Z-A
              </span>
              <span className="font-sans font-small leading-5 text-normal">
                Oldest to Newest
              </span>
              <span className="font-sans font-small leading-5 text-normal">
                Newest to Oldest
              </span>
              <span className="font-sans font-small leading-5 text-normal">
                Best Selling
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-8 py-3">
          {filteredProducts.map((val, index) => (
            <ProductCard
              key={index}
              title={"Beta Outdoor Fire Pit"}
              description={"Living Fire" + val}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Image src={LeftArrowIcon} alt="Left Arrow" />
        <span onClick={() => onPageIndexClick(pageIndex)}>{pageIndex + 1}</span>
        <span onClick={() => onPageIndexClick(pageIndex + 2)}>
          {pageIndex + 2}
        </span>
        <span onClick={() => onPageIndexClick(pageIndex + 3)}>
          {pageIndex + 3}
        </span>
        {maxPageCount - pageIndex - 3 > 1 && <span>...</span>}
        <span onClick={() => onPageIndexClick(maxPageCount)}>
          {maxPageCount}
        </span>
        <Image src={RightArrowIcon} alt="Right Arrow" />
      </div>
    </>
  );
};

export default Products;
