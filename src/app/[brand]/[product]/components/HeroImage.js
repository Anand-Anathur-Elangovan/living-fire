"use client";
import "../product.css";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
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

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="hero-slider">
        <Slider className="product-hero-image" {...settings}>
          {images?.map((imageSrc, index) => (
            <div
              key={index}
              className="slider-image"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={
                  imageSrc?.value !== "TBC"
                    ? transformImageSrc(imageSrc?.value)
                    : ""
                }
                alt={`${alt} ${index + 1}`}
                className="class-hero-image-size"
                layout="responsive"
                width={700}
                height={600}
                unoptimized
              />
            </div>
          ))}
        </Slider>
      </div>

      {isPopupOpen && (
        <div className="popup-carousel">
          <div className="popup-overlay" onClick={handleClosePopup}></div>
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <Slider
              {...settings}
              initialSlide={currentImageIndex}
              nextArrow={<CustomArrow direction="right" />}
              prevArrow={<CustomArrow direction="left" />}
            >
              {images?.map((imageSrc, index) => (
                <div key={index} className="popup-slider-image">
                  <Image
                    src={
                      imageSrc?.value !== "TBC"
                        ? transformImageSrc(imageSrc?.value)
                        : ""
                    }
                    alt={`${alt} ${index + 1}`}
                    layout="responsive"
                    width={"100%"}
                    height={"600px"}
                    style={{ minHeight: "600px", height: "600px" }}
                    unoptimized
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <style jsx>{`
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
          background: rgba(0, 0, 0, 0.7);
        }
        .popup-content {
          position: relative;
          background: white;
          padding: 2rem; /* Increased padding */
          border-radius: 8px;
          max-width: 100%;
          max-height: 100%;
          overflow: hidden;
        }
        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 2rem; /* Enlarged close icon */
          cursor: pointer;
          color: #333;
        }
        .slick-arrow {
          z-index: 1001; /* Ensures visibility inside popup */
        }
        .slick-prev,
        .slick-next {
          width: 50px;
          height: 50px;
        }
        .slick-prev:before,
        .slick-next:before {
          font-size: 2rem;
          color: #333; /* Arrow color */
        }
        .slick-slide img {
          display: block;
          height: 600px !important;
        }
      `}</style>
    </>
  );
};

// Custom Arrow Component for Next/Previous Arrows
const CustomArrow = ({ direction, onClick }) => {
  return (
    <button
      className={`custom-arrow ${direction}`}
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        [direction === "left" ? "left" : "right"]: "10px",
        transform: "translateY(-50%)",
        zIndex: 1001,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    >
      {direction === "left" ? "<" : ">"}
    </button>
  );
};

export default HeroImage;
