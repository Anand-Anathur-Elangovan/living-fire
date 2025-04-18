// "use client";
// import React, { useState } from "react";
// import "./maintenanceService.css";
// import gasFireplace from "@/public/assets/maintenanceServicePage/image1.png";
// import woodFireplace from "@/public/assets/maintenanceServicePage/image2.png";
// import electricFireplace from "@/public/assets/maintenanceServicePage/image3.png";
// import Image from "next/image";

// const MaintenanceService = () => {
//   const [formData, setFormData] = useState({
//     serviceName: "Maintenance Service",
//     first_name: "",
//     last_name: "",
//     phone_number: "",
//     email: "",
//     street_address: "",
//     suburb: "",
//     state: "",
//     postcode: "",
//     description: "",
//     brand: "brand",
//     serial_number: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
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
//         // Clear all form data
//         setFormData({
//           serviceName: "Maintenance Service",
//           first_name: "",
//           last_name: "",
//           phone_number: "",
//           email: "",
//           street_address: "",
//           suburb: "",
//           state: "",
//           postcode: "",
//           description: "",
//           brand: "brand", // Adjust to the default value if needed
//           serial_number: "",
//         });
//       } else {
//         alert("There was an issue sending your message.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while sending your message.");
//     }
//   };

//   return (
//     <div className="maintenance-service-container-body">
//       <div className="maintenance-service-container">
//         {/* <div className="breadcrumb">
//         Home / Maintenance & Servicing
//       </div> */}
//         <div className="title-group">
//           <h1 className="title-category">FIREPLACE</h1>
//           <h1 className="title">MAINTENANCE & SERVICING</h1>
//         </div>
//         <hr className="custom-divider" />
//         <p className="description">
//           At Living Fire, our fireplaces are built to last, but a little care
//           can go a long way in keeping them performing beautifully year after
//           year. Regular maintenance not only helps extend the life of your
//           fireplace but also ensures it remains safe and efficient. Below are
//           some simple tips to help you maintain your fireplace in top condition.
//         </p>

//         <button
//           className="book-service-btn"
//           onClick={() =>
//             document
//               .getElementById("service-form")
//               .scrollIntoView({ behavior: "smooth" })
//           }
//         >
//           BOOK A SERVICE
//         </button>

//         {/* Fireplaces Sections */}
//         <div className="fireplace-sections">
//           <div className="fireplace-section fireplace-section-2">
//             <Image
//               src={gasFireplace}
//               alt="Gas Fireplace"
//               className="fireplace-img"
//               unoptimized
//             />
//             <div className="left-side-section">
//               <h2>GAS FIREPLACES</h2>
//               <div className="left-side-typography-section">
//                 <p>
//                   If you own a gas fireplace, regular servicing is key to
//                   keeping it safe and efficient. Most manufacturers recommend an
//                   annual service, which also helps maintain your warranty. Our
//                   expert team is ready to assist with checks and
//                   services—whether your fireplace is brand new or you’ve had it
//                   for a while.
//                 </p>
//                 <p>
//                   We’ve partnered with experienced specialists who can install,
//                   service, and repair all our brands, including Paul Agnew
//                   Designs, Regency, Heatmaster, Pacific Energy, and Kalora. Give
//                   us a call anytime, even during the off-season, to ensure your
//                   fireplace is in perfect condition for those cozy winter
//                   nights.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="fireplace-section fireplace-section-2">
//             <div className="left-side-section">
//               <h2>WOOD FIREPLACES</h2>
//               <div className="left-side-typography-section">
//                 <p>
//                   To keep your wood fireplace running smoothly, it’s important
//                   to have your chimney cleaned annually by a certified
//                   professional. This removes soot and creosote build-up, and
//                   it’s best done at the end of winter when humidity levels are
//                   lower.
//                 </p>
//                 <p>
//                   A chimney sweep can also check for structural issues in your
//                   chimney, flue, and firebox. Keep a thin layer of ash in the
//                   firebox, which helps insulate the fire. When cleaning out
//                   ashes, ensure they’re fully cool and dispose of them safely.
//                 </p>
//               </div>
//             </div>
//             <Image
//               src={woodFireplace}
//               alt="Wood Fireplace"
//               className="fireplace-img"
//               unoptimized
//             />
//           </div>

//           <div className="fireplace-section fireplace-section-2">
//             <Image
//               src={electricFireplace}
//               alt="Electric Fireplace"
//               className="fireplace-img"
//               unoptimized
//             />
//             <div className="left-side-section">
//               <h2>ELECTRIC FIREPLACES</h2>
//               <div className="left-side-typography-section">
//                 <p>
//                   Maintaining an electric fireplace is simple. Depending on the
//                   model, you may need to replace the light bulbs every few
//                   years. You should also clean the heater annually to keep it
//                   free from dust and debris. Make sure the fireplace is
//                   disconnected from electricity and cooled down before wiping it
//                   with a soft, dry cloth. Use a vacuum with a brush attachment
//                   to gently clean heater outlets.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr className="custom-divider" id="service-form" />

