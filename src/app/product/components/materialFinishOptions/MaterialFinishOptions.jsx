// components/MaterialFinishOptions.jsx
import React from "react";
import styles from "./MaterialFinishOptions.module.css";
import optionsImage from "@/public/assets/product/electriFireMaterialOptions.png";
import Image from "next/image";

const MaterialFinishOptions = () => {
  return (
    <section className={styles.materialFinishOptions}>
      <div className={styles.column}>
        <p className={`${styles.title} ui text size-h6`}>
          Material & Finish Options
        </p>
        <div className={styles.imgList}>
          <div className={styles.col}>
            <Image src={optionsImage} alt="Image" className={styles.image} />
            <div className={styles.pricingoptions}>
              <p className={`${styles.desc} ui text size-body_medium`}>
                Reflective Black Inner Panels
              </p>
            </div>
          </div>
          <div className={styles.col}>
            <Image src={optionsImage} alt="Image" className={styles.image} />
            <div className={styles.pricingoptions}>
              <p className={`${styles.desc} ui text size-body_medium`}>
                3-Sided Black Backing Plate
              </p>
            </div>
          </div>
          <div className={styles.col}>
            <Image src={optionsImage} alt="Image" className={styles.image} />
            <div className={styles.pricingoptions}>
              <p className={`${styles.desc} ui text size-body_medium`}>
                Metallic Black Inner Panels
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialFinishOptions;
