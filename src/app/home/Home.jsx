"use client";
import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
import "./home.css";
import Image from "next/image";
import useMasterValues from "../allProducts/hooks/useMasterValues";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/src/helper/loader/Loader";
import Slider from "react-slick";
import { ChevronDown } from "react-feather";
import { generateSlug } from "@/src/helper/slug/slug";
import LowerArea from "@/src/components/custom/LowerArea";
import Showrooms from "@/src/components/custom/Showrooms/Showrooms";

const brandLogos = {
  cocoon: () => import("@/public/assets/homePage/ourBrands/cocoon.svg"),
  paulAgnew: () => import("@/public/assets/homePage/ourBrands/paul-agnew.svg"),
  stovax: () => import("@/public/assets/homePage/ourBrands/stovax.svg"),
  adf: () => import("@/public/assets/homePage/ourBrands/adf.svg"),
  austro: () => import("@/public/assets/homePage/ourBrands/austroflamm.svg"),
  esse: () => import("@/public/assets/homePage/ourBrands/esse.svg"),
  heatmaster: () => import("@/public/assets/homePage/ourBrands/heatmaster.svg"),
  hergom: () => import("@/public/assets/homePage/ourBrands/hergom.svg"),
  kalora: () => import("@/public/assets/homePage/ourBrands/kaloraLogo.png"),
  morso: () => import("@/public/assets/homePage/ourBrands/morso.svg"),
  regency: () => import("@/public/assets/homePage/ourBrands/regency.svg"),
  eurostove: () =>
    import("@/public/assets/homePage/ourBrands/eurostoveLogo.png"),
};

const Collections = lazy(() => import("./components/collections"), {
  unstable_expectedLoadTime: 2000, // Estimate of load time
});
const OurBrands = lazy(() => import("./components/ourBrands"));
const Featured = lazy(() => import("./components/featured"), {
  unstable_expectedLoadTime: 2000, // Estimate of load time
});
const Testimonials = lazy(() => import("./components/testimonials"));
const Blog = lazy(() => import("./components/blog"));
const NewsletterCard = lazy(() => import("./components/newsletterCard"));

