import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiArrowLeft,
  FiEdit,
  FiSave,
  FiX,
  FiTrash2,
} from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { generateSlug } from "@/src/helper/slug/slug";

const OurBrands = ({ allProductsRouteHandler, isAdmin }) => {
  const router = useRouter();
  const [prefetchedBrands, setPrefetchedBrands] = useState(new Set());
  const [brands, setBrands] = useState([]);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const carouselRef = useRef(null);
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Fetch brands if not provided via props
  useEffect(() => {
    // if (!brandList || brandList.length === 0) {
    fetchBrands();
    // }
  }, []);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/get-brands-details");
      const result = await response.json();

      if (result.success) {
        setBrands(result.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll animation for desktop
  useEffect(() => {
    if (isMobile || brands.length === 0) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prev) => (prev + 1) % brands.length);
        controls.start({
          x: `-${(currentIndex + 1) * 200}px`,
          transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering, controls, brands.length, isMobile]);

  // Prefetch brand route on hover
  const handleBrandHover = (brand) => {
    if (!prefetchedBrands.has(brand.brand_id)) {
      router?.prefetch(`/allProducts/${brand.route}`);
      setPrefetchedBrands((prev) => new Set(prev).add(brand.brand_id));
    }
  };

  // Manual scroll handlers for desktop
  const scrollLeft = () => {
    if (isMobile || brands.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length);
    controls.start({
      x: `-${((currentIndex - 1 + brands.length) % brands.length) * 200}px`,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    });
  };

  const scrollRight = () => {
    if (isMobile || brands.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % brands.length);
    controls.start({
      x: `-${((currentIndex + 1) % brands.length) * 200}px`,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    });
  };

  // Edit brand handlers
  const handleEditClick = (brand) => {
    setEditingBrand(brand.brand_id);
    setEditFormData({
      brand_name: brand.brand_name,
      brand_desc: brand.brand_desc || "",
      brand_logo_url: brand.brand_logo_url,
      is_active: brand.is_active,
    });
  };

  const handleCancelEdit = () => {
    setEditingBrand(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!editFormData.brand_name?.trim()) {
      alert("Brand name is required");
      return;
    }

    try {
      setIsLoading(true);
      const isNewBrand = editingBrand === 'new';
    const apiUrl = isNewBrand ? '/api/create-brands-details' : '/api/update-brands-details';
    const method = isNewBrand ? 'POST' : 'PUT';

      const response = await fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
          body: JSON.stringify({
        ...(isNewBrand ? {} : { brand_id: editingBrand }),
        ...editFormData,
        slug: generateSlug(editFormData.brand_name)
      }),
      });

      const result = await response.json();

      if (result.success) {
      if (isNewBrand) {
        // Add new brand to state
        setBrands(prev => [...prev, result.data]);
      } else {
        // Update existing brand
        setBrands(prev => prev.map(brand => 
          brand.brand_id === editingBrand 
            ? { ...brand, ...editFormData, slug: generateSlug(editFormData.brand_name) }
            : brand
        ));
      }
      setEditingBrand(null);
      setEditFormData({});
    } else {
      alert(`Failed to ${isNewBrand ? 'create' : 'update'} brand: ` + result.error);
    }
  } catch (error) {
    console.error(`Error ${editingBrand === 'new' ? 'creating' : 'updating'} brand:`, error);
    alert(`Failed to ${editingBrand === 'new' ? 'create' : 'update'} brand`);
  } finally {
    setIsLoading(false);
  }
};

  const handleDeleteBrand = async (brandId) => {
    if (!confirm("Are you sure you want to delete this brand?")) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/delete-brands-details", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand_id: brandId }),
      });

      const result = await response.json();

      if (result.success) {
        setBrands((prev) => prev.filter((brand) => brand.brand_id !== brandId));
      } else {
        alert("Failed to delete brand: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("Failed to delete brand");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (isLoading && brands.length === 0) {
    return (
      <section className="relative w-full bg-white py-8 md:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading brands...</div>
        </div>
      </section>
    );
  }

  const handleAddNewBrand = () => {
  setEditingBrand('new');
  setEditFormData({
    brand_name: '',
    brand_desc: '',
    brand_logo_url: '',
    is_active: true
  });
};

  return (
    <section
      className={`relative w-full ${
        isMobile ? "bg-transparent" : "bg-white"
      } py-8 md:py-12 overflow-hidden`}
    >
      <div
        className={`${isMobile ? "max-w-7xl px-4" : "w-[90vw] mx-auto"} ${
          isMobile ? "" : "px-4 sm:px-6 lg:px-8"
        }`}
      >
        <motion.h2
          className="heading1 text-left md:text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Our Brands
          {isAdmin && (
            <button
              onClick={handleAddNewBrand}
              className="bg-green-500 text-white px-4 py-2 rounded text-sm flex items-center"
            >
              + Add Brand
            </button>
          )}
        </motion.h2>

        {isMobile ? (
          // Mobile View - Original Grid Layout
          <motion.div
            className="bg-white mx-0 md:mx-8 my-4 md:my-8 p-4 md:p-6 lg:p-8 flex justify-center flex-wrap gap-4 md:gap-6 lg:gap-8 rounded-lg shadow-sm"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px" }}
          >
            {brands.map((brand) => (
              <motion.div
                key={`brands-${brand.brand_id}`}
                className="brand-item w-[120px] h-[60px] sm:w-[120px] sm:h-[70px] md:w-[140px] md:h-[80px] lg:w-[160px] lg:h-[92px] flex items-center justify-center p-2 cursor-pointer grayscale hover:grayscale-0 relative"
                variants={item}
                onClick={() =>
                  allProductsRouteHandler(
                    "brandType",
                    brand.brand_name,
                    brand.brand_id,
                    brand.slug
                  )
                }
                onMouseEnter={() => handleBrandHover(brand)}
                onFocus={() => handleBrandHover(brand)}
                tabIndex={0}
                aria-label={`View ${brand.brand_name} products`}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <Image
                  src={brand.brand_logo_url}
                  alt={brand.brand_name}
                  width={160}
                  height={92}
                  className="object-contain"
                  loading={brand.brand_id <= 4 ? "eager" : "lazy"}
                  quality={85}
                />

                {/* Edit button for admin */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(brand);
                    }}
                    className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiEdit size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Desktop View - Enhanced Carousel
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative overflow-hidden py-6 w-full">
              <motion.div
                className="flex items-center"
                ref={carouselRef}
                animate={controls}
                initial={{ x: 0 }}
                style={{ width: `${brands.length * 300 * 3}px` }}
              >
                {[...brands, ...brands, ...brands].map((brand, index) => (
                  <motion.div
                    key={`brand-${brand.brand_id}-${index}`}
                    className="brand-item mx-6 w-[180px] h-[110px] flex-shrink-0 flex items-center justify-center p-3 cursor-pointer grayscale hover:grayscale-0 relative group"
                    variants={item}
                    onClick={() =>
                      allProductsRouteHandler(
                        "brandType",
                        brand.brand_name,
                        brand.brand_id,
                        brand.slug
                      )
                    }
                    onMouseEnter={() => handleBrandHover(brand)}
                    onFocus={() => handleBrandHover(brand)}
                    tabIndex={0}
                    aria-label={`View ${brand.brand_name} products`}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                    <Image
                      src={brand.brand_logo_url}
                      alt={brand.brand_name}
                      width={160}
                      height={90}
                      className="object-contain transform transition-transform duration-300 group-hover:scale-110"
                      loading={brand.brand_id <= 4 ? "eager" : "lazy"}
                      quality={90}
                    />

                    {/* Edit button for admin */}
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(brand);
                        }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiEdit size={14} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="flex flex-col items-center mt-4 mb-4 gap-8">
              <div className="flex space-x-4 mb-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Scroll brands left"
                >
                  <FiArrowLeft className="w-8 h-8 text-black-600" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Scroll brands right"
                >
                  <FiArrowRight className="w-8 h-8 text-black-600" />
                </button>
              </div>
              <div className="w-[85%] h-[2px] bg-black"></div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {editingBrand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <h3 className="text-lg font-semibold mb-4">
                  {editingBrand === "new" ? "Add New Brand" : "Edit Brand"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brand_name"
                      value={editFormData.brand_name || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      name="brand_desc"
                      value={editFormData.brand_desc || ""}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      name="brand_logo_url"
                      value={editFormData.brand_logo_url || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={editFormData.is_active || false}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium">Active</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Slug (auto-generated)
                    </label>
                    <input
                      type="text"
                      value={generateSlug(editFormData.brand_name || "")}
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
  {editingBrand !== 'new' && (
    <button
      onClick={() => handleDeleteBrand(editingBrand)}
      className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
    >
      <FiTrash2 className="mr-2" />
      Delete
    </button>
  )}
  {editingBrand === 'new' && <div></div>} {/* Spacer for new brand */}
  
  <div className="flex space-x-2">
    <button
      onClick={handleCancelEdit}
      className="bg-gray-300 px-4 py-2 rounded flex items-center"
    >
      <FiX className="mr-2" />
      Cancel
    </button>
    <button
      onClick={handleSaveEdit}
      disabled={isLoading}
      className="bg-blue-500 text-white px-4 py-2 rounded flex items-center disabled:opacity-50"
    >
      <FiSave className="mr-2" />
      {isLoading ? 'Saving...' : editingBrand === 'new' ? 'Create' : 'Save'}
    </button>
  </div>
</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(OurBrands);
