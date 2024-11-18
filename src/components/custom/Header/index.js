/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import "./header.css";
import logo from "@/public/assets/homePage/rightSideLogo.svg";
import searchIcon from "@/public/assets/homePage/searchIcon.svg";
import menu from "@/public/assets/homePage/burgerMenuIcon.svg";
import Image from "next/image";
import Menu from "@/src/app/menu/Menu";
import CloseIcon from "@/public/assets/menu/close.svg";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  let lastScroll = 0;
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    // if (currentScroll > lastScroll && currentScroll > 100) {
    //   // Scroll down and past 100px, hide header
    //   setHidden(true);
    // } else {
    //   // Scroll up, show header
    //   setHidden(false);
    // }
    lastScroll = currentScroll;

    if (currentScroll > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let headerClasses = ["header"];
  if (scrolled) {
    headerClasses.push("scrolled");
  }
  if (hidden) {
    headerClasses.push("hidden");
  }

  return (
    <>
      {!showMenu && (
        <header className={headerClasses.join(" ")}>
          <Image src={logo} alt="Logo" className="custom-header-width" />
          <div className="custom-header-right-side-icons">
            <Image
              src={searchIcon}
              alt="searchIcon"
              className="custom-header-width"
            />
            <Image
              src={menu}
              alt="searchIcon"
              className="custom-header-width cursor-pointer"
              onClick={() => setShowMenu(true)}
            />
          </div>
        </header>
      )}
      {showMenu && (
        <>
          <div className="close-icon cursor-pointer">
            <Image
              src={CloseIcon}
              alt="Close"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <div className="menu-header">
            <Menu setShowMenu={setShowMenu} />
          </div>
        </>
      )}
    </>
  );
};

export default Header;
