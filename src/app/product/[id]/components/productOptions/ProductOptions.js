// import React, { useState } from "react";
// import styles from "./ProductOptions.module.css";
// import optionsImage from "@/public/assets/product/electriFireOptions.png";
// import Image from "next/image";

// const ProductOptions = ({ short_desc, name, price, brand_name, openModal }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [totalPrice, setTotalPrice] = useState(price);
//   const [isPopupOpen, setIsPopupOpen] = useState(true);

//   const handleOptionChange = (category, option) => {
//     const isCheckbox =
//       category === "ZERO CLEARANCE PACKAGE" ||
//       category === "CHIMNEY INSERT PACKAGE";

//     setSelectedOptions((prevOptions) => {
//       const currentSelection =
//         prevOptions[category] || (isCheckbox ? [] : null);

//       if (isCheckbox) {
//         const isSelected = currentSelection.includes(option);
//         const newSelection = isSelected
//           ? currentSelection.filter((o) => o !== option)
//           : [...currentSelection, option];
//         return { ...prevOptions, [category]: newSelection };
//       }

//       return {
//         ...prevOptions,
//         [category]: currentSelection === option ? null : option,
//       };
//     });

//     const optionPrice = option.price || 0;
//     setTotalPrice((prevPrice) => {
//       if (isCheckbox) {
//         const isSelected = selectedOptions[category]?.includes(option);
//         return prevPrice + (isSelected ? -optionPrice : optionPrice);
//       }
//       const prevSelectedOptionPrice =
//         selectedOptions[category]?.price || 0 || 0;
//       return prevPrice - prevSelectedOptionPrice + optionPrice;
//     });
//   };
//   const togglePopup = () => {
//     setIsPopupOpen(!isPopupOpen);
//   };
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.brand}>{brand_name}</h2>
//       <h1 className={styles.title}>{name?.toUpperCase()}</h1>
//       <p className={styles.subtitle}>Build your product</p>

//       {short_desc?.map((section, index) => (
//         <div key={index} className={styles.section}>
//           <h3 className={styles.sectionTitle}>{section.name}</h3>

//           <div
//             className={
//               section.name === "MATERIAL & FINISH OPTIONS"
//                 ? styles.materialOptionsRow
//                 : ""
//             }
//           >
//             {section.value.map((option, optionIndex) => (
//               <label
//                 key={optionIndex}
//                 className={`${styles.option} ${
//                   section.name === "MATERIAL & FINISH OPTIONS"
//                     ? styles.materialOptionLabel
//                     : ""
//                 }`}
//               >
//                 <input
//                   type={
//                     section.name === "ZERO CLEARANCE PACKAGE" ||
//                     section.name === "CHIMNEY INSERT PACKAGE"
//                       ? "checkbox"
//                       : "radio"
//                   }
//                   name={section.name}
//                   checked={
//                     Array.isArray(selectedOptions[section.name])
//                       ? selectedOptions[section.name]?.includes(option)
//                       : selectedOptions[section.name] === option
//                   }
//                   onChange={() => handleOptionChange(section.name, option)}
//                 />
//                 {section.name === "MATERIAL & FINISH OPTIONS" ? (
//                   <div>
//                     <Image
//                       src={
//                         option.image_url === "url"
//                           ? optionsImage
//                           : option.image_url
//                       }
//                       alt={option.name}
//                       width={150}
//                       height={150}
//                       onClick={togglePopup} // Open popup on image click
//                       style={{ cursor: "pointer" }} // Make image look clickable
//                     />
//                     <span
//                       style={{
//                         position: "relative",
//                         left: "10%",
//                       }}
//                     >
//                       {option.name}
//                     </span>

//                     {/* {option.price && <span> (+${option.price})</span>} */}
//                   </div>
//                 ) : (
//                   <span>
//                     {option.value || option.name}{" "}
//                     {option.price ? `(+$${option.price.toFixed(2)})` : ""}
//                   </span>
//                 )}
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className={styles.priceContainer}>
//         <p className={styles.price}>
//           ${totalPrice.toFixed(2)} <span>(inc gst)</span>
//         </p>
//         <span className={styles.inStock}>IN STOCK</span>
//       </div>

//       <div className={styles.buttonContainer}>
//         <button className={styles.addToCart}>ADD TO CART</button>
//         <button className={styles.enquiry} onClick={openModal}>
//           SEND AN ENQUIRY
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductOptions;
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick"; // Import Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ProductOptions.module.css";
import optionsImage from "@/public/assets/product/electriFireOptions.png";

const PriceFormatter = ({ price }) => {
  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return formattedPrice;
};

const ProductOptions = ({ short_desc, name, price, brand_name, openModal }) => {
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

  const togglePopup = (images = []) => {
    setCurrentImages(images);
    setIsPopupOpen(!isPopupOpen);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.brand}>{brand_name}</h2>
      <h1 className={styles.title}>{name?.toUpperCase()}</h1>
      <p className={styles.subtitle}>Build your product</p>

      {short_desc &&
        short_desc?.map((section, index) => (
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
                        onClick={() =>
                          togglePopup(section.value.map((opt) => opt.image_url))
                        } // Open popup on image click
                        style={{ cursor: "pointer" }} // Make image look clickable
                      />
                      <span
                        style={{
                          position: "relative",
                          left: "10%",
                        }}
                      >
                        {option.name}
                      </span>
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
          {/* ${totalPrice.toFixed(2)} */}
          <PriceFormatter price={totalPrice.toFixed(2)} />{" "}
          <span>(inc gst)</span>
        </p>
        <span className={styles.inStock}>IN STOCK</span>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.addToCart}>ADD TO CART</button>
        <button className={styles.enquiry} onClick={openModal}>
          SEND AN ENQUIRY
        </button>
      </div>

      {isPopupOpen && (
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
      )}
    </div>
  );
};

export default ProductOptions;
