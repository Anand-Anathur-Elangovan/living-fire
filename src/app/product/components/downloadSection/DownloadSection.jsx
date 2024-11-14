// import brochure from "@/public/assets/product/brochure.svg";

import { useState } from "react";
import Image from "next/image";
import styles from "./DownloadSection.module.css";
import brochureIcon from "@/public/assets/product/brochure.svg";

const DownloadSection = ({ product_details, openDrawer }) => {
  const [activeTab, setActiveTab] = useState("Downloads");
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleImageClick = (fileurl) => {
    window.open(fileurl, "_blank");
  };

  const renderTabContent = () => {
    const tabContent = product_details.find(
      (item) => item.name.toLowerCase() === activeTab.toLowerCase()
    );
    if (!tabContent) return null;

    if (activeTab === "Downloads") {
      return (
        <div className={styles.brochureSection}>
          <div className={styles.listspecsheet}>
            {tabContent.value &&
              Array.isArray(tabContent.value) &&
              tabContent.value.map((downloadItem, index) => (
                <div key={index} className={styles.columnTwo}>
                  <p className={`${styles.materialfinish} ${styles.sizeH6}`}>
                    {downloadItem.name?.toUpperCase()}
                  </p>
                  <div
                    className={styles.rowtext}
                    onClick={() => window.open(downloadItem.fileurl, "_blank")}
                  >
                    <Image
                      src={brochureIcon}
                      alt="Imageclass"
                      className={styles.imageclass}
                    />
                    <p className={`${styles.text7} ${styles.sizeBodyMedium}`}>
                      {downloadItem.filename}
                    </p>
                  </div>
                </div>
              ))}
            <button
              className={`${styles.flexRowCenterCenter} ${styles.viewAllSpecs} ${styles.sizeLg} ${styles.outline} ${styles.square}`}
              onClick={openDrawer}
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
    <section className={styles.downloadSection}>
      <div className={styles.row}>
        <div className={styles.infosection}>
          <div>
            <div className={styles.tabSection}>
              {product_details.map((tabItem) => (
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
              ))}
            </div>
            <div className={styles.lineelevenOne}></div>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;

// import { useState } from "react";
// import Image from "next/image";
// import styles from "./DownloadSection.module.css";
// import brochure from "@/public/assets/product/brochure.svg";

// const DownloadSection = ({ product_details }) => {
//   const [activeTab, setActiveTab] = useState("downloads");
//   const [openFAQ, setOpenFAQ] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };
//   // console.log("product_details", product_details);
//   console.log(JSON.stringify(product_details, null, 2));
//   return (
//     <section className={styles.downloadSection}>
//       <div className={styles.row}>
//         <div className={styles.infosection}>
//           <div>
//             <div className={styles.tabSection}>
//               <div
//                 className={`${styles.tab} ${
//                   activeTab === "downloads" && styles.activeTab
//                 }`}
//                 onClick={() => setActiveTab("downloads")}
//               >
//                 <p className={`${styles.ui} ${styles.sizeH4}`}>Downloads</p>
//               </div>
//               <div
//                 className={`${styles.tab1} ${
//                   activeTab === "about" && styles.activeTab
//                 }`}
//                 onClick={() => setActiveTab("about")}
//               >
//                 <p className={`${styles.descriptionTwo} ${styles.sizeH4}`}>
//                   About the brand
//                 </p>
//               </div>
//               <div
//                 className={`${styles.tab1} ${
//                   activeTab === "installation" && styles.activeTab
//                 }`}
//                 onClick={() => setActiveTab("installation")}
//               >
//                 <p className={`${styles.descriptionTwo} ${styles.sizeH4}`}>
//                   Installation
//                 </p>
//               </div>
//               <div
//                 className={`${styles.tab1} ${
//                   activeTab === "faqs" && styles.activeTab
//                 }`}
//                 onClick={() => setActiveTab("faqs")}
//               >
//                 <p className={`${styles.descriptionTwo} ${styles.sizeH4}`}>
//                   FAQs
//                 </p>
//               </div>
//             </div>
//             <div className={styles.lineelevenOne}></div>
//           </div>

//           {activeTab === "faqs" && (
//             <div className={`${styles.faqSection}`}>
//               {[
//                 {
//                   question: "Is there a warranty provided with the purchase?",
//                   answer:
//                     "Yes, all our fireplaces come with a manufacturer's warranty for added peace of mind. We also offer maintenance services to ensure your fireplace remains in top condition for years to come.",
//                 },
//                 {
//                   question:
//                     "Can I schedule an in-home consultation before purchasing?",
//                   answer:
//                     "Yes, we offer in-home consultations to help you choose the perfect fireplace for your space. Our experts will review your home layout, discuss options, and make recommendations.",
//                 },
//                 {
//                   question:
//                     "Do you provide installation services or recommend installers?",
//                   answer:
//                     "We work with a trusted network of professional installation partners. If you need assistance, we can recommend installers who are experienced with our products for a seamless installation process.",
//                 },
//                 {
//                   question:
//                     "What is the estimated delivery time, and are there any delays due to stock availability?",
//                   answer:
//                     "Delivery times vary depending on stock availability and your location. Typically, delivery takes 2-3 weeks, but we will inform you immediately if there are any delays.",
//                 },
//               ].map((faq, index) => (
//                 <div
//                   key={index}
//                   className={`${styles.faqItem} ${
//                     index % 2 === 0 ? styles.faqItemLeft : styles.faqItemRight
//                   }`}
//                 >
//                   <div
//                     className={styles.faqQuestion}
//                     onClick={() => toggleFAQ(index)}
//                   >
//                     <p>{faq.question}</p>
//                     <span>{openFAQ === index ? "✕" : "+"}</span>
//                   </div>
//                   {openFAQ === index && (
//                     <div className={styles.faqAnswer}>
//                       <p>{faq.answer}</p>
//                     </div>
//                   )}
//                   <div className={styles.divider}></div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {activeTab === "downloads" && (
//             <div className={styles.brochureSection}>
//               <div className={styles.listspecsheet}>
//                 <div className={styles.columnTwo}>
//                   <p className={`${styles.materialfinish} ${styles.sizeH6}`}>
//                     Brochure
//                   </p>
//                   <div className={styles.rowtext}>
//                     <Image
//                       src={brochure}
//                       alt="Imageclass"
//                       className={styles.imageclass}
//                     />
//                     <p className={`${styles.text7} ${styles.sizeBodyMedium}`}>
//                       Regency – GFI750 – Brochure
//                     </p>
//                   </div>
//                 </div>
//                 <div className={styles.columnTwo}>
//                   <p className={`${styles.materialfinish} ${styles.sizeH6}`}>
//                     Spec Sheet
//                   </p>
//                   <div className={styles.rowtext}>
//                     <Image
//                       src={brochure}
//                       alt="Imageclass"
//                       className={styles.imageclass}
//                     />
//                     <p className={`${styles.text7} ${styles.sizeBodyMedium}`}>
//                       Regency – GFI750 – Spec Sheet
//                     </p>
//                   </div>
//                 </div>
//                 <div className={styles.columnTwo}>
//                   <p className={`${styles.materialfinish} ${styles.sizeH6}`}>
//                     Manual
//                   </p>
//                   <div className={styles.rowtext}>
//                     <Image
//                       src={brochure}
//                       alt="Imageclass"
//                       className={styles.imageclass}
//                     />
//                     <p className={`${styles.text7} ${styles.sizeBodyMedium}`}>
//                       Regency – GFI750 – Manual
//                     </p>
//                   </div>
//                 </div>
//                 {/* Additional columns for Spec Sheet and Manual */}
//               </div>
//               <button
//                 className={`${styles.flexRowCenterCenter} ${styles.viewAllSpecs} ${styles.sizeLg} ${styles.outline} ${styles.square}`}
//               >
//                 View All Specs
//               </button>
//             </div>
//           )}
//           {activeTab === "about" && (
//             <div className={styles.faqSection}>
//               Yes, all our fireplaces come with a manufacturer's warranty for
//               added peace of mind. We also offer maintenance services to ensure
//               your fireplace remains in top condition for years to come. Yes,
//               all our fireplaces come with a manufacturer's warranty for added
//               peace of mind. We also offer maintenance services to ensure your
//               fireplace remains in top condition for years to come.
//             </div>
//           )}
//           {activeTab === "installation" && (
//             <div className={styles.faqSection}>
//               Yes, all our fireplaces come with a manufacturer's warranty for
//               added peace of mind. We also offer maintenance services to ensure
//               your fireplace remains in top condition for years to come.
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DownloadSection;
