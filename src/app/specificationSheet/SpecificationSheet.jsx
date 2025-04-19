// // "use client";
// // import React, { useState, useEffect, useRef, useCallback } from "react";
// // import dynamic from "next/dynamic";
// // import Image from "next/image";
// // import fire from "@/public/assets/specificationSheet/image.png";
// // import searchIcon from "@/public/assets/specificationSheet/searchicon.svg";
// // import clearIcon from "@/public/assets/specificationSheet/clear.png";
// // import styles from "./SpecificationSheet.module.css";
// // import useMasterValues from "../allProducts/hooks/useMasterValues";
// // import useAllProducts from "../allProducts/hooks/useAllProducts";
// // import ProductSpecsDrawer from "@/src/helper/utils/component/productSpecsDrawer/ProductSpecsDrawer";

// // const FilterComponent = dynamic(
// //   () => import("./components/FilterComponent/FilterComponent"),
// //   { ssr: false } // Load dynamically to improve initial page load
// // );
// // export const metadata = {
// //   title: "Specification Sheet",
// //   description: "Find detailed specifications for all products available at Living Fire.",
// //   alternates: {
// //     canonical: "https://living-fire.vercel.app/specificationSheet",
// //   },
// // };
// // const SpecificationSheet = () => {
// //   const searchRef = useRef(null);
// //   const {
// //     brands,
// //     masterValues: {
// //       fuelTypes = [],
// //       productTypes: allProductMenu = [],
// //       glassOrientationTypes: glassOrientationTypes = [],
// //     },
// //   } = useMasterValues();

// //   const [productMenuIndex, setProductMenuIndex] = useState(1);
// //   const [fireplaceType, setFireplaceType] = useState(null);
// //   const [brandType, setBrandType] = useState(null);
// //   const [searchText, setSearchText] = useState("");
// //   const [searchTextTemp, setSearchTextTemp] = useState("");
// //   const [bestSelling, setBestSelling] = useState(false);
// //   const [subType, setSubType] = useState(null);
// //   const [rangeType, setRangeType] = useState(null);
// //   const [installationType, setInstallationType] = useState(null);
// //   const [glassOrientationType, setglassOrientationType] = useState(null);
// //   const [drawerData, setDrawerData] = useState({
// //     name: "",
// //     brand: "",
// //     id: "",
// //     details: [],
// //   });

// //   const { allProducts, isFetched } = useAllProducts(
// //     productMenuIndex,
// //     fireplaceType ?? 0,
// //     brandType ?? 0,
// //     bestSelling === false ? null : bestSelling,
// //     searchText,
// //     subType ?? 0,
// //     rangeType ?? 0,
// //     installationType ?? 0,
// //     glassOrientationType ?? 0
// //   );

// //   useEffect(() => {
// //     if (searchText !== "" && searchRef.current) {
// //       searchRef.current.value = searchText;
// //     }
// //   }, [searchText]);

// //   const toggleBrandSelection = (brand) => {
// //     setBrandType((prev) => (prev === brand?.brand_id ? null : brand?.brand_id));
// //   };
// //   const [isOpenSpecDrawer, setIsOpenSpecDrawer] = useState(false);

