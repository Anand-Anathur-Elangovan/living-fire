"use client";
import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
import "./home.css";
import Image from "next/image";
import useMasterValues from "../allProducts/hooks/useMasterValues";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { useNavigationState } from "@/context/NavigationContext";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/src/helper/loader/Loader";
import Slider from "react-slick";
import { ChevronDown } from "react-feather";
import { generateSlug } from "@/src/helper/slug/slug";
import LowerArea from "@/src/components/custom/LowerArea";
import Showrooms from "@/src/components/custom/Showrooms/Showrooms";
import Link from "next/link";
import { Edit, Save, X, Plus, Trash2 } from "react-feather";

const brandLogos = {
  cocoon: () => import("@/public/assets/homePage/ourBrands/cocoon.svg"),
  paulAgnew: () => import("@/public/assets/homePage/ourBrands/paul-agnew.svg"),
  stovax: () => import("@/public/assets/homePage/ourBrands/stovax.svg"),
  adf: () => import("@/public/assets/homePage/ourBrands/adf.svg"),
  austro: () => import("@/public/assets/homePage/ourBrands/austroflamm.svg"),
  esse: () => import("@/public/assets/homePage/ourBrands/esse.svg"),
  heatmaster: () => import("@/public/assets/homePage/ourBrands/heatmaster.svg"),
  hergom: () => import("@/public/assets/homePage/ourBrands/hergom.svg"),
  kalora: () => import("@/public/assets/homePage/ourBrands/kaloraLogo.png"),
  morso: () => import("@/public/assets/homePage/ourBrands/morso.svg"),
  regency: () => import("@/public/assets/homePage/ourBrands/regency.svg"),
  eurostove: () =>
    import("@/public/assets/homePage/ourBrands/eurostoveLogo.png"),
};

const Collections = lazy(() => import("./components/collections"), {
  unstable_expectedLoadTime: 2000, // Estimate of load time
});
const OurBrands = lazy(() => import("./components/ourBrands"));
const Featured = lazy(() => import("./components/featured"), {
  unstable_expectedLoadTime: 2000, // Estimate of load time
});
const Testimonials = lazy(() => import("./components/testimonials"));
const Blog = lazy(() => import("./components/blog"));
const NewsletterCard = lazy(() => import("./components/newsletterCard"));

