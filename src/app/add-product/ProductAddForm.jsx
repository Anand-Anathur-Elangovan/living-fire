"use client";
import React, { useState, useEffect } from "react";
import { generateSlug } from "@/src/helper/slug/slug";
import styles from "./ProductAddForm.module.css";

const ProductAddForm = ({ onSave, onCancel }) => {
  // State for form fields
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [fueltypeId, setFueltypeId] = useState("");
  const [glassOrientationIds, setGlassOrientationIds] = useState("");
  const [installationId, setInstallationId] = useState("");
  const [rangeId, setRangeId] = useState("");
  const [ptypeName, setPtypeName] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [brandSlug, setBrandSlug] = useState("");
  const [price, setPrice] = useState("");
  const [madeCountry, setMadeCountry] = useState("");
  // Add these state declarations near the top of your component
  const [editShortDesc, setEditShortDesc] = useState([]);
  const [editPrice, setEditPrice] = useState(price || "");
  // State for JSON fields
  // const [productDesc, setProductDesc] = useState(
  //   JSON.stringify([{ name: "DESCRIPTION", value: [] }], null, 2)
  // );
  // const [productDetails, setProductDetails] = useState(
  //   JSON.stringify([{ name: "Downloads", value: [] }], null, 2)
  // );

  // Add these state declarations near your other state variables
  const [heroImages, setHeroImages] = useState([{ name: "", value: "" }]);
  const [catalogueImages, setCatalogueImages] = useState([
    { name: "", value: "" },
  ]);

  // Add this state declaration near your other state variables
  const [newSpecType, setNewSpecType] = useState("energy");
  const [specifications, setSpecifications] = useState([
    {
      spec_name: "",
      spec_value: [
        {
          name: "",
          value: [
            {
              name: "",
              value: "",
            },
          ],
        },
      ],
    },
  ]);

  // Add this state declaration near your other state variables
  const [productDesc, setProductDesc] = useState([
    {
      name: "DESCRIPTION",
      value: [""],
    },
  ]);

  // Add this state declaration near your other state variables
  const [productDetails, setProductDetails] = useState([
    {
      name: "Downloads",
      value: [
        {
          name: "",
          fileurl: "",
          filename: "",
        },
      ],
    },
  ]);

  // State for dropdown options
  const [dropdownData, setDropdownData] = useState({
    brands: [],
    fueltypes: [],
    glass_orientations: [],
    installations: [],
    ranges: [],
    product_types: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch("/api/dropdown");
        if (!response.ok) throw new Error("Failed to fetch dropdown data");
        const data = await response.json();
        setDropdownData(data);
      } catch (err) {
        setError("Error loading dropdown options: " + err.message);
      }
    };

    fetchDropdownData();
  }, []);

  // Generate slugs when name or brand changes
  useEffect(() => {
    if (name) {
      const newSlug = generateSlug(name);
      setProductSlug(newSlug);
    }
  }, [name]);

  useEffect(() => {
    if (brandId) {
      const selectedBrand = dropdownData.brands.find(
        (brand) => brand.brand_id == brandId
      );
      if (selectedBrand) {
        setBrandSlug(
          selectedBrand.slug || generateSlug(selectedBrand.brand_name)
        );
      }
    }
  }, [brandId, dropdownData.brands]);

  // Handle name change with validation (no special characters)
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s]*$/.test(value)) {
      setName(value);
    }
  };

  // Handle SKU change with validation (no spaces or special characters)
  const handleSkuChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9-]*$/.test(value)) {
      setSku(value);
    }
  };

  // Handle price change with validation (only numbers and decimal point)
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  // Validate JSON fields
  const isValidJson = (input) => {
    if (typeof input === "string") {
      try {
        JSON.parse(input);
        return true;
      } catch (e) {
        return false;
      }
    } else if (typeof input === "object" && input !== null) {
      return true; // already a JSON object
    }
    return false; // anything else (e.g. number, boolean, null, undefined)
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate JSON fields
    console.log(
      "Validating JSON fields...",
      isValidJson(editShortDesc),
      isValidJson(heroImages),
      isValidJson(productDesc),
      isValidJson(productDetails),
      isValidJson(specifications),
      isValidJson(catalogueImages)
    );
    if (
      !isValidJson(editShortDesc) ||
      !isValidJson(heroImages) ||
      !isValidJson(productDesc) ||
      !isValidJson(productDetails) ||
      !isValidJson(specifications) ||
      !isValidJson(catalogueImages)
    ) {
      setError("One or more JSON fields contain invalid JSON format");
      setLoading(false);
      return;
    }

    try {
      // First create product in tbl_product to get p_id
      const productResponse = await fetch("/api/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku,
          ptype_id:
            dropdownData.product_types.find((pt) => pt.ptype_name === ptypeName)
              ?.ptype_id || "",
          is_active: isActive,
          created_by: "admin", // This should be dynamic in a real app
        }),
      });

      const productData = await productResponse.json();

      if (!productResponse.ok) {
        throw new Error(productData.error || "Failed to create product");
      }

      const p_id = productData.p_id;
      const safeParse = (input) => {
        if (typeof input === "string") {
          try {
            return JSON.parse(input);
          } catch {
            return input; // return as-is if it's not valid JSON
          }
        } else if (typeof input === "object" && input !== null) {
          return input; // already an object
        }
        return null; // fallback for other types
      };
      // Then add to master table
      const response = await fetch("/api/add-product-master", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_id,
          name,
          sku,
          brand_id: brandId,
          is_active: isActive,
          fueltype_id: fueltypeId,
          glass_orientation_ids: glassOrientationIds,
          installation_id: installationId,
          range_id: rangeId,
          ptype_name: ptypeName,
          product_slug: productSlug,
          brand_slug: brandSlug,
          price: parseFloat(price),
          made_country: madeCountry,
          short_desc: safeParse(editShortDesc),
          hero_image: safeParse(heroImages),
          product_desc: safeParse(productDesc),
          product_details: safeParse(productDetails),
          specifications: safeParse(specifications),
          catalogue_image: safeParse(catalogueImages),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add product to master table");
      }

      setSuccess("Product added successfully!");
        // Reset all form states after successful product addition
        setName("");
        setSku("");
        setBrandId("");
        setIsActive(true);
        setFueltypeId("");
        setGlassOrientationIds("");
        setInstallationId("");
        setRangeId("");
        setPtypeName("");
        setProductSlug("");
        setBrandSlug("");
        setPrice("");
        setMadeCountry("");
        setEditShortDesc([]);
        setEditPrice("");
        setHeroImages([{ name: "", value: "" }]);
        setCatalogueImages([{ name: "", value: "" }]);
        setNewSpecType("energy");
        setSpecifications([
          {
            spec_name: "",
            spec_value: [
              {
                name: "",
                value: [
                  {
                    name: "",
                    value: "",
                  },
                ],
              },
            ],
          },
        ]);
        setProductDesc([
          {
            name: "DESCRIPTION",
            value: [""],
          },
        ]);
        setProductDetails([
          {
            name: "Downloads",
            value: [
              {
                name: "",
                fileurl: "",
                filename: "",
              },
            ],
          },
        ]);
      if (onSave) onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addNewSection = () => {
    console.log("Structure Editor");
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

  // Remove problematic useEffect that causes infinite loop

  useEffect(() => {
    // Initialize with empty arrays for add product form
    setHeroImages([{ name: "", value: "" }]);
    setCatalogueImages([{ name: "", value: "" }]);
  }, []);

  // Add these helper functions for specifications
  // const addNewSpecCategory = () => {
  //   setSpecifications([
  //     ...specifications,
  //     {
  //       spec_name: "New Category",
  //       spec_value: [
  //         {
  //           name: "",
  //           value: [
  //             {
  //               name: "",
  //               value: "",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ]);
  // };
  const addNewSpecCategory = () => {
    const newCategory = {
      spec_name: "New Category",
      spec_value:
        newSpecType === "energy"
          ? [
              {
                name: "",
                value: [
                  {
                    name: "",
                    value: "",
                  },
                ],
              },
            ]
          : [
              {
                name: "",
                value: "",
              },
            ],
    };
    setSpecifications([...specifications, newCategory]);
  };

  const deleteSpecCategory = (categoryIndex) => {
    setSpecifications(specifications.filter((_, i) => i !== categoryIndex));
  };

  const addNewSpecGroup = (categoryIndex) => {
    const updated = [...specifications];
    updated[categoryIndex].spec_value.push({
      name: "",
      value: [
        {
          name: "",
          value: "",
        },
      ],
    });
    setSpecifications(updated);
  };

  const deleteSpecGroup = (categoryIndex, groupIndex) => {
    const updated = [...specifications];
    updated[categoryIndex].spec_value = updated[
      categoryIndex
    ].spec_value.filter((_, i) => i !== groupIndex);
    setSpecifications(updated);
  };

  const addNewSpecItem = (categoryIndex, groupIndex) => {
    const updated = [...specifications];
    updated[categoryIndex].spec_value[groupIndex].value.push({
      name: "",
      value: "",
    });
    setSpecifications(updated);
  };

  const deleteSpecItem = (categoryIndex, groupIndex, itemIndex) => {
    const updated = [...specifications];
    updated[categoryIndex].spec_value[groupIndex].value = updated[
      categoryIndex
    ].spec_value[groupIndex].value.filter((_, i) => i !== itemIndex);
    setSpecifications(updated);
  };

  // Add this useEffect to initialize specifications (for edit scenarios)
  useEffect(() => {
    // For add product form, start with empty structure
    setSpecifications([
      {
        spec_name: "",
        spec_value: [
          {
            name: "",
            value: [
              {
                name: "",
                value: "",
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  // Add these helper functions for product description
  const addNewDescSection = () => {
    setProductDesc([
      ...productDesc,
      {
        name: "New Section",
        value: [""],
      },
    ]);
  };

  const deleteDescSection = (sectionIndex) => {
    setProductDesc(productDesc.filter((_, i) => i !== sectionIndex));
  };

  const addNewDescItem = (sectionIndex) => {
    const updated = [...productDesc];
    updated[sectionIndex].value.push("");
    setProductDesc(updated);
  };

  const deleteDescItem = (sectionIndex, itemIndex) => {
    const updated = [...productDesc];
    updated[sectionIndex].value = updated[sectionIndex].value.filter(
      (_, i) => i !== itemIndex
    );
    setProductDesc(updated);
  };

  // Add this useEffect to initialize productDesc
  useEffect(() => {
    // For add product form, start with empty structure
    setProductDesc([
      {
        name: "DESCRIPTION",
        value: [""],
      },
    ]);
  }, []);

  // Add these helper functions for product details
  const addNewDetailsSection = () => {
    setProductDetails([
      ...productDetails,
      {
        name: "New Section",
        value: [""],
      },
    ]);
  };

  const deleteDetailsSection = (sectionIndex) => {
    setProductDetails(productDetails.filter((_, i) => i !== sectionIndex));
  };

  // Update your addNewDetailsItem function to handle different item types
  const addNewDetailsItem = (sectionIndex, itemType, presetData = null) => {
    const updated = [...productDetails];

    if (presetData) {
      // Add preset data if provided
      updated[sectionIndex].value.push(presetData);
    } else if (itemType === "download") {
      updated[sectionIndex].value.push({
        name: "",
        fileurl: "",
        filename: "",
      });
    } else if (itemType === "faq") {
      updated[sectionIndex].value.push({
        question: "",
        answer: "",
      });
    } else if (itemType === "accessory") {
      updated[sectionIndex].value.push({
        name: "",
        value: [],
      });
    } else if (itemType === "accessoryWithRemote") {
      // Add the specific remote accessory structure
      updated[sectionIndex].value.push({
        name: "Remote",
        value: [
          {
            name: "FireGenie",
            fileurl:
              "https://23909229.fs1.hubspotusercontent-1.net/hubfs/23909229/Remotes/Regency/Regency Gas-FireGenie.jpg",
            filename: "N/A",
          },
        ],
      });
    } else if (itemType === "subitem") {
      // For adding subitems to accessory categories
      const accessoryIndex = updated[sectionIndex].value.length - 1;
      if (
        updated[sectionIndex].value[accessoryIndex] &&
        updated[sectionIndex].value[accessoryIndex].value
      ) {
        updated[sectionIndex].value[accessoryIndex].value.push({
          name: "",
          fileurl: "",
          filename: "",
        });
      }
    } else {
      updated[sectionIndex].value.push("");
    }

    setProductDetails(updated);
  };

  const deleteDetailsItem = (sectionIndex, itemIndex) => {
    const updated = [...productDetails];
    updated[sectionIndex].value = updated[sectionIndex].value.filter(
      (_, i) => i !== itemIndex
    );
    setProductDetails(updated);
  };

  const deleteDetailsSubItem = (sectionIndex, itemIndex, subItemIndex) => {
    const updated = [...productDetails];
    updated[sectionIndex].value[itemIndex].value = updated[sectionIndex].value[
      itemIndex
    ].value.filter((_, i) => i !== subItemIndex);
    setProductDetails(updated);
  };

  // Add this useEffect to initialize productDetails
  useEffect(() => {
    // For add product form, start with empty structure
    setProductDetails([
      {
        name: "Downloads",
        value: [
          {
            name: "",
            fileurl: "",
            filename: "",
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className={styles.container} style={{ marginTop: "100px" }}>
       <div className={styles.buttonGroup} style={{ marginBottom: "20px" }}>
      <button
        type="button"
        onClick={() => window.location.href = '/admin'}
        className={styles.secondaryButton}
      >
        Back to Admin Page
      </button>
    </div>
      <h2 className={styles.sectionTitle}>ADD NEW PRODUCT</h2>

      <form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <div className={styles.section}>
          <h3 className={styles.subSectionTitle}>Basic Information</h3>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="name">
              PRODUCT NAME *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              className={styles.input}
              pattern="[a-zA-Z0-9 ]*"
              title="Only alphanumeric characters and spaces are allowed"
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="sku">
              SKU *
            </label>
            <input
              type="text"
              id="sku"
              value={sku}
              onChange={handleSkuChange}
              required
              className={styles.input}
              pattern="[a-zA-Z0-9\-]*"
              title="No spaces or special characters allowed (except hyphens)"
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="price">
              PRICE *
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              required
              className={styles.input}
              pattern="\d+(\.\d{1,2})?"
              title="Please enter a valid price (e.g., 100 or 100.99)"
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="madeCountry">
              MADE IN COUNTRY
            </label>
            <input
              type="text"
              id="madeCountry"
              value={madeCountry}
              onChange={(e) => setMadeCountry(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="brand">
              BRAND *
            </label>
            <select
              id="brand"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              required
              className={styles.select}
            >
              <option value="">SELECT BRAND</option>
              {dropdownData.brands
                .filter((brand) => brand.is_active)
                .map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="ptype">
              PRODUCT TYPE *
            </label>
            <select
              id="ptype"
              value={ptypeName}
              onChange={(e) => setPtypeName(e.target.value)}
              required
              className={styles.select}
            >
              <option value="">SELECT PRODUCT TYPE</option>
              {dropdownData.product_types
                .filter((ptype) => ptype.is_active)
                .map((ptype) => (
                  <option key={ptype.ptype_id} value={ptype.ptype_name}>
                    {ptype.ptype_name.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="fueltype">
              FUEL TYPE
            </label>
            <select
              id="fueltype"
              value={fueltypeId}
              onChange={(e) => setFueltypeId(e.target.value)}
              className={styles.select}
            >
              <option value="">SELECT FUEL TYPE</option>
              {dropdownData.fueltypes
                .filter((fueltype) => fueltype.is_active)
                .map((fueltype) => (
                  <option
                    key={fueltype.fueltype_id}
                    value={fueltype.fueltype_id}
                  >
                    {fueltype.fueltype_name.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="range">
              RANGE
            </label>
            <select
              id="range"
              value={rangeId}
              onChange={(e) => setRangeId(e.target.value)}
              className={styles.select}
            >
              <option value="">SELECT RANGE</option>
              {dropdownData.ranges
                .filter((range) => range.is_active)
                .map((range) => (
                  <option key={range.range_id} value={range.range_id}>
                    {range.range_name.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="installation">
              INSTALLATION
            </label>
            <select
              id="installation"
              value={installationId}
              onChange={(e) => setInstallationId(e.target.value)}
              className={styles.select}
            >
              <option value="">SELECT INSTALLATION</option>
              {dropdownData.installations
                .filter((installation) => installation.is_active)
                .map((installation) => (
                  <option
                    key={installation.installation_id}
                    value={installation.installation_id}
                  >
                    {installation.installation_name.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="glassOrientation">
              GLASS ORIENTATION
            </label>
            <select
              id="glassOrientation"
              value={glassOrientationIds}
              onChange={(e) => setGlassOrientationIds(e.target.value)}
              className={styles.select}
            >
              <option value="">SELECT GLASS ORIENTATION</option>
              {dropdownData.glass_orientations
                .filter((glass) => glass.is_active)
                .map((glass) => (
                  <option
                    key={glass.glass_orientation_id}
                    value={glass.glass_orientation_id}
                  >
                    {glass.glass_orientation_name.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className={styles.checkbox}
              />
              ACTIVE PRODUCT
            </label>
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="productSlug">
              PRODUCT SLUG
            </label>
            <input
              type="text"
              id="productSlug"
              value={productSlug}
              readOnly
              className={`${styles.input} ${styles.readOnly}`}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="brandSlug">
              BRAND SLUG
            </label>
            <input
              type="text"
              id="brandSlug"
              value={brandSlug}
              readOnly
              className={`${styles.input} ${styles.readOnly}`}
            />
          </div>
        </div>

        {/* JSON Data Sections */}
        <div className={styles.section}>
          <h3 className={styles.subSectionTitle}>
            Product Details (JSON Format)
          </h3>

          {/* <div className={styles.formField}>
            <label className={styles.label} htmlFor="shortDesc">
              SHORT DESCRIPTION (JSON)
            </label>
            <textarea
              id="shortDesc"
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className={styles.textarea}
              rows={6}
            />
          </div> */}
          <div className={styles.formField}>
            <label className={styles.label} htmlFor="shortDesc">
              SHORT DESCRIPTION (JSON)
            </label>

            <div className={styles.jsonEditorContainer}>
              {/* JSON Structure Editor */}
              <div className={styles.jsonStructureEditor}>
                <div className={styles.jsonEditorHeader}>
                  <span>Structure Editor</span>
                  <button
                    type="button"
                    className={styles.addSectionButton}
                    onClick={addNewSection}
                  >
                    + Add Section
                  </button>
                </div>

                {editShortDesc.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={styles.sectionContainer}>
                    <div className={styles.sectionHeader}>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => {
                          const updated = [...editShortDesc];
                          updated[sectionIndex].name = e.target.value;
                          setEditShortDesc(updated);
                        }}
                        className={styles.sectionNameInput}
                        placeholder="Section Name"
                      />
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => deleteSection(sectionIndex)}
                      >
                        ×
                      </button>
                    </div>

                    <div className={styles.optionsContainer}>
                      {section.value.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={styles.optionContainer}
                        >
                          <div className={styles.optionHeader}>
                            <select
                              value={option.type || ""}
                              onChange={(e) => {
                                const updated = [...editShortDesc];
                                updated[sectionIndex].value[optionIndex].type =
                                  e.target.value;
                                setEditShortDesc(updated);
                              }}
                              className={styles.optionTypeSelect}
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
                                updated[sectionIndex].value[optionIndex].price =
                                  Number(e.target.value);
                                setEditShortDesc(updated);
                              }}
                              className={styles.optionPriceInput}
                              placeholder="Price"
                            />

                            <button
                              type="button"
                              className={styles.deleteButton}
                              onClick={() =>
                                deleteOption(sectionIndex, optionIndex)
                              }
                            >
                              ×
                            </button>
                          </div>

                          <input
                            type="text"
                            value={option.name || ""}
                            onChange={(e) => {
                              const updated = [...editShortDesc];
                              updated[sectionIndex].value[optionIndex].name =
                                e.target.value;
                              setEditShortDesc(updated);
                            }}
                            className={styles.optionNameInput}
                            placeholder="Option Name"
                          />

                          <input
                            type="text"
                            value={option.image_url || ""}
                            onChange={(e) => {
                              const updated = [...editShortDesc];
                              updated[sectionIndex].value[
                                optionIndex
                              ].image_url = e.target.value;
                              setEditShortDesc(updated);
                            }}
                            className={styles.optionImageInput}
                            placeholder="Image URL"
                          />

                          {/* Value editing */}
                          <div className={styles.valuesContainer}>
                            {option.type === "radio" ||
                            section.name === "DELIVERY" ? (
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
                                    updated[sectionIndex].value[
                                      optionIndex
                                    ].value = e.target.value;
                                  } else {
                                    updated[sectionIndex].value[
                                      optionIndex
                                    ].value = [e.target.value];
                                  }
                                  setEditShortDesc(updated);
                                }}
                                className={styles.valueInput}
                                placeholder="Value"
                              />
                            ) : (
                              <div>
                                <div className={styles.valuesHeader}>
                                  <span>Values:</span>
                                  <button
                                    type="button"
                                    className={styles.addValueButton}
                                    onClick={() =>
                                      addNewValueItem(sectionIndex, optionIndex)
                                    }
                                  >
                                    + Add Value
                                  </button>
                                </div>

                                {Array.isArray(option.value) &&
                                  option.value.map((valueItem, valueIndex) => (
                                    <div
                                      key={valueIndex}
                                      className={styles.valueItem}
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
                                        className={styles.valueInput}
                                        placeholder="Value"
                                      />
                                      <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={() =>
                                          deleteValueItem(
                                            sectionIndex,
                                            optionIndex,
                                            valueIndex
                                          )
                                        }
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        className={styles.addOptionButton}
                        onClick={() => addNewOption(sectionIndex)}
                      >
                        + Add Option
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* JSON Preview */}
              <div className={styles.jsonPreview}>
                <div className={styles.jsonEditorHeader}>
                  <span>JSON Preview</span>
                </div>
                <pre className={styles.jsonPre}>
                  {JSON.stringify(editShortDesc, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* <div className={styles.formField}>
            <label className={styles.label} htmlFor="heroImage">
              HERO IMAGE (JSON)
            </label>
            <textarea
              id="heroImage"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              className={styles.textarea}
              rows={6}
            />
          </div> */}
          <div className={styles.formField}>
            <label className={styles.label} htmlFor="heroImage">
              HERO IMAGE (JSON)
            </label>

            <div className={styles.jsonEditorContainer}>
              {/* Hero Images Editor */}
              <div className={styles.jsonStructureEditor}>
                <div className={styles.jsonEditorHeader}>
                  <span>Hero Images</span>
                  <button
                    type="button"
                    className={styles.addSectionButton}
                    onClick={() =>
                      setHeroImages([...heroImages, { name: "", value: "" }])
                    }
                  >
                    + Add Hero Image
                  </button>
                </div>

                {heroImages.map((img, idx) => (
                  <div key={idx} className={styles.imageItemContainer}>
                    <div className={styles.imageInputRow}>
                      <input
                        type="text"
                        value={img.name || ""}
                        placeholder="Name"
                        className={styles.imageNameInput}
                        onChange={(e) => {
                          const updated = [...heroImages];
                          updated[idx].name = e.target.value;
                          setHeroImages(updated);
                        }}
                      />
                      <input
                        type="text"
                        value={img.value || ""}
                        placeholder="Image URL"
                        className={styles.imageUrlInput}
                        onChange={(e) => {
                          const updated = [...heroImages];
                          updated[idx].value = e.target.value;
                          setHeroImages(updated);
                        }}
                      />
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() =>
                          setHeroImages(heroImages.filter((_, i) => i !== idx))
                        }
                      >
                        ×
                      </button>
                    </div>

                    {img.value && img.value !== "TBC" && (
                      <div className={styles.imagePreviewContainer}>
                        <div className={styles.previewLabel}>Preview:</div>
                        <div className={styles.previewBox}>
                          <img
                            src={img.value}
                            alt="Preview"
                            className={styles.previewImage}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* JSON Preview */}
              <div className={styles.jsonPreview}>
                <div className={styles.jsonEditorHeader}>
                  <span>JSON Preview</span>
                </div>
                <pre className={styles.jsonPre}>
                  {JSON.stringify(heroImages, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* <div className={styles.formField}>
            <label className={styles.label} htmlFor="productDesc">
              PRODUCT DESCRIPTION (JSON)
            </label>
            <textarea
              id="productDesc"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              className={styles.textarea}
              rows={6}
            />
          </div> */}

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="productDesc">
              PRODUCT DESCRIPTION (JSON)
            </label>

            <div className={styles.jsonEditorContainer}>
              {/* Product Description Editor */}
              <div className={styles.jsonStructureEditor}>
                <div className={styles.jsonEditorHeader}>
                  <span>Product Description</span>
                  <button
                    type="button"
                    className={styles.addSectionButton}
                    onClick={addNewDescSection}
                  >
                    + Add Section
                  </button>
                </div>

                {productDesc.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={styles.sectionContainer}>
                    <div className={styles.sectionHeader}>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => {
                          const updated = [...productDesc];
                          updated[sectionIndex].name = e.target.value;
                          setProductDesc(updated);
                        }}
                        className={styles.sectionNameInput}
                        placeholder="Section Name"
                      />
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => deleteDescSection(sectionIndex)}
                      >
                        ×
                      </button>
                    </div>

                    <div className={styles.optionsContainer}>
                      {section.value.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className={styles.descItemContainer}
                        >
                          <textarea
                            value={item}
                            onChange={(e) => {
                              const updated = [...productDesc];
                              const newValues = [
                                ...updated[sectionIndex].value,
                              ];
                              newValues[itemIndex] = e.target.value;
                              updated[sectionIndex] = {
                                ...updated[sectionIndex],
                                value: newValues,
                              };
                              setProductDesc(updated);
                            }}
                            className={styles.descTextarea}
                            placeholder="Enter description text..."
                            rows={3}
                          />
                          <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() =>
                              deleteDescItem(sectionIndex, itemIndex)
                            }
                          >
                            ×
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className={styles.addOptionButton}
                        onClick={() => addNewDescItem(sectionIndex)}
                      >
                        + Add Description Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* JSON Preview */}
              <div className={styles.jsonPreview}>
                <div className={styles.jsonEditorHeader}>
                  <span>JSON Preview</span>
                </div>
                <pre className={styles.jsonPre}>
                  {JSON.stringify(productDesc, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* <div className={styles.formField}>
            <label className={styles.label} htmlFor="productDetails">
              PRODUCT DETAILS (JSON)
            </label>
            <textarea
              id="productDetails"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              className={styles.textarea}
              rows={6}
            />
          </div> */}

          <div className={styles.formField}>
            <label className={styles.label} htmlFor="productDetails">
              PRODUCT DETAILS (JSON)
            </label>

            <div className={styles.jsonEditorContainer}>
              {/* Product Details Editor */}
              <div className={styles.jsonStructureEditor}>
                <div className={styles.jsonEditorHeader}>
                  <span>Product Details</span>
                  <button
                    type="button"
                    className={styles.addSectionButton}
                    onClick={addNewDetailsSection}
                  >
                    + Add Section
                  </button>
                </div>

                {productDetails.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={styles.sectionContainer}>
                    <div className={styles.sectionHeader}>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => {
                          const updated = [...productDetails];
                          updated[sectionIndex].name = e.target.value;
                          setProductDetails(updated);
                        }}
                        className={styles.sectionNameInput}
                        placeholder="Section Name"
                        style={{ flex: 2 }}
                      />
                      <select
                        value={section.name}
                        onChange={(e) => {
                          const updated = [...productDetails];
                          const newSectionType = e.target.value;
                          updated[sectionIndex].name = newSectionType;

                          // Reset the value array when changing section type
                          if (newSectionType === "Downloads") {
                            updated[sectionIndex].value = [
                              {
                                name: "",
                                fileurl: "",
                                filename: "",
                              },
                            ];
                          } else if (newSectionType === "FAQs") {
                            updated[sectionIndex].value = [
                              {
                                question: "",
                                answer: "",
                              },
                            ];
                          } else if (newSectionType === "Accessories") {
                            updated[sectionIndex].value = [
                              {
                                name: "",
                                value: [],
                              },
                            ];
                          } else {
                            // For other types (About the brand, Installation, Custom)
                            updated[sectionIndex].value = [""];
                          }

                          setProductDetails(updated);
                        }}
                        className={styles.sectionTypeSelect}
                        style={{ flex: 1 }} // Adjust width
                      >
                        <option value="Downloads">Downloads</option>
                        <option value="FAQs">FAQs</option>
                        <option value="Accessories">Accessories</option>
                        <option value="About the brand">About the brand</option>
                        <option value="Installation">Installation</option>
                        <option value="Custom">Custom Section</option>
                      </select>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => deleteDetailsSection(sectionIndex)}
                      >
                        ×
                      </button>
                    </div>

                    <div className={styles.optionsContainer}>
                      {section.value.map((item, itemIndex) => {
                        // DOWNLOADS SECTION - Object with name, fileurl, filename
                        // DOWNLOADS SECTION - Object with name, fileurl, filename
                        if (
                          item &&
                          typeof item === "object" &&
                          item.name !== undefined &&
                          item.fileurl !== undefined
                        ) {
                          return (
                            <div key={itemIndex} className={styles.detailsItem}>
                              <div className={styles.itemHeader}>
                                <strong>Download Item:</strong>
                                <button
                                  type="button"
                                  className={styles.deleteButton}
                                  onClick={() =>
                                    deleteDetailsItem(sectionIndex, itemIndex)
                                  }
                                >
                                  ×
                                </button>
                              </div>

                              {/* NAME FIELD */}
                              <div className={styles.fieldRow}>
                                <label className={styles.fieldLabel}>
                                  Name:
                                </label>
                                <input
                                  type="text"
                                  value={item.name || ""}
                                  placeholder="e.g., brochure, spec sheet"
                                  className={styles.detailsInput}
                                  onChange={(e) => {
                                    const updated = [...productDetails];
                                    updated[sectionIndex].value[
                                      itemIndex
                                    ].name = e.target.value;
                                    setProductDetails(updated);
                                  }}
                                />
                              </div>

                              {/* FILEURL FIELD */}
                              <div className={styles.fieldRow}>
                                <label className={styles.fieldLabel}>
                                  File URL:
                                </label>
                                <input
                                  type="text"
                                  value={item.fileurl || ""}
                                  placeholder="https://example.com/file.pdf"
                                  className={styles.detailsInput}
                                  onChange={(e) => {
                                    const updated = [...productDetails];
                                    updated[sectionIndex].value[
                                      itemIndex
                                    ].fileurl = e.target.value;
                                    setProductDetails(updated);
                                  }}
                                />
                              </div>

                              {/* FILENAME FIELD */}
                              <div className={styles.fieldRow}>
                                <label className={styles.fieldLabel}>
                                  Filename:
                                </label>
                                <input
                                  type="text"
                                  value={item.filename || ""}
                                  placeholder="e.g., product-brochure.pdf"
                                  className={styles.detailsInput}
                                  onChange={(e) => {
                                    const updated = [...productDetails];
                                    updated[sectionIndex].value[
                                      itemIndex
                                    ].filename = e.target.value;
                                    setProductDetails(updated);
                                  }}
                                />
                              </div>

                              {/* URL PREVIEW (if fileurl exists) */}
                              {item.fileurl && (
                                <div className={styles.urlPreview}>
                                  <span className={styles.previewLabel}>
                                    URL Preview:
                                  </span>
                                  <a
                                    href={item.fileurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.previewLink}
                                  >
                                    {item.fileurl.length > 50
                                      ? item.fileurl.substring(0, 50) + "..."
                                      : item.fileurl}
                                  </a>
                                </div>
                              )}
                            </div>
                          );
                        }

                        // FAQ SECTION - Object with question and answer
                        else if (
                          item &&
                          typeof item === "object" &&
                          item.question !== undefined &&
                          item.answer !== undefined
                        ) {
                          return (
                            <div key={itemIndex} className={styles.detailsItem}>
                              <div className={styles.itemHeader}>
                                <strong>FAQ Item:</strong>
                                <button
                                  type="button"
                                  className={styles.deleteButton}
                                  onClick={() =>
                                    deleteDetailsItem(sectionIndex, itemIndex)
                                  }
                                >
                                  ×
                                </button>
                              </div>
                              <input
                                type="text"
                                value={item.question || ""}
                                placeholder="Question"
                                className={styles.detailsInput}
                                onChange={(e) => {
                                  const updated = [...productDetails];
                                  updated[sectionIndex].value[
                                    itemIndex
                                  ].question = e.target.value;
                                  setProductDetails(updated);
                                }}
                              />
                              <textarea
                                value={item.answer || ""}
                                placeholder="Answer"
                                className={styles.detailsTextarea}
                                onChange={(e) => {
                                  const updated = [...productDetails];
                                  updated[sectionIndex].value[
                                    itemIndex
                                  ].answer = e.target.value;
                                  setProductDetails(updated);
                                }}
                              />
                            </div>
                          );
                        }

                        // ACCESSORIES SECTION - Object with name and value array
                        else if (
                          item &&
                          typeof item === "object" &&
                          item.value &&
                          Array.isArray(item.value)
                        ) {
                          return (
                            <div key={itemIndex} className={styles.detailsItem}>
                              <div className={styles.itemHeader}>
                                <input
                                  type="text"
                                  value={item.name || ""}
                                  placeholder="Category Name"
                                  className={styles.categoryNameInput}
                                  onChange={(e) => {
                                    const updated = [...productDetails];
                                    updated[sectionIndex].value[
                                      itemIndex
                                    ].name = e.target.value;
                                    setProductDetails(updated);
                                  }}
                                />
                                <button
                                  type="button"
                                  className={styles.deleteButton}
                                  onClick={() =>
                                    deleteDetailsItem(sectionIndex, itemIndex)
                                  }
                                >
                                  ×
                                </button>
                              </div>

                              {item.value.map((subItem, subItemIndex) => (
                                <div
                                  key={subItemIndex}
                                  className={styles.subItem}
                                >
                                  <input
                                    type="text"
                                    value={subItem.name || ""}
                                    placeholder="Subitem Name"
                                    className={styles.detailsInput}
                                    onChange={(e) => {
                                      const updated = [...productDetails];
                                      updated[sectionIndex].value[
                                        itemIndex
                                      ].value[subItemIndex].name =
                                        e.target.value;
                                      setProductDetails(updated);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    value={subItem.fileurl || ""}
                                    placeholder="File URL"
                                    className={styles.detailsInput}
                                    onChange={(e) => {
                                      const updated = [...productDetails];
                                      updated[sectionIndex].value[
                                        itemIndex
                                      ].value[subItemIndex].fileurl =
                                        e.target.value;
                                      setProductDetails(updated);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    value={subItem.filename || ""}
                                    placeholder="Filename"
                                    className={styles.detailsInput}
                                    onChange={(e) => {
                                      const updated = [...productDetails];
                                      updated[sectionIndex].value[
                                        itemIndex
                                      ].value[subItemIndex].filename =
                                        e.target.value;
                                      setProductDetails(updated);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() =>
                                      deleteDetailsSubItem(
                                        sectionIndex,
                                        itemIndex,
                                        subItemIndex
                                      )
                                    }
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}

                              <button
                                type="button"
                                className={styles.addSubItemButton}
                                onClick={() =>
                                  addNewDetailsItem(sectionIndex, "subitem")
                                }
                              >
                                + Add Subitem
                              </button>
                            </div>
                          );
                        }

                        // PLAIN TEXT CONTENT
                        else if (typeof item === "string") {
                          return (
                            <div key={itemIndex} className={styles.detailsItem}>
                              <textarea
                                value={item}
                                className={styles.detailsTextarea}
                                onChange={(e) => {
                                  const updated = [...productDetails];
                                  updated[sectionIndex].value[itemIndex] =
                                    e.target.value;
                                  setProductDetails(updated);
                                }}
                              />
                              <button
                                type="button"
                                className={styles.deleteButton}
                                onClick={() =>
                                  deleteDetailsItem(sectionIndex, itemIndex)
                                }
                              >
                                ×
                              </button>
                            </div>
                          );
                        }

                        return (
                          <div key={itemIndex} className={styles.detailsItem}>
                            <pre>{JSON.stringify(item)}</pre>
                            <button
                              type="button"
                              className={styles.deleteButton}
                              onClick={() =>
                                deleteDetailsItem(sectionIndex, itemIndex)
                              }
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}

                      {/* ADD ITEM BUTTONS BASED ON SECTION TYPE */}
                      {/* ADD ITEM BUTTONS BASED ON SECTION TYPE */}
                      <div className={styles.addItemButtons}>
                        {section.name === "Downloads" && (
                          <>
                            <button
                              type="button"
                              className={styles.addItemButton}
                              onClick={() =>
                                addNewDetailsItem(sectionIndex, "download")
                              }
                            >
                              + Add Download Item
                            </button>
                          </>
                        )}

                        {section.name === "FAQs" && (
                          <button
                            type="button"
                            className={styles.addItemButton}
                            onClick={() =>
                              addNewDetailsItem(sectionIndex, "faq")
                            }
                          >
                            + Add FAQ Item
                          </button>
                        )}

                        {section.name === "Accessories" && (
                          <>
                            <button
                              type="button"
                              className={styles.addItemButton}
                              onClick={() =>
                                addNewDetailsItem(sectionIndex, "accessory")
                              }
                            >
                              + Add Accessory Category
                            </button>
                            <button
                              type="button"
                              className={styles.addItemButton}
                              onClick={() =>
                                addNewDetailsItem(
                                  sectionIndex,
                                  "accessoryWithRemote"
                                )
                              }
                            >
                              + Add Remote Accessory
                            </button>
                          </>
                        )}

                        {section.name !== "Downloads" &&
                          section.name !== "FAQs" &&
                          section.name !== "Accessories" && (
                            <button
                              type="button"
                              className={styles.addItemButton}
                              onClick={() =>
                                addNewDetailsItem(sectionIndex, "text")
                              }
                            >
                              + Add Text Content
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* JSON Preview */}
              <div className={styles.jsonPreview}>
                <div className={styles.jsonEditorHeader}>
                  <span>JSON Preview</span>
                </div>
                <pre className={styles.jsonPre}>
                  {JSON.stringify(productDetails, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* <div className={styles.formField}>
            <label className={styles.label} htmlFor="specifications">
              SPECIFICATIONS (JSON)
            </label>
            <textarea
              id="specifications"
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              className={styles.textarea}
              rows={6}
            />
          </div> */}
          <div className={styles.formField}>
            <label className={styles.label} htmlFor="specifications">
              SPECIFICATIONS (JSON)
            </label>

            <div className={styles.jsonEditorContainer}>
              {/* Specifications Editor */}
              <div className={styles.jsonStructureEditor}>
                <div className={styles.jsonEditorHeader}>
                  <span>Specifications</span>
                  {/* <button
                    type="button"
                    className={styles.addSectionButton}
                    onClick={addNewSpecCategory}
                  >
                    + Add Category
                  </button> */}
                  <div className={styles.specTypeSelector}>
                    <select
                      value={newSpecType}
                      onChange={(e) => setNewSpecType(e.target.value)}
                      className={styles.typeDropdown}
                    >
                      <option value="energy">Energy Specification</option>
                      <option value="general">General Specification</option>
                    </select>
                    <button
                      type="button"
                      className={styles.addSectionButton}
                      onClick={addNewSpecCategory}
                    >
                      + Add Category
                    </button>
                  </div>
                </div>

                {specifications.map((category, categoryIndex) => (
                  <div key={categoryIndex} className={styles.sectionContainer}>
                    <div className={styles.sectionHeader}>
                      <input
                        type="text"
                        value={category.spec_name}
                        onChange={(e) => {
                          const updated = [...specifications];
                          updated[categoryIndex].spec_name = e.target.value;
                          setSpecifications(updated);
                        }}
                        className={styles.sectionNameInput}
                        placeholder="Category Name"
                      />
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => deleteSpecCategory(categoryIndex)}
                      >
                        ×
                      </button>
                    </div>

                    <div className={styles.optionsContainer}>
                      {/* {category.spec_value.map((group, groupIndex) => (
                        <div
                          key={groupIndex}
                          className={styles.optionContainer}
                        >
                          <div className={styles.optionHeader}>
                            <input
                              type="text"
                              value={group.name}
                              onChange={(e) => {
                                const updated = [...specifications];
                                updated[categoryIndex].spec_value[
                                  groupIndex
                                ].name = e.target.value;
                                setSpecifications(updated);
                              }}
                              className={styles.optionNameInput}
                              placeholder="Group Name"
                            />
                            <button
                              type="button"
                              className={styles.deleteButton}
                              onClick={() =>
                                deleteSpecGroup(categoryIndex, groupIndex)
                              }
                            >
                              ×
                            </button>
                          </div>

                          <div className={styles.valuesContainer}>
                            <div className={styles.valuesHeader}>
                              <span>Specification Items:</span>
                              <button
                                type="button"
                                className={styles.addValueButton}
                                onClick={() =>
                                  addNewSpecItem(categoryIndex, groupIndex)
                                }
                              >
                                + Add Item
                              </button>
                            </div>

                            {group.value.map((item, itemIndex) => (
                              <div key={itemIndex} className={styles.valueItem}>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => {
                                    const updated = [...specifications];
                                    updated[categoryIndex].spec_value[
                                      groupIndex
                                    ].value[itemIndex].name = e.target.value;
                                    setSpecifications(updated);
                                  }}
                                  className={styles.valueInput}
                                  placeholder="Spec Name"
                                />
                                <input
                                  type="text"
                                  value={item.value}
                                  onChange={(e) => {
                                    const updated = [...specifications];
                                    updated[categoryIndex].spec_value[
                                      groupIndex
                                    ].value[itemIndex].value = e.target.value;
                                    setSpecifications(updated);
                                  }}
                                  className={styles.valueInput}
                                  placeholder="Spec Value"
                                />
                                <button
                                  type="button"
                                  className={styles.deleteButton}
                                  onClick={() =>
                                    deleteSpecItem(
                                      categoryIndex,
                                      groupIndex,
                                      itemIndex
                                    )
                                  }
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))} */}
                      {category.spec_value.map((group, groupIndex) => (
                        <div
                          key={groupIndex}
                          className={styles.optionContainer}
                        >
                          <div className={styles.optionHeader}>
                            <input
                              type="text"
                              value={group.name}
                              onChange={(e) => {
                                const updated = [...specifications];
                                updated[categoryIndex].spec_value[
                                  groupIndex
                                ].name = e.target.value;
                                setSpecifications(updated);
                              }}
                              className={styles.optionNameInput}
                              placeholder="Group Name"
                            />
                            <button
                              type="button"
                              className={styles.deleteButton}
                              onClick={() =>
                                deleteSpecGroup(categoryIndex, groupIndex)
                              }
                            >
                              ×
                            </button>
                          </div>

                          {/* Conditional rendering based on structure type */}
                          {Array.isArray(group.value) ? (
                            // Energy specification rendering (nested)
                            <div className={styles.valuesContainer}>
                              <div className={styles.valuesHeader}>
                                <span>Specification Items:</span>
                                <button
                                  type="button"
                                  className={styles.addValueButton}
                                  onClick={() =>
                                    addNewSpecItem(categoryIndex, groupIndex)
                                  }
                                >
                                  + Add Item
                                </button>
                              </div>

                              {group.value.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className={styles.valueItem}
                                >
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => {
                                      const updated = [...specifications];
                                      updated[categoryIndex].spec_value[
                                        groupIndex
                                      ].value[itemIndex].name = e.target.value;
                                      setSpecifications(updated);
                                    }}
                                    className={styles.valueInput}
                                    placeholder="Spec Name"
                                  />
                                  <input
                                    type="text"
                                    value={item.value}
                                    onChange={(e) => {
                                      const updated = [...specifications];
                                      updated[categoryIndex].spec_value[
                                        groupIndex
                                      ].value[itemIndex].value = e.target.value;
                                      setSpecifications(updated);
                                    }}
                                    className={styles.valueInput}
                                    placeholder="Spec Value"
                                  />
                                  <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() =>
                                      deleteSpecItem(
                                        categoryIndex,
                                        groupIndex,
                                        itemIndex
                                      )
                                    }
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // General specification rendering (flat)
                            <div className={styles.valuesContainer}>
                              <div className={styles.valuesHeader}>
                                <span>Value:</span>
                              </div>
                              <div className={styles.valueItem}>
                                <input
                                  type="text"
                                  value={group.value}
                                  onChange={(e) => {
                                    const updated = [...specifications];
                                    updated[categoryIndex].spec_value[
                                      groupIndex
                                    ].value = e.target.value;
                                    setSpecifications(updated);
                                  }}
                                  className={styles.valueInput}
                                  placeholder="Spec Value"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        className={styles.addOptionButton}
                        onClick={() => addNewSpecGroup(categoryIndex)}
                      >
                        + Add Group
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* JSON Preview */}
              <div className={styles.jsonPreview}>
                <div className={styles.jsonEditorHeader}>
                  <span>JSON Preview</span>
                </div>
                <pre className={styles.jsonPre}>
                  {JSON.stringify(specifications, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* <div className={styles.formField}>
            <label className={styles.label} htmlFor="catalogueImage">
              CATALOGUE IMAGE (JSON)
            </label>
            <textarea
              id="catalogueImage"
              value={catalogueImage}
              onChange={(e) => setCatalogueImage(e.target.value)}
              className={styles.textarea}
              rows={6}
            />
          </div> */}
          <div className={styles.formField}>
            <label className={styles.label} htmlFor="catalogueImage">
              CATALOGUE IMAGE (JSON)
            </label>

            <div className={styles.jsonEditorContainer}>
              {/* Catalogue Images Editor */}
              <div className={styles.jsonStructureEditor}>
                <div className={styles.jsonEditorHeader}>
                  <span>Catalogue Images</span>
                  <button
                    type="button"
                    className={styles.addSectionButton}
                    onClick={() =>
                      setCatalogueImages([
                        ...catalogueImages,
                        { name: "", value: "" },
                      ])
                    }
                  >
                    + Add Catalogue Image
                  </button>
                </div>

                {catalogueImages.map((img, idx) => (
                  <div key={idx} className={styles.imageItemContainer}>
                    <div className={styles.imageInputRow}>
                      <input
                        type="text"
                        value={img.name || ""}
                        placeholder="Name"
                        className={styles.imageNameInput}
                        onChange={(e) => {
                          const updated = [...catalogueImages];
                          updated[idx].name = e.target.value;
                          setCatalogueImages(updated);
                        }}
                      />
                      <input
                        type="text"
                        value={img.value || ""}
                        placeholder="Image URL"
                        className={styles.imageUrlInput}
                        onChange={(e) => {
                          const updated = [...catalogueImages];
                          updated[idx].value = e.target.value;
                          setCatalogueImages(updated);
                        }}
                      />
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() =>
                          setCatalogueImages(
                            catalogueImages.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        ×
                      </button>
                    </div>

                    {img.value && img.value !== "TBC" && (
                      <div className={styles.imagePreviewContainer}>
                        <div className={styles.previewLabel}>Preview:</div>
                        <div className={styles.previewBox}>
                          <img
                            src={img.value}
                            alt="Preview"
                            className={styles.previewImage}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* JSON Preview */}
              <div className={styles.jsonPreview}>
                <div className={styles.jsonEditorHeader}>
                  <span>JSON Preview</span>
                </div>
                <pre className={styles.jsonPre}>
                  {JSON.stringify(catalogueImages, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={loading}
            className={styles.primaryButton}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={styles.secondaryButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAddForm;
