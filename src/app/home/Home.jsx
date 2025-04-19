// "use client";

// import React, { useState, useEffect } from "react";
// import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
// import "./home.css";
// import Image from "next/image";
// import Collections from "./components/collections";
// import OurBrands from "./components/ourBrands";
// import Featured from "./components/featured";
// import Testimonials from "./components/testimonials";
// import Blog from "./components/blog";
// import useMasterValues from "../allProducts/hooks/useMasterValues";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import useHomePage from "./hooks/useHomePage";
// import { useRouter } from "next/navigation";
// import { useNavigationState } from "@/context/NavigationContext";
// import { setCookie } from "cookies-next";

// const Home = () => {
//   const [hover, setHover] = useState(false);
//   const [showPanels, setShowPanels] = useState(false);
//   const [animatePanels, setAnimatePanels] = useState(false);
//   const [zoomImage, setZoomImage] = useState(false);
//   const [showButtons, setShowButtons] = useState(false);
//   const router = useRouter();
//   const { setNavigationState } = useNavigationState();
//   useEffect(() => {
//     if (hover) {
//       // Step 1: Show panels after base fades out
//       setTimeout(() => {
//         setShowPanels(true);
//       }, 1000);

//       // Step 2: Slide the panels after they appear
//       setTimeout(() => {
//         setAnimatePanels(true);
//       }, 2500);

//       // Step 3: Zoom the image after panels slide out
//       setTimeout(() => {
//         setZoomImage(true);
//       }, 2500);

//       setTimeout(() => {
//         setShowButtons(true);
//       }, 3000);
//     } else {
//       // Reset everything when not hovering
//       setShowPanels(false);
//       setAnimatePanels(false);
//       setZoomImage(false);
//     }
//   }, [hover]);
//   const {
//     brands,
//     masterValues: { fuelTypes, productTypes: allProductMenu },
//   } = useMasterValues();
//   const allProductsRouteHandler = (typeName, displayName, arguId) => {
//     setNavigationState({
//       typeName: typeName,
//       displayName: displayName,
//       id: arguId,
//     });
//     router.push(`/allProducts/${displayName}`);
//   };
//   const productRouteHandler = (ProductName, brandName) => {
//     const formattedProductName = ProductName.replace(/\s+/g, "_");
//     const formattedBrandName = brandName.replace(/\s+/g, "_");
//     // setCookie(
//     //   "selectedProductId",
//     //   productId
//     //   //   , {
//     //   //   path: "/", // Cookie available site-wide
//     //   //   secure: true, // Only sent over HTTPS
//     //   //   httpOnly: true, // Prevents client-side JS from accessing it
//     //   //   sameSite: "strict", // Only sent for same-site requests
//     //   //   maxAge: 60 * 60 * 24, // Cookie expiry (1 day in seconds)
//     //   // }
//     // );
//     router.push(`/${formattedBrandName}/${formattedProductName}`);
//   };
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setHover(true);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#F7F7F5",
//         gap: "75px",
//       }}
//     >
//       <div
//         className="home-page"
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(true)}
//         onMouseOver={() => setHover(true)}
//         onMouseMoveCapture={() => setHover(true)}
//       >
//         {/* Base Component - this will fade out */}
//         <div className={`base-container ${hover ? "hidden" : ""}`}>
//           <section className="hero">
//             <div className="hero-content">
//               <h1>STUNNING FIREPLACES FOR ANY HOME.</h1>
//               <p>
//                 At Living Fire, we believe our work is complete only when our
//                 clients are enjoying the warmth of their new fireplace with a
//                 glass of wine in hand. To ensure every customer across Melbourne
//                 and Australia finds their match, we have curated an exceptional
//                 selection of luxury fireplace brands. Visit our showrooms in
//                 Richmond and Moorabbin to experience our products firsthand.
//               </p>
//             </div>
//           </section>
//         </div>

//         {/* White panels that will slide out */}
//         <div
//           className={`panel-left  ${showPanels ? "show-panelsLeft" : ""} ${
//             showPanels ? "animateLeft" : ""
//           } ${animatePanels ? "animateFutherLeft" : ""}`}
//         ></div>
//         <div
//           className={`panel-right ${showPanels ? "show-panelsRight" : ""} ${
//             showPanels ? "animateRight" : ""
//           } ${animatePanels ? "animateFutherRight" : ""}`}
//         ></div>
//         <div className={`overlay-container ${zoomImage ? "show-panels" : ""}`}>
//           <Image
//             src={homePageMainImg}
//             alt="Overlay"
//             className={`overlay-image ${zoomImage ? "zoom" : ""}`}
//             unoptimized
//           />
//           <div className={`text-group show`}>
//             <h1
//               className={`blur-text`}
//               onClick={() => router.push(`/allProducts`)}
//               style={{ cursor: "pointer" }}
//             >
//               LIVING FIRE
//             </h1>
//           </div>
//           <div className={`text-group-subheading show`}>
//             <span className={`blur-text`}>Architectural Fireplace Design</span>
//           </div>
//           <div className={`button-group ${showButtons ? "show" : ""}`}>
//             {fuelTypes?.map((fuelType, index) => {
//               if (fuelType?.fueltype_name !== "Hybrid - Wood/Electric")
//                 return (
//                   <button
//                     key={"fuelTypes" + fuelType.fueltype_id}
//                     onClick={() =>
//                       allProductsRouteHandler(
//                         "fuelType",
//                         fuelType?.fueltype_name,
//                         fuelType.fueltype_id
//                       )
//                     }
//                     className="p-0 m-0 flex gap-3"
//                   >
//                     {fuelType?.fueltype_name}
//                     {fuelTypes.length !== index + 1 && (
//                       <span className="flex items-center text-white">|</span>
//                     )}
//                   </button>
//                 );
//             })}
//           </div>
//         </div>
//       </div>