// //   const openDrawer = useCallback((name, brand, id, details) => {
// //     setDrawerData({
// //       name,
// //       brand,
// //       id,
// //       details,
// //     });
// //     setIsOpenSpecDrawer(true);
// //   }, []);
// //   const closeDrawer = () => setIsOpenSpecDrawer(false);
// //   return (
// //     <section>
// //       {/* Search Banner Section */}
// //       <div className={styles.searchBanner}>
// //         <div className={styles.column}>
// //           <div className={styles.searchByProduct}>
// //             <div className={styles.searchText}>
// //               <h3 className="searchby ui text size-h3">SEARCH BY PRODUCT</h3>
// //             </div>
// //             <div className={styles.searchContainer}>
// //               <input
// //                 type="text"
// //                 className={styles.searchInput}
// //                 placeholder="Search"
// //                 ref={searchRef}
// //                 value={searchTextTemp}
// //                 onChange={(e) =>
// //                   setSearchTextTemp(searchRef.current.value?.toLowerCase())
// //                 }
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") {
// //                     setSearchText(searchRef.current.value?.toLowerCase());
// //                   }
// //                 }}
// //                 aria-label="Search input for products"
// //               />
// //               {searchTextTemp && (
// //                 <Image
// //                   src={clearIcon}
// //                   alt="Clear Search Input"
// //                   width={20}
// //                   height={20}
// //                   className={styles.clearIcon}
// //                   onClick={() => {
// //                     setSearchTextTemp("");
// //                     setSearchText("");
// //                     searchRef.current.value = "";
// //                   }}
// //                   unoptimized
// //                 />
// //               )}
// //               <Image
// //                 src={searchIcon}
// //                 alt="Search Button"
// //                 width={40}
// //                 height={40}
// //                 className={styles.searchIcon}
// //                 onClick={() =>
// //                   setSearchText(searchRef.current.value?.toLowerCase())
// //                 }
// //                 unoptimized
// //               />
// //             </div>
// //           </div>
// //           <div className={styles.selectABrand}>
// //             <div className={styles.brandSelect}>
// //               <h3 className={styles.filter}>SELECT A BRAND</h3>
// //               <form
// //                 id="brand-selection-form"
// //                 className={styles.chipviewbrandse}
// //               >
// //                 {brands?.map((brand) => (
// //                   <label
// //                     key={brand?.brand_id}
// //                     tabIndex={0}
// //                     className={`${styles.brandSelector} ${
// //                       brandType === brand?.brand_id ? styles.selectedBrand : ""
// //                     }`}
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       name="selectedChipOptions"
// //                       value={brand?.brand_id}
// //                       hidden
// //                       onClick={() => toggleBrandSelection(brand)}
// //                       aria-label={`Filter by brand ${brand?.brand_name}`}
// //                     />
// //                     <span>{brand?.brand_name}</span>
// //                   </label>
// //                 ))}
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Filter Component */}
// //       <FilterComponent
// //         fuelTypes={fuelTypes}
// //         fireplaceType={fireplaceType}
// //         setFireplaceType={setFireplaceType}
// //         glassOrientationTypes={glassOrientationTypes}
// //         setglassOrientationType={setglassOrientationType}
// //       />

// //       {/* Product List Section */}
// //       <div className={styles.productsColumn}>
// //         <div className={styles.column}>
// //           {allProducts && allProducts.length > 0 ? (
// //             allProducts.map((product, index) => (
// //               <article key={index} className={styles.productSpecs}>
// //                 <Image
// //                   src={fire}
// //                   alt={product?.fn_get_products?.name ?? "No image available"}
// //                   width={156}
// //                   height={120}
// //                   className={styles.image}
// //                   unoptimized
// //                   loading="lazy" // Lazy loading for better performance
// //                 />
// //                 <div className={styles.columnProductName}>
// //                   <div className={styles.productDetails}>
// //                     <h4 className={styles.productName}>
// //                       {product?.fn_get_products?.name}
// //                     </h4>
// //                     <p className={styles.wood}>
// //                       {product?.fn_get_products?.brand_name}
// //                     </p>
// //                   </div>
// //                   <div className={styles.viewSpecification}>
// //                     <a
// //                       // href={`/product/${product?.fn_get_products?.p_id}`}
// //                       className={styles.viewSpecificationText}
// //                       aria-label={`View specifications for ${product?.fn_get_products?.name}`}
// //                       onClick={() =>
// //                         openDrawer(
// //                           product?.fn_get_products?.name,
// //                           product?.fn_get_products?.brand_name,
// //                           product?.fn_get_products?.p_id,
// //                           product?.fn_get_products?.product_details
// //                         )
// //                       }
// //                     >
// //                       View Specifications
// //                     </a>
// //                   </div>
// //                 </div>
// //               </article>
// //             ))
// //           ) : (
// //             <p>No products found</p>
// //           )}
// //           <ProductSpecsDrawer
// //             isOpen={isOpenSpecDrawer}
// //             closeDrawer={closeDrawer}
// //             openDrawer={openDrawer}
// //             name={drawerData?.name}
// //             brand_name={drawerData?.brand}
// //             selectedProductId={drawerData?.id}
// //             product_details={drawerData?.details}
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default SpecificationSheet;

// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import fire from "@/public/assets/specificationSheet/image.png";
// import searchIcon from "@/public/assets/specificationSheet/searchicon.svg";
// import clearIcon from "@/public/assets/specificationSheet/clear.png";
// import styles from "./SpecificationSheet.module.css";
// import useMasterValues from "../allProducts/hooks/useMasterValues";
// import useAllProducts from "../allProducts/hooks/useAllProducts";
// import ProductSpecsDrawer from "@/src/helper/utils/component/productSpecsDrawer/ProductSpecsDrawer";
// import { motion, AnimatePresence } from "framer-motion";

// const FilterComponent = dynamic(
//   () => import("./components/FilterComponent/FilterComponent"),
//   {
//     ssr: false,
//     loading: () => <div className={styles.filterSkeleton} />
//   }
// );

// const SpecificationSheet = () => {
//   const searchRef = useRef(null);
//   const {
//     brands,
//     masterValues: {
//       fuelTypes = [],
//       productTypes: allProductMenu = [],
//       glassOrientationTypes: glassOrientationTypes = [],
//     },
//   } = useMasterValues();

//   const [productMenuIndex, setProductMenuIndex] = useState(1);
//   const [fireplaceType, setFireplaceType] = useState(null);
//   const [brandType, setBrandType] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [searchTextTemp, setSearchTextTemp] = useState("");
//   const [bestSelling, setBestSelling] = useState(false);
//   const [subType, setSubType] = useState(null);
//   const [rangeType, setRangeType] = useState(null);
//   const [installationType, setInstallationType] = useState(null);
//   const [glassOrientationType, setglassOrientationType] = useState(null);
//   const [drawerData, setDrawerData] = useState({
//     name: "",
//     brand: "",
//     id: "",
//     details: [],
//   });
//   const [isMounted, setIsMounted] = useState(false);

//   const { allProducts, isFetched } = useAllProducts(
//     productMenuIndex,
//     fireplaceType ?? 0,
//     brandType ?? 0,
//     bestSelling === false ? null : bestSelling,
//     searchText,
//     subType ?? 0,
//     rangeType ?? 0,
//     installationType ?? 0,
//     glassOrientationType ?? 0
//   );

//   useEffect(() => {
//     setIsMounted(true);
//     if (searchText !== "" && searchRef.current) {
//       searchRef.current.value = searchText;
//     }
//   }, [searchText]);

//   const toggleBrandSelection = (brand) => {
//     setBrandType((prev) => (prev === brand?.brand_id ? null : brand?.brand_id));
//   };
//   const [isOpenSpecDrawer, setIsOpenSpecDrawer] = useState(false);

//   const openDrawer = useCallback((name, brand, id, details) => {
//     setDrawerData({
//       name,
//       brand,
//       id,
//       details,
//     });
//     setIsOpenSpecDrawer(true);
//   }, []);

//   const closeDrawer = () => setIsOpenSpecDrawer(false);

//   const productVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     })
//   };

