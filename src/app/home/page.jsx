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
import useMasterValues from "../allProducts/hooks/useMasterValues";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useHomePage from "./hooks/useHomePage";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { setCookie } from "cookies-next";
// import Collections from "../components/custom/Collections";

const Home = () => {
  const [hover, setHover] = useState(false);
  const [showPanels, setShowPanels] = useState(false);
  const [animatePanels, setAnimatePanels] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  // const { brands, collections, features, userFeedback } = useHomePage();
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
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
  // const productTypeList = [
  //   {
  //     image: imageUrl,
  //     title: "Electric Fireplaces",
  //     description:
  //       "Discover our range of luxury indoor electric fireplaces and transform your home into a cosy haven of warmth and style. Visit our Melbourne showroom.",
  //   },
  //   {
  //     image: collectionImg2,
  //     title: "Gas Fireplaces",
  //     description:
  //       "Explore our indoor gas fireplaces and turn your home into a warm and inviting retreat. Whatever your interior style, we have the perfect gas fireplace to enhance your living space.",
  //   },
  //   {
  //     image: collectionImg3,
  //     title: "Wood Fireplaces",
  //     description:
  //       "Experience warmth and elegance with our indoor luxury wood fireplaces, blending timeless craftsmanship with contemporary modern design.",
  //   },
  //   {
  //     image: collectionImg4,
  //     title: "LPG Fireplaces",
  //     description:
  //       "Explore our collection of LPG fireplaces, offering efficient and stylish heating solutions for your home. Enjoy the warmth and ambiance of a real flame, with the convenience and clean-burning performance of LPG. ",
  //   },
  //   {
  //     image: collectionImg2,
  //     title: "Gas Fireplaces",
  //     description: "Transform your home with modern gas fireplaces...",
  //   },
  //   {
  //     image: collectionImg3,
  //     title: "Wood Fireplaces",
  //     description:
  //       "Enjoy the warmth and beauty of traditional wood fireplaces...",
  //   },
  //   {
  //     image: collectionImg4,
  //     title: "Wood Fireplaces",
  //     description:
  //       "Enjoy the warmth and beauty of traditional wood fireplaces...",
  //   },
  // ];
  const {
    brands,
    masterValues: { fuelTypes, productTypes: allProductMenu },
  } = useMasterValues();
  const allProductsRouteHandler = (typeName, displayName, arguId) => {
    setNavigationState({
      typeName: typeName,
      displayName: displayName,
      id: arguId,
    });
    router.push(`/allProducts`);
  };
  const productRouteHandler = (productId) => {
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
    router.push(`/product/${productId}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F7F5",
        gap: "75px",
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
              <h1>STUNNING FIREPLACES FOR ANY HOME.</h1>
              <p>
                At Living Fire, we believe our work is complete only when our
                clients are enjoying the warmth of their new fireplace with a
                glass of wine in hand. To ensure every customer across Melbourne
                and Australia finds their match, we have curated an exceptional
                selection of luxury fireplace brands. Visit our showrooms in
                Richmond and Moorabbin to experience our products firsthand.
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
            <h1
              className={`blur-text`}
              onClick={() => router.push(`/allProducts`)}
              style={{ cursor: "pointer" }}
            >
              LIVING FIRE
            </h1>
            {/* <h1 className={`blur-text`}>Architectural</h1> */}
            <h2 className={`blur-text`}>Architectural</h2>
            <h2 className={`blur-text`}>Fireplace Design</h2>
          </div>
          <div className={`button-group ${showButtons ? "show" : ""}`}>
            {fuelTypes?.map((fuelType, index) => {
              if (fuelType?.fueltype_name !== "Hybrid - Wood/Electric")
                return (
                  <button
                    key={"fuelTypes" + fuelType.fueltype_id}
                    onClick={() =>
                      allProductsRouteHandler(
                        "fuelType",
                        fuelType?.fueltype_name,
                        fuelType.fueltype_id
                      )
                    }
                  >
                    {fuelType?.fueltype_name === "Bio-Ethanol"
                      ? "LPG"
                      : fuelType?.fueltype_name}
                  </button>
                );
            })}
            {/* <button onClick={() => allProductsRouteHandler()}>Wood</button>
            <button>Electric</button>
            <button>Gas</button>
            <button>LPG</button> */}
          </div>
        </div>
      </div>

      <Collections
        fuelTypes={fuelTypes}
        allProductsRouteHandler={allProductsRouteHandler}
      />
      <OurBrands
        brandList={brands}
        allProductsRouteHandler={allProductsRouteHandler}
      />
      <Featured
        headingValue="Featured"
        productRouteHandler={productRouteHandler}
      />
      <Testimonials />
      <Blog />
    </div>
  );
};

export default Home;
