"use client"
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
  
  // State for JSON fields
  const [shortDesc, setShortDesc] = useState(JSON.stringify([{"name": "Package", "value": []}], null, 2));
  const [heroImage, setHeroImage] = useState(JSON.stringify([{"name": "", "value": ""}], null, 2));
  const [productDesc, setProductDesc] = useState(JSON.stringify([{"name": "DESCRIPTION", "value": []}], null, 2));
  const [productDetails, setProductDetails] = useState(JSON.stringify([{"name": "Downloads", "value": []}], null, 2));
  const [specifications, setSpecifications] = useState(JSON.stringify([{"spec_name": "", "spec_value": []}], null, 2));
  const [catalogueImage, setCatalogueImage] = useState(JSON.stringify([{"name": "", "value": ""}], null, 2));

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
  const isValidJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate JSON fields
    if (!isValidJson(shortDesc) || 
        !isValidJson(heroImage) || 
        !isValidJson(productDesc) || 
        !isValidJson(productDetails) || 
        !isValidJson(specifications) || 
        !isValidJson(catalogueImage)) {
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
          ptype_id: dropdownData.product_types.find(pt => pt.ptype_name === ptypeName)?.ptype_id || "",
          is_active: isActive,
          created_by: "admin", // This should be dynamic in a real app
        }),
      });

      const productData = await productResponse.json();

      if (!productResponse.ok) {
        throw new Error(productData.error || "Failed to create product");
      }

      const p_id = productData.p_id;

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
          short_desc: JSON.parse(shortDesc),
          hero_image: JSON.parse(heroImage),
          product_desc: JSON.parse(productDesc),
          product_details: JSON.parse(productDetails),
          specifications: JSON.parse(specifications),
          catalogue_image: JSON.parse(catalogueImage),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add product to master table");
      }

      setSuccess("Product added successfully!");
      if (onSave) onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
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
              pattern="[a-zA-Z0-9\s]+"
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
              pattern="[a-zA-Z0-9-]+"
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
                  <option key={fueltype.fueltype_id} value={fueltype.fueltype_id}>
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
                  <option key={installation.installation_id} value={installation.installation_id}>
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
                  <option key={glass.glass_orientation_id} value={glass.glass_orientation_id}>
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
          <h3 className={styles.subSectionTitle}>Product Details (JSON Format)</h3>
          
          <div className={styles.formField}>
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
          </div>

          <div className={styles.formField}>
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
          </div>

          <div className={styles.formField}>
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
          </div>

          <div className={styles.formField}>
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
          </div>

          <div className={styles.formField}>
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
          </div>

          <div className={styles.formField}>
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