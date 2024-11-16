// src={
//   option.image_url === "url"
//     ? optionsImage
//     : option.image_url
// }

// import optionsImage from "@/public/assets/product/electriFireOptions.png";

import React, { useState } from "react";
import styles from "./ProductOptions.module.css";
import optionsImage from "@/public/assets/product/electriFireOptions.png";
import Image from "next/image";

const ProductOptions = ({ short_desc, name, price, brand_name, openModal }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(price);

  const handleOptionChange = (category, option) => {
    const isCheckbox =
      category === "ZERO CLEARANCE PACKAGE" ||
      category === "CHIMNEY INSERT PACKAGE";

    setSelectedOptions((prevOptions) => {
      const currentSelection =
        prevOptions[category] || (isCheckbox ? [] : null);

      if (isCheckbox) {
        const isSelected = currentSelection.includes(option);
        const newSelection = isSelected
          ? currentSelection.filter((o) => o !== option)
          : [...currentSelection, option];
        return { ...prevOptions, [category]: newSelection };
      }

      return {
        ...prevOptions,
        [category]: currentSelection === option ? null : option,
      };
    });

    const optionPrice = option.price || 0;
    setTotalPrice((prevPrice) => {
      if (isCheckbox) {
        const isSelected = selectedOptions[category]?.includes(option);
        return prevPrice + (isSelected ? -optionPrice : optionPrice);
      }
      const prevSelectedOptionPrice =
        selectedOptions[category]?.price || 0 || 0;
      return prevPrice - prevSelectedOptionPrice + optionPrice;
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.brand}>{brand_name}</h2>
      <h1 className={styles.title}>{name?.toUpperCase()}</h1>
      <p className={styles.subtitle}>Build your product</p>

      {short_desc?.map((section, index) => (
        <div key={index} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.name}</h3>

          <div
            className={
              section.name === "MATERIAL & FINISH OPTIONS"
                ? styles.materialOptionsRow
                : ""
            }
          >
            {section.value.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`${styles.option} ${
                  section.name === "MATERIAL & FINISH OPTIONS"
                    ? styles.materialOptionLabel
                    : ""
                }`}
              >
                <input
                  type={
                    section.name === "ZERO CLEARANCE PACKAGE" ||
                    section.name === "CHIMNEY INSERT PACKAGE"
                      ? "checkbox"
                      : "radio"
                  }
                  name={section.name}
                  checked={
                    Array.isArray(selectedOptions[section.name])
                      ? selectedOptions[section.name]?.includes(option)
                      : selectedOptions[section.name] === option
                  }
                  onChange={() => handleOptionChange(section.name, option)}
                />
                {section.name === "MATERIAL & FINISH OPTIONS" ? (
                  <div>
                    <Image
                      src={
                        option.image_url === "url"
                          ? optionsImage
                          : option.image_url
                      }
                      alt={option.name}
                      width={150}
                      height={150}
                    />
                    <span
                      style={{
                        position: "relative",
                        left: "10%",
                      }}
                    >
                      {option.name}
                    </span>

                    {/* {option.price && <span> (+${option.price})</span>} */}
                  </div>
                ) : (
                  <span>
                    {option.value || option.name}{" "}
                    {option.price ? `(+$${option.price.toFixed(2)})` : ""}
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className={styles.priceContainer}>
        <p className={styles.price}>
          ${totalPrice.toFixed(2)} <span>(inc gst)</span>
        </p>
        <span className={styles.inStock}>IN STOCK</span>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.addToCart}>ADD TO CART</button>
        <button className={styles.enquiry} onClick={openModal}>SEND AN ENQUIRY</button>
      </div>
    </div>
  );
};

export default ProductOptions;
