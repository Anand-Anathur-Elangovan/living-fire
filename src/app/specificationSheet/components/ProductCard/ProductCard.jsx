import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ imageSrc, productName, brandName }) => {
  return (
    <div className={styles.productCard}>
      <img src={imageSrc} alt={productName} className={styles.image} />
      <div className={styles.productDetails}>
        <div>
          <p className={styles.productName}>{productName}</p>
          <p className={styles.brandName}>{brandName}</p>
        </div>
        <div>
          <p className={styles.viewSpecifications}>View Specifications</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
