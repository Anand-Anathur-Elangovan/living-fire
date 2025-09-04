import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProductSpecsDrawer.module.css";
import Image from "next/image";
import closeIcon from "@/public/assets/product/close-btn.svg";
import prodSpecImage from "@/public/assets/product/prod-spec.png";
import brochureIcon from "@/public/assets/product/brochure.svg";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";
import useMediaQuery from "../../../hooks/useMediaQuery";

const ProductSpecsDrawer = ({
  isOpen,
  closeDrawer,
  openDrawer,
  name,
  brand_name,
  product_details,
  selectedProductId,
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const [isClosing, setIsClosing] = useState(false);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains(styles.drawerOverlay)) {
      closeDrawerWithAnimation();
    }
  };

  const closeDrawerWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeDrawer();
      setIsClosing(false);
    }, 300); // Match this with your animation duration
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const files =
      product_details.find((item) => item.name === "Downloads")?.value || [];

    for (const file of files) {
      try {
        const response = await fetch(file.fileurl);
        const fileBlob = await response.blob();
        const pdfBlob = new Blob([fileBlob], { type: "application/pdf" });
        zip.file(file.filename + ".pdf", pdfBlob);
      } catch (error) {
        console.error("Error downloading file", error);
      }
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "product-downloads.zip");
    });
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Apply styles to body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore styles and scroll position when component unmounts
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const drawerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.drawerOverlay}
          onClick={handleClickOutside}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          transition={{ duration: 0.3 }}
          onTouchMove={(e) => {
            // Prevent touch scrolling on the overlay
            e.preventDefault();
          }}
        >
          <motion.div
            className={styles.drawerContent}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.leftColumn}>
              <div className={styles.columnpaulagnew}>
                <p className={`${styles.paulagnew} ui text size-textxs`}>
                  {brand_name}
                </p>
                <p className={`${styles.ilektro1250} ui text size-h2`}>
                  {`${name?.toUpperCase()}`}
                </p>
              </div>

              <div className={styles.columntopdownlo}>
                <div className={styles.topDownloads}>
                  <p className={`${styles.flue} ui text size-h4`}>
                    Top Downloads
                  </p>
                  <div className={styles.columnfileOne}>
                    {product_details
                      .find((item) => item.name === "Downloads")
                      ?.value.map((file, index) => (
                        <motion.div
                          key={file.filename}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FileItem
                            text={file.filename}
                            fileUrl={file.fileurl}
                          />
                        </motion.div>
                      ))}
                  </div>
                </div>
                <div className={styles.line}></div>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <Image
                src={prodSpecImage}
                alt="Product Specifications"
                className={styles.prodSpecImg}
                loading="lazy"
                placeholder="blur"
                priority={false}
              />
              <div className={styles.buttonsOverlay}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${styles.downloadButton} ${styles.hoverEffectDownloadButton}`}
                  onClick={handleDownloadAll}
                >
                  Download All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${styles.viewProductButton} ${styles.hoverEffect}`}
                  onClick={() =>
                    router.push(
                      `/${brand_name.replace(/\s+/g, "_")}/${name.replace(
                        /\s+/g,
                        "_"
                      )}`
                    )
                  }
                >
                  View Product
                </motion.button>
              </div>
              <motion.button
                onClick={closeDrawerWithAnimation}
                className={styles.closeButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={closeIcon}
                  alt="Close"
                  loading="lazy"
                  width={24}
                  height={24}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FileItem = ({ text, fileUrl }) => (
  <motion.div className={styles.file} whileHover={{ x: 5 }}>
    <Image
      src={brochureIcon}
      alt="File"
      className={styles.fileOne}
      loading="lazy"
      width={20}
      height={20}
    />
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.regencygfi750} ui text size-body_medium`}
    >
      {text}
    </a>
  </motion.div>
);

export default ProductSpecsDrawer;
