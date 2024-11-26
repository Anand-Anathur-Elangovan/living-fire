// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import fire from "@/public/assets/specificationSheet/image.png";
// import searchIcon from "@/public/assets/specificationSheet/searchicon.svg";
// import clearIcon from "@/public/assets/specificationSheet/clear.png";
// import styles from "./SpecificationSheet.module.css";
// import useMasterValues from "../allProducts/hooks/useMasterValues";
// import FilterComponent from "./components/FilterComponent/FilterComponent";
// import useAllProducts from "../allProducts/hooks/useAllProducts";

// const SpecificationSheet = () => {
//   const searchRef = useRef(null);
//   const {
//     brands,
//     masterValues: { fuelTypes = [], productTypes: allProductMenu = [] },
//   } = useMasterValues();
//   // const [selectedBrands, setSelectedBrands] = useState([]);
//   const [productMenuIndex, setproductMenuIndex] = useState(1);
//   const [fireplaceType, setFireplaceType] = useState(null);
//   const [brandType, setBrandType] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [searchTextTemp, setSearchTextTemp] = useState("");
//   const [bestSelling, setBestSelling] = useState(false);
//   const [subType, setSubType] = useState(null);
//   const [rangeType, setRangeType] = useState(null);

//   const { allProducts, isFetched } = useAllProducts(
//     productMenuIndex,
//     fireplaceType ?? 0,
//     brandType ?? 0,
//     bestSelling === false ? null : bestSelling,
//     searchText,
//     subType ?? 0,
//     rangeType ?? 0
//   );
//   useEffect(() => {
//     if (searchText !== "" && searchRef.current)
//       searchRef.current.value = searchText;
//   }, [searchRef, searchText]);
//   const toggleBrandSelection = (brand) => {
//     setBrandType((prev) => (prev === brand?.brand_id ? null : brand?.brand_id));
//     // setBrandType(brand?.brand_id);
//     // setSelectedBrands(brand?.brand_id);
//     // setSelectedBrands((prevSelected) =>
//     //   prevSelected.includes(brand)
//     //     ? prevSelected.filter((b) => b !== brand)
//     //     : [...prevSelected, brand]
//     // );
//   };
//   console.log("setSearchText", searchText, "allProducts", allProducts);
//   return (
//     <section>
//       <div className={styles.searchBanner}>
//         <div className={styles.column}>
//           <div className={styles.searchByProduct}>
//             <div className={styles.searchText}>
//               <p className="searchby ui text size-h3">SEARCH BY PRODUCT</p>
//             </div>
//             <div className={styles.searchContainer}>
//               <input
//                 type="text"
//                 className={styles.searchInput}
//                 placeholder="Search"
//                 ref={searchRef}
//                 defaultValue={searchText}
//                 onChange={(e) =>
//                   setSearchTextTemp(searchRef.current.value?.toLowerCase())
//                 }
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     setSearchText(searchRef.current.value?.toLowerCase());
//                   }
//                 }}
//               />
//               {searchTextTemp && (
//                 <Image
//                   src={clearIcon}
//                   alt="Clear"
//                   width={20}
//                   height={20}
//                   className={styles.clearIcon}
//                   onClick={() => {
//                     setSearchTextTemp("");
//                     setSearchText("");
//                     searchRef.current.value = "";
//                   }}
//                 />
//               )}
//               <Image
//                 src={searchIcon}
//                 alt="Search"
//                 width={40}
//                 height={40}
//                 className={styles.searchIcon}
//                 onClick={() =>
//                   setSearchText(searchRef.current.value?.toLowerCase())
//                 }
//               />
//             </div>
//           </div>
//           <div className={styles.selectABrand}>
//             <div className={styles.brandSelect}>
//               <p className={styles.filter}>SELECT A BRAND</p>
//               <form
//                 id="brand-selection-form"
//                 className={styles.chipviewbrandse}
//               >
//                 {brands?.map((brand, index) => (
//                   <label
//                     key={index}
//                     tabIndex="0"
//                     className={`${styles.brandSelector} ${
//                       // selectedBrands?.includes(brand)
//                       brandType === brand?.brand_id ? styles.selectedBrand : ""
//                     }`}
//                   >
//                     <input
//                       type="checkbox"
//                       name="selectedChipOptions"
//                       value={index + 1}
//                       hidden
//                       className="dhi-group-1"
//                       onClick={() => toggleBrandSelection(brand)}
//                     />
//                     <span>{brand?.brand_name}</span>
//                   </label>
//                 ))}
//               </form>
//               {/* <button
//                 type="button"
//                 className={styles.clearButton}
//                 onClick={() => setSelectedBrands([])}
//               >
//                 Clear
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <FilterComponent
//         fuelTypes={fuelTypes}
//         fireplaceType={fireplaceType}
//         setFireplaceType={setFireplaceType}
//       />
//       {/* Product List */}
//       <div className={styles.productsColumn}>
//         <div className={styles.column}>
//           {allProducts &&
//             allProducts?.length > 0 &&
//             allProducts?.map((product, index) => (
//               <div key={index} className={styles.productSpecs}>
//                 <Image
//                   src={fire}
//                   alt={product?.fn_get_products?.name ?? "no image found"}
//                   width={156}
//                   height={120}
//                   className={styles.image}
//                 />
//                 <div className={styles.columnProductName}>
//                   <div className={styles.productDetails}>
//                     <p className={styles.productName}>
//                       {product?.fn_get_products?.name}
//                     </p>
//                     <p className={styles.wood}>
//                       {product?.fn_get_products?.brand_name}
//                     </p>
//                   </div>
//                   <div className={styles.viewSpecification}>
//                     <p className={styles.viewSpecificationText}>
//                       View Specifications
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SpecificationSheet;
"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import fire from "@/public/assets/specificationSheet/image.png";
import searchIcon from "@/public/assets/specificationSheet/searchicon.svg";
import clearIcon from "@/public/assets/specificationSheet/clear.png";
import styles from "./SpecificationSheet.module.css";
import useMasterValues from "../allProducts/hooks/useMasterValues";
import useAllProducts from "../allProducts/hooks/useAllProducts";

