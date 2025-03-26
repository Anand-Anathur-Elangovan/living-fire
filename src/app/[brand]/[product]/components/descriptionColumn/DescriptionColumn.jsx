import styles from "./DescriptionColumn.module.css";

export default function DescriptionColumn({ product_desc }) {
  return (
    <div className={styles["desc-column"]}>
      {product_desc
        .filter((section) => section.name !== "MATERIAL & FINISH OPTIONS") // Filter out "MATERIAL & FINISH OPTIONS"
        .map((section, index) => (
          <div key={index} className={styles["columndesc"]}>
            {section.value?.length > 0 && section.value?.[0] != "" > 0 && (
              <div className={styles["materialfinish"]}>{section.name}</div>
            )}

            {/* Check if the section is "description" and render it as a paragraph */}
            {section.name === "DESCRIPTION" ? (
              <div className={styles["description"]}>
                {section.value.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item}
                    {itemIndex < section.value.length - 1 && <br />}
                  </span>
                ))}
              </div>
            ) : (
              // For other sections, render as bullet points
              // <ul className={styles["distanceList"]}>
              //   {section.value.map((item, itemIndex) => (
              //     <li key={itemIndex}>{item}</li>
              //   ))}
              // </ul>
              <div className={styles["distanceList"]}>
                {section.value.map((item, itemIndex) => (
                  <div key={itemIndex}>{item}</div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