//   return (
//     <section className={styles.specificationSheet}>
//       {/* Search Banner Section */}
//       <motion.div
//         className={styles.searchBanner}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className={styles.column}>
//           <motion.div
//             className={styles.searchByProduct}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <div className={styles.searchText}>
//               <h3 className="searchby ui text size-h3">SEARCH BY PRODUCT</h3>
//             </div>
//             <div className={styles.searchContainer}>
//               <input
//                 type="text"
//                 className={styles.searchInput}
//                 placeholder="Search"
//                 ref={searchRef}
//                 value={searchTextTemp}
//                 onChange={(e) =>
//                   setSearchTextTemp(searchRef.current.value?.toLowerCase())
//                 }
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     setSearchText(searchRef.current.value?.toLowerCase());
//                   }
//                 }}
//                 aria-label="Search input for products"
//               />
//               {searchTextTemp && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Image
//                     src={clearIcon}
//                     alt="Clear Search Input"
//                     width={20}
//                     height={20}
//                     className={styles.clearIcon}
//                     onClick={() => {
//                       setSearchTextTemp("");
//                       setSearchText("");
//                       if (searchRef.current) searchRef.current.value = "";
//                     }}
//                     unoptimized
//                     loading="lazy"
//                   />
//                 </motion.div>
//               )}
//               <Image
//                 src={searchIcon}
//                 alt="Search Button"
//                 width={40}
//                 height={40}
//                 className={styles.searchIcon}
//                 onClick={() =>
//                   setSearchText(searchRef.current.value?.toLowerCase())
//                 }
//                 unoptimized
//                 loading="lazy"
//               />
//             </div>
//           </motion.div>

//           <motion.div
//             className={styles.selectABrand}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//           >
//             <div className={styles.brandSelect}>
//               <h3 className={styles.filter}>SELECT A BRAND</h3>
//               <form
//                 id="brand-selection-form"
//                 className={styles.chipviewbrandse}
//               >
//                 {brands?.map((brand, index) => (
//                   <motion.label
//                     key={brand?.brand_id}
//                     tabIndex={0}
//                     className={`${styles.brandSelector} ${
//                       brandType === brand?.brand_id ? styles.selectedBrand : ""
//                     }`}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 + index * 0.05 }}
//                   >
//                     <input
//                       type="checkbox"
//                       name="selectedChipOptions"
//                       value={brand?.brand_id}
//                       hidden
//                       onClick={() => toggleBrandSelection(brand)}
//                       aria-label={`Filter by brand ${brand?.brand_name}`}
//                     />
//                     <span>{brand?.brand_name}</span>
//                   </motion.label>
//                 ))}
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Filter Component */}
//       {isMounted && (
//         <FilterComponent
//           fuelTypes={fuelTypes}
//           fireplaceType={fireplaceType}
//           setFireplaceType={setFireplaceType}
//           glassOrientationTypes={glassOrientationTypes}
//           setglassOrientationType={setglassOrientationType}
//         />
//       )}

//       {/* Product List Section */}
//       <div className={styles.productsColumn}>
//         <div className={styles.column}>
//           <AnimatePresence>
//             {allProducts && allProducts.length > 0 ? (
//               allProducts.map((product, index) => (
//                 <motion.article
//                   key={`${product?.fn_get_products?.p_id}-${index}`}
//                   className={styles.productSpecs}
//                   variants={productVariants}
//                   initial="hidden"
//                   animate="visible"
//                   custom={index % 10} // Stagger animation
//                   whileHover={{ y: -5 }}
//                   exit={{ opacity: 0 }}
//                   layout
//                 >
//                   <div className={styles.imageWrapper}>
//                     <Image
//                       src={fire}
//                       alt={product?.fn_get_products?.name ?? "No image available"}
//                       width={156}
//                       height={120}
//                       className={styles.image}
//                       unoptimized
//                       loading="lazy"
//                       placeholder="blur"
//                     />
//                   </div>
//                   <div className={styles.columnProductName}>
//                     <div className={styles.productDetails}>
//                       <h4 className={styles.productName}>
//                         {product?.fn_get_products?.name}
//                       </h4>
//                       <p className={styles.wood}>
//                         {product?.fn_get_products?.brand_name}
//                       </p>
//                     </div>
//                     <div className={styles.viewSpecification}>
//                       <motion.a
//                         className={styles.viewSpecificationText}
//                         aria-label={`View specifications for ${product?.fn_get_products?.name}`}
//                         onClick={() =>
//                           openDrawer(
//                             product?.fn_get_products?.name,
//                             product?.fn_get_products?.brand_name,
//                             product?.fn_get_products?.p_id,
//                             product?.fn_get_products?.product_details
//                           )
//                         }
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         View Specifications
//                       </motion.a>
//                     </div>
//                   </div>
//                 </motion.article>
//               ))
//             ) : (
//               <motion.div
//                 className={styles.noProducts}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <p>No products found</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <ProductSpecsDrawer
//             isOpen={isOpenSpecDrawer}
//             closeDrawer={closeDrawer}
//             openDrawer={openDrawer}
//             name={drawerData?.name}
//             brand_name={drawerData?.brand}
//             selectedProductId={drawerData?.id}
//             product_details={drawerData?.details}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SpecificationSheet;

