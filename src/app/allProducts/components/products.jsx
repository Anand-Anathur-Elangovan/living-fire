"use client";
import React, { useCallback, useEffect, useState } from "react";
import RightArrowIcon from "@/public/assets/allProducts/rightArrow.svg";
import LeftArrowIcon from "@/public/assets/allProducts/leftArrow.svg";
import LeftArrowDisabledIcon from "@/public/assets/allProducts/leftArrowDisabled.svg";
import CrossIcon from "@/public/assets/allProducts/cross.svg";
import MinusIcon from "@/public/assets/allProducts/minus.svg";
import PlusIcon from "@/public/assets/allProducts/plus.svg";
import Image from "next/image";
import useAllProducts from "../hooks/useAllProducts";
import ProductCard from "./productCard";
import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
import { SORTBY } from "@/src/constants/products";

const Products = ({
  type,
  isCompare,
  fireplaceType,
  brandType,
  setFireplaceType,
  setBrandType,
}) => {
  const { allProducts, isFetched } = useAllProducts(type ?? 0);
  // console.log(allProducts, "data");

  const [pageIndex, setPageIndex] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(
    allProducts?.slice(0, 12)
  );

  const [compareProducts, setCompareProducts] = useState([]);

  useEffect(() => {
    const updateFilteredProducts = () => {
      setFilteredProducts(allProducts?.slice(0, 12));
    };
    updateFilteredProducts();
  }, [isFetched]);

  // console.log(filteredProducts, "P");

  const maxPageCount = Math.trunc(allProducts?.length / 12) + 1;

  const onPageIndexClick = (index) => {
    if (index < 0) return;
    setPageIndex(index);
    if (index === maxPageCount)
      setFilteredProducts(() =>
        allProducts?.slice(index * 12, allProducts?.length)
      );
    setFilteredProducts(allProducts?.slice(index * 12, (index + 1) * 12));
  };

  const addToCompareProducts = useCallback(
    (p_id, checked) => {
      if (checked)
        setCompareProducts((prev) => {
          let newPrev = prev.slice();
          newPrev.push(p_id);
          return newPrev;
        });
      else {
        if (compareProducts.findIndex((x) => x === p_id) === -1) return;
        setCompareProducts((prev) => prev?.filter((a) => a !== p_id));
      }
    },
    [compareProducts]
  );

  const sortProducts = (sortBy) => {
    if (!allProducts || allProducts.length === 0) return;
    if (sortBy === SORTBY.priceLowToHigh) {
      allProducts?.sort(
        ({ fn_get_products: A }, { fn_get_products: B }) => A.price - B.price
      );
      setFilteredProducts(allProducts?.slice(0, 12));
    }
    if (sortBy === SORTBY.priceHighToLow) {
      allProducts?.sort(
        ({ fn_get_products: A }, { fn_get_products: B }) => B.price - A.price
      );
      setFilteredProducts(allProducts?.slice(0, 12));
    }
    if (sortBy === SORTBY.A2Z) {
      allProducts?.sort(({ fn_get_products: A }, { fn_get_products: B }) => {
        B.p_name - A.p_name;
        const nameA = A.p_name.toUpperCase(); // ignore upper and lowercase
        const nameB = B.p_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setFilteredProducts(allProducts?.slice(0, 12));
    }
    if (sortBy === SORTBY.Z2A) {
      allProducts?.sort(({ fn_get_products: A }, { fn_get_products: B }) => {
        B.p_name - A.p_name;
        const nameA = A.p_name.toUpperCase(); // ignore upper and lowercase
        const nameB = B.p_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      });
      setFilteredProducts(allProducts?.slice(0, 12));
    }
  };

  const fireplaceTypes = ["Wood", "Electric", "Gas", "LPG"];
  const fuelTypes = [
    { fueltype_id: 1, fueltype_name: "Hybrid - Wood/Electric" },
    { fueltype_id: 2, fueltype_name: "Bio-Ethanol" },
    { fueltype_id: 3, fueltype_name: "Gas" },
    { fueltype_id: 4, fueltype_name: "Wood" },
    { fueltype_id: 5, fueltype_name: "Electric" },
  ];
  const ranges = [
    { range_id: 1, range_name: "Firepit" },
    { range_id: 2, range_name: "Heatmaster Wood" },
    { range_id: 3, range_name: "Studio 2" },
    { range_id: 4, range_name: "Greenfire" },
    { range_id: 5, range_name: "City Series" },
    { range_id: 6, range_name: "Heatmaster Gas" },
    { range_id: 7, range_name: "ilektro Freestanding" },
    { range_id: 8, range_name: "Aerion" },
    { range_id: 9, range_name: "ilektro insert" },
    { range_id: 10, range_name: "Hestia" },
    { range_id: 11, range_name: "Pyro" },
    { range_id: 12, range_name: "ilektro" },
    { range_id: 13, range_name: "ilektro Slimline" },
    { range_id: 14, range_name: "Ironheart Range" },
  ];
  const brands = [
    { brand_id: 1, brand_name: "Paul Agnew Designs" },
    { brand_id: 2, brand_name: "Esse" },
    { brand_id: 3, brand_name: "Austroflamm" },
    { brand_id: 4, brand_name: "Morso" },
    { brand_id: 5, brand_name: "Stovax" },
    { brand_id: 6, brand_name: "Heatmaster" },
    { brand_id: 7, brand_name: "Hergom" },
    { brand_id: 8, brand_name: "ADF" },
    { brand_id: 9, brand_name: "Firefox" },
    { brand_id: 10, brand_name: "Regency" },
    { brand_id: 11, brand_name: "Kalora" },
    { brand_id: 12, brand_name: "Pacific Energy" },
    { brand_id: 13, brand_name: "Charnwood" },
    { brand_id: 14, brand_name: "Bosq" },
    { brand_id: 15, brand_name: "Cocoon" },
    { brand_id: 16, brand_name: "Eurostove" },
    { brand_id: 17, brand_name: "Gazco" },
    { brand_id: 18, brand_name: "Icon Fires" },
    { brand_id: 19, brand_name: "Living Fire" },
    { brand_id: 20, brand_name: "Metters" },
    { brand_id: 21, brand_name: "Fire Up" },
  ];
  return (
    <>
      {/* Compare Products */}
      {compareProducts.length > 1 && (
        <div className="px-1 border-t border-solid border-[#D3C6BB] w-full flex flex-row-reverse items-center pt-5 gap-3">
          <button className="py-2 px-5 shadow-md border-2 border-black">
            Compare Products
          </button>
          <div className="flex flex-row">
            {compareProducts.map((id) => {
              let productDetails = allProducts.find(
                (x) => x.fn_get_products.p_id === id
              );
              let imageURL;
              if (
                productDetails.fn_get_products?.hero_image?.includes("value")
              ) {
                let url =
                  productDetails.fn_get_products.hero_image.split("'")[7];
                imageURL = url?.includes("http") ? url : null;
              } else imageURL = null;
              return (
                <Image
                  src={imageURL ? imageURL : CheckerBoardImg}
                  alt={productDetails.fn_get_products.p_name} //productDetails.fn_get_products.p_name
                  className="element-image"
                  width={35} // specify your desired width
                  height={35} // specify your desired height
                />
              );
            })}
          </div>
          <div className="flex flex-row items-center">
            {compareProducts.length} Selected
          </div>
        </div>
      )}
      <div
        className={`flex ${
          isFilter ? "" : "flex-col"
        } px-1 border-t border-solid border-[#D3C6BB] w-full gap-5 transistion ease-in-out duration-300`}
      >
        {/* Filter */}
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
          <div className="flex flex-col gap-4 w-10/12 max-w-10/12">
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
                  onClick={() => {
                    setFireplaceType(null);
                    setBrandType(null);
                  }}
                />
              </span>
            </div>
            <div className="flex flex-col border-b boder-solid border-[#D3C6BB]">
              {/* FirePlace Types */}
              {!brandType && (
                <div className="flex flex-col gap-3 py-3 mr-10 border-b boder-solid border-[#D3C6BB]">
                  <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                    {fireplaceType
                      ? fuelTypes.find((x) => x.fueltype_id === fireplaceType)
                          .fueltype_name + " Fireplaces"
                      : "Fireplace Type"}
                    <Image
                      src={CrossIcon}
                      alt="clear"
                      className="pt-1 cursor-pointer"
                      onClick={() => setFireplaceType(null)}
                    />
                  </span>
                  {fuelTypes.map((val, index) => (
                    <span
                      key={"types" + val.fueltype_id}
                      className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transistion ease-in-out"
                      onClick={() => setFireplaceType(val.fueltype_id)}
                    >
                      {val.fueltype_name}
                    </span>
                  ))}
                </div>
              )}
              {/* Brands Types */}
              {!brandType && (
                <div className="flex flex-col gap-3 py-3 mr-10 ">
                  <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                    Brands{" "}
                    <Image
                      src={CrossIcon}
                      alt="clear"
                      className="pt-1 cursor-pointer"
                      onClick={() => setBrandType(null)}
                    />
                  </span>
                  {brands.map((val, index) => (
                    <span
                      key={"brands" + val.brand_id}
                      className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transistion ease-in-out"
                      onClick={() => setBrandType(val.brand_id)}
                    >
                      {val.brand_name}
                    </span>
                  ))}
                </div>
              )}
              {/* Ranges Types */}
              {brandType && (
                <div className="flex flex-col gap-3 py-3 mr-10 ">
                  <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                    Ranges{" "}
                    <Image
                      src={CrossIcon}
                      alt="clear"
                      className="pt-1 cursor-pointer"
                      // onClick={() => setBrandType(null)}
                    />
                  </span>
                  {ranges.map((val, index) => (
                    <span
                      key={"ranges" + val.range_id}
                      className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transistion ease-in-out"
                      // onClick={() => setBrandType(val.range_id)}
                    >
                      {val.range_name}
                    </span>
                  ))}
                </div>
              )}
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
              <span
                className="font-sans font-small leading-5 text-normal"
                onClick={() => sortProducts(SORTBY.priceLowToHigh)}
              >
                Price: Low to High
              </span>
              <span
                className="font-sans font-small leading-5 text-normal"
                onClick={() => sortProducts(SORTBY.priceHighToLow)}
              >
                Price: High to Low
              </span>
              <span
                className="font-sans font-small leading-5 text-normal"
                onClick={() => sortProducts(SORTBY.A2Z)}
              >
                A-Z
              </span>
              <span
                className="font-sans font-small leading-5 text-normal"
                onClick={() => sortProducts(SORTBY.Z2A)}
              >
                Z-A
              </span>
              <span
                className="font-sans font-small leading-5 text-normal"
                onClick={() => sortProducts(SORTBY.oldToNew)}
              >
                Oldest to Newest
              </span>
              <span
                className="font-sans font-small leading-5 text-normal"
                onClick={() => sortProducts(SORTBY.newToOld)}
              >
                Newest to Oldest
              </span>
              <span
                className="font-sans font-small leading-5 text-normal"
                onClick={() => sortProducts(SORTBY.bestSelling)}
              >
                Best Selling
              </span>
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex flex-wrap gap-8 py-3">
          {filteredProducts?.map((product, index) => (
            <ProductCard
              key={index}
              productDetails={product}
              addToCompare={addToCompareProducts}
              isCompare={isCompare}
              // title={"Beta Outdoor Fire Pit"}
              // description={"Living Fire" + val}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Image
          src={LeftArrowIcon}
          alt="Left Arrow"
          onClick={() => onPageIndexClick(pageIndex - 1)}
        />
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
        <Image
          src={RightArrowIcon}
          alt="Right Arrow"
          onClick={() => onPageIndexClick(pageIndex + 1)}
        />
      </div>
    </>
  );
};

export default Products;

// const test = allProducts.map((productDetails) => {
//   let s = productDetails.fn_get_products.hero_image.split("'");
//   if (s.length === 1 || s.length === 9) return;
//   else console.log(productDetails, s.length, "Test");
// });

// const allProductsD = Array(70)
//     .fill()
//     .map((_, i) => i);
