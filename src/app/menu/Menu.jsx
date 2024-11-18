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

const Menu = ({ setShowMenu }) => {
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
    0
  );
  // console.log(filteredProducts, "Filter");
  // console.log(searchRef.current?.value);
  // console.log(searchText, searchText !== "", "MENU");

  useEffect(() => {
    // console.log("EFFECT");
    const setProducts = () => {
      setFilteredProducts(allProducts?.slice(0, 10));
    };
    setProducts();
  }, [isFetched, isFetchedAfterMount]);

  const isImageURL = (image) => {
    if (image) {
      if (image[0].value.includes("http")) return true;
    }
    return false;
  };
  const handleProductClick = (productId) => {
    setNavigationState({ productId });
    setCookie(
      "selectedProductId",
      productId
      //   , {
      //   path: "/", // Cookie available site-wide
      //   secure: true, // Only sent over HTTPS
      //   httpOnly: true, // Prevents client-side JS from accessing it
      //   sameSite: "strict", // Only sent for same-site requests
      //   maxAge: 60 * 60 * 24, // Cookie expiry (1 day in seconds)
      // }
    );
    router.push("/product");
  };

  const handleViewAll = () => {
    setShowMenu(false);
    router.push(`/allProducts?searchText=${searchText}`);
  };

  return (
    <div className="menu">
      <div className="columnclose_one">
        <div className="rowclose_one"></div>
        <div className="logo">
          <Image src={LogoIcon} alt="Logomarkblack" className="logomarkblack" />
        </div>
      </div>
      <div className="row">
        <div className="flex w-full flex-col items-center">
          <div className="flex justify-center w-full">
            <input
              width={"70%"}
              className="h-[40px] w-3/5 border-b border-solid border-t border-l border-[#D3C6BB] rounded-l-lg p-4"
              ref={searchRef}
              placeholder="Search Products"
            />
            <div className="flex px-3 bg-white border-b border-solid border-t border-r border-[#D3C6BB] rounded-r-lg">
              <Image
                src={SearchIcon}
                alt="search"
                className="cursor-pointer"
                onClick={() => setSearchText(searchRef.current.value)}
              />
            </div>
          </div>
          <div className="flex flex-row w-[80%] px-20 py-5 flex-wrap">
            {searchText !== "" &&
              isFetched &&
              (filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map(({ fn_get_products }, index) => (
                    <div
                      className="flex flex-col gap-1.5 basis-1/5"
                      key={"productCard" + index}
                    >
                      <div style={{ width: "100px" }}>
                        <Image
                          src={
                            isImageURL(fn_get_products.hero_image)
                              ? fn_get_products.hero_image[0].value
                              : CheckerBoardImg
                          }
                          alt={""} //productDetails.fn_get_products.p_name
                          className="element-image"
                          width={100} // specify your desired width
                          height={200} // specify your desired height
                          onClick={() =>
                            handleProductClick(fn_get_products?.p_id)
                          }
                        />
                      </div>
                      <div className="py-2 gap-3 ">
                        <h3 className="font-sans font-medium leading-6 text-base text-wrap">
                          {fn_get_products.p_name}
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
                    {fuelTypes.map((val, index) => (
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
                    ))}
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
              <a href="#">
                <p className="headingthree ui text size-h3">our Story</p>
              </a>
              <a href="#">
                <p className="headingthree-3 ui text size-h3">Showrooms</p>
              </a>
              <a href="#">
                <p className="headingthree-3 ui text size-h3">industry hub</p>
              </a>
              <a href="#">
                <p className="headingthree-3 ui text size-h3">Blog</p>
              </a>
              <a href="#">
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
