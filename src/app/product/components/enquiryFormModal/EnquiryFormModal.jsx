// components/EnquiryFormModal.jsx
import React from "react";
import styles from "./EnquiryFormModal.module.css";

const EnquiryFormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>Send an Enquiry</h2>
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