//       <Collections
//         fuelTypes={fuelTypes}
//         allProductsRouteHandler={allProductsRouteHandler}
//       />
//       <OurBrands
//         brandList={brands}
//         allProductsRouteHandler={allProductsRouteHandler}
//       />
//       <Featured
//         headingValue="Featured"
//         productRouteHandler={productRouteHandler}
//       />
//       <Testimonials />
//       <Blog />
//     </div>
//   );
// };

// export default Home;

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
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [hover, setHover] = useState(false);
  const [showPanels, setShowPanels] = useState(false);
  const [animatePanels, setAnimatePanels] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  
  useEffect(() => {
    if (hover) {
      setTimeout(() => {
        setShowPanels(true);
      }, 1000);
      setTimeout(() => {
        setAnimatePanels(true);
      }, 2500);
      setTimeout(() => {
        setZoomImage(true);
      }, 2500);
      setTimeout(() => {
        setShowButtons(true);
      }, 3000);
    } else {
      setShowPanels(false);
      setAnimatePanels(false);
      setZoomImage(false);
    }
  }, [hover]);
  
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
    router.push(`/allProducts/${displayName}`);
  };
  
  const productRouteHandler = (ProductName, brandName) => {
    const formattedProductName = ProductName.replace(/\s+/g, "_");
    const formattedBrandName = brandName.replace(/\s+/g, "_");
    router.push(`/${formattedBrandName}/${formattedProductName}`);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setHover(true);
    }, 1000);
    return () => clearTimeout(timer);
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
      <div
        className="home-page"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(true)}
        onMouseOver={() => setHover(true)}
        onMouseMoveCapture={() => setHover(true)}
      >
        {/* Base Component - this will fade out */}
        <AnimatePresence>
          {!hover && (
            <motion.div
              className="base-container"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <section className="hero">
                <motion.div 
                  className="hero-content"
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                  // exit={{ opacity: 0 }}
                  // transition={{ duration: 0.3 }}
                >
                  <h1>STUNNING FIREPLACES FOR ANY HOME.</h1>
                  <p>
                    At Living Fire, we believe our work is complete only when our
                    clients are enjoying the warmth of their new fireplace with a
                    glass of wine in hand. To ensure every customer across Melbourne
                    and Australia finds their match, we have curated an exceptional
                    selection of luxury fireplace brands. Visit our showrooms in
                    Richmond and Moorabbin to experience our products firsthand.
                  </p>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* White panels that will slide out */}
        <motion.div
          className={`panel-left ${showPanels ? "show-panelsLeft" : ""} ${
            showPanels ? "animateLeft" : ""
          } ${animatePanels ? "animateFutherLeft" : ""}`}
          initial={{ x: "-100%" }}
          animate={{ x: showPanels ? (animatePanels ? "-100%" : "-70%") : "-10%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
        
        <motion.div
          className={`panel-right ${showPanels ? "show-panelsRight" : ""} ${
            showPanels ? "animateRight" : ""
          } ${animatePanels ? "animateFutherRight" : ""}`}
          initial={{ x: "100%" }}
          animate={{ x: showPanels ? (animatePanels ? "100%" : "70%") : "10%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        ></motion.div>
        
        <div className={`overlay-container ${zoomImage ? "show-panels" : ""}`}>
          <Image
            src={homePageMainImg}
            alt="Overlay"
            className={`overlay-image ${zoomImage ? "zoom" : ""}`}
            unoptimized
            loading="lazy"
            placeholder="blur"
          />
          <motion.div 
            className={`text-group show`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h1
              className={`blur-text`}
              onClick={() => router.push(`/allProducts`)}
              style={{ cursor: "pointer" }}
            >
              LIVING FIRE
            </h1>
          </motion.div>
          
          <motion.div 
            className={`text-group-subheading show`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className={`blur-text`}>Architectural Fireplace Design</span>
          </motion.div>
          
          <motion.div 
            className={`button-group ${showButtons ? "show" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: showButtons ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
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
                    className="p-0 m-0 flex gap-3"
                  >
                    {fuelType?.fueltype_name}
                    {fuelTypes.length !== index + 1 && (
                      <span className="flex items-center text-white">|</span>
                    )}
                  </button>
                );
            })}
          </motion.div>
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