const Home = () => {
  const useAnimationState = (initialValue) => {
    const [state, setState] = useState(initialValue);
    const stateRef = useRef(state);

    const setStateOptimized = (newValue) => {
      if (stateRef.current !== newValue) {
        stateRef.current = newValue;
        setState(newValue);
      }
    };

    return [state, setStateOptimized];
  };
  const [hover, setHover] = useState(false);
  const [showPanels, setShowPanels] = useAnimationState(false);
  const [animatePanels, setAnimatePanels] = useAnimationState(false);
  const [zoomImage, setZoomImage] = useAnimationState(false);
  const [showButtons, setShowButtons] = useAnimationState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { setNavigationState } = useNavigationState();
  const [heroImages, setHeroImages] = useState([]);

  const [editing, setEditing] = useState(false);
const [editData, setEditData] = useState([]);
const [newRow, setNewRow] = useState({ image_src: '', image_name: '' });
const [loading, setLoading] = useState(false);


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

  useEffect(() => {
    if (!hover) {
      setShowPanels(false);
      setAnimatePanels(false);
      setZoomImage(false);
      setShowButtons(false);
      return;
    }

    const timeline = [
      { time: 500, action: () => setShowPanels(true) }, // Show panels after hero fades out
      { time: 1800, action: () => setAnimatePanels(true) }, // Animate panels
      {
        time: 2000,
        action: () => {
          document.getElementById("company-name").style.opacity = 1;
        },
      },
      {
        time: 2500,
        action: () => {
          document.getElementById("subheading").style.opacity = 1;
        },
      },
      { time: 2500, action: () => setShowButtons(true) },
    ];

    const startTime = performance.now();
    let rafId;

    const animate = (now) => {
      const elapsed = now - startTime;

      timeline.forEach(({ time, action }) => {
        if (elapsed >= time) action();
      });

      if (elapsed < Math.max(...timeline.map((t) => t.time))) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [hover]);

  const {
    brands,
    masterValues: { fuelTypes },
  } = useMasterValues();

  const allProductsRouteHandler = (typeName, displayName, arguId, slug) => {
    setNavigationState({ typeName, displayName, id: arguId });
    slug
      ? router.push(`/allProducts/${slug}`)
      : router.push(`/allProducts/${displayName}`);
  };

  const productRouteHandler = (ProductName, brandName) => {
    const brandSlug = generateSlug(brandName);
    const productSlug = generateSlug(ProductName);
    router.push(`/${brandSlug}/${productSlug}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHover(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let start = null;
    let frameId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (elapsed >= 800) {
        setHover(true);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await fetch("/api/hero-image");
        const data = await res.json();
        setHeroImages(data);
      } catch (err) {
        console.error("Error fetching hero images:", err);
      }
    };
    console.log("Fetching hero images...");
    fetchHeroImages();
  }, []);

  const brandsList = [
    {
      brand_id: 1,
      imageKey: "paulAgnew",
      title: "Paul Agnew Designs",
      isSvg: true,
    },
    { brand_id: 15, imageKey: "cocoon", title: "Cocoon", isSvg: true },
    { brand_id: 5, imageKey: "stovax", title: "Stovax", isSvg: true },
    { brand_id: 7, imageKey: "hergom", title: "Hergom", isSvg: true },
    { brand_id: 10, imageKey: "regency", title: "Regency", isSvg: true },
    { brand_id: 11, imageKey: "kalora", title: "Kalora", isSvg: false },
    { brand_id: 3, imageKey: "austro", title: "Austroflamm", isSvg: true },
    { brand_id: 2, imageKey: "esse", title: "Esse", isSvg: true },
    { brand_id: 4, imageKey: "morso", title: "Morso", isSvg: true },
    { brand_id: 6, imageKey: "heatmaster", title: "HeatMaster", isSvg: true },
    { brand_id: 8, imageKey: "adf", title: "ADF", isSvg: true },
    { brand_id: 16, imageKey: "eurostove", title: "Eurostove", isSvg: false },
  ];
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    cssEase: "linear",
    appendDots: (dots) => (
      <div className="custom-dots-container">
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => <div className="custom-dot"></div>,
  };
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("Hero Images:", heroImages);

  useEffect(() => {
  if (editing) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }

  return () => {
    document.body.classList.remove('modal-open');
  };
}, [editing]);

 const HeroImageEditor = () => {
  const [localEditData, setLocalEditData] = useState([]);
  const [localNewRows, setLocalNewRows] = useState([]);

  // Initialize local state when component mounts
  useEffect(() => {
    setLocalEditData(editData.filter(item => !item.isNew));
    setLocalNewRows(editData.filter(item => item.isNew));
  }, [editData]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update existing images (only those with numeric IDs)
      const updatePromises = localEditData
        .filter(item => item.id && !isNaN(parseInt(item.id)))
        .map(async (item) => {
          const updateData = {
            id: parseInt(item.id),
            image_src: item.image_src,
            image_name: item.image_name,
            is_active: item.is_active
          };
          
          return fetch('/api/update-hero-image', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
          });
        });

      // Add new rows
      const createPromises = localNewRows
        .filter(item => item.image_src && item.image_name)
        .map(async (item) => {
          return fetch('/api/update-hero-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image_src: item.image_src,
              image_name: item.image_name,
              created_by: 'admin'
            }),
          });
        });

      await Promise.all([...updatePromises, ...createPromises]);

      // Refresh hero images
      const res = await fetch("/api/hero-image");
      const data = await res.json();
      setHeroImages(data);
      
      setEditing(false);
      alert('Hero images updated successfully!');
    } catch (error) {
      console.error('Error saving hero images:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, isNew = false) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      if (!isNew) {
        // Delete from database
        await fetch(`/api/update-hero-image?id=${id}`, {
          method: 'DELETE',
        });
      }
      
      // Update local state
      if (isNew) {
        setLocalNewRows(localNewRows.filter(item => item.id !== id));
      } else {
        setLocalEditData(localEditData.filter(item => item.id !== id));
      }
      
      // Refresh hero images if it was a database item
      if (!isNew) {
        const res = await fetch("/api/hero-image");
        const data = await res.json();
        setHeroImages(data);
      }
      
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting hero image:', error);
      alert('Error deleting image');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setLocalEditData([]);
    setLocalNewRows([]);
  };

  const addNewRow = () => {
    const newRow = { 
      id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
      image_src: '', 
      image_name: '', 
      is_active: true,
      isNew: true 
    };
    setLocalNewRows(prev => [...prev, newRow]);
  };

  const updateExistingData = (index, field, value) => {
    const newData = [...localEditData];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    setLocalEditData(newData);
  };

  const updateNewRow = (index, field, value) => {
    const newData = [...localNewRows];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    setLocalNewRows(newData);
  };

  return (
    <div className="hero-editor-modal">
      <div className="hero-editor-content">
        <div className="hero-editor-header">
          <h3>Edit Hero Images</h3>
          <button 
            onClick={handleCancel} 
            className="close-btn"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="hero-editor-table">
          <table>
            <thead>
              <tr>
                <th>Image URL</th>
                <th>Image Name</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Existing Rows */}
              {localEditData.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <textarea
                      value={item.image_src || ''}
                      onChange={(e) => updateExistingData(index, 'image_src', e.target.value)}
                      placeholder="Enter image URL"
                      rows={2}
                      className="edit-textarea"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.image_name || ''}
                      onChange={(e) => updateExistingData(index, 'image_name', e.target.value)}
                      placeholder="Enter image name"
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.is_active !== false}
                      onChange={(e) => updateExistingData(index, 'is_active', e.target.checked)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id, false)}
                      className="delete-btn"
                      title="Delete"
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {/* New Rows */}
              {localNewRows.map((item, index) => (
                <tr key={item.id} className="new-row">
                  <td>
                    <textarea
                      value={item.image_src || ''}
                      onChange={(e) => updateNewRow(index, 'image_src', e.target.value)}
                      placeholder="Enter new image URL"
                      rows={2}
                      className="edit-textarea"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.image_name || ''}
                      onChange={(e) => updateNewRow(index, 'image_name', e.target.value)}
                      placeholder="Enter new image name"
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={true} 
                      disabled 
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id, true)}
                      className="delete-btn"
                      title="Delete"
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                    <span className="new-label">New</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="hero-editor-actions">
          <button 
            onClick={addNewRow} 
            className="add-btn"
            type="button"
          >
            <Plus size={16} />
            Add New Row
          </button>
          <div className="action-buttons">
            <button 
              onClick={handleCancel} 
              className="cancel-btn"
              type="button"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="save-btn"
              disabled={loading}
              type="button"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

console.log("Rendering Home with editData:", editData);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F7F5",
        gap: "75px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Living Fire",
            image: [
              "https://livingfires.com.au/logo.webp", // Convert to WebP
              "https://livingfires.com.au/assets/homePage/homePageMainImg.webp",
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "48-150 Cochranes Rd",
              addressLocality: "Moorabbin",
              addressRegion: "VIC",
              postalCode: "3189",
              addressCountry: "AU",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "-37.9399438839525",
              longitude: "145.0849985832501",
            },
            telephone: "+61 3 9977 7888",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
            ],
            priceRange: "$$$",
          }),
        }}
      />

      {/* Hero Section */}
      <div className="home-page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showPanels ? 1 : 0 }}
          transition={{ duration: 0.3, delay: showPanels ? 0 : 0.3 }}
        >
          {/* Animated Panels */}
          <motion.div
            className={`panel-left ${showPanels ? "show-panelsLeft" : ""}`}
            initial={{ x: "-100%" }}
            animate={{
              x: showPanels ? (animatePanels ? "-100%" : "-100%") : "-10%",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            aria-hidden="true"
          />

          <motion.div
            className={`panel-right ${showPanels ? "show-panelsRight" : ""}`}
            initial={{ x: "100%" }}
            animate={{
              x: showPanels ? (animatePanels ? "100%" : "100%") : "10%",
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <div
            className={`overlay-container ${zoomImage ? "show-panels" : ""}`}
          >
            <Slider {...carouselSettings} className="hero-carousel">
              {heroImages?.length > 0
                ? heroImages?.map((item, index) => (
                    <div key={index} className="carousel-slide">
                      <Image
                        src={item.image_src || homePageMainImg}
                        title={item.image_name || "Hero Image"}
                        alt={item.image_name || "Hero Image"}
                        className={`overlay-image ${zoomImage ? "zoom" : ""}`}
                        priority
                        fetchPriority="high"
                        quality={95}
                        width={1920}
                        height={1080}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        // placeholder="blur"
                        loading="eager"
                        decoding="async"
                        style={{
                          contentVisibility: "auto",
                          containIntrinsicSize: "1200px 800px",
                        }}
                      />
                    </div>
                  ))
                : // Fallback if no images in DB
                  [1, 2, 3].map((item) => (
                    <div key={item} className="carousel-slide">
                      <Image
                        src={homePageMainImg}
                        title="Luxury European Fireplace Display at Living Fire Melbourne Showroom"
                        alt="Luxury European Fireplace Display at Living Fire Melbourne Showroom"
                        className={`overlay-image ${zoomImage ? "zoom" : ""}`}
                        priority
                        fetchPriority="high"
                        quality={95}
                        width={1920}
                        height={1080}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        // placeholder="blur"
                        loading="eager"
                        decoding="async"
                        style={{
                          contentVisibility: "auto",
                          containIntrinsicSize: "1200px 800px",
                        }}
                      />
                    </div>
                  ))}
            </Slider>

            <motion.div
              className="text-group show"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div
                id="company-name"
                className="blur-text text-4xl font-bold"
                onClick={() => router.push(`/allProducts`)}
                style={{
                  cursor: "pointer",
                  opacity: 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                <Link href="/allProducts" legacyBehavior>
                  <a style={{ color: "inherit", textDecoration: "none" }}>
                    LIVING FIRE
                  </a>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="text-group-subheading show"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* <span className="blur-text">Architectural Fireplace Design</span> */}
              <h1
                id="subheading"
                className="blur-text"
                style={{
                  display: "inline",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  margin: 0,
                  padding: 0,
                  lineHeight: "inherit",
                  opacity: 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                Architectural Fireplace Design
              </h1>
            </motion.div>

            <motion.div
              className={`button-group ${showButtons ? "show" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: showButtons ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              {fuelTypes?.map(
                (fuelType, index) =>
                  fuelType?.fueltype_name !== "Hybrid - Wood/Electric" && (
                    <React.Fragment key={`fuelType-${fuelType.fueltype_id}`}>
                      <Link
                        href={
                          fuelType?.slug
                            ? `/allProducts/${fuelType.slug}`
                            : `/allProducts/${fuelType.fueltype_name}`
                        }
                        passHref
                        legacyBehavior
                      >
                        <a
                          className="p-0 m-0 flex gap-3"
                          aria-label={`Browse ${fuelType.fueltype_name} fireplaces`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          <button
                            key={`fuelType-${fuelType.fueltype_id}`}
                            onClick={() =>
                              allProductsRouteHandler(
                                "fuelType",
                                fuelType.fueltype_name,
                                fuelType.fueltype_id,
                                fuelType?.slug
                              )
                            }
                            className="p-0 m-0 flex gap-3"
                            aria-label={`Browse ${fuelType.fueltype_name} fireplaces`}
                          >
                            {fuelType.fueltype_name === "Cooker"
                              ? "Cookers"
                              : fuelType.fueltype_name}
                          </button>
                        </a>
                      </Link>
                      {index < fuelTypes.length - 1 && (
                        <span className="hidden md:flex items-center text-white">
                          |
                        </span>
                      )}
                    </React.Fragment>
                  )
              )}
            </motion.div>
            <motion.div
              className="scroll-indicator"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, 10, 0],
                opacity: [0, 1, 1],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.5,
                  delay: 3, // appears after other animations
                },
              }}
            >
              <ChevronDown size={48} color="white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      
{/* Add Edit Button for Admin */}
{isAdmin && (
  <div className="admin-edit-hero">
    <button
      onClick={async () => {
        try {
          const res = await fetch("/api/hero-image");
          const data = await res.json();
          setEditData(data);
          setEditing(true);
        } catch (error) {
          console.error('Error fetching hero images:', error);
          alert('Error loading hero images');
        }
      }}
      className="edit-hero-btn"
      type="button"
    >
      <Edit size={16} />
      Edit Hero Images
    </button>
  </div>
)}

{/* Hero Image Editor Modal */}
{editing && <HeroImageEditor />}


      {/* Dynamically Loaded Sections */}
      <Suspense
        fallback={
          <div className="loading-spinner">
            <Loader />
          </div>
        }
      >
        <motion.div
          className="hero-content-underneath"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            padding: isDesktop ? "0" : "0 20px",
            textAlign: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* <h1>STUNNING FIREPLACES FOR ANY HOME.</h1> */}
          <div id="hero-heading" className="text-4xl font-bold leading-tight">
            STUNNING FIREPLACES FOR ANY HOME.
          </div>
          <p
            style={{
              fontSize: isDesktop ? "1.1rem" : "1rem",
              lineHeight: 1.5,
              margin: "0 auto",
              maxWidth: "800px",
              padding: isDesktop ? "0" : "0 10px",
            }}
          >
            At Living Fire, we believe our work is complete only when our
            clients are enjoying the warmth of their new fireplace with a glass
            of wine in hand. To ensure every customer across Melbourne and
            Australia finds their match, we have curated an exceptional
            selection of luxury fireplace brands. Visit our showrooms in
            Richmond and Moorabbin to experience our products firsthand.
          </p>
        </motion.div>
        <Collections
          fuelTypes={fuelTypes}
          allProductsRouteHandler={allProductsRouteHandler}
          isAdmin={isAdmin} 
        />
        {isDesktop ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              backgroundColor: "white",
            }}
          >
            <OurBrands
              brandList={brandsList}
              allProductsRouteHandler={allProductsRouteHandler}
              isAdmin={isAdmin} 
            />
            <Featured
              headingValue="Featured"
              productRouteHandler={productRouteHandler}
            />
          </div>
        ) : (
          <>
            <OurBrands
              brandList={brandsList}
              allProductsRouteHandler={allProductsRouteHandler}
            />
            <Featured
              headingValue="Featured"
              productRouteHandler={productRouteHandler}
            />
          </>
        )}
        {/* <Testimonials /> */}
        {/* <Blog /> */}
      </Suspense>

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: brandsList.map((brand, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: `${brand.title} Fireplace`,
                url: `https://livingfires.com.au/allProducts/${brand.title.replace(
                  /\s+/g,
                  "_"
                )}`,
                image: `https://livingfires.com.au/assets/homePage/ourBrands/${
                  brand.imageKey
                }.${brand.isSvg ? "svg" : "png"}`,
                description: `Premium ${brand.title} fireplace collection`,
                brand: { "@type": "Brand", name: brand.title },
              },
            })),
          }),
        }}
      />
    </div>
  );
};

export default Home;
