"use client";
// import React, { useEffect, useMemo, useState } from "react";
import OurDifference from "./components/ourDifference";
import OurShowrooms from "./components/ourShowrooms";
import Products from "./components/products";
import LeftArrowIcon from "@/public/assets/allProducts/leftArrow.svg";
import "./page.css";
import Image from "next/image";
import useMasterValues from "./hooks/useMasterValues";
// import { useSearchParams } from "next/navigation";
import useAllProducts from "./hooks/useAllProducts";
import { useNavigationState } from "@/context/NavigationContext";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import RightArrowIcon from "@/public/assets/allProducts/rightArrow.svg";
//   import LeftArrowIcon from "@/public/assets/allProducts/leftArrow.svg";
  import LeftArrowDisabledIcon from "@/public/assets/allProducts/leftArrowDisabled.svg";
  import CrossIcon from "@/public/assets/allProducts/cross.svg";
  import MinusIcon from "@/public/assets/allProducts/minus.svg";
  import PlusIcon from "@/public/assets/allProducts/plus.svg";
  import SortIcon from "@/public/assets/allProducts/sortIcon.svg";
//   import Image from "next/image";
//   import useAllProducts from "../hooks/useAllProducts";
  import ProductCard from "./productCard";
  import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
  import { SORTBY } from "@/src/constants/products";
  import SearchIcon from "@/public/assets/allProducts/searchIcon.svg";
//   import useMasterValues from "../hooks/useMasterValues";
  import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";
  import { useRouter, useSearchParams } from "next/navigation";


