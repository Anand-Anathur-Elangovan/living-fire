"use client";
import React, { useState, useEffect } from "react";
// import "./collections.css"; // Add your styles here
import collectionImg1 from "@/app/assets/homePage/collections/collectionsImg1.svg";
import collectionImg2 from "@/app/assets/homePage/collections/collectionsImg2.svg";
import collectionImg3 from "@/app/assets/homePage/collections/collectionsImg3.svg";
import collectionImg4 from "@/app/assets/homePage/collections/collectionsImg4.svg";
import RightArrow from "@/app/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/app/assets/homePage/collections/arrow-left.svg";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
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

  // console.log("imageUrl", imageUrl);
  // Dummy data for images and descriptions
  const carouselItems = imageUrl && [
    {
      image: imageUrl,
      title: "Electric Fireplaces",
      description:
        "Discover our range of luxury indoor electric fireplaces and transform your home into a cosy haven of warmth and style. Visit our Melbourne showroom.",
    },
    {
      image: collectionImg2,
      title: "Gas Fireplaces",
      description:
        "Explore our indoor gas fireplaces and turn your home into a warm and inviting retreat. Whatever your interior style, we have the perfect gas fireplace to enhance your living space.",
    },
    {
      image: collectionImg3,
      title: "Wood Fireplaces",
      description:
        "Experience warmth and elegance with our indoor luxury wood fireplaces, blending timeless craftsmanship with contemporary modern design.",
    },
    {
      image: collectionImg4,
      title: "LPG Fireplaces",
      description:
        "Explore our collection of LPG fireplaces, offering efficient and stylish heating solutions for your home. Enjoy the warmth and ambiance of a real flame, with the convenience and clean-burning performance of LPG. ",
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
  return (
    <div className="flex relative justify-center flex-col">
      <div className="flex flex-row items-center w-full">
        <div className="heading1 flex w-full justify-center uppercase">
          Collections
        </div>
        <div className="flex flex-row items-center gap-2 absolute right-5">
          <Image src={RightArrow} alt="Right Arrow" />
          <Image src={LeftArrow} alt="Left Arrow" />
        </div>
      </div>

      <div className="grid grid-flow-col auto-cols-[23%] gap-1 overflow-x-auto overscroll-x-contain element-snaps">
        {/*carousel*/}
        {/*grid grid-flow-col auto-cols-[23%] gap-1 overflow-x-auto overscroll-x-contain element-snaps */}
        {imageUrl &&
          carouselItems.map((item, index) => (
            <div className="element" key={index}>
              <Image
                src={item.image}
                alt={item.title}
                className="element-image"
                width={300} // specify your desired width
                height={600} // specify your desired height
                //   layout="fill" // or any other layout you need
              />
              <div className="overlay">
                <h3 className="font-sans font-medium leading-6 text-base text-wrap">
                  {item.title}
                </h3>
                <p className="font-sans font-normal leading-5 text-sm">
                  {item.description}
                </p>
                <a
                  className="uppercase font-medium font-sans text-base underline"
                  href="#"
                >
                  View Collection
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Collections;
