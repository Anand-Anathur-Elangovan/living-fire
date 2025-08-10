// import React, { useState } from "react";
// import styles from "./EnquiryFormModal.module.css";
// import close from "@/public/assets/product/close.svg";
// import Image from "next/image";

// const EnquiryFormModal = ({ isOpen, onClose, name, brand_name }) => {
//   // Hooks must be called at the top level of the component
//   const [formData, setFormData] = useState({
//     serviceName: "Enquiry Service",
//     product: `${name} - ${brand_name}`, // Pre-filled product info
//     userName: "",
//     phone: "",
//     email: "",
//     message: "",
//   });

//   // If the modal is not open, render nothing
//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Your message has been sent!");
//         setFormData({
//           serviceName: "Enquiry Service",
//           product: `${name} - ${brand_name}`,
//           userName: "",
//           phone: "",
//           email: "",
//           message: "",
//         });
//         onClose();
//       } else {
//         alert("There was an issue sending your message.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while sending your message.");
//     }
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContainer}>
//         <button className={styles.closeButton} onClick={onClose}>
//           <Image src={close} alt="Close" width={28} height={28} />
//         </button>
//         <h2 className={styles.title}>SEND AN ENQUIRY</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.inputField}>
//             <label className={styles.label}>Product</label>
//             <input
//               className={styles.input}
//               type="text"
//               required
//               value={formData.product}
//               disabled
//             />
//           </div>
//           <div className={styles.inputField}>
//             <label className={styles.label}>Name *</label>
//             <input
//               className={styles.input}
//               type="text"
//               name="userName"
//               required
//               value={formData.userName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={styles.inputField}>
//             <label className={styles.label}>Phone *</label>
//             <input
//               className={styles.input}
//               type="text"
//               name="phone"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={styles.inputField}>
//             <label className={styles.label}>Email *</label>
//             <input
//               className={styles.input}
//               type="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className={styles.inputField}>
//             <label className={styles.label}>Message *</label>
//             <textarea
//               className={styles.textarea}
//               name="message"
//               required
//               value={formData.message}
//               onChange={handleChange}
//             />
//           </div>
//           <button className={styles.submitButton} type="submit">
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EnquiryFormModal;
import React, { useState } from "react";
import Image from "next/image";
import close from "@/public/assets/product/close.svg";
import styles from "./EnquiryFormModal.module.css";

const EnquiryFormModal = ({ isOpen, onClose, name, brand_name }) => {
  const [formData, setFormData] = useState({
    serviceName: "Enquiry Service",
    product: `${name} - ${brand_name}`, // Pre-filled product info
    userName: "",
    phone: "",
    email: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message has been sent!");
        setFormData({
          serviceName: "Enquiry Service",
          product: `${name} - ${brand_name}`,
          userName: "",
          phone: "",
          email: "",
          message: "",
        });
        onClose();
      } else {
        alert("There was an issue sending your message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          <Image src={close} alt="Close" width={28} height={28} unoptimized />
        </button>
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
              />
            </div>
            <div className={styles.inputField}>
              <input
                type="text"
                name="phone"
                placeholder="Phone *"
                required
                value={formData.phone}
                onChange={handleChange}
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
            />
          </div>
          <div className={styles.inputField}>
            <textarea
              name="message"
              placeholder="Message *"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button className={styles.submitButton} type="submit">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryFormModal;
