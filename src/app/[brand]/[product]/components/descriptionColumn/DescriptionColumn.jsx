import styles from "./DescriptionColumn.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { useEffect, useState, useRef } from "react";

export default function DescriptionColumn({ product_desc, descriptionColumnHeight, setDescriptionColumn, setIsAdmin, isAdmin, p_id }) {
  // Ref for root element to measure height
    const containerRef = useRef(null);
    
    const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px",
  });

  const [loadedSections, setLoadedSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editSections, setEditSections] = useState([]);


  useEffect(() => {
    if (inView && isLoading) {
      const timer = setTimeout(() => {
        setLoadedSections(product_desc.filter(section => section.name !== "MATERIAL & FINISH OPTIONS"));
        setEditSections(product_desc.filter(section => section.name !== "MATERIAL & FINISH OPTIONS"));
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, isLoading, product_desc]);

    useEffect(() => {
      if (containerRef.current && typeof setDescriptionColumn === 'function') {
        setDescriptionColumn(containerRef.current.offsetHeight);
      }
    }, [product_desc, isLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  console.log("product_desc in desc column", product_desc);
  console.log("isAdmin in desc column", isAdmin);
  return (
    <motion.div
      ref={(el) => {
        ref(el);
        containerRef.current = el;
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={styles["desc-column"]}
    >
      {/* Admin Edit Button */}
      {!editMode && isAdmin && !isLoading && (
        <button
          style={{ alignSelf: "flex-end", marginBottom: 8, padding: "4px 12px", fontSize: 14, borderRadius: 4, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
      )}

      {/* Edit mode submit/cancel buttons */}
      {editMode && !isLoading && (
        <div style={{ display: "flex", gap: 12, alignSelf: "flex-end", marginBottom: 12 }}>
          <button
            style={{ padding: "4px 16px", fontSize: 15, borderRadius: 4, border: "1px solid #1741be", background: "#1741be", color: "#fff", cursor: "pointer" }}
            onClick={async () => {
              // Submit updated data to API
              try {
                const res = await fetch("/api/update-product-desc", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    p_id:p_id,
                    desc_sections: editSections }),
                });
                if (!res.ok) throw new Error("Failed to update");
                setEditMode(false);
                // Optionally, reload or update parent state
              } catch (err) {
                alert("Error updating: " + err.message);
              }
            }}
          >
            Submit
          </button>
          <button
            style={{ padding: "4px 16px", fontSize: 15, borderRadius: 4, border: "1px solid #ccc", background: "#fff", color: "#333", cursor: "pointer" }}
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.skeletonLoader}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeletonItem}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonContent}></div>
            </div>
          ))}
        </div>
      ) : editMode ? (
        editSections.map((section, sectionIdx) => (
          <motion.div
            key={sectionIdx}
            variants={itemVariants}
            className={styles["columndesc"]}
          >
            {/* Editable section name */}
            <input
              type="text"
              value={section.name}
              className={styles["materialfinish"]}
              style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 6, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px", width: "100%" }}
              onChange={e => {
                const updated = [...editSections];
                updated[sectionIdx] = { ...updated[sectionIdx], name: e.target.value };
                setEditSections(updated);
              }}
            />
            {/* Editable values */}
            {section.name === "DESCRIPTION" ? (
              <motion.div className={styles["description"]}>
                {section.value.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ marginBottom: 4 }}>
                    <textarea
                      value={item}
                      style={{ width: "100%", minHeight: 32, border: "1px solid #ccc", borderRadius: 4, padding: 4, fontSize: "1rem" }}
                      onChange={e => {
                        const updated = [...editSections];
                        const newVals = [...updated[sectionIdx].value];
                        newVals[itemIndex] = e.target.value;
                        updated[sectionIdx] = { ...updated[sectionIdx], value: newVals };
                        setEditSections(updated);
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div className={styles["distanceList"]}>
                {section.value.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ marginBottom: 4 }}>
                    <textarea
                      value={item}
                      style={{ width: "100%", minHeight: 28, border: "1px solid #ccc", borderRadius: 4, padding: 4, fontSize: "1rem" }}
                      onChange={e => {
                        const updated = [...editSections];
                        const newVals = [...updated[sectionIdx].value];
                        newVals[itemIndex] = e.target.value;
                        updated[sectionIdx] = { ...updated[sectionIdx], value: newVals };
                        setEditSections(updated);
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))
      ) : (
        loadedSections.map((section, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={styles["columndesc"]}
          >
            {section.value?.length > 0 && section.value?.[0] != "" > 0 && (
              <motion.div
                className={styles["materialfinish"]}
              >
                {section.name}
              </motion.div>
            )}
            {section.name === "DESCRIPTION" ? (
              <motion.div className={styles["description"]}>
                {section.value.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item}
                    {itemIndex < section.value.length - 1 && <br />}
                  </span>
                ))}
              </motion.div>
            ) : (
              <motion.div className={styles["distanceList"]}>
                {section.value.map((item, itemIndex) => (
                  <div key={itemIndex}>{item}</div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))
      )}
    </motion.div>
  );
}