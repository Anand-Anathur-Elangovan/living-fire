import { useState } from "react";
import styles from "./ProductSpecsDrawer.module.css";
import Image from "next/image";
import closeIcon from "@/public/assets/product/close-btn.svg";
import prodSpecImage from "@/public/assets/product/prod-spec.png";
import brochureIcon from "@/public/assets/product/brochure.svg";
import JSZip from "jszip"; // JSZip import
import { saveAs } from "file-saver"; // file-saver import

const ProductSpecsDrawer = ({
  isOpen,
  closeDrawer,
  openDrawer,
  name,
  brand_name,
  product_details,
}) => {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains(styles.drawerOverlay)) {
      closeDrawer();
    }
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const files =
      product_details.find((item) => item.name === "Downloads")?.value || [];

    // Loop through each file in the "Downloads" section
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

    // Generate the ZIP file and trigger download
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "product-downloads.zip");
    });
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
                    {/* Render file items dynamically from the JSON */}
                    {product_details
                      .find((item) => item.name === "Downloads")
                      ?.value.map((file) => (
                        <FileItem
                          key={file.filename}
                          text={file.filename}
                          fileUrl={file.fileurl}
                        />
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
                unoptimized
              />
              <div className={styles.buttonsOverlay}>
                <button
                  className={`${styles.downloadButton} ${styles.hoverEffectDownloadButton}`}
                  onClick={handleDownloadAll} // Attach the download handler
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
                <Image src={closeIcon} alt="Close" unoptimized />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FileItem = ({ text, fileUrl }) => (
  <div className={styles.file}>
    <Image
      src={brochureIcon}
      alt="File"
      className={styles.fileOne}
      unoptimized
    />
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.regencygfi750} ui text size-body_medium`}
    >
      {text}
    </a>
  </div>
);

export default ProductSpecsDrawer;
