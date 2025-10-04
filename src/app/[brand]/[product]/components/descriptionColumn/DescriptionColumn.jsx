import styles from "./DescriptionColumn.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";

export default function DescriptionColumn({
  product_desc,
  descriptionColumnHeight,
  setDescriptionColumn,
  setIsAdmin,
  isAdmin,
  p_id,
}) {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px",
  });

  const [loadedSections, setLoadedSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSections, setEditSections] = useState([]);

  useEffect(() => {
    if (inView && isLoading) {
      const timer = setTimeout(() => {
        setLoadedSections(
          product_desc.filter(
            (section) => section.name !== "MATERIAL & FINISH OPTIONS"
          )
        );
        setEditSections(
          product_desc.filter(
            (section) => section.name !== "MATERIAL & FINISH OPTIONS"
          )
        );
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView, isLoading, product_desc]);

  useEffect(() => {
    if (containerRef.current && typeof setDescriptionColumn === "function") {
      setDescriptionColumn(containerRef.current.offsetHeight);
    }
  }, [product_desc, isLoading, editSections]);

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

  const addNewSection = () => {
    setEditSections([
      ...editSections,
      {
        name: "New Section",
        value: [""],
      },
    ]);
  };

  const deleteSection = (sectionIdx) => {
    setEditSections(editSections.filter((_, i) => i !== sectionIdx));
  };

  const addNewItem = (sectionIdx) => {
    const updated = [...editSections];
    updated[sectionIdx].value.push("");
    setEditSections(updated);
  };

  const deleteItem = (sectionIdx, itemIndex) => {
    const updated = [...editSections];
    updated[sectionIdx].value = updated[sectionIdx].value.filter(
      (_, i) => i !== itemIndex
    );
    setEditSections(updated);
  };

  // Function to format text with bullet points and proper spacing
  const formatContent = (contentArray, isDescription = false) => {
    if (isDescription) {
      return contentArray.map((item, index) => (
        <p key={index} className={styles.paragraph}>
          {item}
        </p>
      ));
    }

    // Function to format text with bold until colon
    const formatTextWithBold = (text) => {
      const colonIndex = text.indexOf(":");
      if (colonIndex !== -1) {
        return (
          <span className={styles.noBreakText}>
            <span className={styles.boldUntilColon}>
              {text.substring(0, colonIndex + 1)}
            </span>
            {text.substring(colonIndex + 1)}
          </span>
        );
      }
      return text;
    };
    const validItems = contentArray.filter(
      (item) => item && item.trim() !== ""
    );
    return (
      <ul className={styles.bulletList}>
      {contentArray.map((item, itemIndex) => {
        // Skip empty items in the middle, but keep spacing for empty items at the end
        if (!item || item.trim() === '') {
          // Check if this is the last empty item in array
          const hasNonEmptyAfter = contentArray.slice(itemIndex + 1).some(nextItem => 
            nextItem && nextItem.trim() !== ''
          );
          
          if (hasNonEmptyAfter) {
            // Empty item in middle - skip completely
            return null;
          } else {
            // Empty item at the end - add spacing div
            return <div key={itemIndex} className={styles.emptyItemSpacing} />;
          }
        }
        
        return (
          <li key={itemIndex} className={styles.listItem}>
            {formatTextWithBold(item)}
          </li>
        );
      })}
    </ul>
    );
  };

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
        <button className={styles.editButton} onClick={() => setEditMode(true)}>
          <span className={styles.editIcon}>✏️</span>
          Edit Content
        </button>
      )}

      {/* Edit mode submit/cancel buttons */}
      {editMode && !isLoading && (
        <div className={styles.editControls}>
          <button
            className={styles.submitButton}
            onClick={async () => {
              try {
                const res = await fetch("/api/update-product-desc", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    p_id: p_id,
                    desc_sections: editSections,
                  }),
                });
                if (!res.ok) throw new Error("Failed to update");
                setEditMode(false);
                setLoadedSections(editSections);
              } catch (err) {
                alert("Error updating: " + err.message);
              }
            }}
          >
            <span className={styles.buttonIcon}>✓</span>
            Save Changes
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => {
              setEditMode(false);
              setEditSections(loadedSections);
            }}
          >
            <span className={styles.buttonIcon}>✕</span>
            Cancel
          </button>
          <button className={styles.addSectionButton} onClick={addNewSection}>
            <span className={styles.buttonIcon}>+</span>
            Add Section
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
            className={styles.editSection}
          >
            {/* Section Header with Delete Button */}
            <div className={styles.sectionHeader}>
              <input
                type="text"
                value={section.name}
                className={styles.sectionTitleInput}
                onChange={(e) => {
                  const updated = [...editSections];
                  updated[sectionIdx] = {
                    ...updated[sectionIdx],
                    name: e.target.value,
                  };
                  setEditSections(updated);
                }}
                placeholder="Section Title"
              />
              <button
                className={styles.deleteSectionButton}
                onClick={() => deleteSection(sectionIdx)}
              >
                <span className={styles.buttonIcon}>🗑️</span>
                Delete Section
              </button>
            </div>

            {/* Section Content */}
            <div className={styles.sectionContent}>
              {section.value.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.editItem}>
                  <textarea
                    value={item}
                    className={styles.contentTextarea}
                    onChange={(e) => {
                      const updated = [...editSections];
                      const newVals = [...updated[sectionIdx].value];
                      newVals[itemIndex] = e.target.value;
                      updated[sectionIdx] = {
                        ...updated[sectionIdx],
                        value: newVals,
                      };
                      setEditSections(updated);
                    }}
                    placeholder="Enter content here..."
                    rows="3"
                  />
                  <button
                    className={styles.deleteItemButton}
                    onClick={() => deleteItem(sectionIdx, itemIndex)}
                  >
                    Delete
                  </button>
                </div>
              ))}

              {/* Add New Item Button */}
              <button
                className={styles.addItemButton}
                onClick={() => addNewItem(sectionIdx)}
              >
                <span className={styles.buttonIcon}>+</span>
                Add New Point
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        loadedSections.map((section, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={styles.contentSection}
          >
            {section.value?.length > 0 && section.value?.[0] != "" > 0 && (
              <motion.h3 className={styles.sectionTitle}>
                {section.name}
              </motion.h3>
            )}
            <motion.div
              className={
                section.name === "DESCRIPTION"
                  ? styles.descriptionContent
                  : styles.listContent
              }
            >
              {formatContent(section.value, section.name === "DESCRIPTION")}
            </motion.div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}
