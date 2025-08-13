// "use client";

// import React, { useMemo } from "react";
// import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
// import Image from "next/image";
// import NoPriceIcon from "@/public/assets/allProducts/noprice.svg";
// import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
// import { useRouter } from "next/navigation";
// import { useNavigationState } from "@/context/NavigationContext";
// import { setCookie } from "cookies-next";
// import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";
// import GFi750 from "@/public/assets/allProducts/GFi750.jpg";
// import BELLERIVE from "@/public/assets/allProducts/BELLERIVE.jpg";
// import { generateSlug } from "@/src/helper/slug/slug";
// import Link from "next/link";

// const ProductCard = ({
//   productDetails: { fn_get_products },
//   addToCompare,
//   isCompare,
// }) => {
//   const router = useRouter();
//   const { setNavigationState } = useNavigationState();

//   // Generate product and brand slugs
//   const productSlug = generateSlug(fn_get_products?.name || fn_get_products?.p_name || fn_get_products?.p_sku);
//   const brandSlug = generateSlug(fn_get_products?.brand_name);
//   const productUrl = `/${brandSlug}/${productSlug}`;

//   // Handle product click with proper cookie settings
//   const handleProductClick = (e, productName, brandName) => {
//     // Allow default behavior for special clicks (right-click, ctrl+click, etc.)
//     if (e.ctrlKey || e.metaKey || e.button !== 0) {
//       return;
//     }

//     e.preventDefault();
    
//     const formattedProductName = productName.replace(/\s+/g, "_");
//     const formattedBrandName = brandName.replace(/\s+/g, "_");

//     setCookie("selectedProduct", formattedProductName, {
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 60 * 60 * 24, // 1 day
//     });

//     setCookie("selectedBrand", formattedBrandName, {
//       path: "/",
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 60 * 60 * 24, // 1 day
//     });

//     router.push(productUrl);
//   };

//   // Memoized download URLs
//   const downloadsData = Array.isArray(fn_get_products?.product_details)
//     ? fn_get_products?.product_details?.filter(
//         (productDetail) => productDetail?.name?.toLowerCase() === "downloads"
//       )?.[0]?.value
//     : undefined;

//   const imageURL = useMemo(() => {
//     if (fn_get_products?.catalogue_image?.length > 0) {
//       if (fn_get_products?.catalogue_image[0]?.value?.includes("http"))
//         return fn_get_products.catalogue_image[0].value;
//     } else if (fn_get_products?.hero_image?.length > 0) {
//       if (fn_get_products?.hero_image[0]?.value?.includes("http"))
//         return fn_get_products.hero_image[0].value;
//     }
//     return null;
//   }, [fn_get_products]);

//   const brochureURL = useMemo(() => {
//     if (downloadsData?.length > 0) {
//       const download = downloadsData.find(
//         (download) => download?.name?.toLowerCase() === "brochure"
//       );
//       return download?.fileurl?.includes("http")
//         ? transformImageSrc(download?.fileurl)
//         : null;
//     }
//     return null;
//   }, [downloadsData]);

//   const pricebookURL = useMemo(() => {
//     if (downloadsData?.length > 0) {
//       const download = downloadsData.find(
//         (download) => download?.name?.toLowerCase() === "manual"
//       );
//       return download?.fileurl?.includes("http")
//         ? transformImageSrc(download?.fileurl)
//         : null;
//     }
//     return null;
//   }, [downloadsData]);

//   const specSheetURL = useMemo(() => {
//     if (downloadsData?.length > 0) {
//       const download = downloadsData.find(
//         (download) => download?.name?.toLowerCase() === "spec sheet"
//       );
//       return download?.fileurl?.includes("http")
//         ? transformImageSrc(download?.fileurl)
//         : null;
//     }
//     return null;
//   }, [downloadsData]);

//   return (
//     <div className="product-element-all-product w-40 md:w-[280px]" key="productCard">
//       <div className="relative w-40 h-48 md:w-[280px] md:h-[380px]">
//         {isCompare && (
//           <div className="absolute z-10 right-0 mr-3 mt-5">
//             <input
//               type="checkbox"
//               id="checkbox"
//               className="h-5 w-5 rounded-lg appearance-auto checked:bg-black"
//               onChange={(e) =>
//                 addToCompare(fn_get_products.p_id, e.target.checked)
//               }
//             />
//           </div>
//         )}

