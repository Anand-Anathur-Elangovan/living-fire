import React, { useState, useEffect } from "react";
import Image from "next/image";
import close from "@/public/assets/product/close.svg";
import styles from "./EnquiryFormModal.module.css";

const EnquiryFormModal = ({ isOpen, onClose, name, brand_name }) => {
  const [formData, setFormData] = useState({
    serviceName: "Enquiry Service",
    product: `${name} - ${brand_name}`,
    userName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            serviceName: "Enquiry Service",
            product: `${name} - ${brand_name}`,
            userName: "",
            phone: "",
            email: "",
            message: "",
          });
          onClose();
        }, 3000);
      } else {
        alert("There was an issue sending your message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !isMounted) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.show : styles.hide}`}>
      <div className={`${styles.modalContainer} ${isOpen ? styles.show : styles.hide}`}>
        <button className={styles.closeButton} onClick={onClose}>
          <Image 
            src={close} 
            alt="Close" 
            width={24} 
            height={24} 
            loading="lazy"
          />
        </button>
        
        {showSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className={styles.successTitle}>Enquiry Sent</h3>
            <p className={styles.successText}>Our team will reach you shortly</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>SEND AN ENQUIRY</h2>
            <p className={styles.productName}>{formData.product}</p>
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.inputField}>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Name *"
                    required
                    value={formData.userName}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className={styles.inputField}>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className={styles.inputField}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className={styles.inputField}>
                <textarea
                  name="message"
                  placeholder="Message *"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <button 
                className={styles.submitButton} 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className={styles.loader}>
                    <div className={styles.loaderDot}></div>
                    <div className={styles.loaderDot}></div>
                    <div className={styles.loaderDot}></div>
                  </div>
                ) : (
                  "SEND"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(EnquiryFormModal);