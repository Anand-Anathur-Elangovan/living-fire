import Image from "next/image";
import styles from "./DownloadSection.module.css";
import brochure from "@/public/assets/product/brochure.svg";

const DownloadSection = () => {
  return (
    <section className={styles.downloadSection}>
      <div className={styles.row}>
        <div className={styles.infosection}>
          <div>
            <div className={styles.tabSection}>
              <div className={styles.tab}>
                <p className={`${styles.ui} ${styles.sizeH4}`}>Downloads</p>
              </div>
              <div className={styles.tab1}>
                <p className={`${styles.descriptionTwo} ${styles.sizeH4}`}>
                  About the brand
                </p>
              </div>
              <div className={styles.tab1}>
                <p className={`${styles.descriptionTwo} ${styles.sizeH4}`}>
                  Installation
                </p>
              </div>
              <p className={`${styles.descriptionTwo} ${styles.sizeH4}`}>
                FAQs
              </p>
            </div>
            <div className={styles.lineelevenOne}></div>
          </div>
          <div className={styles.brochureSection}>
            <div className={styles.listspecsheet}>
              <div className={styles.columnTwo}>
                <p className={`${styles.materialfinish} ${styles.sizeH6}`}>
                  Brochure
                </p>
                <div className={styles.rowtext}>
                  <Image
                    src={brochure}
                    alt="Imageclass"
                    className={styles.imageclass}
                  />
                  <p className={`${styles.text7} ${styles.sizeBodyMedium}`}>
                    Regency – GFI750 – Brochure
                  </p>
                </div>
              </div>
              <div className={styles.columnTwo}>
                <p className={`${styles.materialfinish} ${styles.sizeH6}`}>
                  Spec Sheet
                </p>
                <div className={styles.rowtext}>
                  <Image
                    src={brochure}
                    alt="Imageclass"
                    className={styles.imageclass}
                  />
                  <p className={`${styles.text7} ${styles.sizeBodyMedium}`}>
                    Regency – GFI750 – Spec Sheet
                  </p>
                </div>
              </div>
              <div className={styles.columnTwo}>
                <p className={`${styles.materialfinish} ${styles.sizeH6}`}>
                  Manual
                </p>
                <div className={styles.rowtext}>
                  <Image
                    src={brochure}
                    alt="Imageclass"
                    className={styles.imageclass}
                  />
                  <p className={`${styles.text7} ${styles.sizeBodyMedium}`}>
                    Regency – GFI750 – Manual
                  </p>
                </div>
              </div>
            </div>
            <button
              className={`${styles.flexRowCenterCenter} ${styles.viewAllSpecs} ${styles.sizeLg} ${styles.outline} ${styles.square}`}
            >
              View All Specs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
