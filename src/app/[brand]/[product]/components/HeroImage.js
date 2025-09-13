"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const HeroImage = ({ productName, brandName, src, alt, isAdmin, p_id, ptype_name, catalogue_image }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Admin edit mode state
  const [editMode, setEditMode] = useState(false);
  const [heroImages, setHeroImages] = useState(src || []);
  const [catalogueImages, setCatalogueImages] = useState(catalogue_image || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  React.useEffect(() => {
    if (!editMode) {
      setHeroImages(src || []);
      setCatalogueImages(catalogue_image || []);
    }
  }, [src, catalogue_image, editMode]);

  // Ensure images is always an array of objects with name/value for the carousel
  const images = editMode
    ? (Array.isArray(heroImages) && heroImages.length > 0 ? heroImages : [{ value: "" }])
    : (Array.isArray(src) && src.length > 1
      ? src 
      : [
          { value: src?.[0]?.value },
          { value: src?.[0]?.value },
          { value: src?.[0]?.value },
        ]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    afterChange: (index) => setCurrentImageIndex(index),
  };

  const popupSettings = {
    ...settings,
    arrows: true,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  const handleImageClick = () => setIsPopupOpen(true);
  const handleClosePopup = (e) => {
    e.stopPropagation();
    setIsPopupOpen(false);
  };

  return (
    <>
      {!editMode && (<> <div className="hero-slider-container">
            <Slider className="product-hero-image" {...settings}>
              {images?.map((imageSrc, index) => (
                <div
                  key={index}
                  className="slider-image"
                  onClick={handleImageClick}
                  style={{ cursor: "pointer" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={
                        imageSrc?.value !== "TBC"
                          ? transformImageSrc(imageSrc?.value)
                          : ""
                      }
                      alt={`${productName} ${brandName} - ${
                        index > 0
                          ? `Detail View ${index + 1}`
                          : "Main Product Image"
                      }`}
                      width={700}
                      height={600}
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 700px"
                      className="class-hero-image-size"
                      style={{ width: "100%", height: "auto" }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      unoptimized={false}
                      quality={85}
                    />
                  </motion.div>
                </div>
              ))}
            </Slider>
            
          </div>
          {isAdmin && (
            <div style={{display:'flex',gap:8,marginTop:24,justifyContent:'flex-start'}}>
              {!editMode && (
                <button style={{padding:'4px 12px', fontSize:14, borderRadius:4, border:'1px solid #ccc', background:'#f5f5f5', cursor:'pointer'}} onClick={()=>setEditMode(true)}>Edit</button>
              )}
            </div>
          )}
          </>
          )}

          {editMode && (<>
          <div style={{width:'100%', marginBottom:24}}>
            <h4>Hero Images</h4>
            {heroImages.map((img, idx) => (
              <div key={idx} style={{display:'flex',alignItems:'center',marginBottom:8,gap:8}}>
                <input type="text" value={img.name || ''} placeholder="Name" style={{width:120,marginRight:8}} onChange={e=>{
                  const updated = [...heroImages];
                  updated[idx].name = e.target.value;
                  setHeroImages(updated);
                }} />
                <input type="text" value={img.value || ''} placeholder="Image URL" style={{flex:1,marginRight:8}} onChange={e=>{
                  const updated = [...heroImages];
                  updated[idx].value = e.target.value;
                  setHeroImages(updated);
                }} />
                <button style={{padding:'2px 8px',fontSize:13,borderRadius:4,border:'1px solid #e00',background:'#fff',color:'#e00',cursor:'pointer'}} onClick={()=>{
                  setHeroImages(heroImages.filter((_,i)=>i!==idx));
                }}>Delete</button>
              </div>
            ))}
            <button style={{marginTop:8,padding:'4px 12px',fontSize:14,borderRadius:4,border:'1px solid #1741be',background:'#fff',color:'#1741be',cursor:'pointer'}} onClick={()=>{
              setHeroImages([...heroImages,{name:'',value:''}]);
            }}>Add Hero Image</button>
            <h4 style={{marginTop:24}}>Catalogue Images</h4>
            {catalogueImages.map((img, idx) => (
              <div key={idx} style={{display:'flex',alignItems:'center',marginBottom:8,gap:8}}>
                <input type="text" value={img.name || ''} placeholder="Name" style={{width:120,marginRight:8}} onChange={e=>{
                  const updated = [...catalogueImages];
                  updated[idx].name = e.target.value;
                  setCatalogueImages(updated);
                }} />
                <input type="text" value={img.value || ''} placeholder="Image URL" style={{flex:1,marginRight:8}} onChange={e=>{
                  const updated = [...catalogueImages];
                  updated[idx].value = e.target.value;
                  setCatalogueImages(updated);
                }} />
                <button style={{padding:'2px 8px',fontSize:13,borderRadius:4,border:'1px solid #e00',background:'#fff',color:'#e00',cursor:'pointer'}} onClick={()=>{
                  setCatalogueImages(catalogueImages.filter((_,i)=>i!==idx));
                }}>Delete</button>
              </div>
            ))}
            <button style={{marginTop:8,padding:'4px 12px',fontSize:14,borderRadius:4,border:'1px solid #1741be',background:'#fff',color:'#1741be',cursor:'pointer'}} onClick={()=>{
              setCatalogueImages([...catalogueImages,{name:'',value:''}]);
            }}>Add Catalogue Image</button>
            {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
            {success && <div style={{color:'green',marginTop:8}}>{success}</div>}
          </div>
          <div style={{display:'flex',gap:8,marginTop:8,justifyContent:'flex-start'}}>
            <button style={{padding:'4px 12px', fontSize:14, borderRadius:4, border:'1px solid #1741be', background:'#1741be', color:'#fff', cursor:'pointer'}} onClick={async()=>{
              setLoading(true); setError(""); setSuccess("");
              try {
                const res = await fetch("/api/update-hero-catalogue", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ p_id, hero_image: heroImages, catalogue_image: catalogueImages, ptype_name }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Update failed");
                setSuccess("Updated successfully");
                setEditMode(false);
              } catch (err) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
            }}>Submit</button>
            <button style={{padding:'4px 12px', fontSize:14, borderRadius:4, border:'1px solid #ccc', background:'#fff', color:'#333', cursor:'pointer'}} onClick={()=>setEditMode(false)}>Cancel</button>
          </div>
        </>)}

  {isPopupOpen && (
        <div className="popup-carousel" onClick={handleClosePopup}>
          <div className="popup-overlay">
            <motion.div
              className="popup-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={handleClosePopup}>
                &times;
              </button>
              <Slider {...popupSettings} initialSlide={currentImageIndex}>
                {images?.map((imageSrc, index) => (
                  <div key={index} className="popup-slider-image">
                    <Image
                      src={
                        imageSrc?.value !== "TBC"
                          ? transformImageSrc(imageSrc?.value)
                          : ""
                      }
                      alt={`${productName} ${brandName} - ${
                        index > 0
                          ? `Detail View ${index + 1}`
                          : "Main Product Image"
                      }`}
                      width={1200}
                      height={800}
                      sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1000px"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "80vh",
                        objectFit: "contain",
                      }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      unoptimized={false}
                      quality={85}
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hero-slider-container {
          width: 100%;
          margin: 0 auto;
        }

        .popup-carousel {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(5px);
          /* margin-top: 10%; */
          padding-top: 10%;
        }

        .popup-content {
          position: relative;
          background: white;
          padding: 1rem;
          border-radius: 8px;
          width: 95%;
          max-width: 1024px;
          max-height: 90vh;
          overflow: hidden;
          margin-top: 10%;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #333;
          z-index: 1002;
        }

        .slick-dots {
          bottom: 10px;
        }

        .slick-dots li button:before {
          font-size: 12px;
        }

        @media (max-width: 1024px) {
          .popup-content {
            width: 90%;
            padding: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .popup-content {
            width: 95%;
            padding: 0.5rem;
            max-height: 85vh;
          }

          .close-button {
            font-size: 1.75rem;
            right: 10px;
          }
        }

        @media (max-width: 480px) {
          .popup-content {
            width: 98%;
            padding: 0.25rem;
            max-height: 80vh;
          }

          .close-button {
            font-size: 1.5rem;
            top: 5px;
            right: 5px;
          }

          .slick-dots {
            bottom: 5px;
          }

          .slick-dots li button:before {
            font-size: 10px;
          }
          .slick-slide img {
            display: block;
            height: 300px !important;
          }
          .popup-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 90%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
            /* margin-top: 10%; */
            padding: 50% 12% 0% 0%;
          }
        }
      `}</style>
    </>
  );
};

const CustomArrow = ({ direction, onClick }) => (
  <button
    className={`custom-arrow ${direction}`}
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      [direction === "left" ? "left" : "right"]:
        direction === "left" ? "5px" : "5px",
      transform: "translateY(-50%)",
      zIndex: 1001,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      border: "none",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      cursor: "pointer",
      color: "#333",
      fontSize: "1.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    }}
    aria-label={direction === "left" ? "Previous" : "Next"}
  >
    {direction === "left" ? "←" : "→"}
  </button>
);

export default HeroImage;
