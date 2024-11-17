"use client";
import React, { useState } from "react";
import OurDifference from "./components/OurDifference";
import OurShowrooms from "./components/ourShowrooms";
import Products from "./components/products";
import LeftArrowIcon from "@/public/assets/allProducts/leftArrow.svg";
import "./page.css";
import Image from "next/image";
import useHomePage from "../home/hooks/useHomePage";
import useAllProducts from "./hooks/useAllProducts";
import useMasterValues from "./hooks/useMasterValues";

const Page = () => {
  const [productMenuIndex, setproductMenuIndex] = useState(0);
  const [isCompare, setIsCompare] = useState(false);
  const [fireplaceType, setFireplaceType] = useState(null);
  const [brandType, setBrandType] = useState(null);
  const [brandFireplace, setBrandFireplace] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [subType, setSubType] = useState(null);

  const { allProducts, isFetched } = useAllProducts(
    productMenuIndex,
    fireplaceType ?? 0,
    brandType ?? 0,
    bestSelling,
    searchText,
    subType ?? 0
  );
  console.log(allProducts, "test");
  const {
    brands,
    masterValues: { fuelTypes, productTypes: allProductMenu },
  } = useMasterValues();

  return (
    <div className="flex flex-col px-16 gap-3 bg-[#F7F7F5]">
      <div className="flex flex-col items-center">
        <div className="heading1 flex w-full justify-center items-center w-full mt-[5.5rem] uppercase font-[Satoru]">
          {!brandType
            ? `${
                fireplaceType
                  ? fuelTypes.find((x) => x.fueltype_id === fireplaceType)
                      .fueltype_name
                  : "All"
              } ${
                productMenuIndex
                  ? allProductMenu.find((x) => x.ptype_id === productMenuIndex)
                      .ptype_name
                  : "Products"
              }`
            : brands.find((x) => x.brand_id === brandType).brand_name}
        </div>

        {fireplaceType && (
          <div className="flex w-7/12 justify-center text-center font-light text-lg">
            Experience warmth and elegance with our indoor luxury wood
            fireplaces, blending timeless craftsmanship with contemporary modern
            design.
          </div>
        )}
        {brandType && (
          <div className="flex w-7/12 justify-center text-center font-light text-lg">
            Paul Agnew Designs is an internationally recognized manufacturer and
            supplier of high-quality gas, wood, and electric fireplaces. With
            years of industry experience and premium end-to-end service, Paul
            Agnew Designs is a trusted supplier of the industry&apos;s most
            advanced, unique, and elegant heating solutions.
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-center items-center w-full gap-14 p-3">
          {!fireplaceType &&
            !brandType &&
            allProductMenu.map((productMenu, index) => (
              <div
                className={`flex flex-col gap-1 items-center text-center cursor-pointer`}
                key={"productMenu" + index}
                onClick={() => setproductMenuIndex(productMenu.ptype_id)}
                style={{}}
              >
                {productMenu.ptype_name}
                <div
                  className={`justify-center block border-b-[3.5px] border-solid border-black rounded transistion ease-in-out duration-500`}
                  style={{
                    width: `${
                      productMenu.ptype_id === productMenuIndex ? "50%" : "4px"
                    }`,
                  }}
                />
              </div>
            ))}
          {fireplaceType && !brandType && (
            <>
              <Image
                src={LeftArrowIcon}
                alt="Left Arrow"
                onClick={() => setFireplaceType(null)}
              />
              {fuelTypes.map((fuelType, index) => (
                <div
                  className={`flex flex-col gap-1 items-center text-center cursor-pointer`}
                  key={"fuelTypes" + fuelType.fueltype_id}
                  onClick={() => setFireplaceType(fuelType.fueltype_id)}
                >
                  {fuelType.fueltype_name}
                  <div
                    className={`justify-center block border-b-[3.5px] border-solid border-black rounded transistion ease-in-out duration-500`}
                    style={{
                      width: `${
                        fuelType.fueltype_id === fireplaceType ? "50%" : "4px"
                      }`,
                    }}
                  />
                </div>
              ))}
            </>
          )}
          {brandType && (
            <>
              {fuelTypes.map((fuelType, index) => (
                <div
                  className={`flex flex-col gap-1 items-center text-center cursor-pointer`}
                  key={"brandType" + fuelType.fueltype_id}
                  onClick={() => setBrandFireplace(fuelType.fueltype_id)}
                >
                  {fuelType.fueltype_name}
                  <div
                    className={`justify-center block border-b-[3.5px] border-solid border-black rounded transistion ease-in-out duration-500`}
                    style={{
                      width: `${
                        fuelType.fueltype_id === brandFireplace ? "50%" : "4px"
                      }`,
                    }}
                  />
                </div>
              ))}
            </>
          )}
        </div>
        {productMenuIndex !== 0 && (
          <div className="flex flex-row gap-1 items-center text-center">
            <span>Compare</span>
            <div className="container">
              <label className="switch">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={isCompare}
                  onChange={(e) => setIsCompare(e.target.checked)}
                />
                <div className="slider round"></div>
              </label>
            </div>
          </div>
        )}
      </div>
      <Products
        type={productMenuIndex}
        setproductMenuIndex={setproductMenuIndex}
        isCompare={isCompare}
        fireplaceType={fireplaceType}
        brandType={brandType}
        setFireplaceType={setFireplaceType}
        setBrandType={setBrandType}
        allProducts={allProducts}
        isFetched={isFetched}
        setSearchText={setSearchText}
        setBestSelling={setBestSelling}
        setSubType={setSubType}
      />
      <OurDifference />
      <OurShowrooms />
    </div>
  );
};

export default Page;

// const brands = [
//   { brand_id: 1, brand_name: "Paul Agnew Designs" },
//   { brand_id: 2, brand_name: "Esse" },
//   { brand_id: 3, brand_name: "Austroflamm" },
//   { brand_id: 4, brand_name: "Morso" },
//   { brand_id: 5, brand_name: "Stovax" },
//   { brand_id: 6, brand_name: "Heatmaster" },
//   { brand_id: 7, brand_name: "Hergom" },
//   { brand_id: 8, brand_name: "ADF" },
//   { brand_id: 9, brand_name: "Firefox" },
//   { brand_id: 10, brand_name: "Regency" },
//   { brand_id: 11, brand_name: "Kalora" },
//   { brand_id: 12, brand_name: "Pacific Energy" },
//   { brand_id: 13, brand_name: "Charnwood" },
//   { brand_id: 14, brand_name: "Bosq" },
//   { brand_id: 15, brand_name: "Cocoon" },
//   { brand_id: 16, brand_name: "Eurostove" },
//   { brand_id: 17, brand_name: "Gazco" },
//   { brand_id: 18, brand_name: "Icon Fires" },
//   { brand_id: 19, brand_name: "Living Fire" },
//   { brand_id: 20, brand_name: "Metters" },
//   { brand_id: 21, brand_name: "Fire Up" },
// ];
// const allProductMenu = [
//   { ptype_id: 1, ptype_name: "Fireplaces" },
//   { ptype_id: 2, ptype_name: "Firepits" },
//   { ptype_id: 3, ptype_name: "Fireplace Mantels" },
//   { ptype_id: 4, ptype_name: "Range Cookers" },
//   { ptype_id: 5, ptype_name: "Fireplace Accessories" },
//   { ptype_id: 6, ptype_name: "Warehouse Clearance" },
// ];

// const brandFirePlaces = [
//   { fueltype_id: 1, fueltype_name: "Electric Fireplaces" },
//   { fueltype_id: 3, fueltype_name: "Gas Fireplaces" },
//   { fueltype_id: 2, fueltype_name: "Bioethanol Fireplaces" },
//   { fueltype_id: 4, fueltype_name: "Mantels" },
// ];
