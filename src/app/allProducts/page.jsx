"use client";
import React, { useEffect, useMemo, useState } from "react";
import OurDifference from "./components/ourDifference";
import OurShowrooms from "./components/ourShowrooms";
import Products from "./components/products";
import LeftArrowIcon from "@/public/assets/allProducts/leftArrow.svg";
import "./page.css";
import Image from "next/image";
import useMasterValues from "./hooks/useMasterValues";
import { useSearchParams } from "next/navigation";
import useAllProducts from "./hooks/useAllProducts";
import { useNavigationState } from "@/context/NavigationContext";

const Page = () => {
  const {
    brands,
    masterValues: { fuelTypes = [], productTypes: allProductMenu = [] },
  } = useMasterValues();
  const { getNavigationState } = useNavigationState();
  const state = getNavigationState();

  const [productMenuIndex, setproductMenuIndex] = useState(0);
  const [isCompare, setIsCompare] = useState(false);
  const [fireplaceType, setFireplaceType] = useState(null);
  const [brandType, setBrandType] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [subType, setSubType] = useState(null);
  const [installationType, setInstallationType] = useState(null);
  const [glassOrientationType, setglassOrientationType] = useState(null);
  const [rangeType, setRangeType] = useState(null);
  const [updatedValues, setUpdatedValues] = useState({
    fueltypeValues: [],
    installationValues: [],
    glassOrientationValues: [],
  });

  const { allProducts, isFetched, isStale } = useAllProducts(
    productMenuIndex,
    fireplaceType ?? 0,
    brandType ?? 0,
    bestSelling === false ? null : bestSelling,
    searchText,
    subType ?? 0,
    rangeType ?? 0,
    installationType ?? 0,
    glassOrientationType ?? 0
  );

  const searchParams = useSearchParams();
  useEffect(() => {
    if (state?.typeName === "fuelType") {
      setFireplaceType(state?.id);
    } else if (state?.typeName === "brandType") {
      setBrandType(state?.id);
    }
  }, [state]);

  useEffect(() => {
    const setStates = () => {
      let text = searchParams.get("searchText");
      if (text) setSearchText(text);
      let fireplaceType = searchParams.get("fireplaceType");
      if (fireplaceType) setFireplaceType(parseInt(fireplaceType));
      let productMenu = searchParams.get("productMenu");
      if (productMenu) setproductMenuIndex(parseInt(productMenu));
      let brand = searchParams.get("brand");
      if (brand) setBrandType(parseInt(brand));
    };
    setStates();
  }, [searchParams]);

  useEffect(() => {
    const updateFuelTypeValues = () => {
      let values = [];
      let newFuelValues = [];
      values = allProducts.map((p) => p.fn_get_products?.fueltype_id);
      newFuelValues = [...new Set(values)].filter((v) => v !== null);

      let installValues = [];
      let newInstallValues = [];
      installValues = allProducts.map((p) => p.fn_get_products.installation_id);
      newInstallValues = [...new Set(installValues)].filter((v) => v !== null);

      let glassValues = [];
      let newGlassValues = [];
      glassValues = allProducts.map(
        (p) => p.fn_get_products.glass_orientation_ids
      );
      newGlassValues = [...new Set([].concat(...glassValues))]
        .filter((v) => v !== null)
        .map((x) => parseInt(x));

      setUpdatedValues((prev) => {
        return {
          ...prev,
          fueltypeValues: fireplaceType ? prev.fueltypeValues : newFuelValues,
          installationValues:
            installationType || glassOrientationType
              ? prev.installationValues
              : newInstallValues,
          glassOrientationValues:
            installationType || glassOrientationType
              ? prev.glassOrientationValues
              : newGlassValues,
        };
      });
    };
    if (allProducts.length > 0) updateFuelTypeValues();
  }, [isFetched, allProducts]);

  console.log("allProducts", allProducts, allProducts?.length, brandType);

  return (
    <>
      <div className="flex flex-col md:px-16 gap-3 bg-[#F7F7F5] ">
        <div className="flex flex-col items-center gap-5">
          <div className="text-center text-3xl md:heading1 flex w-full justify-center items-center w-full mt-[5.5rem] uppercase font-[Satoru] cursor-default">
            {!brandType
              ? `${
                  fireplaceType
                    ? fuelTypes.find((x) => x.fueltype_id === fireplaceType)
                        ?.fueltype_name ?? "Unknown"
                    : "All"
                } ${
                  productMenuIndex
                    ? allProductMenu.find(
                        (x) => x.ptype_id === productMenuIndex
                      )?.ptype_name ?? "Products"
                    : "Products"
                }`
              : `${brands.find((x) => x.brand_id === brandType)?.brand_name}` ??
                "Unknown Brand"}
          </div>

          {fireplaceType && !brandType && (
            <div className="flex md:w-7/12 justify-center text-center font-light text-base md:text-lg">
              Experience warmth and elegance with our indoor luxury wood
              fireplaces, blending timeless craftsmanship with contemporary
              modern design.
            </div>
          )}

          {brandType &&
            (brandType === 10 ? (
              <div className="flex md:w-7/12 justify-center text-center font-light text-base md:text-lg">
                Regency Fireplaces offer a wide range of gas and wood options,
                known for their efficiency, style, and craftsmanship, providing
                a comfortable heating solution for every Australian home.
              </div>
            ) : (
              <div className="flex md:w-7/12 justify-center text-center font-light text-base md:text-lg">
                Paul Agnew Designs is an internationally recognized manufacturer
                and supplier of high-quality gas, wood, and electric fireplaces.
                With years of industry experience and premium end-to-end
                service, Paul Agnew Designs is a trusted supplier of the
                industry&apos;s most advanced, unique, and elegant heating
                solutions.
              </div>
            ))}
        </div>
        {!brandType && (
          <div className="flex flex-row justify-between bg-[#DDE6ED] md:bg-transparent">
            <div className="flex flex-row md:justify-center items-center w-full gap-8 md:gap-14 p-3 overflow-x-auto">
              {!fireplaceType &&
                !brandType &&
                allProductMenu.map((productMenu, index) => (
                  <div
                    className="flex flex-col gap-1 items-center text-center cursor-pointer text-xs md:text-base"
                    key={"productMenu" + index}
                    onClick={() => setproductMenuIndex(productMenu.ptype_id)}
                  >
                    {productMenu.ptype_name}
                    <div
                      className={`justify-center block border-b-[3.5px] border-solid border-black rounded transition ease-in-out duration-500`}
                      style={{
                        width: `${
                          productMenu.ptype_id === productMenuIndex
                            ? "50%"
                            : "4px"
                        }`,
                      }}
                    />
                  </div>
                ))}
              {fireplaceType ? (
                <>
                  {/* <Image
                    src={LeftArrowIcon}
                    alt="Left Arrow"
                    className="cursor-pointer"
                    onClick={() => {
                      setFireplaceType(null);
                      setInstallationType(null);
                      setglassOrientationType(null);
                    }}
                    unoptimized
                  />
                  {fuelTypes.map(
                    (fuelType) =>
                      updatedValues?.fueltypeValues.includes(
                        fuelType?.fueltype_id
                      ) && (
                        <div
                          className="flex flex-col gap-1 items-center text-center text-xs md:text-base cursor-pointer"
                          key={"fuelTypes" + fuelType?.fueltype_id}
                          onClick={() => {
                            setSubType(null);
                            setFireplaceType(fuelType?.fueltype_id);
                          }}
                        >
                          {fuelType?.fueltype_name ?? "Unknown"}
                          <div
                            className={`justify-center block border-b-[3.5px] border-solid border-black rounded transition ease-in-out duration-500`}
                            style={{
                              width: `${
                                fuelType.fueltype_id === fireplaceType
                                  ? "50%"
                                  : "4px"
                              }`,
                            }}
                          />
                        </div>
                      )
                  )} */}
                </>
              ) : brandType ? (
                <>
                  {/* <Image
                  src={LeftArrowIcon}
                  alt="Left Arrow"
                  className="cursor-pointer"
                  onClick={() => setBrandType(null)}
                /> */}
                  {/* {fuelTypes.map((fuelType) => (
                  <div
                    className="flex flex-col gap-1 items-center text-center cursor-pointer"
                    key={"fuelTypes" + fuelType?.fueltype_id}
                    onClick={() => {
                      setSubType(null);
                      setFireplaceType(fuelType?.fueltype_id);
                    }}
                  >
                    {fuelType?.fueltype_name ?? "Unknown"}
                    <div
                      className={`justify-center block border-b-[3.5px] border-solid border-black rounded transition ease-in-out duration-500`}
                      style={{
                        width: `${
                          fuelType.fueltype_id === fireplaceType ? "50%" : "4px"
                        }`,
                      }}
                    />
                  </div>
                ))} */}
                </>
              ) : (
                <></>
              )}
            </div>
            {false && productMenuIndex !== 0 && (
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
        )}
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
          searchText={searchText}
          setBestSelling={setBestSelling}
          setSubType={setSubType}
          subType={subType}
          setRangeType={setRangeType}
          rangeType={rangeType}
          bestSelling={bestSelling}
          setInstallationType={setInstallationType}
          installationType={installationType}
          setglassOrientationType={setglassOrientationType}
          glassOrientationType={glassOrientationType}
          updatedValues={updatedValues}
          isStale={isStale}
        />
        <OurDifference />
        <OurShowrooms />
      </div>
    </>
  );
};

export default Page;
