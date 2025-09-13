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
  (
    {
      product_details,
      openDrawer,
      activeTab,
      setActiveTab,
      setIsAccessories,
      isAdmin,
      p_id,
      ptype_name,
    },
    ref
  ) => {
    const router = useRouter();
    const [openFAQ, setOpenFAQ] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editDetails, setEditDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const is424 = typeof window !== 'undefined' ? window.location.href.includes("424") : false;
    const productDetails = is424 ? product_details : product_details;

    useEffect(() => {
      if (!editMode && product_details) {
        setEditDetails(JSON.parse(JSON.stringify(product_details)));
      }
    }, [product_details, editMode]);

    useEffect(() => {
      const hasAccessories = productDetails?.some(
        (tabItem) =>
          tabItem.name === "Accessories" &&
          tabItem.value?.some((item) => item?.value?.length > 0)
      );
      setIsAccessories(hasAccessories);
    }, [productDetails]);

    const toggleFAQ = (index) => {
      setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleImageClick = (fileurl) => {
      window.open(fileurl, "_blank");
    };

    const renderAccessoriesContent = (accessoriesData) => {
      return (
        <div className={styles.accessoriesContainer}>
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
                          unoptimized
                        />
                        <p className={styles.imageTitle}>{item.name}</p>
                      </a>
                    ))}
                  </LightGallery>
                </div>
              )
            );
          })}
        </div>
      );
    };

    const renderTabContent = () => {
      if (editMode) {
        return (
          <div style={{ marginTop: 24 }}>
            {editDetails.map((section, sectionIdx) => (
              <div
                key={sectionIdx}
                style={{
                  marginBottom: 24,
                  borderBottom: "1px solid #eee",
                  paddingBottom: 16,
                }}
              >
                <input
                  type="text"
                  value={section.name}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: 6,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: "2px 8px",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    const updated = [...editDetails];
                    updated[sectionIdx].name = e.target.value;
                    setEditDetails(updated);
                  }}
                />
                <button
                  style={{
                    marginLeft: 8,
                    padding: "2px 8px",
                    fontSize: 13,
                    borderRadius: 4,
                    border: "1px solid #e00",
                    background: "#fff",
                    color: "#e00",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditDetails(editDetails.filter((_, i) => i !== sectionIdx));
                  }}
                >
                  Delete Section
                </button>
                <button
                  style={{
                    marginLeft: 8,
                    padding: "2px 8px",
                    fontSize: 13,
                    borderRadius: 4,
                    border: "1px solid #1741be",
                    background: "#fff",
                    color: "#1741be",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const updated = [...editDetails];
                    updated.splice(sectionIdx + 1, 0, {
                      name: "New Section",
                      value: [],
                    });
                    setEditDetails(updated);
                  }}
                >
                  Add Section
                </button>
                
                {/* Section value editing */}
                <div style={{ marginTop: 12 }}>
                  {Array.isArray(section.value) &&
                    section.value.map((item, itemIdx) => {
                      // DOWNLOADS SECTION - Object with name, fileurl, filename
                      if (item && typeof item === 'object' && item.name && item.fileurl !== undefined) {
                        return (
                          <div key={itemIdx} style={{ marginBottom: 12, padding: 8, border: '1px solid #ddd', borderRadius: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <strong>Download Item:</strong>
                              <button
                                style={{
                                  padding: "2px 8px",
                                  fontSize: 13,
                                  borderRadius: 4,
                                  border: "1px solid #e00",
                                  background: "#fff",
                                  color: "#e00",
                                  cursor: "pointer",
                                  marginLeft: 'auto'
                                }}
                                onClick={() => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value = updated[sectionIdx].value.filter((_, i) => i !== itemIdx);
                                  setEditDetails(updated);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <input
                                type="text"
                                value={item.name || ""}
                                placeholder="Name (e.g., brochure, spec sheet)"
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px" }}
                                onChange={(e) => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value[itemIdx].name = e.target.value;
                                  setEditDetails(updated);
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <input
                                type="text"
                                value={item.fileurl || ""}
                                placeholder="File URL"
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px" }}
                                onChange={(e) => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value[itemIdx].fileurl = e.target.value;
                                  setEditDetails(updated);
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <input
                                type="text"
                                value={item.filename || ""}
                                placeholder="Filename"
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px" }}
                                onChange={(e) => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value[itemIdx].filename = e.target.value;
                                  setEditDetails(updated);
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                      
                      // FAQ SECTION - Object with question and answer
                      else if (item && typeof item === 'object' && item.question !== undefined && item.answer !== undefined) {
                        return (
                          <div key={itemIdx} style={{ marginBottom: 12, padding: 8, border: '1px solid #ddd', borderRadius: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <strong>FAQ Item:</strong>
                              <button
                                style={{
                                  padding: "2px 8px",
                                  fontSize: 13,
                                  borderRadius: 4,
                                  border: "1px solid #e00",
                                  background: "#fff",
                                  color: "#e00",
                                  cursor: "pointer",
                                  marginLeft: 'auto'
                                }}
                                onClick={() => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value = updated[sectionIdx].value.filter((_, i) => i !== itemIdx);
                                  setEditDetails(updated);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <input
                                type="text"
                                value={item.question || ""}
                                placeholder="Question"
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px" }}
                                onChange={(e) => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value[itemIdx].question = e.target.value;
                                  setEditDetails(updated);
                                }}
                              />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <textarea
                                value={item.answer || ""}
                                placeholder="Answer"
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px", minHeight: 60 }}
                                onChange={(e) => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value[itemIdx].answer = e.target.value;
                                  setEditDetails(updated);
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                      
                      // ACCESSORIES SECTION - Object with name and value array
                      else if (item && typeof item === 'object' && item.value && Array.isArray(item.value)) {
                        return (
                          <div key={itemIdx} style={{ marginBottom: 12, padding: 8, border: '1px solid #ddd', borderRadius: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                              <input
                                type="text"
                                value={item.name || ""}
                                placeholder="Category Name"
                                style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px", fontWeight: 'bold' }}
                                onChange={(e) => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value[itemIdx].name = e.target.value;
                                  setEditDetails(updated);
                                }}
                              />
                              <button
                                style={{
                                  padding: "2px 8px",
                                  fontSize: 13,
                                  borderRadius: 4,
                                  border: "1px solid #e00",
                                  background: "#fff",
                                  color: "#e00",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value = updated[sectionIdx].value.filter((_, i) => i !== itemIdx);
                                  setEditDetails(updated);
                                }}
                              >
                                Delete Category
                              </button>
                              <button
                                style={{
                                  padding: "2px 8px",
                                  fontSize: 13,
                                  borderRadius: 4,
                                  border: "1px solid #1741be",
                                  background: "#fff",
                                  color: "#1741be",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  const updated = [...editDetails];
                                  updated[sectionIdx].value[itemIdx].value.push({
                                    name: "",
                                    fileurl: "",
                                    filename: ""
                                  });
                                  setEditDetails(updated);
                                }}
                              >
                                Add Subitem
                              </button>
                            </div>
                            
                            {item.value.map((sub, subIdx) => (
                              <div key={subIdx} style={{ marginLeft: 20, marginBottom: 8, padding: 8, border: '1px solid #eee', borderRadius: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                                  <input
                                    type="text"
                                    value={sub.name || ""}
                                    placeholder="Subitem Name"
                                    style={{ width: 120, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px" }}
                                    onChange={(e) => {
                                      const updated = [...editDetails];
                                      updated[sectionIdx].value[itemIdx].value[subIdx].name = e.target.value;
                                      setEditDetails(updated);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    value={sub.fileurl || ""}
                                    placeholder="File URL"
                                    style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px" }}
                                    onChange={(e) => {
                                      const updated = [...editDetails];
                                      updated[sectionIdx].value[itemIdx].value[subIdx].fileurl = e.target.value;
                                      setEditDetails(updated);
                                    }}
                                  />
                                  <input
                                    type="text"
                                    value={sub.filename || ""}
                                    placeholder="Filename"
                                    style={{ width: 120, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px" }}
                                    onChange={(e) => {
                                      const updated = [...editDetails];
                                      updated[sectionIdx].value[itemIdx].value[subIdx].filename = e.target.value;
                                      setEditDetails(updated);
                                    }}
                                  />
                                  <button
                                    style={{
                                      padding: "2px 8px",
                                      fontSize: 13,
                                      borderRadius: 4,
                                      border: "1px solid #e00",
                                      background: "#fff",
                                      color: "#e00",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      const updated = [...editDetails];
                                      updated[sectionIdx].value[itemIdx].value = updated[sectionIdx].value[itemIdx].value.filter((_, i) => i !== subIdx);
                                      setEditDetails(updated);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      
                      // PLAIN TEXT CONTENT
                      else if (typeof item === "string") {
                        return (
                          <div key={itemIdx} style={{ display: "flex", alignItems: "center", marginBottom: 8, gap: 8 }}>
                            <textarea
                              value={item}
                              style={{ flex: 1, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px", minHeight: 60 }}
                              onChange={(e) => {
                                const updated = [...editDetails];
                                updated[sectionIdx].value[itemIdx] = e.target.value;
                                setEditDetails(updated);
                              }}
                            />
                            <button
                              style={{
                                padding: "2px 8px",
                                fontSize: 13,
                                borderRadius: 4,
                                border: "1px solid #e00",
                                background: "#fff",
                                color: "#e00",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                const updated = [...editDetails];
                                updated[sectionIdx].value = updated[sectionIdx].value.filter((_, i) => i !== itemIdx);
                                setEditDetails(updated);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={itemIdx} style={{ marginBottom: 8 }}>
                          <pre>{JSON.stringify(item)}</pre>
                        </div>
                      );
                    })}
                  
                  {/* ADD VALUE BUTTONS BASED ON SECTION TYPE */}
                  <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {section.name === "Downloads" && (
                      <button
                        style={{
                          padding: "4px 12px",
                          fontSize: 13,
                          borderRadius: 4,
                          border: "1px solid #1741be",
                          background: "#fff",
                          color: "#1741be",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const updated = [...editDetails];
                          updated[sectionIdx].value.push({
                            name: "",
                            fileurl: "",
                            filename: ""
                          });
                          setEditDetails(updated);
                        }}
                      >
                        Add Download Item
                      </button>
                    )}
                    
                    {section.name === "FAQs" && (
                      <button
                        style={{
                          padding: "4px 12px",
                          fontSize: 13,
                          borderRadius: 4,
                          border: "1px solid #1741be",
                          background: "#fff",
                          color: "#1741be",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const updated = [...editDetails];
                          updated[sectionIdx].value.push({
                            question: "",
                            answer: ""
                          });
                          setEditDetails(updated);
                        }}
                      >
                        Add FAQ Item
                      </button>
                    )}
                    
                    {section.name === "Accessories" && (
                      <button
                        style={{
                          padding: "4px 12px",
                          fontSize: 13,
                          borderRadius: 4,
                          border: "1px solid #1741be",
                          background: "#fff",
                          color: "#1741be",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const updated = [...editDetails];
                          updated[sectionIdx].value.push({
                            name: "",
                            value: []
                          });
                          setEditDetails(updated);
                        }}
                      >
                        Add Accessory Category
                      </button>
                    )}
                    
                    {(section.name !== "Downloads" && section.name !== "FAQs" && section.name !== "Accessories") && (
                      <button
                        style={{
                          padding: "4px 12px",
                          fontSize: 13,
                          borderRadius: 4,
                          border: "1px solid #1741be",
                          background: "#fff",
                          color: "#1741be",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const updated = [...editDetails];
                          updated[sectionIdx].value.push("");
                          setEditDetails(updated);
                        }}
                      >
                        Add Text Content
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-start" }}>
              <button
                style={{
                  padding: "4px 12px",
                  fontSize: 14,
                  borderRadius: 4,
                  border: "1px solid #1741be",
                  background: "#1741be",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  setLoading(true);
                  setError("");
                  setSuccess("");
                  try {
                    const res = await fetch("/api/update-product-details", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        p_id,
                        product_details: editDetails,
                        ptype_name,
                      }),
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
                }}
              >
                Submit
              </button>
              <button
                style={{
                  padding: "4px 12px",
                  fontSize: 14,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  background: "#fff",
                  color: "#333",
                  cursor: "pointer",
                }}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            {success && (
              <div style={{ color: "green", marginTop: 8 }}>{success}</div>
            )}
          </div>
        );
      }

      // Non-edit mode content rendering (ORIGINAL FUNCTIONALITY)
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
                    downloadItem?.name?.toLowerCase() === "brochure" ||
                    downloadItem?.name?.toLowerCase() === "spec sheet" ||
                    downloadItem?.name?.toLowerCase() === "manual" ||
                    downloadItem?.name?.toLowerCase() === "install manual"
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
                            unoptimized
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
                onClick={() => router.push(`/specificationSheet`)}
              >
                View All Specs
              </button>
            </div>
          </div>
        );
      } else if (activeTab === "FAQs" || activeTab === "FAQ") {
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
                  (tabItem) => (
                    <div
                      key={tabItem.name}
                      className={`${styles.tab} ${
                        activeTab === tabItem.name && styles.activeTab
                      }`}
                      onClick={() => setActiveTab(tabItem.name)}
                    >
                      <p className={`${styles.ui} ${styles.sizeH4}`}>
                        {tabItem.name == "Accessories"
                          ? tabItem?.value?.some((item) => {
                              return item?.value?.length > 0 ? true : false;
                            }) && tabItem.name
                          : tabItem.name}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className={styles.lineelevenOne}></div>
            </div>
            
            {renderTabContent()}
            
            {isAdmin && !editMode && (
              <div style={{ display: "flex", gap: 8, marginTop: 24, justifyContent: "flex-start" }}>
                <button
                  style={{
                    padding: "4px 12px",
                    fontSize: 14,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    background: "#f5f5f5",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

DownloadSection.displayName = "DownloadSection";
export default DownloadSection;