"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import fire from "@/public/assets/specificationSheet/image.png";
import searchIcon from "@/public/assets/specificationSheet/searchicon.svg";
import clearIcon from "@/public/assets/specificationSheet/clear.png";
import styles from "./SpecificationSheet.module.css";
import useMasterValues from "../allProducts/hooks/useMasterValues";
import useAllProducts from "../allProducts/hooks/useAllProducts";
import ProductSpecsDrawer from "@/src/helper/utils/component/productSpecsDrawer/ProductSpecsDrawer";
import { motion, AnimatePresence } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

const FilterComponent = dynamic(
  () => import("./components/FilterComponent/FilterComponent"),
  {
    ssr: false,
    loading: () => <div className={styles.filterSkeleton} />,
  }
);

const ITEMS_PER_PAGE = 9;

const SpecificationSheet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const searchRef = useRef(null);
  const {
    brands,
    masterValues: {
      fuelTypes = [],
      productTypes: allProductMenu = [],
      glassOrientationTypes: glassOrientationTypes = [],
    },
  } = useMasterValues();

  const [productMenuIndex, setProductMenuIndex] = useState(1);
  const [fireplaceType, setFireplaceType] = useState(null);
  const [brandType, setBrandType] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [subType, setSubType] = useState(null);
  const [rangeType, setRangeType] = useState(null);
  const [installationType, setInstallationType] = useState(null);
  const [glassOrientationType, setglassOrientationType] = useState(null);
  const [drawerData, setDrawerData] = useState({
    name: "",
    brand: "",
    id: "",
    details: [],
  });
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { allProducts, isFetched } = useAllProducts(
    productMenuIndex,
    fireplaceType ?? 0,
    brandType ?? 0,
    bestSelling === false ? null : bestSelling,
    searchText,
    subType ?? 0,
    rangeType ?? 0,
    installationType ?? 0,
    glassOrientationType ?? 0
  );

  // Pagination logic
  const totalPages = Math.ceil((allProducts?.length || 0) / ITEMS_PER_PAGE);
  const paginatedProducts = allProducts?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setIsMounted(true);
    if (searchText !== "" && searchRef.current) {
      searchRef.current.value = searchText;
    }
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [
    searchText,
    fireplaceType,
    brandType,
    bestSelling,
    subType,
    rangeType,
    installationType,
    glassOrientationType,
  ]);

  const toggleBrandSelection = (brand) => {
    setBrandType((prev) => (prev === brand?.brand_id ? null : brand?.brand_id));
  };

  const [isOpenSpecDrawer, setIsOpenSpecDrawer] = useState(false);

  const openDrawer = useCallback((name, brand, id, details) => {
    setDrawerData({
      name,
      brand,
      id,
      details,
    });
    setIsOpenSpecDrawer(true);
  }, []);

  const closeDrawer = () => setIsOpenSpecDrawer(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);
  return (
    <section className={styles.specificationSheet}>
      {/* Search Banner Section */}
      {isLoading && (
        <div className={styles.loaderOverlay}>
          <CircularProgress color="inherit" style={{ color: "black" }} />
        </div>
      )}
      <motion.div
        className={styles.searchBanner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.column}>
          <motion.div
            className={styles.searchByProduct}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className={styles.searchText}>
              <h3 className="searchby ui text size-h3">SEARCH BY PRODUCT</h3>
            </div>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
                ref={searchRef}
                value={searchTextTemp}
                onChange={(e) =>
                  setSearchTextTemp(searchRef.current.value?.toLowerCase())
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchText(searchRef.current.value?.toLowerCase());
                  }
                }}
                aria-label="Search input for products"
              />
              {searchTextTemp && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={clearIcon}
                    alt="Clear Search Input"
                    width={20}
                    height={20}
                    className={styles.clearIcon}
                    onClick={() => {
                      setSearchTextTemp("");
                      setSearchText("");
                      if (searchRef.current) searchRef.current.value = "";
                    }}
                    unoptimized
                    loading="lazy"
                  />
                </motion.div>
              )}
              <Image
                src={searchIcon}
                alt="Search Button"
                width={40}
                height={40}
                className={styles.searchIcon}
                onClick={() =>
                  setSearchText(searchRef.current.value?.toLowerCase())
                }
                unoptimized
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.selectABrand}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={styles.brandSelect}>
              <h3 className={styles.filter}>SELECT A BRAND</h3>
              <form
                id="brand-selection-form"
                className={styles.chipviewbrandse}
              >
                {brands?.map((brand, index) => (
                  <motion.label
                    key={brand?.brand_id}
                    tabIndex={0}
                    className={`${styles.brandSelector} ${
                      brandType === brand?.brand_id ? styles.selectedBrand : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <input
                      type="checkbox"
                      name="selectedChipOptions"
                      value={brand?.brand_id}
                      hidden
                      onClick={() => toggleBrandSelection(brand)}
                      aria-label={`Filter by brand ${brand?.brand_name}`}
                    />
                    <span>{brand?.brand_name}</span>
                  </motion.label>
                ))}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Component */}
      {isMounted ? (
        <FilterComponent
          fuelTypes={fuelTypes}
          fireplaceType={fireplaceType}
          setFireplaceType={setFireplaceType}
          glassOrientationTypes={glassOrientationTypes}
          setglassOrientationType={setglassOrientationType}
        />
      ) : (
        <div className={styles.filterLoader}>
          <CircularProgress color="inherit" style={{ color: "black" }} />
        </div>
      )}

      {/* Product List Section */}
      <div className={styles.productsColumn}>
        {isLoading ? (
          <div className={styles.contentLoader}>
            <CircularProgress color="inherit" style={{ color: "black" }} />
          </div>
        ) : (
          <div className={styles.column}>
            <AnimatePresence>
              {paginatedProducts && paginatedProducts.length > 0 ? (
                <>
                  {paginatedProducts.map((product, index) => (
                    <motion.article
                      key={`${product?.fn_get_products?.p_id}-${index}`}
                      className={styles.productSpecs}
                      variants={productVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index % 10}
                      whileHover={{ y: -5 }}
                      exit={{ opacity: 0 }}
                      layout
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={fire}
                          alt={
                            product?.fn_get_products?.name ??
                            "No image available"
                          }
                          width={120}
                          height={120}
                          className={styles.image}
                          unoptimized
                          loading="lazy"
                          placeholder="blur"
                        />
                      </div>
                      <div className={styles.columnProductName}>
                        <div className={styles.productDetails}>
                          <h4 className={styles.productName}>
                            {product?.fn_get_products?.name}
                          </h4>
                          <p className={styles.wood}>
                            {product?.fn_get_products?.brand_name}
                          </p>
                        </div>
                        <div className={styles.viewSpecification}>
                          <motion.a
                            className={styles.viewSpecificationText}
                            aria-label={`View specifications for ${product?.fn_get_products?.name}`}
                            onClick={() =>
                              openDrawer(
                                product?.fn_get_products?.name,
                                product?.fn_get_products?.brand_name,
                                product?.fn_get_products?.p_id,
                                product?.fn_get_products?.product_details
                              )
                            }
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Specifications
                          </motion.a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </>
              ) : (
                <motion.div
                  className={styles.noProducts}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>No products found</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`${styles.paginationButton} ${
                        currentPage === page ? styles.activePage : ""
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            )}

            <ProductSpecsDrawer
              isOpen={isOpenSpecDrawer}
              closeDrawer={closeDrawer}
              openDrawer={openDrawer}
              name={drawerData?.name}
              brand_name={drawerData?.brand}
              selectedProductId={drawerData?.id}
              product_details={drawerData?.details}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecificationSheet;
