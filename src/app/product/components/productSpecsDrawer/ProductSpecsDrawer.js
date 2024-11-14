import { useState } from "react";
import styles from "./ProductSpecsDrawer.module.css";
import Image from "next/image";
import closeIcon from "@/public/assets/product/close-btn.svg";
import prodSpecImage from "@/public/assets/product/prod-spec.png";
import brochureIcon from "@/public/assets/product/brochure.svg";

const ProductSpecsDrawer = ({
  isOpen,
  closeDrawer,
  openDrawer,
  name,
  brand_name,
}) => {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains(styles.drawerOverlay)) {
      closeDrawer();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.drawerOverlay} onClick={handleClickOutside}>
          <div className={styles.drawerContent}>
            <div className={styles.leftColumn}>
              <div className={styles.columnpaulagnew}>
                <p className={`${styles.paulagnew} ui text size-textxs`}>
                  Paul Agnew Designs
                </p>
                <p className={`${styles.ilektro1250} ui text size-h2`}>
                  {`${name?.toUpperCase()} ${brand_name}`}
                </p>
              </div>

              <div className={styles.columntopdownlo}>
                <div className={styles.topDownloads}>
                  <p className={`${styles.flue} ui text size-h4`}>
                    Top Downloads
                  </p>
                  <div className={styles.columnfileOne}>
                    <FileItem text="Builders & Architects Information Sheet" />
                    <FileItem text="Flue Specification Guide" />
                    <FileItem text="Installation Manual" />
                    <FileItem text="Fireplace User Guide" />
                    <FileItem text="Smart Heat User Guide" />
                    <FileItem text="CAD/BIM" />
                  </div>
                </div>
                <div className={styles.line}></div>

                <div className={styles.Installation}>
                  <p className={`${styles.flue} ui text size-h4`}>
                    Installation
                  </p>
                  <div className={styles.columnfileOne}>
                    <FileItem text="Builders & Architects Information Sheet" />
                    <FileItem text="Kitset Wall Unit" />
                    <FileItem text="Heating Area Guide" />
                    <FileItem text="Fireplace User Guide" />
                    <FileItem text="Smart Heat User Guide" />
                    <FileItem text="CAD/BIM" />
                  </div>
                </div>
                <div className={styles.line}></div>

                <div className={styles.flueSection}>
                  <p className={`${styles.flue} ui text size-h4`}>Flue</p>
                  <div className={styles.columnfileOne}>
                    <FileItem text="Poly Pro Install Manual" />
                    <FileItem text="EVP Standard Detail" />
                    <FileItem text="EVP Flat Roof Detail" />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <Image
                src={prodSpecImage}
                alt="Product Specifications"
                className={styles.prodSpecImg}
              />
              <div className={styles.buttonsOverlay}>
                <button
                  className={`${styles.downloadButton} ${styles.hoverEffectDownloadButton}`}
                >
                  Download All
                </button>
                <button
                  className={`${styles.viewProductButton} ${styles.hoverEffect}`}
                >
                  View Product
                </button>
              </div>
              <button onClick={closeDrawer} className={styles.closeButton}>
                <Image src={closeIcon} alt="Close" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FileItem = ({ text }) => (
  <div className={styles.file}>
    <Image src={brochureIcon} alt="File" className={styles.fileOne} />
    <p className={`${styles.regencygfi750} ui text size-body_medium`}>{text}</p>
  </div>
);

export default ProductSpecsDrawer;
