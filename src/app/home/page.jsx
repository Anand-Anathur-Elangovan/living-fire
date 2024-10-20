"use client";

import React, { useState, useEffect } from "react";
import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
import "./home.css";
import Image from "next/image";
import Collections from "./components/collections";
import OurBrands from "./components/ourBrands";
import Featured from "./components/featured";
import Testimonials from "./components/testimonials";
import Blog from "./components/blog";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopScreen from "./components/top-screen";
import { getHomePageDataAction } from "@/src/server-actions/home/home.action";
import useHomePage from "./hooks/useHomePage";
// import Collections from "../components/custom/Collections";

const Home = () => {
  const [hover, setHover] = useState(false);
  const [showPanels, setShowPanels] = useState(false);
  const [animatePanels, setAnimatePanels] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const dataProps = useHomePage();
  useEffect(() => {
    if (hover) {
      // Step 1: Show panels after base fades out
      setTimeout(() => {
        setShowPanels(true);
      }, 1000);

      // Step 2: Slide the panels after they appear
      setTimeout(() => {
        setAnimatePanels(true);
      }, 2500);

      // Step 3: Zoom the image after panels slide out
      setTimeout(() => {
        setZoomImage(true);
      }, 2500);

      setTimeout(() => {
        setShowButtons(true);
      }, 3000);
    } else {
      // Reset everything when not hovering
      setShowPanels(false);
      setAnimatePanels(false);
      setZoomImage(false);
    }
  }, [hover]);
  // console.log(data, "Data");

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const result = await getHomePageDataAction();
  //     console.log(result);
  //   };
  //   fetchdata();
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F7F5",
        gap: "10px",
      }}
    >
      <div
        className="home-page"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(true)}
      >
        {/* Base Component - this will fade out */}
        <div className={`base-container ${hover ? "hidden" : ""}`}>
          <section className="hero">
            <div className="hero-content">
              <h1>STUNNING FIREPLACES FOR ANY HOME</h1>
              <p>
                At Living Fire, we believe our work is complete only when our
                clients are enjoying the warmth of their new fireplace with a
                glass of wine in hand. At Living Fire, we believe our work is
                complete only when our clients are enjoying the warmth of their
                new fireplace with a glass of wine in hand. At Living Fire, we
                believe our work is complete only when our clients are enjoying
                the warmth of.
              </p>
            </div>
          </section>
        </div>

        {/* White panels that will slide out */}
        <div
          className={`panel-left  ${showPanels ? "show-panelsLeft" : ""} ${
            showPanels ? "animateLeft" : ""
          } ${animatePanels ? "animateFutherLeft" : ""}`}
        ></div>
        <div
          className={`panel-right ${showPanels ? "show-panelsRight" : ""} ${
            showPanels ? "animateRight" : ""
          } ${animatePanels ? "animateFutherRight" : ""}`}
        ></div>
        <div className={`overlay-container ${zoomImage ? "show-panels" : ""}`}>
          <Image
            src={homePageMainImg}
            alt="Overlay"
            className={`overlay-image ${zoomImage ? "zoom" : ""}`}
          />
          <div className={`text-group show`}>
            <h1 className={`blur-text`}>LIVING FIRE</h1>
            {/* <p className={`blur-text`}>Architectural Fireplace Design</p> */}
          </div>
          <div className={`button-group ${showButtons ? "show" : ""}`}>
            <button>Wood</button>
            <button>Electric</button>
            <button>Gas</button>
            <button>LPG</button>
          </div>
        </div>
      </div>
      {/* <Collections /> */}

      <Collections />
      <OurBrands />
      <Featured />
      <Testimonials />

      <Blog />
    </div>
  );
};

export default Home;