const Home = () => {
  const useAnimationState = (initialValue) => {
    const [state, setState] = useState(initialValue);
    const stateRef = useRef(state);

    const setStateOptimized = (newValue) => {
      if (stateRef.current !== newValue) {
        stateRef.current = newValue;
        setState(newValue);
      }
    };

    return [state, setStateOptimized];
  };
  const [hover, setHover] = useState(false);
  const [showPanels, setShowPanels] = useAnimationState(false);
  const [animatePanels, setAnimatePanels] = useAnimationState(false);
  const [zoomImage, setZoomImage] = useAnimationState(false);
  const [showButtons, setShowButtons] = useAnimationState(false);
  const router = useRouter();
  const { setNavigationState } = useNavigationState();

  useEffect(() => {
    if (!hover) {
      setShowPanels(false);
      setAnimatePanels(false);
      setZoomImage(false);
      setShowButtons(false);
      return;
    }

    const timeline = [
      { time: 500, action: () => setShowPanels(true) }, // Show panels after hero fades out
      { time: 1800, action: () => setAnimatePanels(true) }, // Animate panels
      { time: 1800, action: () => setZoomImage(true) }, // Zoom image
      { time: 2500, action: () => setShowButtons(true) }, // Show buttons
    ];

    const startTime = performance.now();
    let rafId;

    const animate = (now) => {
      const elapsed = now - startTime;

      timeline.forEach(({ time, action }) => {
        if (elapsed >= time) action();
      });

      if (elapsed < Math.max(...timeline.map((t) => t.time))) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [hover]);

  const {
    brands,
    masterValues: { fuelTypes },
  } = useMasterValues();

  const allProductsRouteHandler = (typeName, displayName, arguId, slug) => {
    setNavigationState({ typeName, displayName, id: arguId });
    slug
      ? router.push(`/allProducts/${slug}`)
      : router.push(`/allProducts/${displayName}`);
  };

  const productRouteHandler = (ProductName, brandName) => {
    const brandSlug = generateSlug(brandName);
    const productSlug = generateSlug(ProductName);
    router.push(`/${brandSlug}/${productSlug}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHover(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let start = null;
    let frameId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (elapsed >= 800) {
        setHover(true);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const brandsList = [
    {
      brand_id: 1,
      imageKey: "paulAgnew",
      title: "Paul Agnew Designs",
      isSvg: true,
    },
    { brand_id: 15, imageKey: "cocoon", title: "Cocoon", isSvg: true },
    { brand_id: 5, imageKey: "stovax", title: "Stovax", isSvg: true },
    { brand_id: 7, imageKey: "hergom", title: "Hergom", isSvg: true },
    { brand_id: 10, imageKey: "regency", title: "Regency", isSvg: true },
    { brand_id: 11, imageKey: "kalora", title: "Kalora", isSvg: false },
    { brand_id: 3, imageKey: "austro", title: "Austroflamm", isSvg: true },
    { brand_id: 2, imageKey: "esse", title: "Esse", isSvg: true },
    { brand_id: 4, imageKey: "morso", title: "Morso", isSvg: true },
    { brand_id: 6, imageKey: "heatmaster", title: "HeatMaster", isSvg: true },
    { brand_id: 8, imageKey: "adf", title: "ADF", isSvg: true },
    { brand_id: 16, imageKey: "eurostove", title: "Eurostove", isSvg: false },
  ];
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    cssEase: "linear",
    appendDots: (dots) => (
      <div className="custom-dots-container">
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => <div className="custom-dot"></div>,
  };
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F7F5",
        gap: "75px",
      }}
    >
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Living Fire",
            image: [
              "https://livingfires.com.au/logo.webp", // Convert to WebP
              "https://livingfires.com.au/assets/homePage/homePageMainImg.webp",
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "48-150 Cochranes Rd",
              addressLocality: "Moorabbin",
              addressRegion: "VIC",
              postalCode: "3189",
              addressCountry: "AU",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "-37.9399438839525",
              longitude: "145.0849985832501",
            },
            telephone: "+61 3 9977 7888",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
            ],
            priceRange: "$$$",
          }),
        }}
      />

      {/* Hero Section */}
      <div className="home-page">
        {/* <AnimatePresence>
          {!hover && (
            <motion.div
              className="base-container"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // transition={{ duration: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <section className="hero" aria-label="Premium Fireplace Showroom">
                <motion.div
                  className="hero-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div
                    id="hero-heading"
                    className="text-4xl font-bold leading-tight"
                  >
                    STUNNING FIREPLACES FOR ANY HOME.
                  </div>
                  <p>
                    At Living Fire, we believe our work is complete only when
                    our clients are enjoying the warmth of their new fireplace
                    with a glass of wine in hand. To ensure every customer
                    across Melbourne and Australia finds their match, we have
                    curated an exceptional selection of luxury fireplace brands.
                    Visit our showrooms in Richmond and Moorabbin to experience
                    our products firsthand.
                  </p>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence> */}
        <motion.div
          // className={`overlay-container ${showPanels  ? "show-panels" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showPanels ? 1 : 0 }}
          transition={{ duration: 0.3, delay: showPanels ? 0 : 0.3 }}
        >
          {/* Animated Panels */}
          <motion.div
            className={`panel-left ${showPanels ? "show-panelsLeft" : ""}`}
            initial={{ x: "-100%" }}
            // animate={{
            //   x: showPanels ? (animatePanels ? "-100%" : "-70%") : "-10%",
            // }}
            animate={{
              x: showPanels ? (animatePanels ? "-100%" : "-100%") : "-10%",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <motion.div
            className={`panel-right ${showPanels ? "show-panelsRight" : ""}`}
            initial={{ x: "100%" }}
            // animate={{
            //   x: showPanels ? (animatePanels ? "100%" : "70%") : "10%",
            // }}
            animate={{
              x: showPanels ? (animatePanels ? "100%" : "100%") : "10%",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {/* Optimized Hero Image */}
          <div
            className={`overlay-container ${zoomImage ? "show-panels" : ""}`}
          >
            <Slider {...carouselSettings} className="hero-carousel">
              {[1, 2, 3].map((item) => (
                <div key={item} className="carousel-slide">
                  <Image
                    src={homePageMainImg}
                    title="Luxury European Fireplace Display at Living Fire Melbourne Showroom"
                    alt="Luxury European Fireplace Display at Living Fire Melbourne Showroom"
                    className={`overlay-image ${zoomImage ? "zoom" : ""}`}
                    priority
                    fetchPriority="high"
                    quality={65}
                    width={1920}
                    height={1080}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    loading="eager"
                    decoding="async"
                    style={{
                      contentVisibility: "auto",
                      containIntrinsicSize: "1200px 800px",
                    }}
                  />
                </div>
              ))}
            </Slider>

            <motion.div
              className="text-group show"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {/* <h1
                className="blur-text"
                onClick={() => router.push(`/allProducts`)}
                style={{ cursor: "pointer" }}
              >
                LIVING FIRE
              </h1> */}
              <div
                id="company-name"
                className="blur-text text-4xl font-bold"
                onClick={() => router.push(`/allProducts`)}
                style={{ cursor: "pointer" }}
              >
                LIVING FIRE
              </div>
            </motion.div>

            <motion.div
              className="text-group-subheading show"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* <span className="blur-text">Architectural Fireplace Design</span> */}
              <h1
                className="blur-text"
                style={{
                  display: "inline",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  margin: 0,
                  padding: 0,
                  lineHeight: "inherit",
                }}
              >
                Architectural Fireplace Design
              </h1>
            </motion.div>

            <motion.div
              className={`button-group ${showButtons ? "show" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: showButtons ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              {fuelTypes?.map(
                (fuelType, index) =>
                  fuelType?.fueltype_name !== "Hybrid - Wood/Electric" && (
                    <React.Fragment key={`fuelType-${fuelType.fueltype_id}`}>
                      <button
                        key={`fuelType-${fuelType.fueltype_id}`}
                        onClick={() =>
                          allProductsRouteHandler(
                            "fuelType",
                            fuelType.fueltype_name,
                            fuelType.fueltype_id,
                            fuelType?.slug
                          )
                        }
                        className="p-0 m-0 flex gap-3"
                        aria-label={`Browse ${fuelType.fueltype_name} fireplaces`}
                      >
                        {fuelType.fueltype_name === "Cooker"
                          ? "Cookers"
                          : fuelType.fueltype_name}
                        {/* {index < fuelTypes.length - 1 && (
                        <span className="hidden md:flex items-center text-white">
                          |
                        </span>
                      )} */}
                      </button>
                      {index < fuelTypes.length - 1 && (
                        <span className="hidden md:flex items-center text-white">
                          |
                        </span>
                      )}
                    </React.Fragment>
                  )
              )}
            </motion.div>
            <motion.div
              className="scroll-indicator"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, 10, 0],
                opacity: [0, 1, 1],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.5,
                  delay: 3, // appears after other animations
                },
              }}
            >
              <ChevronDown size={48} color="white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Dynamically Loaded Sections */}
      <Suspense
        fallback={
          <div className="loading-spinner">
            <Loader />
          </div>
        }
      >
        <motion.div
          className="hero-content-underneath"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* <h1>STUNNING FIREPLACES FOR ANY HOME.</h1> */}
          <div id="hero-heading" className="text-4xl font-bold leading-tight">
            STUNNING FIREPLACES FOR ANY HOME.
          </div>
          <p>
            At Living Fire, we believe our work is complete only when our
            clients are enjoying the warmth of their new fireplace with a glass
            of wine in hand. To ensure every customer across Melbourne and
            Australia finds their match, we have curated an exceptional
            selection of luxury fireplace brands. Visit our showrooms in
            Richmond and Moorabbin to experience our products firsthand.
          </p>
        </motion.div>
        <Collections
          fuelTypes={fuelTypes}
          allProductsRouteHandler={allProductsRouteHandler}
        />
        {isDesktop ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              backgroundColor: "white",
            }}
          >
            <OurBrands
              brandList={brandsList}
              allProductsRouteHandler={allProductsRouteHandler}
            />
            <Featured
              headingValue="Featured"
              productRouteHandler={productRouteHandler}
            />
          </div>
        ) : (
          <>
            <OurBrands
              brandList={brandsList}
              allProductsRouteHandler={allProductsRouteHandler}
            />
            <Featured
              headingValue="Featured"
              productRouteHandler={productRouteHandler}
            />
          </>
        )}
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            backgroundColor: "white",
          }}
        >
          <OurBrands
            brandList={brandsList}
            allProductsRouteHandler={allProductsRouteHandler}
          />
          <Featured
            headingValue="Featured"
            productRouteHandler={productRouteHandler}
          />
        </div> */}
        {/* <Testimonials /> */}
        <Blog />
      </Suspense>

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: brandsList.map((brand, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: `${brand.title} Fireplace`,
                url: `https://livingfires.com.au/allProducts/${brand.title.replace(
                  /\s+/g,
                  "_"
                )}`,
                image: `https://livingfires.com.au/assets/homePage/ourBrands/${
                  brand.imageKey
                }.${brand.isSvg ? "svg" : "png"}`,
                description: `Premium ${brand.title} fireplace collection`,
                brand: { "@type": "Brand", name: brand.title },
              },
            })),
          }),
        }}
      />
    </div>
  );
};

export default Home;
