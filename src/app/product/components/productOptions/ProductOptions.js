import React, { useState } from 'react';
import styles from './ProductOptions.module.css';
import optionsImage from "@/public/assets/product/electriFireOptions.png";
import Image from 'next/image';

const ProductOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    zeroClearance: null,
    chimneyInsert: null,
    materialFinish: null,
    delivery: null,
  });

  const handleOptionChange = (category, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [category]: prevOptions[category] === value ? null : value,  // Toggle selection
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.brand}>REGENCY</h2>
      <h1 className={styles.title}>GF1750 – NG</h1>
      <p className={styles.subtitle}>Build your product</p>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>ZERO CLEARANCE PACKAGE</h3>
        <label className={styles.option}>
          <input
            type="radio"
            name="zeroClearance"
            checked={selectedOptions.zeroClearance === 'zeroClearanceOption'}
            onChange={() => handleOptionChange('zeroClearance', 'zeroClearanceOption')}
          />
          Zero Clearance Regency Greenfire® Infusion Gas Fireplace from an additional (+$2,249.00)
        </label>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>CHIMNEY INSERT PACKAGE</h3>
        <label className={styles.option}>
          <input
            type="radio"
            name="chimneyInsert"
            checked={selectedOptions.chimneyInsert === 'chimneyInsertOption'}
            onChange={() => handleOptionChange('chimneyInsert', 'chimneyInsertOption')}
          />
          Regency Greenfire Infusion Chimney Insert from an additional (+$1,250.00)
        </label>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>MATERIAL & FINISH OPTIONS</h3>
        <div className={styles.imageOptions}>
          <label className={styles.imageOption}>
            <input
              type="radio"
              name="materialFinish"
              checked={selectedOptions.materialFinish === 'reflectiveBlack'}
              onChange={() => handleOptionChange('materialFinish', 'reflectiveBlack')}
            />
            <Image src={optionsImage} alt="Reflective Black Inner Panels" />
            <span>Reflective Black Inner Panels</span>
          </label>
          <label className={styles.imageOption}>
            <input
              type="radio"
              name="materialFinish"
              checked={selectedOptions.materialFinish === '3sidedBlack'}
              onChange={() => handleOptionChange('materialFinish', '3sidedBlack')}
            />
            <Image src={optionsImage} alt="3-Sided Black Backing Plate" />
            <span>3-Sided Black Backing Plate</span>
          </label>
          <label className={styles.imageOption}>
            <input
              type="radio"
              name="materialFinish"
              checked={selectedOptions.materialFinish === 'metallicBlack'}
              onChange={() => handleOptionChange('materialFinish', 'metallicBlack')}
            />
            <Image src={optionsImage} alt="Metallic Black Inner Panels" />
            <span>Metallic Black Inner Panels</span>
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>DELIVERY</h3>
        <label className={styles.option}>
          <input
            type="radio"
            name="delivery"
            checked={selectedOptions.delivery === 'pickUp'}
            onChange={() => handleOptionChange('delivery', 'pickUp')}
          />
          Pick Up (148-150 Cochranes Rd, Moorabbin VIC 3189 Mon-Fri 9am-3pm)
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            name="delivery"
            checked={selectedOptions.delivery === 'deliveryOption'}
            onChange={() => handleOptionChange('delivery', 'deliveryOption')}
          />
          Delivery: Add to cart and our team will contact you to finalize price from (+$175.00)
        </label>
      </div>

      <div className={styles.priceContainer}>
        <p className={styles.price}>$4,949.00 <span>(inc gst)</span></p>
        <span className={styles.inStock}>IN STOCK</span>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.addToCart}>ADD TO CART</button>
        <button className={styles.enquiry}>SEND AN ENQUIRY</button>
      </div>
    </div>
  );
};

export default ProductOptions;
