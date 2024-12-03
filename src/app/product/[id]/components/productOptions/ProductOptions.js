import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import styles from "./ProductOptions.module.css";
import optionsImage from "@/public/assets/product/electriFireOptions.png";
import dynamic from "next/dynamic";
import "lightgallery/css/lightgallery.css"; // Base CSS
import "lightgallery/css/lg-thumbnail.css"; // Thumbnail plugin
import "lightgallery/css/lg-zoom.css"; // Zoom plugin
import "lightgallery/css/lg-fullscreen.css"; // Fullscreen plugin

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const PriceFormatter = ({ price }) => {
  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return formattedPrice;
};

const ProductOptions = ({
  short_desc,
  name,
  price,
  brand_name,
  openModal,
  onViewAllAccessories,
  p_sku,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(price);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  const handleOptionChange = (category, option) => {
    const isCheckbox =
      category === "ZERO CLEARANCE PACKAGE" ||
      category === "CHIMNEY INSERT PACKAGE";

    setSelectedOptions((prevOptions) => {
      const currentSelection =
        prevOptions[category] || (isCheckbox ? [] : null);

      let newSelection;

      if (isCheckbox) {
        const isSelected = currentSelection.includes(option);
        newSelection = isSelected
          ? currentSelection.filter((o) => o !== option)
          : [...currentSelection, option];
      } else {
        newSelection = currentSelection === option ? null : option;
      }

      const updatedOptions = { ...prevOptions, [category]: newSelection };

      updateTotalPrice(updatedOptions, isCheckbox, category, option);

      return updatedOptions;
    });
  };
  const updateTotalPrice = (updatedOptions, isCheckbox, category, option) => {
    const optionPrice = option.price || 0;

    setTotalPrice((prevPrice) => {
      if (isCheckbox) {
        const isSelected = updatedOptions[category]?.includes(option);
        return prevPrice + (isSelected ? optionPrice : -optionPrice);
      } else {
        const prevSelectedOptionPrice =
          (selectedOptions[category] && selectedOptions[category].price) || 0;
        return prevPrice - prevSelectedOptionPrice + optionPrice;
      }
    });
  };

  const togglePopup = (images = []) => {
    setCurrentImages(images);
    setIsPopupOpen(!isPopupOpen);
  };

  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true,
  // };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.brand}>{brand_name}</h2>
        <h1 className={styles.title}>{name?.toUpperCase()}</h1>
      </div>
      <p className={styles.sku}>{p_sku}</p>
      <p className={styles.subtitle}>Build your product</p>

      {short_desc &&
        short_desc?.map((section, index) => {
          if (
            section.name !== "MATERIAL & FINISH OPTIONS" &&
            section.name !== "DELIVERY" &&
            section?.name !== "0"
          ) {
            return (
              <div key={index} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.name}</h3>

                <div
                  className={
                    section.name === "MATERIAL & FINISH OPTIONS"
                      ? styles.materialOptionsRow
                      : ""
                  }
                >
                  {section.value.map((option, optionIndex) => {
                    console.log("option", option);
                    return (
                      <label
                        key={optionIndex}
                        className={`${styles.option} ${
                          section.name === "MATERIAL & FINISH OPTIONS"
                            ? styles.materialOptionLabel
                            : ""
                        }`}
                      >
                        <input
                          key={optionIndex}
                          type={
                            "checkbox"
                            // === "ZERO CLEARANCE PACKAGE" ||
                            // section.name === "CHIMNEY INSERT PACKAGE"
                            //   ? "checkbox"
                            //   : "radio"
                          }
                          name={section.name}
                          checked={
                            Array.isArray(selectedOptions[section.name])
                              ? selectedOptions[section.name]?.includes(option)
                              : selectedOptions[section.name] === option
                          }
                          onChange={() =>
                            handleOptionChange(section.name, option)
                          }
                        />
                        <div className={styles.listOptions}>
                          {Array.isArray(option.value) ? (
                            option.value?.map((optionVal, index) => {
                              return <span key={index}> {optionVal}</span>;
                            })
                          ) : (
                            <span> {option.value}</span>
                          )}
                          <span>
                            {/* {option.value || option.name}{" "} */}
                            {option.price ? `(+$${option.price})` : ""}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      {short_desc &&
        short_desc?.map((section, index) => {
          if (
            section.name === "MATERIAL & FINISH OPTIONS" &&
            section.value?.length > 0
          ) {
            return (
              <div key={index} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.name}</h3>
                <div className={styles.materialOptionsRow}>
                  {/* LightGallery wraps all images together */}
                  <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom, lgFullscreen]}
                    mode="lg-fade"
                    closable={true}
                    download={true}
                    zoomFromOrigin={false}
                    mousewheel={true}
                    selector={`.${styles.imageLink}`} // Selector to bind to specific links
                  >
                    {section.value.map((option, optionIndex) => {
                      const imageUrl =
                        option.image_url !== "url" && option.image_url
                          ? transformImageSrc(option.image_url)
                          : "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/Fascia%20and%20Trim/Regency/Fascia-GFi750-3-Sided%20Black%20Backing%20Plate.jpg";

                      return (
                        <div
                          key={optionIndex}
                          className={`${styles.option} ${styles.materialOptionLabel}`}
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label
                            style={{ display: "flex", flexDirection: "column" }}
                            // onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type={
                                section.name === "ZERO CLEARANCE PACKAGE" ||
                                section.name === "CHIMNEY INSERT PACKAGE"
                                  ? "checkbox"
                                  : "radio"
                              }
                              name={section.name}
                              checked={selectedOptions[section.name] === option}
                              // {
                              //   Array.isArray(selectedOptions[section.name])
                              //     ? selectedOptions[section.name]?.includes(
                              //         option
                              //       )
                              //     : selectedOptions[section.name] === option
                              // }
                              onChange={(e) => {
                                handleOptionChange(section.name, option);
                                // e.stopPropagation();
                              }}
                            />
                          </label>
                          <a
                            href={imageUrl}
                            data-src={imageUrl}
                            data-lg-size="1600-2400"
                            data-sub-html={`<h4>${option?.name}</h4>`}
                            className={`${styles.imageLink}`} // Bind this class to LightGallery
                          >
                            <Image
                              src={imageUrl}
                              alt={option.name}
                              width={150}
                              height={150}
                              style={{ cursor: "pointer", marginTop: "8px" }}
                            />
                          </a>

                          <span
                            style={{
                              marginTop: "8px",
                              cursor: "pointer",
                              display: "flex",
                              textAlign: "center",
                            }}
                          >
                            {option.name}
                          </span>
                        </div>
                      );
                    })}
                  </LightGallery>
                </div>
                <div
                  onClick={onViewAllAccessories}
                  style={{
                    cursor: "pointer",
                    color: "#1741be",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  View All Accessories
                </div>
              </div>
            );
          }
        })}

      {short_desc &&
        short_desc?.map((section, index) => {
          if (section.name === "DELIVERY") {
            return (
              <div key={index} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.name}</h3>

                <div
                  className={
                    section.name === "DELIVERY"
                      ? styles.materialOptionsRowDelivery
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
                        onChange={() =>
                          handleOptionChange(section.name, option)
                        }
                      />
                      <span className={styles.listOptions}>
                        {option.value || option.name}{" "}
                        {option.price ? `(+$${option.price})` : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          }
        })}

      <div className={styles.priceContainer}>
        <p className={styles.price}>
          {/* ${totalPrice.toFixed(2)} */}
          <PriceFormatter price={totalPrice} /> <span>(inc gst)</span>
        </p>
        <span className={styles.inStock}>IN STOCK</span>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.addToCart}>ADD TO CART</button>
        <button className={styles.enquiry} onClick={openModal}>
          SEND AN ENQUIRY
        </button>
      </div>

      {/* {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setIsPopupOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <div style={{ width: "80%", height: "80%" }}>
            <Slider {...sliderSettings}>
              {currentImages.map((imgSrc, idx) => (
                <div key={idx}>
                  <Image
                    src={imgSrc === "url" ? optionsImage : imgSrc}
                    alt={`Slider Image ${idx}`}
                    layout="responsive"
                    width={800}
                    height={600}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductOptions;
