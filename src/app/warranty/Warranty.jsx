// "use client"; // This tells Next.js to treat this as a client-side component

// import { useState } from "react";
// import "./warranty.css"; // Importing the CSS file

// const Warranty = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     streetAddress: "",
//     description: "",
//     brand: "",
//     serialNumber: "",
//     file: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       file: e.target.files[0],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   return (
//     <>
//       <div className="warrenty-page">
//         <div className="titleWrapper">
//           <div className="warrentyTitle">WARRANTY</div>
//         </div>
//         <div className="warrenty-form">
//           <div className="column1">
//             <div className="warrentyFormHeading">
//               <div className="heading">
//                 <p className="headingone ui text size-h2">Make A Claim</p>
//               </div>
//               <p className="desc ui text size-body_small">
//                 To make a warranty claim or to get more information, fill out
//                 the form and our care team will get in touch.
//               </p>
//             </div>
//             <form className="columnsubmit" onSubmit={handleSubmit}>
//               <div className="columnform">
//                 <div className="columnstreetadd">
//                   <div className="columnfirstname">
//                     <div className="rowform_three">
//                       <label className="form_three">
//                         <input
//                           name="firstName"
//                           value={formData.firstName}
//                           placeholder="First Name*"
//                           type="text"
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </label>
//                       <label className="form_three">
//                         <input
//                           name="lastName"
//                           value={formData.lastName}
//                           placeholder="Last Name*"
//                           type="text"
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </label>
//                     </div>
//                     <div className="rowphonenumber">
//                       <label className="form_three">
//                         <input
//                           name="phoneNumber"
//                           value={formData.phoneNumber}
//                           placeholder="Phone Number*"
//                           type="tel"
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </label>
//                       <label className="form_three">
//                         <input
//                           name="email"
//                           value={formData.email}
//                           placeholder="Email*"
//                           type="email"
//                           onChange={handleInputChange}
//                           required
//                         />
//                       </label>
//                     </div>
//                   </div>
//                   <label className="streetaddress">
//                     <input
//                       name="streetAddress"
//                       value={formData.streetAddress}
//                       placeholder="Street address*"
//                       type="text"
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </label>
//                   <textarea
//                     className="textarea"
//                     name="description"
//                     value={formData.description}
//                     placeholder="Description*"
//                     onChange={handleInputChange}
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="rowform_three">
//                   <select
//                     className="dropdown"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="" disabled>
//                       Brands
//                     </option>
//                     <option value="option1">Option1</option>
//                     <option value="option2">Option2</option>
//                     <option value="option3">Option3</option>
//                   </select>
//                   <label className="form_three">
//                     <input
//                       name="serialNumber"
//                       value={formData.serialNumber}
//                       placeholder="Serial Number"
//                       type="number"
//                       onChange={handleInputChange}
//                     />
//                   </label>
//                 </div>
//               </div>
//               <div className="popsection">
//                 <p className="text">Proof of Purchase</p>
//                 <div className="choosefile">
//                   <div className="button">
//                     <label className="desc">
//                       CHOOSE FILE
//                       <input
//                         type="file"
//                         onChange={handleFileChange}
//                         style={{ display: "none" }}
//                       />
//                     </label>
//                   </div>
//                   <p className="">
//                     {formData.file ? formData.file.name : "No file chosen"}
//                   </p>
//                 </div>
//               </div>
//               <button className="submitBtn" type="submit">
//                 Submit
//               </button>
//             </form>
//           </div>
//           <div className="column2">
//             <p className="desc ui text size-body_small">
//               At Living Fire, we are committed to providing high-quality
//               products backed by strong warranties. Here’s what you need to
//               know:
//             </p>
//             <div className="columnaustralia">
//               <p className="warrenty-title-left ui text size-h4">
//                 Australian Consumer Law
//               </p>
//               <div className="column_two">
//                 <p className="desc ui text size-body_small">
//                   <span>
//                     Our appliances come with guarantees that cannot be excluded
//                     under the Australian Consumer Law. You are entitled to a
//                     replacement or refund for major failures, as well as
//                     compensation for any other foreseeable loss or damage.
//                     <br />
//                     <br />
//                     For more information on your consumer rights, visit the
//                     <a href="#" className="accc-web">
//                       {" "}
//                       ACCC website.
//                     </a>
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <div className="columnpaulagnew">
//               <p className="warrenty-title-left ui text size-h4">
//                 Paul Agnew Designs Warranty
//               </p>
//               <p className="desc ui text size-body_small">
//                 Paul Agnew Designs, through its exclusive distribution partner
//                 in Australia and New Zealand, offers a Limited Warranty to the
//                 original purchaser. This warranty is in addition to the rights
//                 you have under Australian Consumer Law and does not limit those
//                 rights in any way.
//               </p>
//             </div>
//             <div className="columnaustralia">
//               <p className="warrenty-title-left ui text size-h4">
//                 Warranties for Other Brands
//               </p>
//               <p className="desc ui text size-body_small">
//                 All other brands sold by Living Fire come with their own
//                 specific warranties. If you need more information or want to
//                 make a warranty claim, simply reach out to our care team, and we
//                 will assess your case based on the supplier’s warranty.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Warranty;

"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./warranty.css";

