import styles from "./DescriptionColumn.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";

export default function DescriptionColumn({ product_desc, descriptionColumnHeight, setDescriptionColumn }) {
  // Ref for root element to measure height
    const containerRef = useRef(null);
    
    const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px",
  });

  const [loadedSections, setLoadedSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView && isLoading) {
      const timer = setTimeout(() => {
        setLoadedSections(product_desc.filter(section => section.name !== "MATERIAL & FINISH OPTIONS"));
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
      {isLoading ? (
        <div className={styles.skeletonLoader}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeletonItem}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonContent}></div>
            </div>
          ))}
        </div>
      ) : (
        loadedSections.map((section, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={styles["columndesc"]}
          >
            {section.value?.length > 0 && section.value?.[0] != "" > 0 && (
              <motion.div
                // whileHover={{ scale: 1.02 }}
                className={styles["materialfinish"]}
              >
                {section.name}
              </motion.div>
            )}
            {section.name === "DESCRIPTION" ? (
              <motion.div
                // whileHover={{ x: 5 }}
                className={styles["description"]}
              >
                {section.value.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item}
                    {itemIndex < section.value.length - 1 && <br />}
                  </span>
                ))}
              </motion.div>
            ) : (
              <motion.div
                // whileHover={{ x: 5 }}
                className={styles["distanceList"]}
              >
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