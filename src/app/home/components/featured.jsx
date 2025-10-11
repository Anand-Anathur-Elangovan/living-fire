import React, { useState, useEffect, useRef } from "react";
import "./featured.css";
import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiEdit,
  FiPlus,
  FiTrash2,
  FiSave,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import { generateSlug } from "@/src/helper/slug/slug";
import featureImg1 from "@/public/assets/homePage/feature/1.webp";
import featureImg2 from "@/public/assets/homePage/feature/22.webp";
import featureImg3 from "@/public/assets/homePage/feature/3.webp";
import featureImg33 from "@/public/assets/homePage/feature/33.webp";
import featureImg4 from "@/public/assets/homePage/feature/4.png";
import featureImg5 from "@/public/assets/homePage/feature/5.png";
import featureImg6 from "@/public/assets/homePage/feature/6.jpg";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const Featured = ({
  headingValue,
  productRouteHandler,
  name,
  brand_name,
  range_id,
  p_id,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setNavigationState } = useNavigationState();
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItems, setEditingItems] = useState([]);

  const hardcodedCarouselItems = [
    {
      p_id: "424",
      image:
        "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/ilektro/FP-1250L.T%20-%20ilektro%201250%20TUnnel.webp" ||
        featureImg1,
      title: "Ilektro 1250",
      description:
        "Ilektro 1250 Landscape Tunnel by Paul Agnew Designs with lifelike flame effect and efficient heating. Premium electric fireplace offering realistic flame effect and reliable energy-efficient heating",
      name: "Ilektro 1250 Landscape Tunnel",
      brand_name: "Paul Agnew Designs",
    },
    {
      p_id: "425",
      image: featureImg2,
      title: "Ilektro 2600",
      description:
        "Ilektro 2600 Landscape from Paul Agnew Designs with premium design, realistic flame effect and efficient heating. Premium electric fireplace offering realistic flame effect and reliable energy-efficient heating",
      name: "Ilektro 2600 Landscape",
      brand_name: "Paul Agnew Designs",
    },
    {
      p_id: "426",
      image: featureImg33,
      title: "HZO42 - Outdoor - LPG",
      description:
        "Regency HZO42 delivers stunning outdoor fire design with reflective stainless steel body and picture frame faceplate. Outdoor linear gas fire combining modern style, durability, and exceptional flame presentation",
      name: "HZO42 - Outdoor - LPG",
      brand_name: "Regency",
    },
    {
      p_id: "427",
      image: featureImg4,
      title: "Pyro Siena 750GF Freestanding",
      description:
        "Paul Agnew Designs Siena 750GF blends classic charm with efficient, modern heating. Stylish freestanding gas fireplace offering timeless design and reliable warmth.",
      name: "siena-750-g4-freestanding",
      brand_name: "Paul Agnew Designs",
    },
    {
      p_id: "428",
      image: featureImg5,
      title: "Heatmaster Seamless",
      description:
        "Heatmaster Seamless combines minimalist design with exceptional heating performance. Contemporary gas fire offering clean lines, premium build quality, and efficient heating.",
      name: "seamless-body",
      brand_name: "Heatmaster",
    },
    {
      p_id: "429",
      image: featureImg6,
      title: "Regency FG39",
      description:
        "Regency FG39 delivers powerful heating performance with timeless traditional design. Premium gas fire combining efficiency, authentic log visuals, and reliable warmth.",
      name: "FG39",
      brand_name: "Regency",
    },
  ];

  // Check admin status
  useEffect(() => {
    const HARDCODED_ADMIN_USERNAME = "admin";
    const HARDCODED_ADMIN_PASSWORD = "password123";
    const storedUsername =
      typeof window !== "undefined"
        ? sessionStorage.getItem("adminUsername")
        : null;
    const storedPassword =
      typeof window !== "undefined"
        ? sessionStorage.getItem("adminPassword")
        : null;

    if (
      storedUsername === HARDCODED_ADMIN_USERNAME &&
      storedPassword === HARDCODED_ADMIN_PASSWORD
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  // Fetch featured products from API
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);

        // If we have range_id, use current implementation
        if (range_id) {
          const params = new URLSearchParams();
          if (range_id) params.append("range_id", range_id);
          if (brand_name) params.append("brand_name", brand_name);
          if (p_id) params.append("p_id", p_id);

          const response = await fetch(`/api/get-features?${params.toString()}`);
          const data = await response.json();

          if (data.success) {
            setCarouselItems(data.products);
          } else {
            console.error("Failed to fetch featured products:", data.error);
            setCarouselItems(hardcodedCarouselItems);
          }
        }
        // If on root route and no range_id, fetch from feature table
        else if (pathname === "/" && !range_id) {
          const response = await fetch("/api/get-feature");
          const data = await response.json();

          if (data.success && data.features && data.features.length > 0) {
            // Get up to 6 items from database
            const dbItems = data.features.slice(0, 6);
            // If less than 6 items, fill remaining with hardcoded items
            const combinedItems = [
              ...dbItems,
              ...hardcodedCarouselItems.slice(dbItems.length, 6),
            ];
            setCarouselItems(combinedItems);
          } else {
            // Use hardcoded items if no data from database
            setCarouselItems(hardcodedCarouselItems);
          }
        } else {
          // No parameters provided, use hardcoded data
          setCarouselItems(hardcodedCarouselItems);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setCarouselItems(hardcodedCarouselItems);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [range_id, brand_name, pathname]);

  useEffect(() => {
    if (carouselItems.length > 0) {
      setEditingItems(
        carouselItems.map((item) => ({
          ...item,
          product_name: item.title || item.product_name || "",
          brand_name: item.brand_name || "",
          product_short_description:
            item.description || item.product_short_description || "",
          product_image:
            typeof item.image === "string"
              ? item.image
              : item.image?.src
              ? item.image.src
              : item.product_image || "",
          brand_slug: item.brand_slug || generateSlug(item.brand_name || ""),
          product_slug:
            item.product_slug ||
            generateSlug(item.title || item.product_name || ""),
          route:
            item.route ||
            `/${generateSlug(item.brand_name || "")}/${generateSlug(
              item.title || item.product_name || ""
            )}`,
        }))
      );
    }
  }, [carouselItems]);

  useEffect(() => {
    const prefetchRoutes = async () => {
      router.prefetch("/allProducts");
    };
    prefetchRoutes();
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
      setIsDesktop(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 280 : isTablet ? 320 : 360;
      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original carouselItems
      setEditingItems(
        carouselItems.map((item) => ({
          ...item,
          product_name: item.title || item.product_name || "",
          brand_name: item.brand_name || "",
          product_short_description:
            item.description || item.product_short_description || "",
          product_image:
            typeof item.image === "string"
              ? item.image
              : item.image?.src
              ? item.image.src
              : item.product_image || "",
          brand_slug: item.brand_slug || generateSlug(item.brand_name || ""),
          product_slug:
            item.product_slug ||
            generateSlug(item.title || item.product_name || ""),
          route:
            item.route ||
            `/${generateSlug(item.brand_name || "")}/${generateSlug(
              item.title || item.product_name || ""
            )}`,
        }))
      );
    }
    setIsEditing(!isEditing);
  };

  const handleAddFeature = () => {
    const newItem = {
      feature_id: `new-${Date.now()}`,
      product_name: "",
      brand_name: "",
      product_short_description: "",
      product_image: "",
      brand_slug: "",
      product_slug: "",
      route: "",
      is_active: true,
    };
    setEditingItems((prev) => [...prev, newItem]);
  };

  const handleDeleteFeature = (index) => {
    setEditingItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditChange = (index, field, value) => {
    setEditingItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };

      // Auto-generate slugs and route when product_name or brand_name changes
      if (field === "product_name") {
        updated[index].product_slug = generateSlug(value);
        updated[index].route = `/${generateSlug(
          updated[index].brand_name || ""
        )}/${generateSlug(value)}`;
      }
      if (field === "brand_name") {
        updated[index].brand_slug = generateSlug(value);
        updated[index].route = `/${generateSlug(value)}/${generateSlug(
          updated[index].product_name || ""
        )}`;
      }

      // Update route when product_slug or brand_slug changes manually
      if (field === "product_slug") {
        updated[index].route = `/${generateSlug(
          updated[index].brand_name || ""
        )}/${value}`;
      }
      if (field === "brand_slug") {
        updated[index].route = `/${value}/${generateSlug(
          updated[index].product_name || ""
        )}`;
      }

      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const cleanedFeatures = editingItems.map((item) => {
        const cleanedItem = { ...item };

        // Remove the original image object if it exists
        delete cleanedItem.image;
        delete cleanedItem.title;
        delete cleanedItem.description;
        delete cleanedItem.p_id;
        delete cleanedItem.name;

        // Ensure product_image is always a string
        if (
          cleanedItem.product_image &&
          typeof cleanedItem.product_image === "object"
        ) {
          cleanedItem.product_image = cleanedItem.product_image.src || "";
        }

        return cleanedItem;
      });

      const response = await fetch("/api/update-feature", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: cleanedFeatures,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update carousel items with the submitted data
        const updatedCarouselItems = cleanedFeatures.map((item) => ({
          ...item,
          title: item.product_name,
          description: item.product_short_description,
          image: item.product_image, // Now it's a string
          name: item.product_name,
          p_id: item.feature_id || `temp-${Date.now()}`,
        }));

        setCarouselItems(updatedCarouselItems);
        setIsEditing(false);
        alert("Features updated successfully!");
      } else {
        console.error("Failed to update features:", data.error);
        alert("Failed to update features. Please try again.");
      }
    } catch (error) {
      console.error("Error updating features:", error);
      alert("Error updating features. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const itemVariants = {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Loading state
  if (loading) {
    return (
      <div className={`featured-container standard-margins`}>
        <div className="flex flex-row items-center w-full">
          <h2 className="heading1 flex w-full justify-start md:justify-center md:ml-0 text-2xl md:text-[3rem]">
            {headingValue}
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p>Loading featured products...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && carouselItems.length === 0) {
    return (
      <div className={`featured-container standard-margins`}>
        <div className="flex flex-row items-center w-full">
          <h2 className="heading1 flex w-full justify-start md:justify-center md:ml-0 text-2xl md:text-[3rem]">
            {headingValue}
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p>No featured products found.</p>
        </div>
      </div>
    );
  }
  const getImageSource = (item) => {
  // First try product_image
  if (item.product_image) {
    if (typeof item.product_image === 'string') {
      // Check if it's a stringified JSON object
      if (item.product_image.startsWith('{') && item.product_image.endsWith('}')) {
        try {
          const parsed = JSON.parse(item.product_image);
          return parsed.src || parsed.url || '';
        } catch (e) {
          return item.product_image;
        }
      }
      return item.product_image && item.product_image.length > 14 
        ? transformImageSrc(item.product_image) 
        : item.product_image;
    } else if (item.product_image.src) {
      return item.product_image.src;
    }
  }
  
  // Fallback to image field
  if (item.image) {
    if (typeof item.image === 'string') {
      return item.image && item.image.length > 14 
        ? transformImageSrc(item.image) 
        : item.image;
    }
    if (item.image.src) {
      return item.image.src;
    }
  }
  
  return '';
};
  console.log("router.carouselItems", carouselItems);
  return (
    <motion.div
      className={`featured-container ${
        isDesktop ? "desktop-feature-container" : "standard-margins"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="flex flex-row items-center w-full relative">
        <h2 className="heading1 flex w-full justify-start md:justify-center md:ml-0 text-2xl md:text-[3rem]">
          {headingValue}
        </h2>

        {/* Edit Button - Show only when admin and no range_id */}
        {isAdmin && !range_id && (
          <div className="absolute right-0">
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiEdit className="text-lg" />
                Edit Features
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddFeature}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiPlus className="text-lg" />
                  Add Feature
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  <FiSave className="text-lg" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FiX className="text-lg" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {!isMobile && !isDesktop && !isEditing && (
          <div className="flex flex-row items-center gap-2 absolute right-5 cursor-pointer">
            <Image
              src={RightArrow}
              alt="Scroll left"
              width={24}
              height={24}
              onClick={() => handleScroll("left")}
              className="hover:opacity-70 transition-opacity"
              loading="eager"
              priority
            />
            <Image
              src={LeftArrow}
              alt="Scroll right"
              width={24}
              height={24}
              onClick={() => handleScroll("right")}
              className="hover:opacity-70 transition-opacity"
              loading="eager"
              priority
            />
          </div>
        )}
      </div>

      {isEditing ? (
        // Edit Mode
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {editingItems.map((item, index) => (
            <div
              key={item.feature_id || index}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Feature Item {index + 1}</h3>
                <button
                  onClick={() => handleDeleteFeature(index)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={item.product_name}
                    onChange={(e) =>
                      handleEditChange(index, "product_name", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={item.brand_name}
                    onChange={(e) =>
                      handleEditChange(index, "brand_name", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Slug
                  </label>
                  <input
                    type="text"
                    value={item.product_slug}
                    onChange={(e) =>
                      handleEditChange(index, "product_slug", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm bg-gray-50"
                    placeholder="Auto-generated from product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Brand Slug
                  </label>
                  <input
                    type="text"
                    value={item.brand_slug}
                    onChange={(e) =>
                      handleEditChange(index, "brand_slug", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm bg-gray-50"
                    placeholder="Auto-generated from brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Route
                  </label>
                  <input
                    type="text"
                    value={item.route}
                    className="w-full p-2 border rounded text-sm bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Image URL
                  </label>
                  <input
                    type="text"
                    value={
                      typeof item.product_image === "string" &&
                      item.product_image.startsWith("{") &&
                      item.product_image.endsWith("}")
                        ? JSON.parse(item.product_image).src
                        : item.product_image?.src || item.product_image || ""
                    }
                    onChange={(e) =>
                      handleEditChange(index, "product_image", e.target.value)
                    }
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={item.product_short_description}
                    onChange={(e) =>
                      handleEditChange(
                        index,
                        "product_short_description",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border rounded text-sm"
                    rows="3"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isDesktop ? (
        // Desktop View - 2 rows of 3 products
        <div className="grid grid-cols-3 gap-8 w-full">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-8 col-span-3">
            {carouselItems.slice(0, 3).map((item, index) => (
              <Link
                href={
                  item.route ||
                  `/${generateSlug(item.brand_name)}/${generateSlug(item.name)}`
                }
                passHref
                legacyBehavior
                key={`featured-desktop-${item.p_id}-${index}`}
              >
                <motion.a
                  className="w-full flex flex-col gap-6 px-6"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden aspect-square group">
                    {getImageSource(item) ? (
                      <Image
                        src={getImageSource(item)}
                        alt={item.title || item.product_name}
                        fill
                        className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out"
                        sizes="(max-width: 1024px) 30vw, 25vw"
                        quality={95}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
                        <FiArrowRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="leading-6 text-base md:text-lg font-extralight hover:underline">
                      {item.title || item.product_name}
                    </h3>
                    <p className="font-medium leading-5 text-xs md:text-sm text-[#94999F]">
                      {item.brand_name}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333] line-clamp-3">
                      {item.description || item.product_short_description}
                    </p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-8 col-span-3 mt-8">
            {carouselItems.slice(3, 6).map((item, index) => (
              <Link
                href={
                  item.route ||
                  `/${generateSlug(item.brand_name)}/${generateSlug(item.name)}`
                }
                passHref
                legacyBehavior
                key={`featured-desktop-${item.p_id}-${index + 3}`}
              >
                <motion.a
                  className="w-full flex flex-col gap-4 px-2"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden aspect-square group">
                    {getImageSource(item) ? (
                      <Image
                        src={getImageSource(item)}
                        alt={item.title || item.product_name}
                        fill
                        className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out"
                        sizes="(max-width: 1024px) 30vw, 25vw"
                        quality={95}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
                        <FiArrowRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3
                      className="leading-6 text-base md:text-lg font-extralight hover:underline"
                      style={{ fontFamily: '"Public Sans", sans-serif' }}
                    >
                      {item.title || item.product_name}
                    </h3>
                    <p
                      className="font-medium leading-5 text-xs md:text-sm text-[#94999F]"
                      style={{ fontFamily: '"Public Sans", sans-serif' }}
                    >
                      {item.brand_name}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333] line-clamp-3">
                      {item.description || item.product_short_description}
                    </p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        // Mobile/Tablet View - Carousel
        <>
          <div
            ref={carouselRef}
            className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[25%] gap-4 md:gap-[36px] overflow-x-auto overscroll-x-contain feature-snaps hide-scrollbar"
          >
            {carouselItems.map((item, index) => (
              <Link
                href={
                  item.route ||
                  `/${generateSlug(item.brand_name)}/${generateSlug(item.name)}`
                }
                passHref
                legacyBehavior
                key={`featured-${item.p_id}-${index}`}
              >
                <motion.a
                  className="w-full flex flex-col gap-3 md:gap-5"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square group">
                    {getImageSource(item) ? (
                      <Image
                        src={getImageSource(item)}
                        alt={item.title || item.product_name}
                        fill
                        className="object-cover group-hover:scale-105 group-hover:brightness-50 transition-all duration-300 ease-in-out"
                        sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                        loading={index < 2 ? "eager" : "lazy"}
                        quality={85}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
                        <FiArrowRight className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3
                      className="leading-6 text-base md:text-lg font-extralight hover:underline"
                      style={{ fontFamily: '"Public Sans", sans-serif' }}
                    >
                      {item.title || item.product_name}
                    </h3>
                    <p
                      className="font-medium leading-5 text-xs md:text-sm text-[#94999F]"
                      style={{ fontFamily: '"Public Sans", sans-serif' }}
                    >
                      {item.brand_name}
                    </p>
                    <p className="font-normal leading-5 text-sm mt-2 text-[#333] line-clamp-3">
                      {item.description || item.product_short_description}
                    </p>
                  </div>
                </motion.a>
              </Link>
            ))}
          </div>

          {isMobile && (
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="p-2 rounded-full bg-gray-100 cursor-pointer"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
              >
                <Image
                  src={RightArrow}
                  alt=""
                  width={20}
                  height={20}
                  loading="eager"
                  priority
                />
              </button>
              <button
                className="p-2 rounded-full bg-gray-100 cursor-pointer"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <Image
                  src={LeftArrow}
                  alt=""
                  width={20}
                  height={20}
                  loading="eager"
                  priority
                />
              </button>
            </div>
          )}
        </>
      )}

      {!isEditing && (
        <div className="w-full flex flex-col items-center gap-4 mt-8 md:mt-12">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link href="/allProducts" passHref legacyBehavior>
              <motion.a
                className="px-8 py-3 bg-black text-white font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300  flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => router.prefetch("/allProducts")}
              >
                SHOP ALL
              </motion.a>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <motion.a
                className="px-8 py-3 bg-white text-black border border-black font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300  flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => router.prefetch("/contact")}
              >
                CONTACT US
              </motion.a>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default React.memo(Featured);
