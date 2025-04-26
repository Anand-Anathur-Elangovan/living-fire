// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import LogoIcon from "@/public/assets/menu/logoblack.svg";
// import Image from "next/image";
// import "./Menu.css";
// import useMasterValues from "../allProducts/hooks/useMasterValues";
// import SearchIcon from "@/public/assets/allProducts/searchIcon.svg";
// import useAllProducts from "../allProducts/hooks/useAllProducts";
// import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
// import { useNavigationState } from "@/context/NavigationContext";
// import { setCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
// import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

// const Menu = ({ searchTextHeader, setShowMenu, isFocus }) => {
//   const { setNavigationState } = useNavigationState();
//   const router = useRouter();
//   const [searchText, setSearchText] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const searchRef = useRef(null);
//   const {
//     brands,
//     masterValues: { fuelTypes, productTypes: allProductMenu },
//   } = useMasterValues();

//   const { allProducts, isFetched, isFetchedAfterMount } = useAllProducts(
//     0,
//     0,
//     0,
//     false,
//     searchText,
//     0,
//     0, 
//     0, 
//     0
//   );

//   useEffect(() => {
//     const setProducts = () => {
//       setFilteredProducts(allProducts?.slice(0, 10));
//     };
//     setProducts();
//   }, [isFetched, isFetchedAfterMount]);

//   useEffect(() => {
//     if (isFocus && searchRef.current) {
//       searchRef.current.focus();
//     }
//   }, [isFocus, searchRef]);

//   const isImageURL = (image) => {
//     if (image) {
//       if (image[0].value.includes("http")) return true;
//     }
//     return false;
//   };
//   const handleProductClick = async (productId) => {
//     // Set the navigation state and cookie
//     await setNavigationState({ productId });
//     await setCookie("selectedProductId", productId);

//     // Route to the product page
//     router.push(`/product/${productId}`);

//     // Add a slight delay before closing the menu
//     setTimeout(() => {
//       setShowMenu(false);
//     }, 1000); // 100ms delay should be enough to ensure routing happens first
//   };

//   const handleViewAll = () => {
//     // setShowMenu(false);
//     router.push(`/allProducts?searchText=${searchText}`);
//     setTimeout(() => {
//       setShowMenu(false);
//     }, 1000);
//   };
//   const handleHeaderHomeClick = () => {
//     setShowMenu(false);
//     router.push(`/home`);
//   };

//   useEffect(() => {
//     if (searchTextHeader?.length > 1) {
//       searchRef.current.value = searchTextHeader;
//       setSearchText(searchTextHeader);
//     }
//   }, [searchTextHeader]);
  