//         <div className="book-service-section">
//           <h2>BOOK A SERVICE</h2>
//           <form className="service-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <div className="input-wrapper">
//                 <input
//                   name="first_name"
//                   type="text"
//                   placeholder="First Name*"
//                   required
//                   onChange={handleChange}
//                   value={formData.first_name}
//                 />
//               </div>
//               <div className="input-wrapper">
//                 <input
//                   name="last_name"
//                   type="text"
//                   placeholder="Last Name*"
//                   required
//                   onChange={handleChange}
//                   value={formData.last_name}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="input-wrapper">
//                 <input
//                   name="phone_number"
//                   type="text"
//                   placeholder="Phone Number*"
//                   required
//                   onChange={handleChange}
//                   value={formData.phone_number}
//                 />
//               </div>
//               <div className="input-wrapper">
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Email*"
//                   required
//                   onChange={handleChange}
//                   value={formData.email}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="input-wrapper">
//                 <input
//                   name="street_address"
//                   type="text"
//                   placeholder="Street Address*"
//                   required
//                   onChange={handleChange}
//                   value={formData.street_address}
//                 />
//               </div>
//               <div className="input-wrapper">
//                 <input
//                   name="suburb"
//                   type="text"
//                   placeholder="Suburb*"
//                   required
//                   onChange={handleChange}
//                   value={formData.suburb}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="input-wrapper">
//                 <input
//                   name="state"
//                   type="text"
//                   placeholder="State*"
//                   required
//                   onChange={handleChange}
//                   value={formData.state}
//                 />
//               </div>
//               <div className="input-wrapper">
//                 <input
//                   name="postcode"
//                   type="text"
//                   placeholder="Postcode*"
//                   required
//                   onChange={handleChange}
//                   value={formData.postcode}
//                 />
//               </div>
//             </div>

//             <div className="input-wrapper-full">
//               <textarea
//                 name="description"
//                 placeholder="Description*"
//                 required
//                 onChange={handleChange}
//                 value={formData.description}
//               ></textarea>
//             </div>

//             <div className="form-group">
//               <div className="input-wrapper">
//                 <select
//                   name="brand"
//                   onChange={handleChange}
//                   value={formData.brand}
//                   required
//                 >
//                   <option value="brand">Brand</option>
//                   {/* Add more brand options here */}
//                 </select>
//               </div>
//               <div className="input-wrapper">
//                 <input
//                   name="serial_number"
//                   type="text"
//                   placeholder="Serial Number"
//                   onChange={handleChange}
//                   value={formData.serial_number}
//                 />
//               </div>
//             </div>

//             <button type="submit" className="submit-btn">
//               SUBMIT
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaintenanceService;





"use client";
import React, { useState, useEffect } from "react";
import "./maintenanceService.css";
import gasFireplace from "@/public/assets/maintenanceServicePage/image1.png";
import woodFireplace from "@/public/assets/maintenanceServicePage/image2.png";
import electricFireplace from "@/public/assets/maintenanceServicePage/image3.png";
import Image from "next/image";
import { motion } from "framer-motion";

