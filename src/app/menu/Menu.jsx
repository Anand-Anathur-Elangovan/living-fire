"use client";

import React, { useEffect, useRef, useState } from "react";
import LogoIcon from "@/public/assets/menu/logoblack.svg";
import Image from "next/image";
import "./Menu.css";
import useMasterValues from "../allProducts/hooks/useMasterValues";
import SearchIcon from "@/public/assets/allProducts/searchIcon.svg";
import useAllProducts from "../allProducts/hooks/useAllProducts";
import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
import { useNavigationState } from "@/context/NavigationContext";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const Menu = ({ searchTextHeader, setShowMenu, isFocus }) => {
  const { setNavigationState } = useNavigationState();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const {
    brands,
    masterValues: { fuelTypes, productTypes: allProductMenu },
  } = useMasterValues();

  const { allProducts, isFetched, isFetchedAfterMount } = useAllProducts(
    0,
    0,
    0,
    false,
    searchText,
    0,
    0
  );

  useEffect(() => {
    const setProducts = () => {
      setFilteredProducts(allProducts?.slice(0, 10));
    };
    setProducts();
  }, [isFetched, isFetchedAfterMount]);

  useEffect(() => {
    if (isFocus && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isFocus, searchRef]);

  const isImageURL = (image) => {
    if (image) {
      if (image[0].value.includes("http")) return true;
    }
    return false;
  };
  const handleProductClick = async (productId) => {
    // Set the navigation state and cookie
    await setNavigationState({ productId });
    await setCookie("selectedProductId", productId);

    // Route to the product page
    router.push(`/product/${productId}`);

    // Add a slight delay before closing the menu
    setTimeout(() => {
      setShowMenu(false);
    }, 1000); // 100ms delay should be enough to ensure routing happens first
  };

  const handleViewAll = () => {
    // setShowMenu(false);
    router.push(`/allProducts?searchText=${searchText}`);
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };
  const handleHeaderHomeClick = () => {
    setShowMenu(false);
    router.push(`/home`);
  };

  useEffect(() => {
    if (searchTextHeader?.length > 1) {
      searchRef.current.value = searchTextHeader;
      setSearchText(searchTextHeader);
    }
  }, [searchTextHeader]);
  return (
    <div className="menu">
      <div className="columnclose_one">
        <div className="rowclose_one"></div>
        <div className="logo">
          <Image
            src={LogoIcon}
            alt="Logomarkblack"
            className="logomarkblack"
            onClick={() => handleHeaderHomeClick()}
            unoptimized
          />
        </div>
      </div>
      <div className="row">
        <div className="flex w-full flex-col items-center">
          <div className="flex justify-center w-full">
            <input
              width={"70%"}
              type="text"
              // className="h-[40px] w-3/5 border-b border-solid border-t border-l border-[#D3C6BB] rounded-l-lg p-4"
              className="h-[40px] w-3/5 bg-transparent  outline-none border-b-2 border-black rounded-none p-4"
              ref={searchRef}
              placeholder="Search Products...."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchText(searchRef.current.value);
                }
              }}
            />
            <div
              // className="flex px-3 bg-white border-b border-solid border-t border-r border-[#D3C6BB] rounded-r-lg"
              className="flex px-3 bg-transparent outline-none border-b-2 border-black rounded-none p-2"
            >
              <Image
                src={SearchIcon}
                alt="search"
                className="cursor-pointer"
                onClick={() => setSearchText(searchRef.current.value)}
                unoptimized
              />
            </div>
          </div>
          <div className="flex flex-row w-[80%] px-20 py-5 flex-wrap gap-5 justify-center">
            {searchText !== "" &&
              isFetched &&
              (filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map(({ fn_get_products }, index) => (
                    <div
                      className="flex flex-col gap-1.5 basis-1/5"
                      key={"productCard" + index}
                    >
                      <div
                        style={{
                          width: "300px",
                          height: "400px",
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          src={
                            isImageURL(fn_get_products.hero_image)
                              ? transformImageSrc(
                                  fn_get_products.hero_image[0].value
                                )
                              : CheckerBoardImg
                          }
                          alt={""} //productDetails.fn_get_products.p_name
                          className="element-image"
                          width={300} // specify your desired width
                          height={400} // specify your desired height
                          onClick={() =>
                            handleProductClick(fn_get_products?.p_id)
                          }
                          unoptimized
                        />
                      </div>
                      <div
                        className="py-2 gap-3  cursor-pointer"
                        onClick={() =>
                          handleProductClick(fn_get_products?.p_id)
                        }
                      >
                        <h3 className="font-sans font-medium leading-6 text-base text-wrap">
                          {fn_get_products.name}
                        </h3>
                        <div className="flex flex-row justify-between mr-5">
                          <span className="font-sans font-normal leading-5 text-sm">
                            {fn_get_products?.brand_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {
                    <div className="flex w-full justify-end ">
                      <span
                        className="font-sans font-normal leading-5 text-sm underline cursor-pointer"
                        onClick={handleViewAll}
                      >
                        View All
                      </span>
                    </div>
                  }
                </>
              ) : (
                <div className="flex w-full justify-center">
                  <span>No Products to display for the searched criteria</span>
                </div>
              ))}
          </div>
        </div>
        <div className="rowheading">
          <div className="column1">
            <div className="shop">
              <p className="shoptext ui text size-h3">Shop</p>
            </div>
            <div className="productLinks">
              <div className="col1 fire">
                <div className="columnheading">
                  <div className="title">
                    <p className="titleText ui text size-h5">Fireplaces</p>
                  </div>
                  <div className="columnbodymedium">
                    {fuelTypes.map((val, index) => {
                      if (val?.fueltype_name !== "Hybrid - Wood/Electric")
                        return (
                          <a
                            href={`/allProducts?fireplaceType=${val.fueltype_id}`}
                            key={"types" + val.fueltype_id}
                          >
                            <p
                              className={`bodymedium${index} ui text size-body_medium`}
                            >
                              {val.fueltype_name}
                            </p>
                          </a>
                        );
                    })}
                  </div>
                </div>
                <div className="columnheading">
                  <div className="title">
                    <p className="titleText ui text size-h5">Other</p>
                  </div>
                  <div className="columnbodysmall">
                    {allProductMenu.map((productMenu, index) => (
                      <a
                        href={`/allProducts?productMenu=${productMenu.ptype_id}`}
                        key={"productTypes" + index}
                      >
                        <p className="bodysmall ui text size-body_small">
                          {productMenu.ptype_name}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col2 brands">
                <div className="title">
                  <p className="titleText ui text size-h5">Brands</p>
                </div>
                <div className="rowbody">
                  {brands.map((val, index) => (
                    <a
                      key={"brands" + val.brand_id}
                      href={`/allProducts?brand=${val.brand_id}`}
                    >
                      <p className="bodysmall ui text size-body_small">
                        {val.brand_name}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="column2 sale">
            <div className="title sale-row1">
              <p className="titleText ui text size-h3">Sale</p>
            </div>
            <div className="sale-row2">
              <a href="/ourStory">
                <p className="headingthree ui text size-h3">Our Story</p>
              </a>
              {/* <a href="#">
                <p className="headingthree-3 ui text size-h3">Showrooms</p>
              </a> */}
              {/* <a href="#">
                <p className="headingthree-3 ui text size-h3">industry hub</p>
              </a> */}
              <a href="#">
                <p className="headingthree-3 ui text size-h3">Blog</p>
              </a>
              <a href="/contactUs">
                <p className="headingthree-3 ui text size-h3">Contact Us</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
