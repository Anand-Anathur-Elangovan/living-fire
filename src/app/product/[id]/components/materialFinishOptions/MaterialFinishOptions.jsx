// // components/MaterialFinishOptions.jsx
// import React from "react";
// import styles from "./MaterialFinishOptions.module.css";
// import optionsImage from "@/public/assets/product/electriFireMaterialOptions.png";
// import Image from "next/image";

// const MaterialFinishOptions = ({ short_desc }) => {
//   console.log(JSON.stringify(specifications, null, 2));
//   return (
//     <section className={styles.materialFinishOptions}>
//       <div className={styles.column}>
//         <p className={`${styles.title} ui text size-h6`}>
//           Material & Finish Options
//         </p>
//         <div className={styles.imgList}>
//           <div className={styles.col}>
//             <Image src={optionsImage} alt="Image" className={styles.image} />
//             <div className={styles.pricingoptions}>
//               <p className={`${styles.desc} ui text size-body_medium`}>
//                 Reflective Black Inner Panels
//               </p>
//             </div>
//           </div>
//           <div className={styles.col}>
//             <Image src={optionsImage} alt="Image" className={styles.image} />
//             <div className={styles.pricingoptions}>
//               <p className={`${styles.desc} ui text size-body_medium`}>
//                 3-Sided Black Backing Plate
//               </p>
//             </div>
//           </div>
//           <div className={styles.col}>
//             <Image src={optionsImage} alt="Image" className={styles.image} />
//             <div className={styles.pricingoptions}>
//               <p className={`${styles.desc} ui text size-body_medium`}>
//                 Metallic Black Inner Panels
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MaterialFinishOptions;

"use client";

import React from "react";
import styles from "./MaterialFinishOptions.module.css";
import optionsImage from "@/public/assets/product/electriFireMaterialOptions.png";
import Image from "next/image";

const MaterialFinishOptions = ({ short_desc }) => {
  // Filter the JSON to find the "MATERIAL & FINISH OPTIONS" object
  const materialFinishOptions = short_desc.find(
    (item) => item.name === "MATERIAL & FINISH OPTIONS"
  );

  // If the "MATERIAL & FINISH OPTIONS" object is not found, don't render the component
  if (!materialFinishOptions) {
    return null;
  }

  return (
    <section className={styles.materialFinishOptions}>
      <div className={styles.column}>
        <p className={`${styles.title} ui text size-h6`}>
          MATERIAL & FINISH OPTIONS
        </p>
        <div className={styles.imgList}>
          {materialFinishOptions.value.map((option, index) => (
            <div className={styles.col} key={index}>
              <Image
                src={
                  option.image_url && option.image_url !== "url"
                    ? option.image_url
                    : optionsImage
                } // Use default image if image_url is null
                alt={option.name || "Material Option"}
                className={styles.image}
                width={300} // Specify width
                height={300} // Specify height
              />
              <div className={styles.pricingoptions}>
                <p className={`${styles.desc} ui text size-body_medium`}>
                  {option.name || "Unnamed Option"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialFinishOptions;
