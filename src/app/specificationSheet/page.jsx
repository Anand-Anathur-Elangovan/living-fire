"use client";
import React, { useState } from "react";
import Image from "next/image";
import fire from "@/public/assets/specificationSheet/fire.png";
import searchIcon from "@/public/assets/specificationSheet/searchicon.svg";
import styles from "./SpecificationSheet.module.css";
import useMasterValues from "../allProducts/hooks/useMasterValues";

const SpecificationSheet = () => {
  const {
    brands,
    masterValues: { fuelTypes = [], productTypes: allProductMenu = [] },
  } = useMasterValues();
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleBrandSelection = (brand) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brand)
        ? prevSelected.filter((b) => b !== brand)
        : [...prevSelected, brand]
    );
  };

  console.log("brands", brands);
  const products = [
    {
      name: "Electric Tunnel Fireplace",
      brand: "Paul Agnew Designs",
      image: fire,
    },
    {
      name: "ilektro 1250 Landscape",
      brand: "Paul Agnew Designs",
      image: fire,
    },
    {
      name: "ilektro 1650 Landscape",
      brand: "Paul Agnew Designs",
      image: fire,
    },
    {
      name: "ilektro 2000 Landscape",
      brand: "Paul Agnew Designs",
      image: fire,
    },
    {
      name: "ilektro 950 Aspect",
      brand: "Paul Agnew Designs",
      image: fire,
    },
    {
      name: "ilektro 950 Landscape",
      brand: "Paul Agnew Designs",
      image: fire,
    },
  ];

  return (
    <section>
      {/* Search Banner */}
      <div className={styles.searchBanner}>
        <div className={styles.column}>
          <div className={styles.searchByProduct}>
            <div className={styles.searchText}>
              <p className="searchby ui text size-h3">SEARCH BY PRODUCT</p>
            </div>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
              />
              <Image
                src={searchIcon}
                alt="Search"
                width={40}
                height={40}
                className={styles.searchIcon}
              />
            </div>
          </div>
          <div className={styles.selectABrand}>
            <div className={styles.brandSelect}>
              <p className={styles.filter}>SELECT A BRAND</p>
              <form
                id="brand-selection-form"
                className={styles.chipviewbrandse}
              >
                {brands?.map((brand, index) => (
                  <label
                    key={index}
                    tabIndex="0"
                    className={styles.brandSelector}
                  >
                    <input
                      type="checkbox"
                      name="selectedChipOptions"
                      value={index + 1}
                      hidden
                      className="dhi-group-1"
                    />
                    <span>{brand?.brand_name}</span>
                  </label>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className={styles.productsColumn}>
        <div className={styles.column}>
          {products.map((product, index) => (
            <div key={index} className={styles.productSpecs}>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className={styles.image}
              />
              <div className={styles.columnProductName}>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.wood}>{product.brand}</p>
                </div>
                <div className={styles.viewSpecification}>
                  <p className={styles.viewSpecificationText}>
                    View Specifications
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecificationSheet;