//         <Link href={productUrl} passHref>
//           <Image
//             src={
//               fn_get_products?.p_id == "424"
//                 ? GFi750
//                 : fn_get_products?.p_id == "423"
//                 ? BELLERIVE
//                 : imageURL
//                 ? transformImageSrc(imageURL)
//                 : CheckerBoardImg
//             }
//             alt={fn_get_products.p_name ?? ""}
//             className="element-image cursor-pointer object-fill"
//             fill
//             onClick={(e) => handleProductClick(e, fn_get_products?.name, fn_get_products?.brand_name)}
//             unoptimized
//           />
//         </Link>
//       </div>
//       <div className="py-2 gap-3">
//         <Link href={productUrl} passHref>
//           <span
//             className=" md:font-semibold font-normal text-sm md:text-base text-wrap cursor-pointer text-black"
//             onClick={(e) => handleProductClick(e, fn_get_products?.name, fn_get_products?.brand_name)}
//           >
//             {fn_get_products.p_name || fn_get_products?.name || fn_get_products?.p_sku}
//           </span>
//         </Link>
//         <div className="flex flex-col md:flex-row justify-between mr-5 gap-2 md:gap-0">
//           <Link href={productUrl} passHref>
//             <span
//               className=" font-normal leading-5 text-sm cursor-pointer text-[#94999F]"
//               onClick={(e) => handleProductClick(e, fn_get_products?.name, fn_get_products?.brand_name)}
//             >
//               {fn_get_products?.brand_name}
//             </span>
//           </Link>
//           <div className="flex gap-1">
//             {false ? (
//               <>{fn_get_products?.price}</>
//             ) : (
//               <>
//                 {brochureURL && (
//                   <a
//                     href={brochureURL}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="tooltip"
//                   >
//                     <span className="tooltiptext  font-light leading-6 text-base text-wrap text-xs">
//                       Download brochure
//                     </span>
//                     <Image
//                       src={NoPriceIcon}
//                       alt="Brochure"
//                       unoptimized
//                       className="w-3.5 h-4 md:w-full md:h-full"
//                     />
//                   </a>
//                 )}
//                 {pricebookURL && (
//                   <a
//                     href={pricebookURL}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="tooltip"
//                   >
//                     <span className="tooltiptext  font-light leading-6 text-base text-wrap text-xs">
//                       Download Manual Book
//                     </span>
//                     <Image
//                       src={NoPriceIcon}
//                       alt="Manual Book"
//                       className="w-3.5 h-4 md:w-full md:h-full"
//                       unoptimized
//                     />
//                   </a>
//                 )}
//                 {specSheetURL && (
//                   <a
//                     href={specSheetURL}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="tooltip"
//                   >
//                     <span className="tooltiptext  font-light leading-6 text-base text-wrap text-xs">
//                       Download Spec Sheet
//                     </span>
//                     <Image
//                       src={NoPriceIcon}
//                       alt="Spec Sheet"
//                       className="w-3.5 h-4 md:w-full md:h-full"
//                       unoptimized
//                     />
//                   </a>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

"use client";

import React, { useMemo, useState } from "react";
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
import { generateSlug } from "@/src/helper/slug/slug";
import Link from "next/link";