//   const [dataStatus, setDataStatus] = useState(true)
//   return (
//     <div className="menu">
//       <div className="columnclose_one">
//         <div className="rowclose_one"></div>
//         <div className="logo">
//           <Image
//             src={LogoIcon}
//             alt="Logomarkblack"
//             className="logomarkblack"
//             onClick={() => handleHeaderHomeClick()}
//             unoptimized
//           />
//         </div>
//       </div>
//       <div className="row">
//         <div className="flex w-full flex-col items-center">
//           <div className="flex justify-center w-full">
//             <input
//               width={"70%"}
//               type="text"
//               // className="h-[40px] w-3/5 border-b border-solid border-t border-l border-[#D3C6BB] rounded-l-lg p-4"
//               className="h-[40px] w-3/5 bg-transparent  outline-none border-b-2 border-black rounded-none p-4"
//               ref={searchRef}
//               placeholder="Search Products...."
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   setSearchText(searchRef.current.value);
//                   setDataStatus(false)
//                 }
//               }}
//             />
//             <div
//               // className="flex px-3 bg-white border-b border-solid border-t border-r border-[#D3C6BB] rounded-r-lg"
//               className="flex px-3 bg-transparent outline-none border-b-2 border-black rounded-none p-2"
//             >
//               <Image
//                 src={SearchIcon}
//                 alt="search"
//                 className="cursor-pointer"
//                 onClick={() => setSearchText(searchRef.current.value)}
//                 unoptimized
//               />
//             </div>
//           </div>
//           <div className="flex flex-row w-[80%] px-20 py-5 flex-wrap gap-5 justify-center">
//             {searchText !== "" &&
//               isFetched &&
//               (filteredProducts.length > 0 ? (
//                 <>
//                   {filteredProducts.map(({ fn_get_products }, index) => (
//                     <div
//                       className="flex flex-col gap-1.5 basis-1/5"
//                       key={"productCard" + index}
//                     >
//                       <div
//                         style={{
//                           width: "300px",
//                           height: "400px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         <Image
//                           src={
//                             isImageURL(fn_get_products.hero_image)
//                               ? transformImageSrc(
//                                   fn_get_products.hero_image[0].value
//                                 )
//                               : CheckerBoardImg
//                           }
//                           alt={""} //productDetails.fn_get_products.p_name
//                           className="element-image"
//                           width={300} // specify your desired width
//                           height={400} // specify your desired height
//                           onClick={() =>
//                             handleProductClick(fn_get_products?.p_id)
//                           }
//                           unoptimized
//                         />
//                       </div>
//                       <div
//                         className="py-2 gap-3  cursor-pointer"
//                         onClick={() =>
//                           handleProductClick(fn_get_products?.p_id)
//                         }
//                       >
//                         <h3 className="font-sans font-medium leading-6 text-base text-wrap">
//                           {fn_get_products.name}
//                         </h3>
//                         <div className="flex flex-row justify-between mr-5">
//                           <span className="font-sans font-normal leading-5 text-sm">
//                             {fn_get_products?.brand_name}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {
//                     <div className="flex w-full justify-end ">
//                       <span
//                         className="font-sans font-normal leading-5 text-sm underline cursor-pointer"
//                         onClick={handleViewAll}
//                       >
//                         View All
//                       </span>
//                     </div>
//                   }
//                 </>
//               ) : (
//                 <div className="flex w-full justify-center">
//                   <span>No Products to display for the searched criteria</span>
//                 </div>
//               ))}
//           </div>
//         </div>
//         {dataStatus &&<div className="rowheading">
//           <div className="column1">
//             <div className="shop">
//               <p className="shoptext ui text size-h3">Shop</p>
//             </div>
//             <div className="productLinks">
//               <div className="col1 fire">
//                 <div className="columnheading">
//                   <div className="title">
//                     <p className="titleText ui text size-h5">Fireplaces</p>
//                   </div>
//                   <div className="columnbodymedium">
//                     {fuelTypes.map((val, index) => {
//                       if (val?.fueltype_name !== "Hybrid - Wood/Electric")
//                         return (
//                           <a
//                             href={`/allProducts/${val.fueltype_name}`}
//                             key={"types" + val.fueltype_id}
//                           >
//                             <p
//                               className={`bodymedium${index} ui text size-body_medium`}
//                             >
//                               {val.fueltype_name}
//                             </p>
//                           </a>
//                         );
//                     })}
//                   </div>
//                 </div>
//                 <div className="columnheading">
//                   <div className="title">
//                     <p className="titleText ui text size-h5">Other</p>
//                   </div>
//                   <div className="columnbodysmall">
//                     {allProductMenu.map((productMenu, index) => (
//                       <a
//                         href={`/allProducts/${productMenu.ptype_name}`}
//                         key={"productTypes" + index}
//                       >
//                         <p className="bodysmall ui text size-body_small">
//                           {productMenu.ptype_name}
//                         </p>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="col2 brands">
//                 <div className="title">
//                   <p className="titleText ui text size-h5">Brands</p>
//                 </div>
//                 <div className="rowbody">
//                   {brands.map((val, index) => (
//                     <a
//                       key={"brands" + val.brand_id}
//                       href={`/allProducts/${val.brand_name}`}
//                     >
//                       <p className="bodysmall ui text size-body_small">
//                         {val.brand_name}
//                       </p>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="column2 sale">
//             <div className="title sale-row1">
//               <p className="titleText ui text size-h3">Sale</p>
//             </div>
//             <div className="sale-row2">
//               <a href="/ourStory">
//                 <p className="headingthree ui text size-h3">Our Story</p>
//               </a>
//               {/* <a href="#">
//                 <p className="headingthree-3 ui text size-h3">Showrooms</p>
//               </a> */}
//               {/* <a href="#">
//                 <p className="headingthree-3 ui text size-h3">industry hub</p>
//               </a> */}
//               <a href="#">
//                 <p className="headingthree-3 ui text size-h3">Blog</p>
//               </a>
//               <a href="/contact">
//                 <p className="headingthree-3 ui text size-h3">Contact Us</p>
//               </a>
//             </div>
//           </div>
//         </div>}
//       </div>
//     </div>
//   );
// };

