// import React from "react";
// import styles from "./Specifications.module.css";
// import specImage from "@/public/assets/product/image.png";
// import Image from "next/image";

// const Specifications = ({ specifications }) => {
//   const parsedSpecifications = specifications?.map((spec) => {
//     let parsedValue = spec.spec_value;
//     try {
//       parsedValue =
//         typeof spec.spec_value === "string"
//           ? JSON.parse(spec.spec_value)
//           : spec.spec_value;
//     } catch (e) {
//       console.error("Invalid JSON:", e);
//     }
//     return {
//       spec_name: spec.spec_name,
//       spec_value: parsedValue,
//     };
//   });
//   return (
//     <section className={styles.specifications}>
//       <div className={styles.row}>
//         <div className={styles.rowspecs}>
//           <div className={styles.table}>
//             <div className={styles.head}>
//               <p className={`${styles.title} ui text size-h4`}>
//                 Specifications
//               </p>
//             </div>
//             <div className={styles.productspecs}>
//               {parsedSpecifications?.map((spec, index) => (
//                 <div key={index} className={styles.specificationSection}>
//                   {Array.isArray(spec.spec_value) &&
//                     spec.spec_value.some((item) => item?.value) && ( 
//                       <p className={`${styles.materialfinish} ui text size-h6`}>
//                         {spec.spec_name.toUpperCase()}
//                       </p>
//                     )}
//                   <div className={styles.specItems}>
//                     {spec.spec_value.map((item, idx) => {
//                       if (
//                         item.name == "Wood Fires" ||
//                         item.name == "Gas Fires"
//                       ) {
//                         if (item.value?.length > 0) {
//                           {
//                             return item.value?.map(
//                               (energySpecItem, energySpecIndex) => {
//                                 if (
//                                   energySpecItem.value !== "NA" &&
//                                   energySpecItem.value != ""
//                                 ) {
//                                   return (
//                                     <div
//                                       key={energySpecIndex}
//                                       className={styles.specItem}
//                                     >
//                                       <p className="homeelectric ui text size-body_medium">
//                                         {energySpecItem.name}
//                                       </p>
//                                       <p className="distanceTwo ui text size-body_medium relative -left-10">
//                                         {energySpecItem.value}
//                                       </p>
//                                     </div>
//                                   );
//                                 }
//                                 return null;
//                               }
//                             );
//                           }
//                         }
//                       } else {
//                         if (item.value !== "NA" && item.value != "") {
//                           return (
//                             <div key={idx} className={styles.specItem}>
//                               <p className="homeelectric ui text size-body_medium">
//                                 {item.name}
//                               </p>
//                               {typeof item.value === "object" ? (
//                                 <div className={styles.rowng}>
//                                   <p className="homeelectric ui text size-body_medium">
//                                     {item.value.NG || "-"}
//                                   </p>
//                                   <p className="homeelectric ui text size-body_medium">
//                                     {item.value.LP || "-"}
//                                   </p>
//                                   <p className="homeelectric ui text size-body_medium">
//                                     {item.value.ULPG || "-"}
//                                   </p>
//                                 </div>
//                               ) : (
//                                 <p className="distanceTwo ui text size-body_medium relative -left-10">
//                                   {item.value}
//                                 </p>
//                               )}
//                             </div>
//                           );
//                         }
//                       }
//                     })}
//                   </div>
//                 </div>
//               ))}
//               <div className={styles.energynotes}>
//                 <p>
//                   Energy Notes: Output depends on gas type and flue
//                   configuration
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Specifications;
import React, { useEffect } from "react";
import styles from "./Specifications.module.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Specifications = ({ specifications }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const parsedSpecifications = specifications?.map((spec) => {
    let parsedValue = spec.spec_value;
    try {
      parsedValue =
        typeof spec.spec_value === "string"
          ? JSON.parse(spec.spec_value)
          : spec.spec_value;
    } catch (e) {
      console.error("Invalid JSON:", e);
    }
    return {
      spec_name: spec.spec_name,
      spec_value: parsedValue,
    };
  });

  return (
    <section className={styles.specifications} ref={ref}>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className={styles.content}>
          <motion.div className={styles.table} variants={itemVariants}>
            <div className={styles.head}>
              <motion.p 
                className={`${styles.title} ui text size-h4`}
                variants={itemVariants}
              >
                Specifications
              </motion.p>
            </div>
            <motion.div 
              className={styles.productspecs}
              variants={containerVariants}
            >
              {parsedSpecifications?.map((spec, index) => (
                <motion.div 
                  key={index} 
                  className={styles.specificationSection}
                  variants={itemVariants}
                >
                  {Array.isArray(spec.spec_value) &&
                    spec.spec_value.some((item) => item?.value) && ( 
                      <motion.p 
                        className={`${styles.materialfinish} ui text size-h6`}
                        variants={itemVariants}
                      >
                        {spec.spec_name.toUpperCase()}
                      </motion.p>
                    )}
                  <div className={styles.specItems}>
                    {spec.spec_value.map((item, idx) => {
                      if (
                        item.name == "Wood Fires" ||
                        item.name == "Gas Fires"
                      ) {
                        if (item.value?.length > 0) {
                          {
                            return item.value?.map(
                              (energySpecItem, energySpecIndex) => {
                                if (
                                  energySpecItem.value !== "NA" &&
                                  energySpecItem.value != ""
                                ) {
                                  return (
                                    <motion.div
                                      key={energySpecIndex}
                                      className={styles.specItem}
                                      variants={itemVariants}
                                      whileHover={{ scale: 1.02 }}
                                    >
                                      <p className="homeelectric ui text size-body_medium">
                                        {energySpecItem.name}
                                      </p>
                                      <p className="distanceTwo ui text size-body_medium">
                                        {energySpecItem.value}
                                      </p>
                                    </motion.div>
                                  );
                                }
                                return null;
                              }
                            );
                          }
                        }
                      } else {
                        if (item.value !== "NA" && item.value != "") {
                          return (
                            <motion.div 
                              key={idx} 
                              className={styles.specItem}
                              variants={itemVariants}
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="homeelectric ui text size-body_medium">
                                {item.name}
                              </p>
                              {typeof item.value === "object" ? (
                                <div className={styles.rowng}>
                                  <p className="homeelectric ui text size-body_medium">
                                    {item.value.NG || "-"}
                                  </p>
                                  <p className="homeelectric ui text size-body_medium">
                                    {item.value.LP || "-"}
                                  </p>
                                  <p className="homeelectric ui text size-body_medium">
                                    {item.value.ULPG || "-"}
                                  </p>
                                </div>
                              ) : (
                                <p className="distanceTwo ui text size-body_medium">
                                  {item.value}
                                </p>
                              )}
                            </motion.div>
                          );
                        }
                      }
                    })}
                  </div>
                </motion.div>
              ))}
              <motion.div 
                className={styles.energynotes}
                variants={itemVariants}
              >
                <p>
                  Energy Notes: Output depends on gas type and flue
                  configuration
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Specifications;