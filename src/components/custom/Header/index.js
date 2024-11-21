/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useRef, useEffect } from "react";
import "./header.css";
import logo from "@/public/assets/homePage/rightSideLogo.svg";
import searchIcon from "@/public/assets/homePage/searchIcon.svg";
import menu from "@/public/assets/homePage/burgerMenuIcon.svg";
import Image from "next/image";
import Menu from "@/src/app/menu/Menu";
import CloseIcon from "@/public/assets/menu/close.svg";
import { useRouter } from "next/navigation";
import SearchIcon from "@/public/assets/allProducts/searchIcon.svg";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [searchTextHeader, setSearchTextHeader] = useState("");
  const [color, setColor] = useState("white");

  const isHomePage = pathname === "/home";
  let lastScroll = 0;
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    lastScroll = currentScroll;

    if (currentScroll > 1) {
      setScrolled(true);
      if (isHomePage && currentScroll > 0.6 * window.innerHeight) {
        setColor("black");
      }
    } else {
      setScrolled(false);
      if (isHomePage) {
        setColor("white");
      }
    }
  };

  useEffect(() => {
    if (!isHomePage) {
      setColor("black");
    } else {
      setColor("white");
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  let headerClasses = ["header"];
  if (scrolled) {
    headerClasses.push("scrolled");
  }
  if (hidden) {
    headerClasses.push("hidden");
  }
  const handleHomeIconClick = () => {
    router.push(`/home`);
  };

  return (
    <>
      {!showMenu && (
        <header className={headerClasses.join(" ")}>
          <div className="image-container">
            <Image
              src={logo}
              alt="Logo"
              className="custom-header-width"
              onClick={handleHomeIconClick}
            />
          </div>
          <div
            className="custom-header-right-side-icons"
            style={{ color: color }}
          >
            {/* <Image
              src={searchIcon}
              alt="searchIcon"
              className="custom-header-width"
              onClick={() => {
                setIsFocus(true);
                setShowMenu(true);
              }}
            /> */}
            <div className="min-w-[400px] flex justify-center w-full min-width-search-product">
              <input
                type="text"
                className={`h-[50px] min-w-[400px] w-3/5 bg-transparent outline-none border-b-2 border-${color} rounded-none p-4 placeholder-white`}
                // placeholder="Search Products...."
                ref={searchRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchTextHeader(searchRef.current.value);
                    setShowMenu(true);
                  }
                }}
              />
              <div
                className={`h-[50px] flex px-3 bg-transparent outline-none border-b-2 border-${color} rounded-none p-2`}
              >
                <Image
                  src={SearchIcon}
                  alt="search"
                  className="cursor-pointer"
                  style={{ filter: color === "white" ? "invert(1)" : "none" }}
                  onClick={() => {
                    setSearchTextHeader(searchRef.current.value);
                    setShowMenu(true);
                  }}
                />
              </div>
            </div>

            <Image
              src={menu}
              alt="searchIcon"
              className="cursor-pointer"
              style={{
                filter:
                  color === "white" ? "invert(1) brightness(1.5)" : "none",
              }}
              onClick={() => {
                setIsFocus(false);
                setShowMenu(true);
              }}
            />
          </div>
        </header>
      )}
      {showMenu && (
        <div>
          <div className="close-icon cursor-pointer">
            <Image
              src={CloseIcon}
              alt="Close"
              onClick={() => {
                setShowMenu(false);
                setSearchTextHeader("");
              }}
            />
          </div>
          <div className={`menu-header ${showMenu ? "active" : ""}`}>
            <Menu
              searchTextHeader={searchTextHeader}
              setShowMenu={setShowMenu}
              isFocus={isFocus}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