const Page = () => {
  const {
    // brands,
    masterValues: { fuelTypes:any = [], productTypes: allProductMenu = [] },
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

  // console.log("allProducts", allProducts, allProducts?.length, brandType);
  const {
    brands,
    masterValues: {
      fuelTypes,
      ranges,
      subTypes,
      installationTypes,
      glassOrientationTypes,
    },
  } = useMasterValues(type?type:"");

  const router = useRouter();
//   const searchParams = useSearchParams();
  const updateQueryParams = (params) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined) {
        currentParams.set(key, params[key]);
      } else {
        currentParams.delete(key);
      }
    });

    router.push(`?${currentParams.toString()}`, { shallow: true });
  };

  // console.log(updatedValues);
  const [refreshPage, setRefreshPage] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(
    allProducts?.slice(0, 12)
  );

  const [compareProducts, setCompareProducts] = useState([]);
  const [allProductsTemp, setAllProductsTemp] = useState([]);
  const [allProductsTempForSubType, setAllProductsTempForSubType] = useState(
    []
  );
  const [firePlaceSubType, setFirePlaceSubType] = useState({
    installation: true,
    glassOrientation: true,
  });

  const searchRef = useRef(null);
  useEffect(() => {
    const checkFitlers = () => {
      if (searchText === "" && type === 0 && !brandType && !fireplaceType)
        return;
      setIsFilter(true);
    };
    checkFitlers();
  }, [searchText, type, brandType, fireplaceType]);

  useEffect(() => {
    const updateFilteredProducts = () => {
      if (allProducts.length === 0) return;
      setFilteredProducts(allProducts?.slice(0, 12));
    };
    updateFilteredProducts();
  }, [isFetched, allProducts]);

  useEffect(() => {
    if (!rangeType && allProducts && allProducts?.length > 0) {
      setAllProductsTemp(allProducts);
    }
    if (!subType && allProducts && allProducts?.length > 0) {
      setAllProductsTempForSubType(allProducts);
    }
  }, [brandType, allProducts, fireplaceType]);

  useEffect(() => {
    if (searchText !== "" && searchRef.current)
      searchRef.current.value = searchText;
  }, [searchRef, searchText]);

  const maxPageCount = Math.trunc(allProducts?.length / 12) + 1;

  const onPageIndexClick = (index) => {
    if (index < 0) return;
    // if (index + 4 > maxPageCount) return;
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
        // B.p_name - A.p_name;
        (B.name || B.p_sku) - (A.name || A.p_sku);
        // const nameA = A.p_name.toUpperCase(); // ignore upper and lowercase
        // const nameB = B.p_name.toUpperCase(); // ignore upper and lowercase
        const nameA = A.name?.toUpperCase() || A.p_sku.toUpperCase(); // ignore upper and lowercase
        const nameB = B.name?.toUpperCase() || B.p_sku.toUpperCase(); // ignore upper and lowercase
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
        // B.p_name - A.p_name;
        (B.name || B.p_sku) - (A.name || A.p_sku);
        // const nameA = A.p_name.toUpperCase(); // ignore upper and lowercase
        // const nameB = B.p_name.toUpperCase(); // ignore upper and lowercase
        const nameA = A.name?.toUpperCase() || A.p_sku.toUpperCase(); // ignore upper and lowercase
        const nameB = B.name?.toUpperCase() || B.p_sku.toUpperCase(); // ignore upper and lowercase
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
    if (sortBy === SORTBY.bestSelling) {
      setBestSelling(true);
    }
  };

  const clearFilters = () => {
    setFireplaceType(null);
    setBrandType(null);
    setproductMenuIndex(0);
    setSearchText("");
    setSubType(null);
    setRangeType(null);
    searchRef.current.value = "";
    setBestSelling(false);
    // setFirePlaceSubType(() => ({
    //   installation: false,
    //   glassOrientation: false,
    // }));
    setInstallationType(null);
    setglassOrientationType(null);
    router.push("/allProducts");
  };

  
  useEffect(() => {
    const queryParams = {
      searchText: searchParams.get("searchText"),
      fireplaceType: searchParams.get("fireplaceType"),
      brand: searchParams.get("brand"),
      glassOrientationType: searchParams.get("glassOrientationType"),
      installationType: searchParams.get("installationType"),
      rangeType: searchParams.get("rangeType"),
      productMenuIndex: searchParams.get("productMenuIndex"),
    };

    if (queryParams.searchText) setSearchText(queryParams.searchText);
    if (queryParams.fireplaceType)
      setFireplaceType(Number(queryParams.fireplaceType));
    if (queryParams.brand) setBrandType(Number(queryParams.brand));
    if (queryParams.glassOrientationType)
      setglassOrientationType(Number(queryParams.glassOrientationType));
    if (queryParams.installationType)
      setInstallationType(Number(queryParams.installationType));
    if (queryParams.rangeType) setRangeType(Number(queryParams.rangeType));
    if (queryParams.productMenuIndex)
      setproductMenuIndex(Number(queryParams.productMenuIndex));
  }, [searchParams]);

  useEffect(() => {
    type !== 0 &&
      updateQueryParams({
        productMenuIndex: type,
      });
  }, [type]);
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

          {
            brandType &&
              brands.find((b) => b?.brand_id === brandType)?.brand_desc

          }
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
                    {productMenu.ptype_name === "Fire Tools"
                      ? "Firetools & Accessories"
                      : productMenu.ptype_name}
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
                </>
              ) : brandType ? (
                <>
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
         <>
      {/* Compare Products */}
      {compareProducts.length > 1 && (
        <div className="px-1 border-t border-solid border-[#D3C6BB] w-full flex flex-row-reverse items-center pt-5 gap-3">
          <button className="py-2 px-5 shadow-md border-2 border-black">
            Compare Products
          </button>
          <div className="flex flex-row">
            {compareProducts.map((id, index) => {
              let productDetails = allProducts.find(
                (x) => x.fn_get_products?.p_id === id
              );
              let imageURL;
              if (
                productDetails.fn_get_products?.hero_image.length > 0 &&
                productDetails.fn_get_products?.hero_image[0]?.value
              ) {
                let url = productDetails.fn_get_products?.hero_image[0].value;
                imageURL = url?.includes("http") ? url : null;
              } else imageURL = null;
              return (
                <div
                  key={`compareProducts${id}`}
                  style={{ width: "40px", height: "40px" }}
                >
                  <Image
                    key={"image" + id}
                    src={
                      imageURL ? transformImageSrc(imageURL) : CheckerBoardImg
                    }
                    alt={`Product${productDetails.fn_get_products.p_name}`} //productDetails.fn_get_products.p_name
                    className="element-image"
                    width={40} // specify your desired width
                    height={40} // specify your desired height
                    unoptimized
                  />
                </div>
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
        } px-1 md:border-t md:border-solid md:border-[#D3C6BB] w-full gap-5 transistion ease-in-out duration-300 items-start`}
      >
        {/* Filter */}
        {!isFilter && (
          <div className="w-full flex flex-row px-4 pt-3 justify-between">
            <span
              className="flex gap-4 uppercase font-sans font-normal text-base"
              onClick={() => setIsFilter(true)}
            >
              Filters{" "}
              <Image
                src={PlusIcon}
                alt="clear"
                className="md:pt-1 cursor-pointer"
                unoptimized
              />
            </span>
            <span
              className="flex gap-4 uppercase font-sans font-normal text-base md:hidden"
              onClick={() => setIsSort(true)}
            >
              Sort{" "}
              <Image
                src={SortIcon}
                alt="sort"
                className="cursor-pointer"
                unoptimized
              />
            </span>
          </div>
        )}
        {(isFilter || isSort) && (
          // <div className="flex flex-col gap-4 w-3/12 max-w-10/12">
          <div className="flex flex-col gap-4 absolute z-10 md:static md:z-0 w-full px-4 md:px-0 md:w-[20%] md:max-w-10/12 bg-[#F7F7F5] md:bg-transparent border-b boder-solid border-[#878E97] md:border-0">
            <>
              <div
                className={`${
                  !isSort ? "flex" : "hidden"
                } md:flex flex-row py-3 justify-between border-b border-solid border-[#D3C6BB]`}
              >
                <span className="flex gap-4 uppercase font-sans font-normal text-base">
                  Filters{" "}
                  <Image
                    src={MinusIcon}
                    alt="clear"
                    className="md:pt-1 cursor-pointer"
                    onClick={() => setIsFilter(false)}
                    unoptimized
                  />
                </span>
                <span
                  className="flex items-center gap-4 font-sans font-normal text-base cursor-pointer"
                  onClick={clearFilters}
                >
                  Clear{" "}
                  <Image
                    src={CrossIcon}
                    alt="clear"
                    className="md:pt-1 cursor-pointer"
                    unoptimized
                  />
                </span>
              </div>
              <div
                className={`${
                  !isSort ? "flex" : "hidden"
                } md:flex flex-row gap-3 border-b border-solid border-[#D3C6BB] pb-3`}
              >
                <input
                  className="w-full h-[30px] border border-solid border-[#D3C6BB] rounded-lg p-4"
                  type="text"
                  ref={searchRef}
                  defaultValue={searchText}
                  // onChange={(e) => setSearchText(e.target.value)}
                  // value={searchText}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchText(searchRef.current.value?.toLowerCase());
                      updateQueryParams({
                        searchText: searchRef.current.value?.toLowerCase(),
                      });
                    }
                  }}
                />
                <Image
                  src={SearchIcon}
                  alt="search"
                  className="md:pt-1 cursor-pointer"
                  onClick={() => {
                    setSearchText(searchRef.current.value?.toLowerCase());
                    updateQueryParams({
                      searchText: searchRef.current.value?.toLowerCase(),
                    });
                  }}
                  unoptimized
                />
              </div>
              <div
                className={`${
                  !isSort ? "flex" : "hidden"
                } md:flex flex-col border-b boder-solid border-[#D3C6BB]`}
              >
                {/* FirePlace Types */}
                {
                  <div className="flex flex-col gap-3 py-3 mr-10 border-b boder-solid border-[#D3C6BB]">
                    <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                      {"Fireplace Type"}
                      {!document
                        .getElementById("fireplaceFilterId")
                        ?.classList?.contains("collapse") && (
                        <Image
                          src={MinusIcon}
                          alt="clear"
                          className="md:pt-1 cursor-pointer"
                          onClick={() => {
                            setRefreshPage((prev) => !prev);
                            document
                              .getElementById("fireplaceFilterId")
                              .classList.add("collapse");
                          }}
                          unoptimized
                        />
                      )}
                      {document
                        .getElementById("fireplaceFilterId")
                        ?.classList?.contains("collapse") && (
                        <Image
                          src={PlusIcon}
                          alt="clear"
                          className="md:pt-1 cursor-pointer"
                          onClick={() => {
                            setRefreshPage((prev) => !prev);
                            document
                              .getElementById("fireplaceFilterId")
                              .classList.remove("collapse");
                          }}
                          unoptimized
                        />
                      )}
                    </span>
                    <div id="fireplaceFilterId" className="flex flex-col gap-3">
                      {fireplaceType
                        ? fuelTypes?.map(
                            (val) =>
                              updatedValues?.fueltypeValues?.includes(
                                val?.fueltype_id
                              ) && (
                                <div
                                  key={
                                    "fireplaceTypes" + val?.fueltype_id ?? ""
                                  }
                                  className="flex flex-col gap-3"
                                >
                                  {val?.fueltype_id === fireplaceType ? (
                                    <>
                                      <span
                                        key={"fueltypes" + val.fueltype_id}
                                        className="font-sans font-small leading-5 text-normal text-black hover:text-black transition ease-in-out cursor-pointer"
                                        onClick={() => {
                                          setSubType(null);
                                          setFireplaceType(val?.fueltype_id);
                                          updateQueryParams({
                                            fireplaceType: val?.fueltype_id,
                                          });
                                          // setInstallationType(null);
                                          // setglassOrientationType(null);
                                        }}
                                      >
                                        {val?.fueltype_name}
                                      </span>
                                    </>
                                  ) : (
                                    <span
                                      key={"types" + val.fueltype_id}
                                      className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transition ease-in-out cursor-pointer"
                                      onClick={() => {
                                        setSubType(null);
                                        setFireplaceType(val?.fueltype_id);
                                        updateQueryParams({
                                          fireplaceType: val?.fueltype_id,
                                        });
                                        // setInstallationType(null);
                                        // setglassOrientationType(null);
                                      }}
                                    >
                                      {val?.fueltype_name}
                                    </span>
                                  )}
                                </div>
                              )
                          )
                        : fuelTypes?.map(
                            (val) =>
                              updatedValues?.fueltypeValues?.includes(
                                val?.fueltype_id
                              ) && (
                                <span
                                  key={"types" + val.fueltype_id}
                                  className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transition ease-in-out cursor-pointer"
                                  onClick={() => {
                                    setSubType(null);
                                    setFireplaceType(val?.fueltype_id);
                                    updateQueryParams({
                                      fireplaceType: val?.fueltype_id,
                                    });
                                    // setInstallationType(null);
                                    // setglassOrientationType(null);
                                  }}
                                >
                                  {val?.fueltype_name}
                                </span>
                              )
                          )}
                    </div>
                  </div>
                }

                {/* Installation Types */}
                {
                  <div className="flex flex-col gap-3 py-3 mr-10 border-b boder-solid border-[#D3C6BB]">
                    <span className="flex flex-row justify-between uppercase font-sans font-normal text-base cursor-pointer">
                      {`Installation Type`}
                      {!document
                        .getElementById("installationTypeFilterId")
                        ?.classList?.contains("collapse") && (
                        <div style={{ display: "flex", gap: "30px" }}>
                          <Image
                            src={MinusIcon}
                            alt="clear"
                            className="md:pt-1 cursor-pointer"
                            onClick={() => {
                              setRefreshPage((prev) => !prev);
                              document
                                .getElementById("installationTypeFilterId")
                                .classList.add("collapse");
                            }}
                            unoptimized
                          />
                        </div>
                      )}

                      {document
                        .getElementById("installationTypeFilterId")
                        ?.classList?.contains("collapse") && (
                        <Image
                          src={PlusIcon}
                          alt="clear"
                          className="md:pt-1 cursor-pointer"
                          onClick={() => {
                            setRefreshPage((prev) => !prev);
                            document
                              .getElementById("installationTypeFilterId")
                              .classList.remove("collapse");
                          }}
                          unoptimized
                        />
                      )}
                    </span>
                    <div
                      id="installationTypeFilterId"
                      className="flex flex-col gap-3 mr-10"
                    >
                      {firePlaceSubType.installation &&
                        updatedValues?.installationValues?.length > 0 &&
                        installationTypes.map(
                          (installval) =>
                            updatedValues?.installationValues?.includes(
                              installval?.installation_id
                            ) && (
                              <span
                                key={
                                  "installtypes" + installval?.installation_id
                                }
                                className={`font-sans font-small leading-5 text-normal hover:text-black transition ease-in-out cursor-pointer ${
                                  installval?.installation_id ===
                                  installationType
                                    ? "text-black"
                                    : "text-gray-400"
                                }`}
                                onClick={() => {
                                  setInstallationType(
                                    installval?.installation_id
                                  );
                                  updateQueryParams({
                                    installationType:
                                      installval?.installation_id,
                                  });
                                  // setglassOrientationType(null);
                                }}
                              >
                                {installval?.installation_name}
                              </span>
                            )
                        )}
                    </div>
                  </div>
                }

                {/* Glass Orientation Types */}
                {
                  <div className="flex flex-col gap-3 py-3 mr-10 border-b boder-solid border-[#D3C6BB]">
                    <span className="flex flex-row justify-between uppercase font-sans font-normal text-base cursor-pointer">
                      {`Glass Orientation Type`}
                      {!document
                        .getElementById("glassOrientationTypeFilterId")
                        ?.classList?.contains("collapse") && (
                        <div style={{ display: "flex", gap: "30px" }}>
                          <Image
                            src={MinusIcon}
                            alt="clear"
                            className="md:pt-1 cursor-pointer"
                            onClick={() => {
                              setRefreshPage((prev) => !prev);
                              document
                                .getElementById("glassOrientationTypeFilterId")
                                .classList.add("collapse");
                            }}
                            unoptimized
                          />
                        </div>
                      )}

                      {document
                        .getElementById("glassOrientationTypeFilterId")
                        ?.classList?.contains("collapse") && (
                        <Image
                          src={PlusIcon}
                          alt="clear"
                          className="md:pt-1 cursor-pointer"
                          onClick={() => {
                            setRefreshPage((prev) => !prev);
                            document
                              .getElementById("glassOrientationTypeFilterId")
                              .classList.remove("collapse");
                          }}
                          unoptimized
                        />
                      )}
                    </span>
                    <div
                      id="glassOrientationTypeFilterId"
                      className="flex flex-col gap-3 mr-10"
                    >
                      {firePlaceSubType.glassOrientation &&
                        updatedValues?.glassOrientationValues?.length > 0 &&
                        glassOrientationTypes.map(
                          (glassval) =>
                            updatedValues?.glassOrientationValues?.includes(
                              glassval?.glass_orientation_id
                            ) && (
                              <span
                                key={
                                  "glasstypes" + glassval?.glass_orientation_id
                                }
                                className={`font-sans font-small leading-5 text-normal hover:text-black transition ease-in-out cursor-pointer ${
                                  glassval?.glass_orientation_id ===
                                  glassOrientationType
                                    ? "text-black"
                                    : "text-gray-400"
                                }`}
                                onClick={() => {
                                  // setInstallationType(null);
                                  setglassOrientationType(
                                    glassval?.glass_orientation_id
                                  );
                                  updateQueryParams({
                                    glassOrientationType:
                                      glassval?.glass_orientation_id,
                                  });
                                }}
                              >
                                {glassval?.glass_orientation_name}
                              </span>
                            )
                        )}
                    </div>
                  </div>
                }

                

                {/* Ranges Types */}
                {
                // brandType && (
                  <div className="flex flex-col gap-3 py-3 mr-10 border-b boder-solid border-[#D3C6BB]">
                    <span className="flex flex-row justify-between uppercase font-sans font-normal text-base cursor-pointer">
                      {`Ranges`}
                      {!document
                        .getElementById("rangesFilterId")
                        ?.classList?.contains("collapse") && (
                        <div style={{ display: "flex", gap: "30px" }}>
                          <Image
                            src={MinusIcon}
                            alt="clear"
                            className="md:pt-1 cursor-pointer"
                            onClick={() => {
                              setRefreshPage((prev) => !prev);
                              document
                                .getElementById("rangesFilterId")
                                .classList.add("collapse");
                            }}
                            unoptimized
                          />
                        </div>
                      )}

                      {document
                        .getElementById("rangesFilterId")
                        ?.classList?.contains("collapse") && (
                        <Image
                          src={PlusIcon}
                          alt="clear"
                          className="md:pt-1 cursor-pointer"
                          onClick={() => {
                            setRefreshPage((prev) => !prev);
                            document
                              .getElementById("rangesFilterId")
                              .classList.remove("collapse");
                          }}
                          unoptimized
                        />
                      )}
                    </span>
                    <div
                      id="rangesFilterId"
                      className="flex flex-col gap-3 mr-10"
                    >
                      {rangeType && (
                        <span
                          key={"ranges_selected"}
                          className="font-sans font-normal font-small leading-5 text-base text-black"
                          // onClick={() => setBrandType(val?.brand_id)}
                        >
                          {
                            ranges?.find((b) => b?.range_id === rangeType)
                              ?.range_name
                          }
                        </span>
                      )}
                      {ranges
                        .filter((range) =>
                          allProductsTemp.some(
                            (item) =>
                              item.fn_get_products?.range_id === range.range_id
                          )
                        )
                        .map((val, index) => {
                          if (val?.range_id === rangeType) return;
                          return (
                            <span
                              key={"ranges" + val?.range_id}
                              className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transistion ease-in-out cursor-pointer"
                              onClick={() => {
                                setRangeType(val?.range_id);
                                updateQueryParams({
                                  rangeType: val?.range_id,
                                });
                              }}
                            >
                              {val?.range_name}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                // )
                }

                {/* Brands Types */}
                {
                  <div className="flex flex-col gap-3 py-3 mr-10 ">
                    <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                      Brands{" "}
                      {!document
                        .getElementById("brandsFilterId")
                        ?.classList?.contains("collapse") && (
                        <Image
                          src={MinusIcon}
                          alt="clear"
                          className="md:pt-1 cursor-pointer"
                          onClick={() => {
                            setRefreshPage((prev) => !prev);
                            document
                              .getElementById("brandsFilterId")
                              .classList.add("collapse");
                          }}
                          unoptimized
                        />
                      )}
                      {document
                        .getElementById("brandsFilterId")
                        ?.classList?.contains("collapse") && (
                        <Image
                          src={PlusIcon}
                          alt="clear"
                          className="md:pt-1 cursor-pointer"
                          onClick={() => {
                            setRefreshPage((prev) => !prev);
                            document
                              .getElementById("brandsFilterId")
                              .classList.remove("collapse");
                          }}
                          unoptimized
                        />
                      )}
                    </span>
                    <div
                      id="brandsFilterId"
                      className="flex flex-col gap-3 mr-10 "
                    >
                      {brandType && (
                        <>
                          <span
                            key={"brands_selected"}
                            className="font-sans font-normal font-small leading-5 text-base text-black"
                            // onClick={() => setBrandType(val?.brand_id)}
                          >
                            {
                              brands?.find((b) => b?.brand_id === brandType)
                                ?.brand_name
                            }
                          </span>
                          <>
                           
                          </>
                        </>
                      )}

                      {brands.map((val, index) => {
                        if (val?.brand_id === brandType) return;
                        return (
                          <span
                            key={"brands" + val?.brand_id}
                            className="font-sans font-small leading-5 text-normal text-gray-400 hover:text-black transistion ease-in-out cursor-pointer"
                            onClick={() => {
                              setRangeType(null);
                              setBrandType(val?.brand_id);
                              updateQueryParams({ brand: val?.brand_id });
                            }}
                          >
                            {val?.brand_name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                }
              </div>
              <div
                className={`${
                  !isSort ? "flex" : "hidden"
                } md:flex flex-col gap-3 py-3 mr-10`}
              >
                <span className="flex flex-row justify-between uppercase font-sans font-normal text-base">
                  Others{" "}
                  {!document
                    .getElementById("otherFilterId")
                    ?.classList?.contains("collapse") && (
                    <Image
                      src={MinusIcon}
                      alt="clear"
                      className="md:pt-1 cursor-pointer"
                      onClick={() => {
                        setRefreshPage((prev) => !prev);
                        document
                          .getElementById("otherFilterId")
                          .classList.add("collapse");
                      }}
                      unoptimized
                    />
                  )}
                  {document
                    .getElementById("otherFilterId")
                    ?.classList?.contains("collapse") && (
                    <Image
                      src={PlusIcon}
                      alt="clear"
                      className="md:pt-1 cursor-pointer"
                      onClick={() => {
                        setRefreshPage((prev) => !prev);
                        document
                          .getElementById("otherFilterId")
                          .classList.remove("collapse");
                      }}
                      unoptimized
                    />
                  )}
                </span>
                <div
                  id="otherFilterId"
                  className="flex flex-col gap-3 transistion ease-in-out"
                >
                  <span
                    className={`font-sans font-small leading-5 text-normal cursor-pointer ${
                      bestSelling ? "font-semibold" : ""
                    }`}
                    onClick={() => sortProducts(SORTBY.bestSelling)}
                  >
                    Best Selling
                  </span>
                </div>
              </div>
            </>
            <>
              <div
                className={`${
                  isSort ? "flex" : "hidden"
                } md:flex flex-col gap-3 py-3 md:mr-10`}
              >
                <span className="flex flex-row justify-between uppercase font-sans font-normal text-base border-b boder-solid border-[#D3C6BB] md:border-0 pb-2 md:pb-0">
                  Sort By{" "}
                  {!document
                    .getElementById("sortbyFilterId")
                    ?.classList?.contains("collapse") && (
                    <Image
                      src={MinusIcon}
                      alt="clear"
                      className="md:pt-1 cursor-pointer"
                      onClick={() => {
                        setRefreshPage((prev) => !prev);
                        document
                          .getElementById("sortbyFilterId")
                          .classList.add("collapse");
                        setIsSort(false);
                      }}
                      unoptimized
                    />
                  )}
                  {document
                    .getElementById("sortbyFilterId")
                    ?.classList?.contains("collapse") && (
                    <Image
                      src={PlusIcon}
                      alt="clear"
                      className="md:pt-1 cursor-pointer"
                      onClick={() => {
                        setRefreshPage((prev) => !prev);
                        document
                          .getElementById("sortbyFilterId")
                          .classList.remove("collapse");
                      }}
                      unoptimized
                    />
                  )}
                </span>
                <div
                  id="sortbyFilterId"
                  className="flex flex-col gap-3 transistion ease-in-out"
                >
                  <div
                    className="font-sans font-small leading-5 text-normal cursor-pointer"
                    onClick={() => sortProducts(SORTBY.priceLowToHigh)}
                  >
                    Price: Low to High
                  </div>
                  <span
                    className="font-sans font-small leading-5 text-normal cursor-pointer"
                    onClick={() => sortProducts(SORTBY.priceHighToLow)}
                  >
                    Price: High to Low
                  </span>
                  <span
                    className="font-sans font-small leading-5 text-normal cursor-pointer"
                    onClick={() => sortProducts(SORTBY.A2Z)}
                  >
                    A-Z
                  </span>
                  <span
                    className="font-sans font-small leading-5 text-normal cursor-pointer"
                    onClick={() => sortProducts(SORTBY.Z2A)}
                  >
                    Z-A
                  </span>
                  <span
                    className="font-sans font-small leading-5 text-normal cursor-pointer"
                    onClick={() => sortProducts(SORTBY.oldToNew)}
                  >
                    Oldest to Newest
                  </span>
                  <span
                    className="font-sans font-small leading-5 text-normal cursor-pointer"
                    onClick={() => sortProducts(SORTBY.newToOld)}
                  >
                    Newest to Oldest
                  </span>
                  <span
                    className="font-sans font-small leading-5 text-normal cursor-pointer"
                    onClick={() => sortProducts(SORTBY.bestSelling)}
                  >
                    Best Selling
                  </span>
                </div>
              </div>
            </>
          </div>
        )}

        {/* Products */}
        <div
          className={`flex flex-wrap px-4 gap-6 md:gap-8 py-3 ${
            isFilter ? "md:w-[80%]" : "w-full"
          }`}
        >
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
      <div className="flex justify-center gap-2 font-[Satoru] text-[22px] md:text-[26px] cursor-pointer">
        {/* Left Arrow */}
        {pageIndex > 0 && (
          <Image
            src={LeftArrowIcon}
            alt="Left Arrow"
            className="md:pt-1 cursor-pointer"
            onClick={() => onPageIndexClick(pageIndex - 1)}
            unoptimized
          />
        )}

        {/* First Page */}
        <span
          className={`cursor-pointer ${
            pageIndex === 0 ? "font-bold text-black" : ""
          }`}
          onClick={() => onPageIndexClick(0)}
        >
          1
        </span>

        {/* Ellipsis after First Page */}
        {pageIndex > 2 && <span>...</span>}

        {/* Pages Around Current Page */}
        {pageIndex > 1 && (
          <span
            className="cursor-pointer"
            onClick={() => onPageIndexClick(pageIndex - 1)}
          >
            {pageIndex}
          </span>
        )}

        {/* Current Page */}
        {pageIndex !== 0 && pageIndex !== maxPageCount - 1 && (
          <span className="font-bold text-black">{pageIndex + 1}</span>
        )}

        {/* Next Page */}
        {pageIndex + 1 < maxPageCount - 1 && (
          <span
            className="cursor-pointer"
            onClick={() => onPageIndexClick(pageIndex + 1)}
          >
            {pageIndex + 2}
          </span>
        )}

        {/* Ellipsis before Last Page */}
        {pageIndex + 2 < maxPageCount - 1 && <span>...</span>}

        {/* Last Page */}
        {maxPageCount > 1 && (
          <span
            className={`cursor-pointer ${
              pageIndex === maxPageCount - 1 ? "font-bold text-black" : ""
            }`}
            onClick={() => onPageIndexClick(maxPageCount - 1)}
          >
            {maxPageCount}
          </span>
        )}

        {/* Right Arrow */}
        {pageIndex < maxPageCount - 1 && (
          <Image
            src={RightArrowIcon}
            alt="Right Arrow"
            className="md:pt-1 cursor-pointer"
            onClick={() => onPageIndexClick(pageIndex + 1)}
            unoptimized
          />
        )}
      </div>
    </>
        <OurDifference />
        <OurShowrooms />
      </div>
    </>
  );
};

export default Page;