const ProductCard = ({
  productDetails: { fn_get_products },
  addToCompare,
  isCompare,
}) => {
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate product and brand slugs
  const productSlug = generateSlug(fn_get_products?.name || fn_get_products?.p_name || fn_get_products?.p_sku);
  const brandSlug = generateSlug(fn_get_products?.brand_name);
  const productUrl = `/${brandSlug}/${productSlug}`;

  // Handle product click with proper cookie settings
  const handleProductClick = (e, productName, brandName) => {
    // Allow default behavior for special clicks (right-click, ctrl+click, etc.)
    if (e.ctrlKey || e.metaKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    
    const formattedProductName = productName.replace(/\s+/g, "_");
    const formattedBrandName = brandName.replace(/\s+/g, "_");

    setCookie("selectedProduct", formattedProductName, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    setCookie("selectedBrand", formattedBrandName, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });

    router.push(productUrl);
  };

  // Memoized download URLs
  const downloadsData = Array.isArray(fn_get_products?.product_details)
    ? fn_get_products?.product_details?.filter(
        (productDetail) => productDetail?.name?.toLowerCase() === "downloads"
      )?.[0]?.value
    : undefined;

  const imageURL = useMemo(() => {
    if (fn_get_products?.catalogue_image?.length > 0) {
      if (fn_get_products?.catalogue_image[0]?.value?.includes("http"))
        return fn_get_products.catalogue_image[0].value;
    } else if (fn_get_products?.hero_image?.length > 0) {
      if (fn_get_products?.hero_image[0]?.value?.includes("http"))
        return fn_get_products.hero_image[0].value;
    }
    return null;
  }, [fn_get_products]);

  const brochureURL = useMemo(() => {
    if (downloadsData?.length > 0) {
      const download = downloadsData.find(
        (download) => download?.name?.toLowerCase() === "brochure"
      );
      return download?.fileurl?.includes("http")
        ? transformImageSrc(download?.fileurl)
        : null;
    }
    return null;
  }, [downloadsData]);

  const pricebookURL = useMemo(() => {
    if (downloadsData?.length > 0) {
      const download = downloadsData.find(
        (download) => download?.name?.toLowerCase() === "manual"
      );
      return download?.fileurl?.includes("http")
        ? transformImageSrc(download?.fileurl)
        : null;
    }
    return null;
  }, [downloadsData]);

  const specSheetURL = useMemo(() => {
    if (downloadsData?.length > 0) {
      const download = downloadsData.find(
        (download) => download?.name?.toLowerCase() === "spec sheet"
      );
      return download?.fileurl?.includes("http")
        ? transformImageSrc(download?.fileurl)
        : null;
    }
    return null;
  }, [downloadsData]);

  return (
    <div className="product-element-all-product w-40 md:w-[280px]" key="productCard">
      <div className="relative w-40 h-48 md:w-[280px] md:h-[380px]">
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

        <Link href={productUrl} passHref>
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
            alt={fn_get_products.p_name ?? ""}
            className={`element-image cursor-pointer object-fill transition-all duration-500 ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'} hover:scale-105`}
            fill
            onClick={(e) => handleProductClick(e, fn_get_products?.name, fn_get_products?.brand_name)}
            loading="lazy"
            onLoadingComplete={() => setImageLoaded(true)}
            unoptimized
          />
        </Link>
      </div>
      <div className="py-2 gap-3">
        <Link href={productUrl} passHref>
          <span
            className=" md:font-semibold font-normal text-sm md:text-base text-wrap cursor-pointer text-black"
            onClick={(e) => handleProductClick(e, fn_get_products?.name, fn_get_products?.brand_name)}
          >
            {fn_get_products.p_name || fn_get_products?.name || fn_get_products?.p_sku}
          </span>
        </Link>
        <div className="flex flex-col md:flex-row justify-between mr-5 gap-2 md:gap-0">
          <Link href={productUrl} passHref>
            <span
              className=" font-normal leading-5 text-sm cursor-pointer text-[#94999F]"
              onClick={(e) => handleProductClick(e, fn_get_products?.name, fn_get_products?.brand_name)}
            >
              {fn_get_products?.brand_name}
            </span>
          </Link>
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
                    <span className="tooltiptext  font-light leading-6 text-base text-wrap text-xs">
                      Download brochure
                    </span>
                    <Image
                      src={NoPriceIcon}
                      alt="Brochure"
                      unoptimized
                      className="w-3.5 h-4 md:w-full md:h-full"
                      loading="lazy"
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
                    <span className="tooltiptext  font-light leading-6 text-base text-wrap text-xs">
                      Download Manual Book
                    </span>
                    <Image
                      src={NoPriceIcon}
                      alt="Manual Book"
                      className="w-3.5 h-4 md:w-full md:h-full"
                      unoptimized
                      loading="lazy"
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
                    <span className="tooltiptext  font-light leading-6 text-base text-wrap text-xs">
                      Download Spec Sheet
                    </span>
                    <Image
                      src={NoPriceIcon}
                      alt="Spec Sheet"
                      className="w-3.5 h-4 md:w-full md:h-full"
                      unoptimized
                      loading="lazy"
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