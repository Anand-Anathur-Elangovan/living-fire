"use client";

import React, { useMemo } from "react";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import Image from "next/image";
import NoPriceIcon from "@/public/assets/allProducts/noprice.svg";
import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";

const ProductCard = ({ productDetails, addToCompare, isCompare }) => {
  console.log(productDetails);
  const imageURL = useMemo(() => {
    if (productDetails.fn_get_products.hero_image) {
      let heroimage;
      try {
        heroimage = JSON.parse(
          productDetails.fn_get_products.hero_image?.replace(/'/g, '"')
        );
      } catch {
        heroimage = null;
      }
      return heroimage && heroimage.length > 0
        ? heroimage[0].value?.includes("http")
          ? heroimage[0]?.value
          : null
        : null;
    }
    return null;
  });
  // console.log(imageURL, "imageURL");

  return (
    <div className="product-element" key={"productCard"}>
      <div className="relative" style={{ width: "300px", height: "300px" }}>
        {isCompare && (
          <div className="absolute z-10 right-0 mr-3 mt-5">
            <input
              type="checkbox"
              id="checkbox"
              className="h-5 w-5 rounded-lg appearance-auto checked:bg-black"
              onChange={(e) =>
                addToCompare(
                  productDetails.fn_get_products.p_id,
                  e.target.checked
                )
              }
            />
          </div>
        )}
        <Image
          src={imageURL ? imageURL : CheckerBoardImg}
          alt={productDetails.fn_get_products.p_name} //productDetails.fn_get_products.p_name
          className="element-image"
          width={300} // specify your desired width
          height={600} // specify your desired height
        />
      </div>
      <div className="py-2 gap-3 ">
        <h3 className="font-sans font-medium leading-6 text-base text-wrap">
          {productDetails.fn_get_products.p_name}
        </h3>
        <div className="flex flex-row justify-between mr-5">
          <span className="font-sans font-normal leading-5 text-sm">
            {productDetails?.fn_get_products?.brand_name}
          </span>
          <div className="flex gap-1">
            {false ? (
              <>{productDetails?.fn_get_products?.price}</>
            ) : (
              <>
                <Image src={NoPriceIcon} alt="no Price" />
                <Image src={NoPriceIcon} alt="no Price" />
                <Image src={NoPriceIcon} alt="no Price" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
