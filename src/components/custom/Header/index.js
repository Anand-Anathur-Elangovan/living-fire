"use client";
import React, { useState, useRef, useEffect } from "react";
import "./header.css";
import logo from "@/public/assets/homePage/rightSideLogo.svg";
import searchIcon from "@/public/assets/homePage/searchIcon.svg";
import menu from "@/public/assets/homePage/burgerMenuIcon.svg";
import menuIcon from "@/public/assets/homePage/burgerMenu.svg";
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
  const [isMobile, setIsMobile] = useState(false);

  const isHomePage = pathname === "/";
  let lastScroll = 0;

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    lastScroll = currentScroll;

    if (currentScroll > 1) {
      setScrolled(true);
      if (isHomePage && currentScroll > 0) {
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
    sessionStorage.removeItem("filtersJson");
    sessionStorage.clear();
    router.push(`/`);
  };
  const [isClosing, setIsClosing] = useState(false);

const handleCloseMenu = () => {
  setIsClosing(true);
  setTimeout(() => {
    setShowMenu(false);
    setSearchTextHeader("");
    setIsClosing(false);
  }, 400); // Match this with your CSS animation duration
};

  return (
    <>
      {!showMenu && (
        <header className={headerClasses.join(" ")}>
          <div className="image-container">
            <Image
              src={logo}
              alt="Living Fire Company Logo"
              className="custom-header-width"
              onClick={handleHomeIconClick}
              title="Living Fire Company Logo"
              // unoptimized
            />
          </div>
          <div
            className="custom-header-right-side-icons"
            style={{ color: color }}
          >
            {!isMobile && (
              <div className="min-w-[400px] flex justify-center w-full">
                <div
                  className={`h-[50px] flex px-3 bg-transparent outline-none border-b-0 border-${color} rounded-none p-2`}
                >
                  <Image
                    src={SearchIcon}
                    alt="Search Icon"
                    title="Search Icon"
                    style={{ filter: color === "white" ? "invert(1)" : "none" }}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsFocus(true);
                      setShowMenu(true);
                    }}
                    width={30}
                    // unoptimized
                  />
                </div>
              </div>
            )}

            <Image
              src={isMobile ? menu : menuIcon}
              alt="Menu Icon"
              title="Menu Icon"
              className={`cursor-pointer ${isMobile ? "w-[30px]" : "w-[45px] md:w-[53px]"}`}
              style={{
                filter:
                  color === "white" ? "invert(1) brightness(1.5)" : "none",
              }}
              onClick={() => {
                setIsFocus(false);
                setShowMenu(true);
              }}
              // unoptimized
            />
          </div>
        </header>
      )}
      {/* {showMenu && (
        <div className={`menu-container ${isMobile ? "mobile-menu" : ""}`}>
          <div className="close-icon cursor-pointer">
            <Image
              src={CloseIcon}
              alt="Close"
              onClick={() => {
                setShowMenu(false);
                setSearchTextHeader("");
              }}
              unoptimized
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
      )} */}
      {showMenu && (
  <div className={`menu-container ${isMobile ? "mobile-menu" : ""} ${isClosing ? "closing" : ""}`}>
    <div className="close-icon cursor-pointer">
      <Image
        src={CloseIcon}
        alt="Close Icon"
        title="Close Icon"
        onClick={handleCloseMenu}
        // unoptimized
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