const MaintenanceService = () => {
  const [formData, setFormData] = useState({
    serviceName: "Maintenance Service",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    street_address: "",
    suburb: "",
    state: "",
    postcode: "",
    description: "",
    brand: "brand",
    serial_number: "",
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          serviceName: "Maintenance Service",
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          street_address: "",
          suburb: "",
          state: "",
          postcode: "",
          description: "",
          brand: "brand",
          serial_number: "",
        });
      } else {
        alert("There was an issue sending your message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("service-form");
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="maintenance-service-container-body">
      <div className="maintenance-service-container">
        <motion.div 
          className="title-group"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className="title-category" variants={fadeInUp}>
            FIREPLACE
          </motion.h1>
          <motion.h1 className="title" variants={fadeInUp}>
            MAINTENANCE & SERVICING
          </motion.h1>
        </motion.div>

        <motion.hr 
          className="custom-divider" 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.p 
          className="description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          At Living Fire, our fireplaces are built to last, but a little care
          can go a long way in keeping them performing beautifully year after
          year. Regular maintenance not only helps extend the life of your
          fireplace but also ensures it remains safe and efficient. Below are
          some simple tips to help you maintain your fireplace in top condition.
        </motion.p>

        <motion.button
          className="book-service-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToForm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          BOOK A SERVICE
        </motion.button>

        {/* Fireplaces Sections */}
        <div className="fireplace-sections">
          <motion.div 
            className={`fireplace-section ${isMobile ? 'mobile-section' : ''}`}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <Image
              src={gasFireplace}
              alt="Gas Fireplace"
              className="fireplace-img"
              loading="lazy"
              placeholder="blur"
            />
            <div className="left-side-section">
              <h2>GAS FIREPLACES</h2>
              <div className="left-side-typography-section">
                <p>
                  If you own a gas fireplace, regular servicing is key to
                  keeping it safe and efficient. Most manufacturers recommend an
                  annual service, which also helps maintain your warranty. Our
                  expert team is ready to assist with checks and
                  services—whether your fireplace is brand new or you have had it
                  for a while.
                </p>
                <p>
                  We have partnered with experienced specialists who can install,
                  service, and repair all our brands, including Paul Agnew
                  Designs, Regency, Heatmaster, Pacific Energy, and Kalora. Give
                  us a call anytime, even during the off-season, to ensure your
                  fireplace is in perfect condition for those cozy winter
                  nights.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={`fireplace-section ${isMobile ? 'mobile-section' : ''}`}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <div className="left-side-section">
              <h2>WOOD FIREPLACES</h2>
              <div className="left-side-typography-section">
                <p>
                  To keep your wood fireplace running smoothly, its important
                  to have your chimney cleaned annually by a certified
                  professional. This removes soot and creosote build-up, and
                  its best done at the end of winter when humidity levels are
                  lower.
                </p>
                <p>
                  A chimney sweep can also check for structural issues in your
                  chimney, flue, and firebox. Keep a thin layer of ash in the
                  firebox, which helps insulate the fire. When cleaning out
                  ashes, ensure they are fully cool and dispose of them safely.
                </p>
              </div>
            </div>
            <Image
              src={woodFireplace}
              alt="Wood Fireplace"
              className="fireplace-img"
              loading="lazy"
              placeholder="blur"
            />
          </motion.div>

          <motion.div 
            className={`fireplace-section ${isMobile ? 'mobile-section' : ''}`}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.7 }}
          >
            <Image
              src={electricFireplace}
              alt="Electric Fireplace"
              className="fireplace-img"
              loading="lazy"
              placeholder="blur"
            />
            <div className="left-side-section">
              <h2>ELECTRIC FIREPLACES</h2>
              <div className="left-side-typography-section">
                <p>
                  Maintaining an electric fireplace is simple. Depending on the
                  model, you may need to replace the light bulbs every few
                  years. You should also clean the heater annually to keep it
                  free from dust and debris. Make sure the fireplace is
                  disconnected from electricity and cooled down before wiping it
                  with a soft, dry cloth. Use a vacuum with a brush attachment
                  to gently clean heater outlets.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.hr 
          className="custom-divider" 
          id="service-form"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />

        <motion.div 
          className="book-service-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2>BOOK A SERVICE</h2>
          <form className="service-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name*"
                  required
                  onChange={handleChange}
                  value={formData.first_name}
                />
              </div>
              <div className="input-wrapper">
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name*"
                  required
                  onChange={handleChange}
                  value={formData.last_name}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  name="phone_number"
                  type="text"
                  placeholder="Phone Number*"
                  required
                  onChange={handleChange}
                  value={formData.phone_number}
                />
              </div>
              <div className="input-wrapper">
                <input
                  name="email"
                  type="email"
                  placeholder="Email*"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  name="street_address"
                  type="text"
                  placeholder="Street Address*"
                  required
                  onChange={handleChange}
                  value={formData.street_address}
                />
              </div>
              <div className="input-wrapper">
                <input
                  name="suburb"
                  type="text"
                  placeholder="Suburb*"
                  required
                  onChange={handleChange}
                  value={formData.suburb}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  name="state"
                  type="text"
                  placeholder="State*"
                  required
                  onChange={handleChange}
                  value={formData.state}
                />
              </div>
              <div className="input-wrapper">
                <input
                  name="postcode"
                  type="text"
                  placeholder="Postcode*"
                  required
                  onChange={handleChange}
                  value={formData.postcode}
                />
              </div>
            </div>

            <div className="input-wrapper-full">
              <textarea
                name="description"
                placeholder="Description*"
                required
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <select
                  name="brand"
                  onChange={handleChange}
                  value={formData.brand}
                  required
                >
                  <option value="brand">Brand</option>
                  {/* Add more brand options here */}
                </select>
              </div>
              <div className="input-wrapper">
                <input
                  name="serial_number"
                  type="text"
                  placeholder="Serial Number"
                  onChange={handleChange}
                  value={formData.serial_number}
                />
              </div>
            </div>

            <motion.button 
              type="submit" 
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SUBMIT
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MaintenanceService;