const FilterComponent = dynamic(
  () => import("./components/FilterComponent/FilterComponent"),
  { ssr: false } // Load dynamically to improve initial page load
);

const SpecificationSheet = () => {
  const searchRef = useRef(null);
  const {
    brands,
    masterValues: { fuelTypes = [], productTypes: allProductMenu = [] },
  } = useMasterValues();

  const [productMenuIndex, setProductMenuIndex] = useState(1);
  const [fireplaceType, setFireplaceType] = useState(null);
  const [brandType, setBrandType] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTextTemp, setSearchTextTemp] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [subType, setSubType] = useState(null);
  const [rangeType, setRangeType] = useState(null);

  const { allProducts, isFetched } = useAllProducts(
    productMenuIndex,
    fireplaceType ?? 0,
    brandType ?? 0,
    bestSelling === false ? null : bestSelling,
    searchText,
    subType ?? 0,
    rangeType ?? 0
  );

  useEffect(() => {
    if (searchText !== "" && searchRef.current) {
      searchRef.current.value = searchText;
    }
  }, [searchText]);

  const toggleBrandSelection = (brand) => {
    setBrandType((prev) => (prev === brand?.brand_id ? null : brand?.brand_id));
  };

  return (
    <section>
      {/* Search Banner Section */}
      <div className={styles.searchBanner}>
        <div className={styles.column}>
          <div className={styles.searchByProduct}>
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
                <Image
                  src={clearIcon}
                  alt="Clear Search Input"
                  width={20}
                  height={20}
                  className={styles.clearIcon}
                  onClick={() => {
                    setSearchTextTemp("");
                    setSearchText("");
                    searchRef.current.value = "";
                  }}
                />
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
              />
            </div>
          </div>
          <div className={styles.selectABrand}>
            <div className={styles.brandSelect}>
              <h3 className={styles.filter}>SELECT A BRAND</h3>
              <form
                id="brand-selection-form"
                className={styles.chipviewbrandse}
              >
                {brands?.map((brand) => (
                  <label
                    key={brand?.brand_id}
                    tabIndex={0}
                    className={`${styles.brandSelector} ${
                      brandType === brand?.brand_id ? styles.selectedBrand : ""
                    }`}
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
                  </label>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Component */}
      <FilterComponent
        fuelTypes={fuelTypes}
        fireplaceType={fireplaceType}
        setFireplaceType={setFireplaceType}
      />

      {/* Product List Section */}
      <div className={styles.productsColumn}>
        <div className={styles.column}>
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product, index) => (
              <article key={index} className={styles.productSpecs}>
                <Image
                  src={fire}
                  alt={product?.fn_get_products?.name ?? "No image available"}
                  width={156}
                  height={120}
                  className={styles.image}
                  loading="lazy" // Lazy loading for better performance
                />
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
                    <a
                      href={`/products/${product?.fn_get_products?.id}`}
                      className={styles.viewSpecificationText}
                      aria-label={`View specifications for ${product?.fn_get_products?.name}`}
                    >
                      View Specifications
                    </a>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpecificationSheet;
