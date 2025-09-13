import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ProductOptions.module.css";
import optionsImage from "@/public/assets/product/electriFireOptions.png";
import dynamic from "next/dynamic";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
  loading: () => <p>Loading gallery...</p>,
});
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const PriceFormatter = ({ price }) => {
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
  isAccessories,
  productOptionsHeight,
  setProductOptionsHeight,
  p_id,
  onProductUpdate,
  setIsAdmin,
  isAdmin,
}) => {
  // Hardcoded admin credentials
  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(price);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editFields, setEditFields] = useState({
    price: price || "",
    option_price: [
      {
        name: "",
        price: 0,
      },
      {
        name: "",
        price: 0,
      },
      {
        name: "",
        price: 0,
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
// Admin check state
 
  // Ref for root element to measure height
  const containerRef = useRef(null);

  // Animation hooks
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Set height to parent via setProductOptionsHeight
  useEffect(() => {
    if (containerRef.current && typeof setProductOptionsHeight === "function") {
      setProductOptionsHeight(containerRef.current.offsetHeight);
    }
  }, [
    selectedOptions,
    totalPrice,
    short_desc,
    name,
    price,
    brand_name,
    p_sku,
    isAccessories,
  ]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleOptionChange = (category, option) => {
    const isCheckbox =
      category !== "MATERIAL & FINISH OPTIONS" && category !== "DELIVERY";

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
      updateTotalPrice(updatedOptions);

      return updatedOptions;
    });
  };

  const updateTotalPrice = (updatedOptions) => {
    let newPrice = price;

    Object.keys(updatedOptions).forEach((category) => {
      const selected = updatedOptions[category];

      if (Array.isArray(selected)) {
        newPrice += selected.reduce(
          (sum, option) => sum + (Number(option.price) || 0),
          0
        );
      } else if (selected) {
        newPrice += selected.price || 0;
      }
    });

    setTotalPrice(newPrice);
  };

  const togglePopup = (images = []) => {
    setCurrentImages(images);
    setIsPopupOpen(!isPopupOpen);
  };
  const populateOptionPrices = (short_desc) => {
  return short_desc
    .filter(
      (section) =>
        section.name !== "DELIVERY" &&
        section.name !== "MATERIAL & FINISH OPTIONS"
    )
    .map((section) => {
      let price = 0;

      if (section.value && section.value.length > 0) {
        const found = section.value.find((opt) => Number(opt.price) > 0);
        price = found
          ? Number(found.price)
          : Number(section.value[0].price) || 0;
      }

      return {
        name: section.name,
        price,
      };
    });
};


  useEffect(() => {
    if (short_desc && short_desc.length > 0) {
      const option_price = populateOptionPrices(short_desc);
      setEditFields((prev) => ({
        ...prev,
        option_price,
      }));
    }
  }, [short_desc]);

  return (
    <motion.div
      ref={(el) => {
        ref(el);
        containerRef.current = el;
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={styles.container}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className={styles.title} style={{ marginBottom: 0 }}>
          <span className={styles.brand}>{brand_name}</span> <br />
          {/* {editMode ? (
            <input
              className={styles.input || ''}
              style={{ fontSize: 'inherit', fontWeight: 'bold', width: '80%', marginTop: 4 }}
              value={editFields.name}
              onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))}
            />
          ) : (
            name?.toUpperCase()
          )} */}
          {name?.toUpperCase()}
        </h1>
        {!editMode && isAdmin&& (
          <button
            className={styles.editBtn || ""}
            style={{
              marginLeft: 12,
              padding: "4px 12px",
              fontSize: 14,
              borderRadius: 4,
              border: "1px solid #ccc",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>

      <motion.p className={styles.sku} variants={itemVariants}>
        {/* {editMode ? (
          <input
            className={styles.input || ''}
            style={{ fontSize: 'inherit', width: '60%' }}
            value={editFields.p_sku}
            onChange={e => setEditFields(f => ({ ...f, p_sku: e.target.value }))}
          />
        ) : (
          p_sku
        )} */}
        {p_sku}
      </motion.p>

      <motion.p className={styles.subtitle} variants={itemVariants}>
        Build your product
      </motion.p>

      {short_desc &&
        short_desc?.map((section, index) => {
          if (
            section.name !== "MATERIAL & FINISH OPTIONS" &&
            section.name !== "DELIVERY" &&
            section?.name !== "0"
          ) {
            return (
              <motion.div
                key={index}
                className={styles.section}
                variants={itemVariants}
              >
                <h3 className={styles.sectionTitle}>{section.name}</h3>

                <div
                  className={
                    section.name === "MATERIAL & FINISH OPTIONS"
                      ? styles.materialOptionsRow
                      : ""
                  }
                >
                  {section.value.map((option, optionIndex) => {
                    return (
                      <motion.label
                        key={optionIndex}
                        className={`${styles.option} ${
                          section.name === "MATERIAL & FINISH OPTIONS"
                            ? styles.materialOptionLabel
                            : ""
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="checkbox"
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
                          {/* uncommented below line to show price */}
                          {/* <span>
                            {option.price ? `(+$${option.price})` : ""}
                          </span> */}

                          {editMode
                            ? // find the matching option by section.name
                              (() => {
                                const matchedOpt = editFields.option_price.find(
                                  (opt) => opt.name === section.name
                                );
                                return matchedOpt ? (
                                  <div style={{ marginBottom: "8px" }}>
                                    <label style={{ marginRight: "8px" }}>
                                      {matchedOpt.name}
                                    </label>
                                    <input
                                      className={styles.input || ""}
                                      style={{
                                        fontSize: "inherit",
                                        width: "60%",
                                      }}
                                      value={matchedOpt.price || ""}
                                      onChange={(e) =>
                                        setEditFields((prev) => {
                                          const updated = prev.option_price.map(
                                            (item) =>
                                              item.name === matchedOpt.name
                                                ? {
                                                    ...item,
                                                    price: e.target.value,
                                                  } // update only matching section
                                                : item
                                          );
                                          return {
                                            ...prev,
                                            option_price: updated,
                                          };
                                        })
                                      }
                                    />
                                  </div>
                                ) : null;
                              })()
                            : option.price
                            ? `(+$${option.price})`
                            : ""}
                        </div>
                      </motion.label>
                    );
                  })}
                </div>
              </motion.div>
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
              <motion.div
                key={index}
                className={styles.section}
                variants={itemVariants}
              >
                <h3 className={styles.sectionTitle}>{section.name}</h3>
                <div className={styles.materialOptionsRow}>
                  <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom, lgFullscreen]}
                    mode="lg-fade"
                    closable={true}
                    download={true}
                    zoomFromOrigin={false}
                    mousewheel={true}
                    selector={`.${styles.imageLink}`}
                  >
                    {section.value.map((option, optionIndex) => {
                      const imageUrl =
                        option.image_url !== "url" && option.image_url
                          ? transformImageSrc(option.image_url)
                          : "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/Fascia%20and%20Trim/Regency/Fascia-GFi750-3-Sided%20Black%20Backing%20Plate.jpg";

                      return (
                        <motion.div
                          key={optionIndex}
                          className={`${styles.option} ${styles.materialOptionLabel}`}
                          style={{ display: "flex", flexDirection: "column" }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <label
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="radio"
                              name={section.name}
                              checked={selectedOptions[section.name] === option}
                              onChange={(e) => {
                                handleOptionChange(section.name, option);
                              }}
                            />
                          </label>
                          <a
                            href={imageUrl}
                            data-src={imageUrl}
                            data-lg-size="1600-2400"
                            data-sub-html={`<h4>${option?.name}</h4>`}
                            className={`${styles.imageLink}`}
                          >
                            <Image
                              src={imageUrl}
                              alt={option.name}
                              width={150}
                              height={150}
                              style={{ cursor: "pointer", marginTop: "8px" }}
                              unoptimized
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
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
                        </motion.div>
                      );
                    })}
                  </LightGallery>
                </div>
                {isAccessories && (
                  <motion.div
                    onClick={onViewAllAccessories}
                    style={{
                      cursor: "pointer",
                      color: "#1741be",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View All Accessories
                  </motion.div>
                )}
              </motion.div>
            );
          }
        })}

      {short_desc &&
        short_desc?.map((section, index) => {
          if (section.name === "DELIVERY") {
            return (
              <motion.div
                key={index}
                className={styles.section}
                variants={itemVariants}
              >
                <h3 className={styles.sectionTitle}>{section.name}</h3>

                <div
                  className={
                    section.name === "DELIVERY"
                      ? styles.materialOptionsRowDelivery
                      : ""
                  }
                >
                  {section.value.map((option, optionIndex) => (
                    <motion.label
                      key={optionIndex}
                      className={`${styles.option} ${
                        section.name === "MATERIAL & FINISH OPTIONS"
                          ? styles.materialOptionLabel
                          : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
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
                        {/* uncommented below line to show price */}
                        {option.price ? `(+$${option.price})` : ""}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            );
          }
        })}

      <motion.div className={styles.priceContainer} variants={itemVariants}>
        <p className={styles.price}>
          {editMode ? (
            <>
              <span style={{ fontWeight: 500 }}>Price: </span>
              <input
                className={styles.input || ""}
                style={{ width: 80 }}
                type="text"
                value={editFields.price}
                onChange={(e) =>
                  setEditFields((f) => ({ ...f, price: e.target.value }))
                }
                placeholder="Price"
              />
            </>
          ) : (
            <>
              <PriceFormatter price={totalPrice} /> <span>(inc gst)</span>
            </>
          )}
        </p>
        <span className={styles.inStock}>IN STOCK</span>
      </motion.div>

      <motion.div className={styles.buttonContainer} variants={itemVariants}>
        {editMode ? (
          <motion.button
            className={styles.enquiry}
            style={{ background: "#1741be", color: "#fff", border: "none" }}
            onClick={async () => {
              setLoading(true);
              setError("");
              setSuccess("");
              try {
                const res = await fetch("/api/update-product-master", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    p_id,
                    option_price: editFields.option_price,
                    price: editFields.price,
                  }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Update failed");
                setSuccess("Product updated successfully");
                setEditMode(false);
                if (typeof onProductUpdate === 'function') {
                  onProductUpdate();
                }
              } catch (err) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </motion.button>
        ) : (
          <motion.button
            className={styles.enquiry}
            onClick={openModal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SEND AN ENQUIRY
          </motion.button>
        )}
        {editMode && (
          <button
            className={styles.editBtn || ""}
            style={{
              marginLeft: 12,
              padding: "4px 12px",
              fontSize: 14,
              borderRadius: 4,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
            onClick={() => setEditMode(false)}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </motion.div>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
    </motion.div>
  );
};

export default ProductOptions;
