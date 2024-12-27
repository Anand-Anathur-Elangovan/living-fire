"use client";

import React, { useMemo } from "react";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import Image from "next/image";
import NoPriceIcon from "@/public/assets/allProducts/noprice.svg";
import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { setCookie } from "cookies-next";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";
import GFi750 from "@/public/assets/allProducts/GFi750.jpg";
import BELLERIVE from "@/public/assets/allProducts/BELLERIVE.jpg";

const ProductCard = ({
  productDetails: { fn_get_products },
  addToCompare,
  isCompare,
}) => {
  const router = useRouter();
  console.log("fn_get_products", fn_get_products);
  const { setNavigationState } = useNavigationState();
  const downloadsData = Array.isArray(fn_get_products?.product_details)
    ? fn_get_products?.product_details?.filter(
        (productDetail) => productDetail?.name?.toLowerCase() === "downloads"
      )?.[0]?.value
    : undefined;
  const imageURL = useMemo(() => {
    if (
      fn_get_products?.catalogue_image &&
      fn_get_products?.catalogue_image?.length > 0
    ) {
      if (fn_get_products?.catalogue_image[0]?.value?.includes("http"))
        return fn_get_products.catalogue_image[0].value;
    } else if (fn_get_products?.hero_image) {
      if (fn_get_products?.hero_image[0]?.value?.includes("http"))
        return fn_get_products.hero_image[0].value;
    }
    return null;
  });

  const brochureURL = useMemo(() => {
    // if (fn_get_products?.brochure) {
    //   if (fn_get_products?.brochure[0]?.value?.includes("http"))
    //     return fn_get_products.brochure[0].value;
    // }
    if (downloadsData?.length > 0) {
      const download = downloadsData.find(
        (download) => download?.name?.toLowerCase() === "brochure"
      );
      return download?.fileurl?.includes("http")
        ? transformImageSrc(download?.fileurl)
        : null;
    }
    return null;
  });

  const pricebookURL = useMemo(() => {
    // if (fn_get_products?.pricebook) {
    //   if (fn_get_products?.pricebook[0]?.value?.includes("http"))
    //     return fn_get_products.pricebook[0].value;
    // }
    if (downloadsData?.length > 0) {
      const download = downloadsData.find(
        (download) => download?.name?.toLowerCase() === "manual"
      );
      return download?.fileurl?.includes("http")
        ? transformImageSrc(download?.fileurl)
        : null;
    }
    return null;
  });

  const specSheetURL = useMemo(() => {
    // if (fn_get_products?.spec_sheet) {
    //   if (fn_get_products?.spec_sheet[0]?.value?.includes("http"))
    //     return fn_get_products.spec_sheet[0].value;
    // }
    if (downloadsData?.length > 0) {
      const download = downloadsData.find(
        (download) => download?.name?.toLowerCase() === "spec sheet"
      );
      return download?.fileurl?.includes("http")
        ? transformImageSrc(download?.fileurl)
        : null;
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
    <div
      className="product-element-all-product w-40 md:w-[300px]"
      key={"productCard"}
    >
      <div className="relative w-40 h-48 md:w-[300px] md:h-[380px]">
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
          src={
            fn_get_products?.p_id == "424"
              ? GFi750
              : fn_get_products?.p_id == "423"
              ? BELLERIVE
              : imageURL
              ? transformImageSrc(imageURL)
              : CheckerBoardImg
          }
          alt={fn_get_products.p_name ?? ""} //productDetails.fn_get_products.p_name
          className="element-image cursor-pointer object-fill"
          // width={300}
          // height={380}
          objectFit="cover"
          layout="fill"
          onClick={() => handleProductClick(fn_get_products?.p_id)}
          unoptimized
        />
      </div>
      <div className="py-2 gap-3">
        <span
          className="font-sans md:font-medium font-normal text-sm md:text-base text-wrap cursor-pointer text-black" ///leading-5 md:leading-6
          onClick={() => handleProductClick(fn_get_products?.p_id)}
        >
          {fn_get_products.p_name ||
            fn_get_products?.name ||
            fn_get_products?.p_sku}
        </span>
        <div className="flex flex-col md:flex-row justify-between mr-5 gap-2 md:gap-0">
          <span
            className="font-sans font-normal leading-5 text-sm cursor-pointer text-[#94999F]"
            onClick={() => handleProductClick(fn_get_products?.p_id)}
          >
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
                    <Image
                      src={NoPriceIcon}
                      alt="Brochure"
                      unoptimized
                      className="w-3.5 h-4 md:w-full md:h-full"
                    />
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
                      Download Manual Book
                    </span>
                    <Image
                      src={NoPriceIcon}
                      alt="Manual Book"
                      className="w-3.5 h-4 md:w-full md:h-full"
                      unoptimized
                    />
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
                    <Image
                      src={NoPriceIcon}
                      alt="Spec Sheet"
                      className="w-3.5 h-4 md:w-full md:h-full"
                      unoptimized
                    />
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
