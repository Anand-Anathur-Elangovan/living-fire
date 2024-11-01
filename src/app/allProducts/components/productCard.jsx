"use client";

import React from "react";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import Image from "next/image";
import NoPriceIcon from "@/public/assets/allProducts/noprice.svg";
import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";

const ProductCard = (props) => {
  return (
    <div className="element" key={"productCard"}>
      <Image
        src={collectionImg2 ? collectionImg2 : CheckerBoardImg}
        alt={props.title}
        className="element-image"
        width={300} // specify your desired width
        height={600} // specify your desired height
      />
      <div className="py-2 gap-3">
        <h3 className="font-sans font-medium leading-6 text-base text-wrap">
          {props.title}
        </h3>
        <div className="flex flex-row justify-between mr-5">
          <span className="font-sans font-normal leading-5 text-sm">
            {props.description}
          </span>
          <div className="flex gap-1">
            <Image src={NoPriceIcon} alt="no Price" />
            <Image src={NoPriceIcon} alt="no Price" />
            <Image src={NoPriceIcon} alt="no Price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
