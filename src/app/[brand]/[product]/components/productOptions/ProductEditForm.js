/* eslint-disable react/display-name */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { generateSlug } from "@/src/helper/slug/slug";
// Add at the top of your file
import styles from "./ProductEditForm.module.css";

const ProductEditForm = forwardRef(
  (
    {
      p_id,
      name: initialName,
      sku: initialSku,
      brand_id: initialBrandId,
      is_active: initialIsActive,
      fueltype_id: initialFueltypeId,
      glass_orientation_ids: initialGlassOrientationIds,
      installation_id: initialInstallationId,
      range_id: initialRangeId,
      ptype_name: initialPtypeName,
      product_slug: initialProductSlug,
      brand_slug: initialBrandSlug,
      short_desc, // Add this prop
      price, // Add this prop
      onSave,
      onCancel,
    },
    ref
  ) => {
    // State for form fields
    const [name, setName] = useState(initialName || "");
    const [sku, setSku] = useState(initialSku || "");
    const [brandId, setBrandId] = useState(initialBrandId || "");
    const [isActive, setIsActive] = useState(
      initialIsActive !== undefined ? initialIsActive : true
    );
    const [fueltypeId, setFueltypeId] = useState(initialFueltypeId || "");
    const [glassOrientationIds, setGlassOrientationIds] = useState(
      initialGlassOrientationIds || ""
    );
    const [installationId, setInstallationId] = useState(
      initialInstallationId || ""
    );
    const [rangeId, setRangeId] = useState(initialRangeId || "");
    const [ptypeName, setPtypeName] = useState(initialPtypeName || "");
    const [productSlug, setProductSlug] = useState(initialProductSlug || "");
    const [brandSlug, setBrandSlug] = useState(initialBrandSlug || "");
    //   const [price, setPrice] = useState(initialPrice || "");
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
      // Allow only alphanumeric characters and spaces
      if (/^[a-zA-Z0-9\s]*$/.test(value)) {
        setName(value);
      }
    };

    // Handle SKU change with validation (no spaces or special characters)
    const handleSkuChange = (e) => {
      const value = e.target.value;
      // Allow only alphanumeric characters
      if (/^[a-zA-Z0-9]*$/.test(value)) {
        setSku(value);
      }
    };
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        handleSubmit(new Event("submit")); // Simulate form submission
      },
    }));
    // Handle form submission
    const handleSubmit = async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const response = await fetch("/api/update-product-master", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            p_id,
            name,
            sku,
            brand_id: brandId  ===""? null: brandId,
            is_active: isActive,
            fueltype_id: fueltypeId  ===""? null: fueltypeId,
            glass_orientation_ids: glassOrientationIds,
            installation_id: installationId  ===""? null: installationId,
            range_id: rangeId ===""? null: rangeId,
            ptype_name: ptypeName,
            product_slug: productSlug,
            brand_slug: brandSlug,
            short_desc,
            price: parseFloat(price),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to update product");
        }

        setSuccess("Product updated successfully in product edit form.");
        if (onSave)
          onSave({
            ...data,
            brand_slug: brandSlug, // Pass the updated brand_slug
            product_slug: productSlug, // Pass the updated product_slug
          });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      //   <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      //     <h2>Edit Product</h2>
      <div
        className={styles.container}
        style={{ padding: "16px", marginBottom: "24px" }}
      >
        <h2
          className={styles.sectionTitle}
          style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}
        >
          EDIT PRODUCT DETAILS
        </h2>

        <form onSubmit={handleSubmit}>
          {/* <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
              pattern="[a-zA-Z0-9\s]+"
              title="Only alphanumeric characters and spaces are allowed"
            />
          </div> */}
          <div className={styles.formField} style={{ marginBottom: "16px" }}>
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

          {/* SKU Field */}
          
                <div className={styles.formField} style={{ marginBottom: "16px" }}>
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
              pattern="[a-zA-Z0-9]+"
              title="No spaces or special characters allowed"
            />
          </div>

          {/* Brand Dropdown */}
          {/* <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="brand"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Brand *
            </label>
            <select
              id="brand"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="">Select Brand</option>
              {dropdownData.brands
                .filter((brand) => brand.is_active)
                .map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {brand.brand_name}
                  </option>
                ))}
            </select>
          </div> */}
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

          {/* Active Status */}
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

          {/* Fuel Type Dropdown */}
          {/* <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="fueltype"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Fuel Type
            </label>
            <select
              id="fueltype"
              value={fueltypeId}
              onChange={(e) => setFueltypeId(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="">Select Fuel Type</option>
              {dropdownData.fueltypes
                .filter((fueltype) => fueltype.is_active)
                .map((fueltype) => (
                  <option
                    key={fueltype.fueltype_id}
                    value={fueltype.fueltype_id}
                  >
                    {fueltype.fueltype_name}
                  </option>
                ))}
            </select>
          </div> */}

          {/* Glass Orientation Dropdown */}
          {/* <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="glassOrientation"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Glass Orientation
            </label>
            <select
              id="glassOrientation"
              value={glassOrientationIds}
              onChange={(e) => setGlassOrientationIds(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="">Select Glass Orientation</option>
              {dropdownData.glass_orientations
                .filter((glass) => glass.is_active)
                .map((glass) => (
                  <option
                    key={glass.glass_orientation_id}
                    value={glass.glass_orientation_id}
                  >
                    {glass.glass_orientation_name}
                  </option>
                ))}
            </select>
          </div> */}

          {/* Installation Dropdown */}
          {/* <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="installation"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Installation
            </label>
            <select
              id="installation"
              value={installationId}
              onChange={(e) => setInstallationId(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="">Select Installation</option>
              {dropdownData.installations
                .filter((installation) => installation.is_active)
                .map((installation) => (
                  <option
                    key={installation.installation_id}
                    value={installation.installation_id}
                  >
                    {installation.installation_name}
                  </option>
                ))}
            </select>
          </div> */}

          {/* Range Dropdown */}
          {/* <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="range"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Range
            </label>
            <select
              id="range"
              value={rangeId}
              onChange={(e) => setRangeId(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="">Select Range</option>
              {dropdownData.ranges
                .filter((range) => range.is_active)
                .map((range) => (
                  <option key={range.range_id} value={range.range_id}>
                    {range.range_name}
                  </option>
                ))}
            </select>
          </div> */}

          {/* Product Type Dropdown */}
          {/* <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="ptype"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Product Type *
            </label>
            <select
              id="ptype"
              value={ptypeName}
              onChange={(e) => setPtypeName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="">Select Product Type</option>
              {dropdownData.product_types
                .filter((ptype) => ptype.is_active)
                .map((ptype) => (
                  <option key={ptype.ptype_id} value={ptype.ptype_name}>
                    {ptype.ptype_name}
                  </option>
                ))}
            </select>
          </div> */}
            {/* Fuel Type Dropdown */}
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

{/* Glass Orientation Dropdown */}
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

{/* Installation Dropdown */}
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

{/* Range Dropdown */}
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

{/* Product Type Dropdown */}
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
          {/* Product Slug (read-only) */}
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

          {/* Brand Slug (read-only) */}
          
                <div className={styles.formField}>
            <label className={styles.label} htmlFor="brandSlug">
              Brand Slug
            </label>
            <input
              type="text"
              id="brandSlug"
              value={brandSlug}
              readOnly
              className={`${styles.input} ${styles.readOnly}`}
            />
          </div>

          {/* Error and Success Messages */}
          {error && <div className={styles.error}>{error}</div>}

          {success && <div className={styles.success}>{success}</div>}

          {/* Buttons */}
          {/* <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
             onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1741be',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div> */}
        </form>
      </div>
    );
  }
);

export default ProductEditForm;
