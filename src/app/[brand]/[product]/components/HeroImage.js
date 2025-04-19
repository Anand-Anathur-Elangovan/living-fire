// "use client";
// import "./heroImage.css";
// import React, { useState } from "react";
// import Image from "next/image";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

// const HeroImage = ({ src, alt }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const images =
//     Array.isArray(src) && src.length > 1
//       ? src
//       : [
//           { value: src?.[0]?.value },
//           { value: src?.[0]?.value },
//           { value: src?.[0]?.value },
//         ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     autoplaySpeed: 5000,
//     arrows: false,
//     afterChange: (index) => setCurrentImageIndex(index),
//   };

//   const handleImageClick = () => {
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//   };

//   return (
//     <>
//       <div className="hero-slider">
//         <Slider className="product-hero-image" {...settings}>
//           {images?.map((imageSrc, index) => (
//             <div
//               key={index}
//               className="slider-image"
//               onClick={handleImageClick}
//               style={{ cursor: "pointer" }}
//             >
//               <Image
//                 src={
//                   imageSrc?.value !== "TBC"
//                     ? transformImageSrc(imageSrc?.value)
//                     : ""
//                 }
//                 alt={`${alt} ${index + 1}`}
//                 className="class-hero-image-size"
//                 layout="responsive"
//                 width={700}
//                 height={600}
//                 unoptimized
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>

//       {isPopupOpen && (
//         <div className="popup-carousel">
//           <div className="popup-overlay" onClick={handleClosePopup}></div>
//           <div className="popup-content">
//             <button className="close-button" onClick={handleClosePopup}>
//               &times;
//             </button>
//             <Slider
//               {...settings}
//               initialSlide={currentImageIndex}
//               nextArrow={<CustomArrow direction="right" />}
//               prevArrow={<CustomArrow direction="left" />}
//             >
//               {images?.map((imageSrc, index) => (
//                 <div key={index} className="popup-slider-image">
//                   <Image
//                     src={
//                       imageSrc?.value !== "TBC"
//                         ? transformImageSrc(imageSrc?.value)
//                         : ""
//                     }
//                     alt={`${alt} ${index + 1}`}
//                     layout="responsive"
//                     width={"100%"}
//                     height={"600px"}
//                     style={{ minHeight: "600px", height: "600px" }}
//                     unoptimized
//                   />
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .popup-carousel {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .popup-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.7);
//         }
//         .popup-content {
//           position: relative;
//           background: white;
//           padding: 2rem; /* Increased padding */
//           border-radius: 8px;
//           max-width: 100%;
//           max-height: 100%;
//           overflow: hidden;
//         }
//         .close-button {
//           position: absolute;
//           top: 15px;
//           right: 15px;
//           background: transparent;
//           border: none;
//           font-size: 2rem; /* Enlarged close icon */
//           cursor: pointer;
//           color: #333;
//         }
//         .slick-arrow {
//           z-index: 1001; /* Ensures visibility inside popup */
//         }
//         .slick-prev,
//         .slick-next {
//           width: 50px;
//           height: 50px;
//         }
//         .slick-prev:before,
//         .slick-next:before {
//           font-size: 2rem;
//           color: #333; /* Arrow color */
//         }
//         .slick-slide img {
//           display: block;
//           height: 600px !important;
//         }
//       `}</style>
//     </>
//   );
// };

// // Custom Arrow Component for Next/Previous Arrows
// const CustomArrow = ({ direction, onClick }) => {
//   return (
//     <button
//       className={`custom-arrow ${direction}`}
//       onClick={onClick}
//       style={{
//         position: "absolute",
//         top: "50%",
//         [direction === "left" ? "left" : "right"]: "10px",
//         transform: "translateY(-50%)",
//         zIndex: 1001,
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         border: "none",
//         borderRadius: "50%",
//         width: "40px",
//         height: "40px",
//         cursor: "pointer",
//       }}
//     >
//       {direction === "left" ? "<" : ">"}
//     </button>
//   );
// };

// export default HeroImage;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const HeroImage = ({ src, alt }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    Array.isArray(src) && src.length > 1
      ? src
      : [
          { value: src?.[0]?.value },
          { value: src?.[0]?.value },
          { value: src?.[0]?.value },
        ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    afterChange: (index) => setCurrentImageIndex(index),
  };

  const popupSettings = {
    ...settings,
    arrows: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  const handleImageClick = () => setIsPopupOpen(true);
  const handleClosePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="hero-slider-container">
        <Slider className="product-hero-image" {...settings}>
          {images?.map((imageSrc, index) => (
            <div
              key={index}
              className="slider-image"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={
                    imageSrc?.value !== "TBC"
                      ? transformImageSrc(imageSrc?.value)
                      : ""
                  }
                  alt={`${alt} ${index + 1}`}
                  width={700}
                  height={600}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 700px"
                  className="class-hero-image-size"
                  style={{ width: "100%", height: "auto" }}
                  loading="lazy"
                  unoptimized
                />
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      {isPopupOpen && (
        <div className="popup-carousel" onClick={handleClosePopup}>
          <div className="popup-overlay">
            <motion.div
              className="popup-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={handleClosePopup}>
                &times;
              </button>
              <Slider {...popupSettings} initialSlide={currentImageIndex}>
                {images?.map((imageSrc, index) => (
                  <div key={index} className="popup-slider-image">
                    <Image
                      src={
                        imageSrc?.value !== "TBC"
                          ? transformImageSrc(imageSrc?.value)
                          : ""
                      }
                      alt={`${alt} ${index + 1}`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1000px"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "80vh",
                        objectFit: "contain",
                      }}
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hero-slider-container {
          width: 100%;
          margin: 0 auto;
        }

        .popup-carousel {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(5px);
          /* margin-top: 10%; */
          padding-top:10%
        }

        .popup-content {
          position: relative;
          background: white;
          padding: 1rem;
          border-radius: 8px;
          width: 95%;
          max-width: 1024px;
          max-height: 90vh;
          overflow: hidden;
          margin-top: 10%;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #333;
          z-index: 1002;
        }

        .slick-dots {
          bottom: 10px;
        }

        .slick-dots li button:before {
          font-size: 12px;
        }

        @media (max-width: 1024px) {
          .popup-content {
            width: 90%;
            padding: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .popup-content {
            width: 95%;
            padding: 0.5rem;
            max-height: 85vh;
          }

          .close-button {
            font-size: 1.75rem;
            right: 10px;
          }
        }

        @media (max-width: 480px) {
          .popup-content {
            width: 98%;
            padding: 0.25rem;
            max-height: 80vh;
          }

          .close-button {
            font-size: 1.5rem;
            top: 5px;
            right: 5px;
          }

          .slick-dots {
            bottom: 5px;
          }

          .slick-dots li button:before {
            font-size: 10px;
          }
          .slick-slide img {
           display: block;
           height: 300px !important
         }
         .popup-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 90%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(5px);
          /* margin-top: 10%; */
          padding: 50% 12% 0% 0%
        }
        }
      `}</style>
    </>
  );
};

const CustomArrow = ({ direction, onClick }) => (
  <button
    className={`custom-arrow ${direction}`}
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      [direction === "left" ? "left" : "right"]:
        direction === "left" ? "5px" : "5px",
      transform: "translateY(-50%)",
      zIndex: 1001,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      border: "none",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      cursor: "pointer",
      color: "#333",
      fontSize: "1.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    }}
    aria-label={direction === "left" ? "Previous" : "Next"}
  >
    {direction === "left" ? "←" : "→"}
  </button>
);

export default HeroImage;
