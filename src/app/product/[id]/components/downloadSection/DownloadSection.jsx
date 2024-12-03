// import brochure from "@/public/assets/product/brochure.svg";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import styles from "./DownloadSection.module.css";
import brochureIcon from "@/public/assets/product/brochure.svg";
import dynamic from "next/dynamic";
import "lightgallery/css/lightgallery.css"; // Base CSS
import "lightgallery/css/lg-thumbnail.css"; // Thumbnail plugin
import "lightgallery/css/lg-zoom.css"; // Zoom plugin
import "lightgallery/css/lg-fullscreen.css"; // Fullscreen plugin
import { useRouter } from "next/navigation";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";

const DownloadSection = forwardRef(
  ({ product_details, openDrawer, activeTab, setActiveTab }, ref) => {
    const router = useRouter();
    // const [activeTab, setActiveTab] = useState("Downloads");
    const [openFAQ, setOpenFAQ] = useState(null);
    const is424 = window.location.href.includes("424");

    const accessories = {
      name: "Accessories",
      value: [
        {
          name: "Fascia Options",
          value: [
            {
              fileurl:
                "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/Fascia%20and%20Trim/Regency/Fascia-GFi750-3-Sided%20Black%20Backing%20Plate.jpg",
              filename: "3 Sided Black Backing Plate",
            },
          ],
        },
        {
          name: "Inner Panels Options",
          value: [
            {
              fileurl:
                "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/Inner%20Panels/Regency/GFi750-Metallic%20Black%20Inner%20Panels.jpg",
              filename: "Metallic Black Inner Panels",
            },
            {
              fileurl:
                "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/Inner%20Panels/Regency/GFi750-Reflective%20Black%20Inner%20Panels.jpg",
              filename: "Reflective Black Inner Panels",
            },
          ],
        },
        // {
        //   name: "Inner Panels Options",
        //   value: [
        //     {
        //       name: "Inner Panels Options 1",
        //       fileurl:
        //         "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/Inner%20Panels/Regency/GFi750-Metallic%20Black%20Inner%20Panels.jpg",
        //       filename: "Metallic Black Inner Panels",
        //     },
        //     {
        //       name: "Inner Panels Options 2",
        //       fileurl:
        //         "https://23909229.fs1.hubspotusercontent-na1.net/hubfs/23909229/Inner%20Panels/Regency/GFi750-Reflective%20Black%20Inner%20Panels.jpg",
        //       filename: "Reflective Black Inner Panels",
        //     },
        //   ],
        // },
      ],
    };
    const productDetails = is424 ? product_details : product_details;

    // useImperativeHandle(ref, () => ({
    //   goToAccessoriesTab() {
    //     setActiveTab("Accessories");
    //     document.getElementById("accessories-tab")?.scrollIntoView({
    //       behavior: "smooth",
    //     });
    //   },
    // }));
    const toggleFAQ = (index) => {
      setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleImageClick = (fileurl) => {
      window.open(fileurl, "_blank");
    };
    const renderAccessoriesContent = (accessoriesData) => {
      return (
        <div className={styles.accessoriesContainer}>
          {/* <h1 className={styles.accessoriesTitle}>{accessoriesData.name}</h1> */}
          {accessoriesData?.value?.map((category, index) => {
            return (
              category?.value?.length > 0 && (
                <div
                  key={`${category.name}-${index}`}
                  className={styles.accessoriesCategory}
                >
                  <h2 className={styles.categoryTitle}>{category.name}</h2>

                  <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom, lgFullscreen]}
                    mode="lg-fade"
                    closable={true}
                    download={true}
                    zoomFromOrigin={false}
                    mousewheel
                  >
                    {/* <div className={styles.accessoriesRowContainer}> */}
                    {category?.value?.map((item, idx) => (
                      <a
                        key={idx}
                        href={transformImageSrc(item.fileurl)}
                        data-src={transformImageSrc(item?.fileurl)}
                        data-lg-size="1600-2400"
                        data-sub-html={`<h4>${item.filename}</h4>`}
                        className={styles.imageLink}
                      >
                        <Image
                          src={transformImageSrc(item?.fileurl)}
                          alt={item.filename}
                          className={styles.image}
                          width={400}
                          height={240}
                        />
                        <p className={styles.imageTitle}>{item.name}</p>
                      </a>
                    ))}
                    {/* </div> */}
                  </LightGallery>
                </div>
              )
            );
          })}
        </div>
      );
    };

    const renderTabContent = () => {
      const tabContent = productDetails?.find(
        (item) => item.name.toLowerCase() === activeTab.toLowerCase()
      );
      if (!tabContent) return null;

      if (activeTab === "Downloads") {
        return (
          <div className={styles.brochureSection}>
            <div className={styles.listspecsheet}>
              {tabContent.value &&
                Array.isArray(tabContent.value) &&
                tabContent.value.map((downloadItem, index) => {
                  if (
                    downloadItem.name === "brochure" ||
                    downloadItem.name === "spec sheet" ||
                    downloadItem.name === "manual"
                  )
                    return (
                      <div key={index} className={styles.columnTwo}>
                        <p
                          className={`${styles.materialfinish} ${styles.sizeH6}`}
                        >
                          {downloadItem.name?.toUpperCase()}
                        </p>
                        <div
                          className={styles?.rowtext}
                          onClick={() =>
                            window.open(
                              transformImageSrc(downloadItem?.fileurl),
                              "_blank"
                            )
                          }
                        >
                          <Image
                            src={brochureIcon}
                            alt="Imageclass"
                            className={styles.imageclass}
                          />
                          <p
                            className={`${styles.text7} ${styles.sizeBodyMedium}`}
                          >
                            {downloadItem.filename}
                          </p>
                        </div>
                      </div>
                    );
                })}
              <button
                className={`${styles.flexRowCenterCenter} ${styles.viewAllSpecs} ${styles.sizeLg} ${styles.outline} ${styles.square}`}
                // onClick={openDrawer}
                onClick={() => router.push(`/specificationSheet`)}
              >
                View All Specs
              </button>
            </div>
          </div>
        );
      } else if (activeTab === "FAQs") {
        return (
          <div className={styles.faqSection}>
            {tabContent.value.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  <p>{faq.question}</p>
                  <span>{openFAQ === index ? "✕" : "+"}</span>
                </div>
                {openFAQ === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
                <div className={styles.divider}></div>
              </div>
            ))}
          </div>
        );
      } else if (activeTab === "Accessories") {
        return renderAccessoriesContent(tabContent);
      } else {
        return (
          <div className={styles.contentSection}>
            {tabContent.value.map((paragraph, index) => (
              <p key={index} className={styles.contentParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        );
      }
    };

    return (
      <section
        ref={ref}
        id="download-section"
        className={styles.downloadSection}
      >
        <div className={styles.row}>
          <div className={styles.infosection}>
            <div>
              <div className={styles.tabSection}>
                {productDetails?.map(
                  (tabItem) =>
                    tabItem?.value?.length > 0 && (
                      <div
                        key={tabItem.name}
                        className={`${styles.tab} ${
                          activeTab === tabItem.name && styles.activeTab
                        }`}
                        onClick={() => setActiveTab(tabItem.name)}
                      >
                        <p className={`${styles.ui} ${styles.sizeH4}`}>
                          {tabItem.name}
                        </p>
                      </div>
                    )
                )}
              </div>
              <div className={styles.lineelevenOne}></div>
            </div>
            {renderTabContent()}
          </div>
        </div>
      </section>
    );
  }
);
DownloadSection.displayName = "DownloadSection";
export default DownloadSection;