const Warranty = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    description: "",
    brand: "",
    serialNumber: "",
    file: null,
  });

  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="warrenty-page" ref={formRef}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="content-wrapper"
          >
            <motion.div className="titleWrapper" variants={fadeIn}>
              <div className="warrentyTitle">WARRANTY</div>
            </motion.div>

            <motion.div
              className="warrenty-form"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="column1">
                <motion.div
                  className="warrentyFormHeading"
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  <div className="heading">
                    <p className="headingone ui text size-h2">Make A Claim</p>
                  </div>
                  <p className="desc ui text size-body_small">
                    To make a warranty claim or to get more information, fill
                    out the form and our care team will get in touch.
                  </p>
                </motion.div>

                <motion.form
                  className="columnsubmit"
                  onSubmit={handleSubmit}
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <div className="columnform">
                    <div className="columnstreetadd">
                      <div className="columnfirstname">
                        <div className="rowform_three">
                          <motion.label
                            className="form_three"
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                          >
                            <input
                              name="firstName"
                              value={formData.firstName}
                              placeholder="First Name*"
                              type="text"
                              onChange={handleInputChange}
                              required
                            />
                          </motion.label>
                          <motion.label
                            className="form_three"
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                          >
                            <input
                              name="lastName"
                              value={formData.lastName}
                              placeholder="Last Name*"
                              type="text"
                              onChange={handleInputChange}
                              required
                            />
                          </motion.label>
                        </div>
                        <div className="rowphonenumber">
                          <motion.label
                            className="form_three"
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                          >
                            <input
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              placeholder="Phone Number*"
                              type="tel"
                              onChange={handleInputChange}
                              required
                            />
                          </motion.label>
                          <motion.label
                            className="form_three"
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                          >
                            <input
                              name="email"
                              value={formData.email}
                              placeholder="Email*"
                              type="email"
                              onChange={handleInputChange}
                              required
                            />
                          </motion.label>
                        </div>
                      </div>
                      <motion.label
                        className="streetaddress"
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <input
                          name="streetAddress"
                          value={formData.streetAddress}
                          placeholder="Street address*"
                          type="text"
                          onChange={handleInputChange}
                          required
                        />
                      </motion.label>
                      <motion.textarea
                        className="textarea"
                        name="description"
                        value={formData.description}
                        placeholder="Description*"
                        onChange={handleInputChange}
                        required
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      ></motion.textarea>
                    </div>
                    <div className="rowform_three">
                      <motion.select
                        className="dropdown"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option value="" disabled>
                          Brands
                        </option>
                        <option value="option1">Option1</option>
                        <option value="option2">Option2</option>
                        <option value="option3">Option3</option>
                      </motion.select>
                      <motion.label
                        className="form_three"
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <input
                          name="serialNumber"
                          value={formData.serialNumber}
                          placeholder="Serial Number"
                          type="number"
                          onChange={handleInputChange}
                        />
                      </motion.label>
                    </div>
                  </div>
                  <motion.div
                    className="popsection"
                    variants={fadeIn}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text">Proof of Purchase</p>
                    <div className="choosefile">
                      <motion.div
                        className="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <label className="desc">
                          CHOOSE FILE
                          <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </label>
                      </motion.div>
                      <p className="">
                        {formData.file ? formData.file.name : "No file chosen"}
                      </p>
                    </div>
                  </motion.div>
                  <motion.button
                    className="submitBtn"
                    type="submit"
                    whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                    whileTap={{ scale: 0.95 }}
                    variants={fadeIn}
                    transition={{ delay: 0.6 }}
                  >
                    Submit
                  </motion.button>
                </motion.form>
              </div>
              <div className="column2">
                <motion.p
                  className="desc ui text size-body_small"
                  variants={fadeIn}
                  transition={{ delay: 0.3 }}
                >
                  At Living Fire, we are committed to providing high-quality
                  products backed by strong warranties. Heres what you need to
                  know:
                </motion.p>
                <motion.div
                  className="columnaustralia"
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <p className="warrenty-title-left ui text size-h4">
                    Australian Consumer Law
                  </p>
                  <div className="column_two">
                    <p className="desc ui text size-body_small">
                      <span>
                        Our appliances come with guarantees that cannot be
                        excluded under the Australian Consumer Law. You are
                        entitled to a replacement or refund for major failures,
                        as well as compensation for any other foreseeable loss or
                        damage.
                        <br />
                        <br />
                        For more information on your consumer rights, visit the
                        <a href="#" className="accc-web">
                          {" "}
                          ACCC website.
                        </a>
                      </span>
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="columnpaulagnew"
                  variants={fadeIn}
                  transition={{ delay: 0.5 }}
                >
                  <p className="warrenty-title-left ui text size-h4">
                    Paul Agnew Designs Warranty
                  </p>
                  <p className="desc ui text size-body_small">
                    Paul Agnew Designs, through its exclusive distribution
                    partner in Australia and New Zealand, offers a Limited
                    Warranty to the original purchaser. This warranty is in
                    addition to the rights you have under Australian Consumer
                    Law and does not limit those rights in any way.
                  </p>
                </motion.div>
                <motion.div
                  className="columnaustralia"
                  variants={fadeIn}
                  transition={{ delay: 0.6 }}
                >
                  <p className="warrenty-title-left ui text size-h4">
                    Warranties for Other Brands
                  </p>
                  <p className="desc ui text size-body_small">
                    All other brands sold by Living Fire come with their own
                    specific warranties. If you need more information or want to
                    make a warranty claim, simply reach out to our care team, and
                    we will assess your case based on the suppliers warranty.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Warranty;
