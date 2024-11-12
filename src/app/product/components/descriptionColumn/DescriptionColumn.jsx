import styles from './DescriptionColumn.module.css';

export default function DescriptionColumn() {
  return (
    // <div className="parent-container">
    <div className={styles['desc-column']}>
      {/* Description Section */}
      <div className={styles['columndesc']}>
        <p className={styles['materialfinish']}>Description</p>
        <p className={styles['description']}>
          Inspired by nature and fueled by innovation, Regency’s new
          patent-pending infusion burner technology delivers an unparalleled
          realistic flame and log set. Homeowners can now truly enjoy the look
          and feel of a traditional wood fire at the touch of a button.
          <br />
          <br />
          By reimagining what’s possible, Regency designers have replicated the
          beauty of a real wood fire by infusing the burners into the log set,
          creating a natural burning log effect for the most natural-looking gas
          insert available. Watch in awe as the flames dance effortlessly in the
          firebox, creating a one-of-a-kind experience. Unmatched by any
          traditional burner, the Infusion Burner will elevate the standard for
          Gas Inserts.
        </p>
      </div>

      {/* Zero Clearance Section */}
      <div className={styles['columndesc']}>
        <p className={styles['materialfinish']}>
          Zero Clearance Regency Greenfire® Infusion Gas Fireplace
        </p>
        <ul className={styles['distanceList']}>
          <li>Natural Gas Unit</li>
          <li>4 Sided Fascia – Satin Black</li>
          <li>Zero Clearance Kit</li>
          <li>10.7 m Flex Flue Kit</li>
          <li>Outer Flue Kit</li>
        </ul>
      </div>

      {/* Regency Greenfire Section */}
      <div className={styles['columndesc']}>
        <p className={styles['materialfinish']}>
          Regency Greenfire® Infusion Chimney Insert
        </p>
        <ul className={styles['distanceList']}>
          <li>Natural Gas Unit</li>
          <li>3 Sided Fascia – Satin Black</li>
          <li>10.7 m Flex Flue Kit</li>
        </ul>
      </div>
    </div>
    // </div>
  );
}
