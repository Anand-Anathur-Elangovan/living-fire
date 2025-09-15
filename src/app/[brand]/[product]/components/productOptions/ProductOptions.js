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
import { generateSlug } from "@/src/helper/slug/slug";

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
  ptype_name,
  brand_id,
  fueltype_id,
  range_id,
  is_active,
  installation_id,
  glass_orientation_ids,
  brand_slug,
  product_slug
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(price);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editShortDesc, setEditShortDesc] = useState([]);
  const [editPrice, setEditPrice] = useState(price || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
const getSortedSections = (sections) => {
  if (!sections) return [];
  
  const deliverySection = sections.find(section => section.name === "DELIVERY");
  const otherSections = sections.filter(section => section.name !== "DELIVERY");
  
  return [...otherSections, ...(deliverySection ? [deliverySection] : [])];
};

  useEffect(() => {
    if (containerRef.current && typeof setProductOptionsHeight === "function") {
      setProductOptionsHeight(containerRef.current.offsetHeight);
    }
  }, [selectedOptions, totalPrice, short_desc, editMode, editShortDesc]);

  useEffect(() => {
    if (short_desc && !editMode) {
      setEditShortDesc(JSON.parse(JSON.stringify(short_desc)));
      setEditPrice(price || "");
    }
  }, [short_desc, price, editMode]);

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
    let newPrice = Number(editPrice) || 0;

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

  const addNewSection = () => {
    setEditShortDesc([
      ...editShortDesc,
      {
        name: "New Section",
        value: [
          {
            name: null,
            type: "checkbox",
            price: 0,
            value: ["New Option"],
            image_url: null,
          },
        ],
      },
    ]);
  };

  const deleteSection = (sectionIndex) => {
    setEditShortDesc(editShortDesc.filter((_, i) => i !== sectionIndex));
  };

  const addNewOption = (sectionIndex) => {
    const updated = [...editShortDesc];
    updated[sectionIndex].value.push({
      name: null,
      type: "checkbox",
      price: 0,
      value: ["New Option"],
      image_url: null,
    });
    setEditShortDesc(updated);
  };

  const deleteOption = (sectionIndex, optionIndex) => {
    const updated = [...editShortDesc];
    updated[sectionIndex].value = updated[sectionIndex].value.filter(
      (_, i) => i !== optionIndex
    );
    setEditShortDesc(updated);
  };

  const addNewValueItem = (sectionIndex, optionIndex) => {
    const updated = [...editShortDesc];
    if (Array.isArray(updated[sectionIndex].value[optionIndex].value)) {
      updated[sectionIndex].value[optionIndex].value.push("New Value");
    } else {
      updated[sectionIndex].value[optionIndex].value = ["New Value"];
    }
    setEditShortDesc(updated);
  };

  const deleteValueItem = (sectionIndex, optionIndex, valueIndex) => {
    const updated = [...editShortDesc];
    updated[sectionIndex].value[optionIndex].value = updated[
      sectionIndex
    ].value[optionIndex].value.filter((_, i) => i !== valueIndex);
    setEditShortDesc(updated);
  };

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
          marginBottom: 16,
        }}
      >
        <h1 className={styles.title} style={{ marginBottom: 0 }}>
          <span className={styles.brand}>{brand_name}</span> <br />
          {name?.toUpperCase()}
        </h1>

        {!editMode && isAdmin && (
          <button
            style={{
              padding: "6px 12px",
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
        {p_sku}
      </motion.p>

      <motion.p className={styles.subtitle} variants={itemVariants}>
        Build your product
      </motion.p>

      {/* Edit Mode Controls */}
      {editMode && (
        <div
          style={{
            marginBottom: 24,
            padding: 16,
            border: "1px solid #e0e0e0",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <label style={{ fontWeight: "bold" }}>Base Price:</label>
            <input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              style={{
                padding: "4px 8px",
                border: "1px solid #ccc",
                borderRadius: 4,
                width: 100,
              }}
            />
            <button
              style={{
                padding: "6px 12px",
                fontSize: 13,
                borderRadius: 4,
                border: "1px solid #28a745",
                background: "#fff",
                color: "#28a745",
                cursor: "pointer",
              }}
              onClick={addNewSection}
            >
              Add Section
            </button>
          </div>

          {getSortedSections(editShortDesc).map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              style={{
                marginBottom: 20,
                padding: 12,
                border: "1px solid #ddd",
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => {
                    const updated = [...editShortDesc];
                    updated[sectionIndex].name = e.target.value;
                    setEditShortDesc(updated);
                  }}
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    fontWeight: "bold",
                  }}
                  placeholder="Section Name"
                />
                <button
                  style={{
                    padding: "4px 8px",
                    fontSize: 12,
                    borderRadius: 4,
                    border: "1px solid #e00",
                    background: "#fff",
                    color: "#e00",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteSection(sectionIndex)}
                >
                  Delete Section
                </button>
                <button
                  style={{
                    padding: "4px 8px",
                    fontSize: 12,
                    borderRadius: 4,
                    border: "1px solid #1741be",
                    background: "#fff",
                    color: "#1741be",
                    cursor: "pointer",
                  }}
                  onClick={() => addNewOption(sectionIndex)}
                >
                  Add Option
                </button>
              </div>

              {section.value.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  style={{
                    marginLeft: 20,
                    marginBottom: 12,
                    padding: 8,
                    border: "1px solid #eee",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <input
                      type="text"
                      value={option.name || ""}
                      onChange={(e) => {
                        const updated = [...editShortDesc];
                        updated[sectionIndex].value[optionIndex].name =
                          e.target.value;
                        setEditShortDesc(updated);
                      }}
                      style={{
                        width: 120,
                        padding: "4px 6px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                      placeholder="Option Name"
                    />
                    <select
                      value={option.type || ""}
                      onChange={(e) => {
                        const updated = [...editShortDesc];
                        updated[sectionIndex].value[optionIndex].type =
                          e.target.value;
                        setEditShortDesc(updated);
                      }}
                      style={{
                        width: 100,
                        padding: "4px 6px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                    >
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio</option>
                      <option value="">None</option>
                    </select>
                    <input
                      type="number"
                      value={option.price || 0}
                      onChange={(e) => {
                        const updated = [...editShortDesc];
                        updated[sectionIndex].value[optionIndex].price = Number(
                          e.target.value
                        );
                        setEditShortDesc(updated);
                      }}
                      style={{
                        width: 80,
                        padding: "4px 6px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                      placeholder="Price"
                    />
                    <input
                      type="text"
                      value={option.image_url || ""}
                      onChange={(e) => {
                        const updated = [...editShortDesc];
                        updated[sectionIndex].value[optionIndex].image_url =
                          e.target.value;
                        setEditShortDesc(updated);
                      }}
                      style={{
                        flex: 1,
                        padding: "4px 6px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                      placeholder="Image URL"
                    />
                    <button
                      style={{
                        padding: "2px 6px",
                        fontSize: 11,
                        borderRadius: 4,
                        border: "1px solid #e00",
                        background: "#fff",
                        color: "#e00",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteOption(sectionIndex, optionIndex)}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Value editing - Handle both array and string values */}
                  <div style={{ marginLeft: 20 }}>
                    {option.type === "radio" || section.name === "DELIVERY" ? (
                      // For radio/DELIVERY options, use a single text input
                      <div style={{ marginBottom: 8 }}>
                        <strong>Value:</strong>
                        <input
                          type="text"
                          value={
                            typeof option.value === "string"
                              ? option.value
                              : option.value?.[0] || ""
                          }
                          onChange={(e) => {
                            const updated = [...editShortDesc];
                            if (section.name === "DELIVERY") {
                              updated[sectionIndex].value[optionIndex].value =
                                e.target.value;
                            } else {
                              updated[sectionIndex].value[optionIndex].value = [
                                e.target.value,
                              ];
                            }
                            setEditShortDesc(updated);
                          }}
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            marginTop: 4,
                          }}
                          placeholder="Value"
                        />
                      </div>
                    ) : (
                      // For checkbox options, use the array editing
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 8,
                          }}
                        >
                          <strong>Values:</strong>
                          <button
                            style={{
                              padding: "2px 6px",
                              fontSize: 11,
                              borderRadius: 4,
                              border: "1px solid #28a745",
                              background: "#fff",
                              color: "#28a745",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              addNewValueItem(sectionIndex, optionIndex)
                            }
                          >
                            Add Value
                          </button>
                        </div>

                        {Array.isArray(option.value) &&
                          option.value.map((valueItem, valueIndex) => (
                            <div
                              key={valueIndex}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 4,
                              }}
                            >
                              <input
                                type="text"
                                value={valueItem}
                                onChange={(e) => {
                                  const updated = [...editShortDesc];
                                  updated[sectionIndex].value[
                                    optionIndex
                                  ].value[valueIndex] = e.target.value;
                                  setEditShortDesc(updated);
                                }}
                                style={{
                                  flex: 1,
                                  padding: "4px 6px",
                                  border: "1px solid #ccc",
                                  borderRadius: 4,
                                }}
                                placeholder="Value"
                              />
                              <button
                                style={{
                                  padding: "2px 6px",
                                  fontSize: 11,
                                  borderRadius: 4,
                                  border: "1px solid #e00",
                                  background: "#fff",
                                  color: "#e00",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  deleteValueItem(
                                    sectionIndex,
                                    optionIndex,
                                    valueIndex
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Display Mode */}
      {/* Display Mode - Non-edit mode */}
{!editMode && getSortedSections(short_desc).map((section, index) => {
  // Regular sections (non-MATERIAL & FINISH OPTIONS, non-DELIVERY)
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

        <div>
          {section.value.map((option, optionIndex) => {
            return (
              <motion.label
                key={optionIndex}
                className={`${styles.option}`}
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
                    option.value?.map((optionVal, idx) => {
                      return <span key={idx}> {optionVal}</span>;
                    })
                  ) : (
                    <span> {option.value}</span>
                  )}
                  {option.price ? `(+$${option.price})` : ""}
                </div>
              </motion.label>
            );
          })}
        </div>
      </motion.div>
    );
  }
  
  // MATERIAL & FINISH OPTIONS section
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
  
  // DELIVERY section (will always be last due to sorting)
  if (section.name === "DELIVERY") {
    return (
      <motion.div
        key={index}
        className={styles.section}
        variants={itemVariants}
      >
        <h3 className={styles.sectionTitle}>{section.name}</h3>

        <div>
          {section.value.map((option, optionIndex) => (
            <motion.label
              key={optionIndex}
              className={`${styles.option}`}
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
                {option.price ? `(+$${option.price})` : ""}
              </span>
            </motion.label>
          ))}
        </div>
      </motion.div>
    );
  }
  
  return null;
})}

      <motion.div className={styles.priceContainer} variants={itemVariants}>
        <p className={styles.price}>
          {editMode ? (
            <>
              <span style={{ fontWeight: 500 }}>Base Price: </span>
              <PriceFormatter price={editPrice} />
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
          <>
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
                      ptype_name,
                      short_desc: editShortDesc,
                      price: editPrice,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error || "Update failed");
                  setSuccess("Product updated successfully");
                  setEditMode(false);
                  if (typeof onProductUpdate === "function") {
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
            <button
              style={{
                marginLeft: 12,
                padding: "8px 16px",
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
          </>
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
      </motion.div>

      {error && (
        <div
          style={{
            color: "red",
            marginTop: 8,
            padding: 8,
            backgroundColor: "#ffe6e6",
            borderRadius: 4,
          }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            color: "green",
            marginTop: 8,
            padding: 8,
            backgroundColor: "#e6ffe6",
            borderRadius: 4,
          }}
        >
          {success}
        </div>
      )}
    </motion.div>
  );
};

export default ProductOptions;
