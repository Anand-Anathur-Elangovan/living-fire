import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import collectionImg3 from "@/public/assets/homePage/collections/collectionsImg3.svg";
import collectionImg4 from "@/public/assets/homePage/collections/collectionsImg4.svg";
import RightArrow from "@/public/assets/homePage/collections/arrow-right.svg";
import LeftArrow from "@/public/assets/homePage/collections/arrow-left.svg";
import CircleArrow from "@/public/assets/homePage/collections/circle-arrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Collections = ({ fuelTypes, allProductsRouteHandler, isAdmin }) => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const [prefetchedRoutes, setPrefetchedRoutes] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);
  const [collections, setCollections] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    image_src: "",
    image_name: "",
    title: "",
    description: "",
    route: "",
    fueltype_id: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch collections from API
  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get-collection");
      const result = await response.json();

      if (result.success) {
        setCollections(result.data);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const fuelTypeOptions = [
    { label: "Cooker", value: 6 },
    { label: "Bio-Ethanol Fireplaces", value: 5 },
    { label: "Wood Fireplaces", value: 4 },
    { label: "Gas Fireplaces", value: 3 },
    { label: "Electric Fireplaces", value: 2 },
  ];

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingItem(null);
    setNewItem({
      image_src: "",
      image_name: "",
      title: "",
      description: "",
      route: "",
      fueltype_id: "",
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (isAdding) {
        // Add new item
        const response = await fetch("/api/update-collection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        const result = await response.json();

        if (result.success) {
          await fetchCollections();
          setIsAdding(false);
          setNewItem({
            image_src: "",
            image_name: "",
            title: "",
            description: "",
            route: "",
            fueltype_id: "",
          });
        }
      } else if (editingItem) {
        // Update existing item
        const response = await fetch("/api/update-collection", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingItem),
        });

        const result = await response.json();

        if (result.success) {
          await fetchCollections();
          setEditingItem(null);
        }
      }
    } catch (error) {
      console.error("Error saving collection:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this collection?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/delete-collection?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        await fetchCollections();
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleRoutePrefetch = (route) => {
    if (!prefetchedRoutes.has(route)) {
      router.prefetch(route);
      setPrefetchedRoutes((prev) => new Set(prev).add(route));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const hoverStyle = `
    .collection-item {
      transition: all 0.3s ease-out;
      position: relative;
    }
    .collection-image-container {
      overflow: hidden;
      position: relative;
    }
    .collection-image {
      transition: transform 0.5s ease;
      will-change: transform;
    }
    .collection-item:hover .collection-image {
      transform: scale(1.05);
    }
    .circle-arrow {
      transition: all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
    .collection-item:hover .circle-arrow {
      transform: translateX(5px);
    }
    .description-container {
      height: 60px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    @media (max-width: 768px) {
      .description-container {
        height: 72px;
        -webkit-line-clamp: 4;
      }
    }
  `;

  // Merge with fuelTypes data
  const mergedOutput = collections.map((item) => {
    const match = fuelTypes.find((ft) => ft.fueltype_id === item.fueltype_id);
    return match
      ? {
          ...item,
          fueltype_name: match.fueltype_name,
          is_active: match.is_active,
          slug: match.slug,
        }
      : item;
  });

  // Admin Edit Form Component
  const AdminForm = () => {
    const currentItem = isAdding ? newItem : editingItem;

    if (!currentItem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">
            {isAdding ? "Add New Collection" : "Edit Collection"}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Image Source
              </label>
              <input
                type="text"
                value={currentItem.image_src}
                onChange={(e) =>
                  isAdding
                    ? setNewItem({ ...newItem, image_src: e.target.value })
                    : setEditingItem({
                        ...editingItem,
                        image_src: e.target.value,
                      })
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Image Name
              </label>
              <input
                type="text"
                value={currentItem.image_name}
                onChange={(e) =>
                  isAdding
                    ? setNewItem({ ...newItem, image_name: e.target.value })
                    : setEditingItem({
                        ...editingItem,
                        image_name: e.target.value,
                      })
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter image name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={currentItem.title}
                onChange={(e) =>
                  isAdding
                    ? setNewItem({ ...newItem, title: e.target.value })
                    : setEditingItem({ ...editingItem, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={currentItem.description}
                onChange={(e) =>
                  isAdding
                    ? setNewItem({ ...newItem, description: e.target.value })
                    : setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                }
                className="w-full p-2 border border-gray-300 rounded h-24"
                placeholder="Enter description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Route</label>
              <input
                type="text"
                value={currentItem.route}
                onChange={(e) =>
                  isAdding
                    ? setNewItem({ ...newItem, route: e.target.value })
                    : setEditingItem({ ...editingItem, route: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter route (e.g., /allProducts/electric)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Fuel Type
              </label>
              <select
                value={currentItem.fueltype_id}
                onChange={(e) =>
                  isAdding
                    ? setNewItem({
                        ...newItem,
                        fueltype_id: parseInt(e.target.value),
                      })
                    : setEditingItem({
                        ...editingItem,
                        fueltype_id: parseInt(e.target.value),
                      })
                }
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Fuel Type</option>
                {fuelTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={containerVariants}
      className="flex relative justify-center flex-col ml-0 mr-0 md:ml-16 md:mr-16"
    >
      <style>{hoverStyle}</style>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex justify-end mb-4 mr-8 md:mr-0">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Collection
          </button>
        </div>
      )}

      <div className="flex flex-row items-center w-full mb-10">
        <motion.h2
          variants={itemVariants}
          className="heading1 flex w-full justify-start ml-8 md:justify-center md:ml-0"
        >
          Collections
        </motion.h2>
      </div>

      {/* Desktop View - Grid Layout */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-6 md:px-4">
        {mergedOutput?.map((item, index) => (
          <motion.div
            key={`collection-${item.id}`}
            variants={itemVariants}
            className="collection-item relative"
            onMouseEnter={() => {
              setHoveredItem(item.id);
              handleRoutePrefetch(item.route);
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Admin Edit/Delete Buttons */}
            {isAdmin && (
              <div className="absolute top-2 left-2 z-10 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}

            <div className="collection-image-container overflow-hidden">
              <Link
                href={
                  item.slug
                    ? `/allProducts/${item.slug}`
                    : `/allProducts/${item.fueltype_name}`
                }
                passHref
                legacyBehavior
              >
                <a className="w-full h-full block">
                  <Image
                    src={item.image_src || item.image}
                    alt={item.image_name || item.title}
                    width={600}
                    height={800}
                    className="collection-image w-full h-auto aspect-[3/4] object-cover"
                    onClick={() => {
                      handleRoutePrefetch(item.route);
                      allProductsRouteHandler(
                        "fuelType",
                        item.fueltype_name,
                        item.fueltype_id,
                        item.slug
                      );
                    }}
                    loading={index < 2 ? "eager" : "lazy"}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </a>
              </Link>
              {hoveredItem === item.id && (
                <motion.div
                  className="circle-arrow absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
                  variants={arrowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={CircleArrow}
                    alt="Click to view"
                    width={24}
                    height={24}
                  />
                </motion.div>
              )}
            </div>

            <div className="mt-4 gap-8 flex flex-col px-2">
              <div className="gap-4 flex flex-col">
                <Link
                  href={
                    item.slug
                      ? `/allProducts/${item.slug}`
                      : `/allProducts/${item.fueltype_name}`
                  }
                  passHref
                  legacyBehavior
                >
                  <a className="font-medium leading-6 text-base text-wrap hover:underline">
                    <h2
                      className="uppercase font-medium leading-6 text-base text-wrap cursor-pointer hover:underline"
                      onClick={() => {
                        handleRoutePrefetch(item.route);
                        allProductsRouteHandler(
                          "fuelType",
                          item.fueltype_name,
                          item.fueltype_id,
                          item?.slug
                        );
                      }}
                      tabIndex={0}
                    >
                      {item.title}
                    </h2>
                  </a>
                </Link>

                <div className="description-container">
                  <p
                    className="font-normal leading-5 text-sm text-gray-700"
                    style={{ fontFamily: '"Public Sans", sans-serif' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
              <Link
                href={
                  item.slug
                    ? `/allProducts/${item.slug}`
                    : `/allProducts/${item.fueltype_name}`
                }
                passHref
                legacyBehavior
              >
                <a className="font-medium text-sm hover:underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 w-fit mt-1">
                  <button
                    className="uppercase font-medium text-sm cursor-pointer focus:outline-none hover:underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 w-fit mt-1"
                    onClick={() => {
                      handleRoutePrefetch(item.route);
                      allProductsRouteHandler(
                        "fuelType",
                        item.fueltype_name,
                        item.fueltype_id,
                        item?.slug
                      );
                    }}
                  >
                    View Collection
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </a>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View - Carousel */}
      <div
        ref={carouselRef}
        className="md:hidden grid grid-flow-col auto-cols-[100%] gap-6 overflow-x-auto overscroll-x-contain element-snaps hide-scrollbar px-4"
      >
        {mergedOutput?.map((item, index) => (
          <motion.div
            key={`collection-${item.id}`}
            variants={itemVariants}
            className="collection-item relative"
            onMouseEnter={() => {
              setHoveredItem(item.id);
              handleRoutePrefetch(item.route);
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Admin Edit/Delete Buttons */}
            {isAdmin && (
              <div className="absolute top-2 left-2 z-10 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}

            <div className="collection-image-container overflow-hidden">
              <Image
                src={item.image_src || item.image}
                alt={item.image_name || item.title}
                width={600}
                height={800}
                className="collection-image w-full h-auto aspect-[3/4] object-cover"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item?.slug
                  );
                }}
                loading={index < 2 ? "eager" : "lazy"}
                quality={85}
                sizes="(max-width: 768px) 100vw, 100vw"
              />

              {hoveredItem === item.id && (
                <motion.div
                  className="circle-arrow absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
                  variants={arrowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={CircleArrow}
                    alt="Click to view"
                    width={24}
                    height={24}
                  />
                </motion.div>
              )}
            </div>

            <div className="mt-4 gap-2 flex flex-col px-2">
              <h2
                className="font-medium leading-6 text-base text-wrap cursor-pointer hover:underline"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item?.slug
                  );
                }}
                tabIndex={0}
              >
                {item.title}
              </h2>
              <div className="description-container">
                <p className="font-normal leading-5 text-sm text-gray-700">
                  {item.description}
                </p>
              </div>
              <button
                className="uppercase font-medium  text-sm underline cursor-pointer focus:outline-none hover:no-underline hover:text-primary-500 transition-colors duration-200 flex items-center gap-1 w-fit mt-1"
                onClick={() => {
                  handleRoutePrefetch(item.route);
                  allProductsRouteHandler(
                    "fuelType",
                    item.fueltype_name,
                    item.fueltype_id,
                    item?.slug
                  );
                }}
              >
                View Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="collection-custom-button flex flex-col md:flex-row items-center gap-4 justify-center mt-[50px]">
        <Link href="/allProducts" passHref legacyBehavior>
          <motion.a
            className="px-8 py-3 bg-black text-white font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => router.prefetch("/allProducts")}
          >
            VIEW ALL
          </motion.a>
        </Link>

        <Link href="/contact" passHref legacyBehavior>
          <motion.a
            className="px-8 py-3 bg-white text-black border border-black font-medium text-sm md:text-base uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => router.prefetch("/contact")}
          >
            CONTACT US
          </motion.a>
        </Link>
      </div>

      {/* Admin Form Modal */}
      {(editingItem || isAdding) && <AdminForm />}
    </motion.section>
  );
};

export default React.memo(Collections);
