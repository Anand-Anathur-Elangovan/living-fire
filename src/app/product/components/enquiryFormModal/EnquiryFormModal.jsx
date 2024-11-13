// components/EnquiryFormModal.jsx
import React from "react";
import styles from "./EnquiryFormModal.module.css";
import close from "@/public/assets/product/close.svg";
import Image from "next/image";

const EnquiryFormModal = ({ isOpen, onClose, name, brand_name }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <Image src={close} alt="Close" width={28} height={28} />
        </button>
        <h2 className={styles.title}>SEND AN ENQUIRY</h2>
        <div className={styles.inputField}>
          <label className={styles.label}>Product</label>
          <input
            className={styles.input}
            type="text"
            required
            value={`${name} - ${brand_name}`}
            disabled
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>Name *</label>
          <input className={styles.input} type="text" required />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>Phone *</label>
          <input className={styles.input} type="text" required />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>Email *</label>
          <input className={styles.input} type="email" required />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>Message *</label>
          <textarea className={styles.textarea} required />
        </div>
        <button className={styles.submitButton}>Send</button>
      </div>
    </div>
  );
};

export default EnquiryFormModal;
