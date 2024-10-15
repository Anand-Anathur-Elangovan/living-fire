/* eslint-disable react/prop-types */
"use client";
import React, { useState, useEffect } from "react";
import "./collections.css"; // Add your styles here
import collectionImg1 from "../../../assets/homePage/collections/collectionsImg1.svg";
import collectionImg2 from "../../../assets/homePage/collections/collectionsImg2.svg";
import collectionImg3 from "../../../assets/homePage/collections/collectionsImg3.svg";
import collectionImg4 from "../../../assets/homePage/collections/collectionsImg4.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Collections = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchImageUrl() {
      const response = await fetch("/api/s3Url", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setImageUrl(data.url);
    }

    fetchImageUrl();
  }, []);

  console.log("imageUrl", imageUrl);
  // Dummy data for images and descriptions
  const carouselItems = imageUrl && [
    {
      image: imageUrl,
      title: "Electric Fireplaces",
      description: "Discover our range of luxury indoor electric fireplaces...",
    },
    {
      image: collectionImg2,
      title: "Gas Fireplaces",
      description: "Transform your home with modern gas fireplaces...",
    },
    {
      image: collectionImg3,
      title: "Wood Fireplaces",
      description:
        "Enjoy the warmth and beauty of traditional wood fireplaces...",
    },
    {
      image: collectionImg4,
      title: "Wood Fireplaces",
      description:
        "Enjoy the warmth and beauty of traditional wood fireplaces...",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="carousel-container">
      <h2>Collections</h2>
      {imageUrl && (
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div
              className="carousel-item"
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div className="image-and-description">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="carousel-image"
                  width={100} // specify your desired width
                  height={600} // specify your desired height
                  layout="responsive" // or any other layout you need
                />
                <div
                  className={`description-container ${
                    hoverIndex === index ? "visible" : ""
                  }`}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#">View Collection</a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

// Custom next arrow component
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "-25px",
        backgroundColor: "black",
      }} // Add custom styling if needed
      onClick={onClick}
    >
      ➡️ {/* Add actual arrow icon here */}
    </div>
  );
};

// Custom previous arrow component
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "-25px",
        backgroundColor: "black",
      }} // Add custom styling if needed
      onClick={onClick}
    >
      ⬅️ {/* Add actual arrow icon here */}
    </div>
  );
};

export default Collections;
