// components/Specifications.jsx
import React from "react";
import styles from "./Specifications.module.css";
import specImage from "@/public/assets/product/image.png";
import Image from "next/image";

const Specifications = () => {
  return (
    <section className={styles.specifications}>
      <div className={styles.row}>
        <div className={styles.rowspecs}>
          <div className={styles.imgwrap}>
            <Image src={specImage} alt="Gfi750" className={styles.gfi750One} />
          </div>
          <div className={styles.table}>
            <div className={styles.head}>
              <p className={`${styles.title} ui text size-h4`}>
                Specifications
              </p>
            </div>
            <div className={styles.productspecs}>
              {/* Energy Specifications */}
              <div className={styles.specs}>
                <p className={`${styles.materialfinish} ui text size-h6`}>
                  Energy Specifications
                </p>
                <div className={styles.rowng}>
                  <p className="headingfive_one ui text size-textmd">NG</p>
                  <p className="lp ui text size-textmd">LP</p>
                  <p className="ulpg ui text size-textmd">ULPG</p>
                </div>
              </div>
              <div className={styles.specsOne}>
                <p className="homeelectric ui text size-body_medium">
                  Nominal Max. Gas Consumption (MJ)
                </p>
                <div className={styles.rowng}>
                  <p className="homeelectric ui text size-body_medium">26</p>
                  <p className="homeelectric ui text size-body_medium">26</p>
                  <p className="homeelectric ui text size-body_medium">21.5</p>
                </div>
              </div>
              <div className={styles.specsOne}>
                <p className="homeelectric ui text size-body_medium">
                  Output (KW)
                </p>
                <div className={styles.rowng}>
                  <p className="homeelectric ui text size-body_medium">5.1</p>
                  <p className="homeelectric ui text size-body_medium">5.1</p>
                  <p className="homeelectric ui text size-body_medium">4.5</p>
                </div>
              </div>
              <p className={`${styles.energynotes} ui text size-body_small`}>
                Energy Notes: Output depends on gas type and flue configuration
              </p>

              {/* General Specifications */}
              <div className={`${styles.dimensions} ${styles.generalSpecs}`}>
                <p className={`${styles.materialfinish} ui text size-h6`}>
                  General Specifications
                </p>
                <div className={styles.columnproducts}>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Product Size
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      Medium
                    </p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      View Area
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      2417sq.cm.
                    </p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Room Size
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      Medium
                    </p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Vent Type
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      Direct Vent
                    </p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Vent Size (Air Intake)
                    </p>
                    <p className="distanceTwo ui text size-body_medium">76mm</p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Vent Size (Exhaust)
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      100mm
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimum Fireplace Opening */}
              <div className={`${styles.dimensions} ${styles.generalSpecs}`}>
                <p className={`${styles.materialfinish} ui text size-h6`}>
                  Minimum Fireplace Opening
                </p>
                <div className={styles.columnproducts}>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Width (front)
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      685mm
                    </p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Width (back)
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      565mm
                    </p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Height
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      590mm
                    </p>
                  </div>
                  <div className={styles.specsSix}>
                    <p className="homeelectric ui text size-body_medium">
                      Depth
                    </p>
                    <p className="distanceTwo ui text size-body_medium">
                      400mm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specifications;