// export default Menu;

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import LogoIcon from "@/public/assets/menu/logoblack.svg";
import Image from "next/image";
import "./Menu.css";
import useMasterValues from "../allProducts/hooks/useMasterValues";
import SearchIcon from "@/public/assets/allProducts/searchIcon.svg";
import useAllProducts from "../allProducts/hooks/useAllProducts";
import CheckerBoardImg from "@/public/assets/allProducts/checkerboard.png";
import { useNavigationState } from "@/context/NavigationContext";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";
import CircularProgress from '@mui/material/CircularProgress';
import { motion, AnimatePresence } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";

const Menu = ({ searchTextHeader, setShowMenu, isFocus }) => {
  const { setNavigationState } = useNavigationState();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const {
    brands,
    masterValues: { fuelTypes, productTypes: allProductMenu },
  } = useMasterValues();

  const { allProducts, isFetched, isFetchedAfterMount } = useAllProducts(
    0,
    0,
    0,
    false,
    searchText,
    0,
    0, 
    0, 
    0
  );

  // Memoized product filtering function
  const filterProducts = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    setFilteredProducts(allProducts?.slice(0, isMobile ? 5 : 10) || []);
  }, [allProducts]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts, isFetched, isFetchedAfterMount]);

  useEffect(() => {
    if (isFocus && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isFocus]);

  const isImageURL = (image) => {
    return image?.[0]?.value?.includes("http") ?? false;
  };

  const handleProductClick = async (productId) => {
    await setNavigationState({ productId });
    await setCookie("selectedProductId", productId);
    router.push(`/product/${productId}`);
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };

  const handleViewAll = () => {
    router.push(`/allProducts?searchText=${searchText}`);
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
  };

  const handleHeaderHomeClick = () => {
    setShowMenu(false);
    router.push(`/home`);
  };

  useEffect(() => {
    if (searchTextHeader?.length > 1 && searchRef.current) {
      searchRef.current.value = searchTextHeader;
      setSearchText(searchTextHeader);
    }
  }, [searchTextHeader]);

  const [dataStatus, setDataStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(() => {
    if (!searchRef.current?.value) return;
    
    setIsLoading(true);
    const newSearchText = searchRef.current.value;
    setSearchText(newSearchText);
    setDataStatus(false);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const productVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="menu">
        <div className="columnclose_one">
          <div className="rowclose_one"></div>
          <div className="logo">
            <Image
              src={LogoIcon}
              alt="Logomarkblack"
              className="logomarkblack"
              onClick={handleHeaderHomeClick}
              unoptimized
              priority
            />
          </div>
        </div>
        <div className="row">
          <div className="flex w-full flex-col items-center">
            <motion.div 
              className="flex justify-center w-full search-input-container"
              initial="hidden"
              animate="visible"
              variants={menuVariants}
            >
              <input
                type="text"
                className="search-input"
                ref={searchRef}
                placeholder="Search Products...."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <div className="search-icon-container">
                {isLoading ? (
                  <CircularProgress size={20} style={{ color: 'black' }} />
                ) : (
                  <Image
                    src={SearchIcon}
                    alt="search"
                    className="cursor-pointer"
                    onClick={handleSearch}
                    unoptimized
                    loading="lazy"
                  />
                )}
              </div>
            </motion.div>

            <AnimatePresence>
              {searchText !== "" && (
                <motion.div 
                  className="search-results-container"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLoading ? (
                    <div className="loader-container">
                      <CircularProgress style={{ color: 'black' }} />
                    </div>
                  ) : (
                    <div className="products-grid">
                      {isFetched && filteredProducts.length > 0 ? (
                        <>
                          {filteredProducts.map(({ fn_get_products }, index) => (
                            <motion.div
                              className="product-card"
                              key={`productCard-${fn_get_products.p_id}-${index}`}
                              variants={productVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="product-image-container">
                                <Image
                                  src={
                                    isImageURL(fn_get_products.hero_image)
                                      ? transformImageSrc(
                                          fn_get_products.hero_image[0].value
                                        )
                                      : CheckerBoardImg
                                  }
                                  alt={fn_get_products.name}
                                  className="product-image"
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  onClick={() =>
                                    handleProductClick(fn_get_products?.p_id)
                                  }
                                  unoptimized
                                  loading="lazy"
                                  onLoad={(e) => {
                                    e.target.classList.add('loaded');
                                  }}
                                />
                              </div>
                              <div
                                className="product-info"
                                onClick={() =>
                                  handleProductClick(fn_get_products?.p_id)
                                }
                              >
                                <h3 className="product-name">
                                  {fn_get_products.name}
                                </h3>
                                <div className="product-brand">
                                  <span>{fn_get_products?.brand_name}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          <div className="view-all-container">
                            <motion.span
                              className="view-all-link"
                              onClick={handleViewAll}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View All
                            </motion.span>
                          </div>
                        </>
                      ) : (
                        <div className="no-products">
                          <span>No Products to display for the searched criteria</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {dataStatus && (
            <motion.div 
              className="rowheading"
              initial="hidden"
              animate="visible"
              variants={menuVariants}
            >
              <div className="column1">
                <div className="shop">
                  <p className="shoptext ui text size-h3">Shop</p>
                </div>
                <div className="productLinks">
                  <div className="col1 fire">
                    <div className="columnheading">
                      <div className="title">
                        <p className="titleText ui text size-h5">Fireplaces</p>
                      </div>
                      <div className="columnbodymedium">
                        {fuelTypes.map((val, index) => {
                          if (val?.fueltype_name !== "Hybrid - Wood/Electric")
                            return (
                              <motion.a
                                href={`/allProducts/${val.fueltype_name}`}
                                key={`types-${val.fueltype_id}`}
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <p
                                  className={`bodymedium${index} ui text size-body_medium`}
                                >
                                  {val.fueltype_name}
                                </p>
                              </motion.a>
                            );
                        })}
                      </div>
                    </div>
                    <div className="columnheading">
                      <div className="title">
                        <p className="titleText ui text size-h5">Other</p>
                      </div>
                      <div className="columnbodysmall">
                        {allProductMenu.map((productMenu, index) => (
                          <motion.a
                            href={`/allProducts/${productMenu.ptype_name}`}
                            key={`productTypes-${index}`}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <p className="bodysmall ui text size-body_small">
                              {productMenu.ptype_name}
                            </p>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col2 brands">
                    <div className="title">
                      <p className="titleText ui text size-h5">Brands</p>
                    </div>
                    <div className="rowbody">
                      {brands.map((val, index) => (
                        <motion.a
                          key={`brands-${val.brand_id}`}
                          href={`/allProducts/${val.brand_name}`}
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <p className="bodysmall ui text size-body_small">
                            {val.brand_name}
                          </p>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="column2 sale">
                {/* <div className="title sale-row1">
                  <p className="titleText ui text size-h3">Sale</p>
                </div> */}
                <div className="sale-row2">
                  <motion.a 
                    href="/ourStory"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="headingthree ui text size-h3">Our Story</p>
                  </motion.a>
                  <motion.a 
                    href="#"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="headingthree-3 ui text size-h3">Blog</p>
                  </motion.a>
                  <motion.a 
                    href="/contact"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="headingthree-3 ui text size-h3">Contact Us</p>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </LazyMotion>
  );
};

export default Menu;