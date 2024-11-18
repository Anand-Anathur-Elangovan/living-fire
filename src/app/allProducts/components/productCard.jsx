"use client";

import React, { useMemo } from "react";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import Image from "next/image";
import NoPriceIcon from "@/public/assets/allProducts/noprice.svg";
import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { setCookie } from "cookies-next";

const ProductCard = ({
  productDetails: { fn_get_products },
  addToCompare,
  isCompare,
}) => {
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  // console.log(productDetails);
  const imageURL = useMemo(() => {
    if (fn_get_products.hero_image) {
      if (fn_get_products.hero_image[0].value.includes("http"))
        return fn_get_products.hero_image[0].value;
    }
    return null;
  });

  const brochureURL = useMemo(() => {
    if (fn_get_products.brochure) {
      if (fn_get_products.brochure[0].value.includes("http"))
        return fn_get_products.brochure[0].value;
    }
    return null;
  });

  const pricebookURL = useMemo(() => {
    if (fn_get_products.pricebook) {
      if (fn_get_products.pricebook[0].value.includes("http"))
        return fn_get_products.pricebook[0].value;
    }
    return null;
  });

  const specSheetURL = useMemo(() => {
    if (fn_get_products.spec_sheet) {
      if (fn_get_products.spec_sheet[0].value.includes("http"))
        return fn_get_products.spec_sheet[0].value;
    }
    return null;
  });

  const handleProductClick = (productId) => {
    // setNavigationState({ productId });
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
    <div className="product-element" key={"productCard"}>
      <div className="relative" style={{ width: "300px", height: "300px" }}>
        {isCompare && (
          <div className="absolute z-10 right-0 mr-3 mt-5">
            <input
              type="checkbox"
              id="checkbox"
              className="h-5 w-5 rounded-lg appearance-auto checked:bg-black"
              onChange={(e) =>
                addToCompare(fn_get_products.p_id, e.target.checked)
              }
            />
          </div>
        )}
        <Image
          src={imageURL ? imageURL : CheckerBoardImg}
          alt={fn_get_products.p_name ?? ""} //productDetails.fn_get_products.p_name
          className="element-image cursor-pointer"
          width={300} // specify your desired width
          height={600} // specify your desired height
          onClick={() => handleProductClick(fn_get_products?.p_id)}
        />
      </div>
      <div className="py-2 gap-3">
        <h3 className="font-sans font-medium leading-6 text-base text-wrap cursor-pointer">
          {fn_get_products.p_name || fn_get_products?.name || fn_get_products?.p_sku}
        </h3>
        <div className="flex flex-row justify-between mr-5">
          <span className="font-sans font-normal leading-5 text-sm cursor-pointer">
            {fn_get_products?.brand_name}
          </span>
          <div className="flex gap-1">
            {false ? (
              <>{fn_get_products?.price}</>
            ) : (
              <>
                {brochureURL && (
                  <a
                    href={brochureURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tooltip"
                  >
                    <span className="tooltiptext font-sans font-light leading-6 text-base text-wrap text-xs">
                      Download brochure
                    </span>
                    <Image src={NoPriceIcon} alt="Brochure" />
                  </a>
                )}
                {pricebookURL && (
                  <a
                    href={pricebookURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tooltip"
                  >
                    <span className="tooltiptext font-sans font-light leading-6 text-base text-wrap text-xs">
                      Download Price Book
                    </span>
                    <Image src={NoPriceIcon} alt="Price Book" />
                  </a>
                )}
                {specSheetURL && (
                  <a
                    href={specSheetURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tooltip"
                  >
                    <span className="tooltiptext font-sans font-light leading-6 text-base text-wrap text-xs">
                      Download Spec Sheet
                    </span>
                    <Image src={NoPriceIcon} alt="Spec Sheet" />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

//// let heroimage;
// try {
//   heroimage = JSON.parse(
//     productDetails.fn_get_products.hero_image?.replace(/'/g, '"')
//   );
// } catch {
//   heroimage = null;
// }
// return heroimage && heroimage.length > 0
//   ? heroimage[0].value?.includes("http")
//     ? heroimage[0]?.value
//     : null
//   : null;
