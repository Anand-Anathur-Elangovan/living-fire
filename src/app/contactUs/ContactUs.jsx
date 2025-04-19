// "use client";
// import "./contactus.css";
// import { useEffect, useState } from "react";
// import Head from "next/head";
// import axios from "axios";
// import { useContactUs } from "./hooks/useContactUs";

// const ContactUs = () => {
//   const [tab, setTab] = useState("sales"); // Manage active tab
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const initialFormData = {
//     loggedEmail: "",
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     deliveryOption: "",
//     streetAddress: "",
//     suburb: "",
//     state: "",
//     postcode: "",
//     message: "",
//     brand: "",
//     product: "",
//     industry: "",
//     serialNumber: "",
//     tab: tab,
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const { mutate, isLoading, isError, isSuccess, error, data } = useContactUs();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     mutate(formData);
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       setIsSubmitting(false);
//       setFormData(initialFormData);
//     }
//   }, [isLoading, isSuccess]);

//   return (
//     <div style={{ backgroundColor: "#f7f7f5", margin: "100px 0px" }}>
//       <Head>
//         <title>Contact Us</title>
//         <link rel="stylesheet" href="/index.css" />
//         <link rel="stylesheet" href="/contactus.css" />
//       </Head>
//       <div className="contact-us">
//         <p className="contactus-text ui text size-text2xl">Contact Us</p>
//       </div>

//       <section>
//         <AddressDetails />
//       </section>
//       <section>
//         <div className="contactus-form">
//           <div className="container">
//             <div
//               id="tabList"
//               role="tablist"
//               aria-label="rowdescription"
//               className="contactforms"
//             >
//               <div>
//                 <div className="tab-list">
//                   <span
//                     className={`tablist-text ${
//                       tab === "sales" ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setTab("sales");
//                       setFormData(initialFormData);
//                     }}
//                   >
//                     Sales Enquiry
//                   </span>
//                   <span
//                     className={`tablist-text ${
//                       tab === "trade" ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setTab("trade");
//                       setFormData(initialFormData);
//                     }}
//                   >
//                     Trade Enquiry
//                   </span>
//                   <span
//                     className={`tablist-text ${
//                       tab === "service" ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setTab("service");
//                       setFormData(initialFormData);
//                     }}
//                   >
//                     Service Enquiry
//                   </span>
//                   <span
//                     className={`tablist-text ${
//                       tab === "warranty" ? "active" : ""
//                     }`}
//                     onClick={() => {
//                       setTab("warranty");
//                       setFormData(initialFormData);
//                     }}
//                   >
//                     Warranty Claim
//                   </span>
//                 </div>
//                 <div className="lineeleven_one"></div>
//               </div>
//               <div
//                 id="tabpanel01"
//                 role="tabpanel"
//                 aria-labelledby="tab01"
//                 className="column_one tabcontent"
//               >
//                 {tab === "sales" && (
//                   <div
//                     id="tabpanel01"
//                     role="tabpanel"
//                     aria-labelledby="tab01"
//                     className="column_one tabcontent"
//                   >
//                     <form className="service-form" onSubmit={handleSubmit}>
//                       <p className="form-description ui text">
//                         To get more information about a specific product or to
//                         receive a quote, fill out the form and our care team
//                         will get in touch.
//                       </p>
//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="firstName"
//                             type="text"
//                             placeholder="First Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.firstName}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="lastName"
//                             type="text"
//                             placeholder="Last Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.lastName}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="phoneNumber"
//                             type="text"
//                             placeholder="Phone Number*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.phoneNumber}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="email"
//                             type="email"
//                             placeholder="Email*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.email}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="deliveryOption"
//                             type="text"
//                             placeholder="Pickup or delivery?"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.deliveryOption}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="postcode"
//                             type="text"
//                             placeholder="Postcode*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.postcode}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <select
//                             name="brand"
//                             value={formData.brand}
//                             onChange={handleInputChange}
//                           >
//                             <option value="option1">Brand</option>
//                             <option value="option2">Option2</option>
//                             <option value="option3">Option3</option>
//                           </select>
//                         </div>
//                         <div className="input-wrapper">
//                           <select
//                             name="product"
//                             value={formData.product}
//                             onChange={handleInputChange}
//                             placeholder="Select Product"
//                           >
//                             <option value="option1">Product</option>
//                             <option value="option2">Option2</option>
//                             <option value="option3">Option3</option>
//                           </select>
//                         </div>
//                       </div>

//                       <div className="input-wrapper-full">
//                         <textarea
//                           name="message"
//                           placeholder="How can we help?*"
//                           required
//                           onChange={handleInputChange}
//                           value={formData?.message}
//                         ></textarea>
//                       </div>
//                       <div className="columnsubmit">
//                         <button
//                           className="flex-row-center-center  submit ui button"
//                           type="submit"
//                           disabled={isSubmitting}
//                         >
//                           {isSubmitting ? "Submitting..." : "Submit"}
//                         </button>
//                       </div>
//                     </form>
//                     <br />
//                     <br />
//                     <br />
//                   </div>
//                 )}

//                 {tab === "trade" && (
//                   <div
//                     id="tabpanel01"
//                     role="tabpanel"
//                     aria-labelledby="tab01"
//                     className="column_one tabcontent"
//                   >
//                     <form className="service-form" onSubmit={handleSubmit}>
//                       <p className="form-description ui text">
//                         If you are an architect, builder, landscaper or
//                         installer and you have an enquiry or need any
//                         assistance, speak to our team by filling out the form
//                         below. You can also visit our industry hub to find spec
//                         sheets and installation manuals. To sign up for a trade
//                         account, you can visit our trades page.
//                       </p>
//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="firstName"
//                             type="text"
//                             placeholder="First Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.firstName}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="lastName"
//                             type="text"
//                             placeholder="Last Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.lastName}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="phoneNumber"
//                             type="text"
//                             placeholder="Phone Number*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.phoneNumber}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="email"
//                             type="email"
//                             placeholder="Email*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.email}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <select
//                             name="industry"
//                             value={formData.industry}
//                             onChange={handleInputChange}
//                           >
//                             <option value="option1">Industry</option>
//                             <option value="option2">Option2</option>
//                             <option value="option3">Option3</option>
//                           </select>
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="postcode"
//                             type="text"
//                             placeholder="Postcode*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.postcode}
//                           />
//                         </div>
//                       </div>

//                       <div className="input-wrapper-full">
//                         <textarea
//                           name="message"
//                           placeholder="How can we help?*"
//                           required
//                           onChange={handleInputChange}
//                           value={formData?.message}
//                         ></textarea>
//                       </div>
//                       <div className="columnsubmit">
//                         <button
//                           className="flex-row-center-center  submit ui button"
//                           type="submit"
//                           disabled={isSubmitting}
//                         >
//                           {isSubmitting ? "Submitting..." : "Submit"}
//                         </button>
//                       </div>
//                     </form>
//                     <br />
//                     <br />
//                     <br />
//                   </div>
//                 )}

//                 {tab === "service" && (
//                   <div
//                     id="tabpanel01"
//                     role="tabpanel"
//                     aria-labelledby="tab01"
//                     className="column_one tabcontent"
//                   >
//                     <form className="service-form" onSubmit={handleSubmit}>
//                       <p className="form-description ui text">
//                         For assistance or to schedule a service, contact us at
//                         03 99 777 888 or fill out the form below. We are here to
//                         help you enjoy your fireplace at its very best!
//                       </p>
//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="firstName"
//                             type="text"
//                             placeholder="First Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.firstName}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="lastName"
//                             type="text"
//                             placeholder="Last Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.lastName}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="phoneNumber"
//                             type="text"
//                             placeholder="Phone Number*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.phoneNumber}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="email"
//                             type="email"
//                             placeholder="Email*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.email}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="streetAddress"
//                             type="text"
//                             placeholder="Street Address*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.streetAddress}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="suburb"
//                             type="text"
//                             placeholder="Suburb*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.suburb}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="state"
//                             type="text"
//                             placeholder="State*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.state}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="postcode"
//                             type="text"
//                             placeholder="Postcode*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.postcode}
//                           />
//                         </div>
//                       </div>

//                       <div className="input-wrapper-full">
//                         <textarea
//                           name="message"
//                           placeholder="How can we help?*"
//                           required
//                           onChange={handleInputChange}
//                           value={formData?.message}
//                         ></textarea>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <select
//                             name="brand"
//                             value={formData.brand}
//                             onChange={handleInputChange}
//                           >
//                             <option value="option1">Brand</option>
//                             <option value="option2">Option2</option>
//                             <option value="option3">Option3</option>
//                           </select>
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="serialNumber"
//                             type="text"
//                             placeholder="Serial Number"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.serialNumber}
//                           />
//                         </div>
//                       </div>

//                       <div className="file-upload">
//                         <label>Proof of Purchase</label>
//                         <input type="file" />
//                       </div>
//                       <button
//                         className="flex-row-center-center  submit ui button"
//                         type="submit"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                       </button>
//                     </form>
//                     <br />
//                     <br />
//                     <br />
//                   </div>
//                 )}

//                 {tab === "warranty" && (
//                   <div
//                     id="tabpanel01"
//                     role="tabpanel"
//                     aria-labelledby="tab01"
//                     className="column_one tabcontent"
//                   >
//                     <form className="service-form" onSubmit={handleSubmit}>
//                       <p className="form-description ui text">
//                         To make a warranty claim or to get more information,
//                         fill out the form and our care team will get in touch.
//                       </p>
//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="firstName"
//                             type="text"
//                             placeholder="First Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.firstName}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="lastName"
//                             type="text"
//                             placeholder="Last Name*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.lastName}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <input
//                             name="phoneNumber"
//                             type="text"
//                             placeholder="Phone Number*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.phoneNumber}
//                           />
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="email"
//                             type="email"
//                             placeholder="Email*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.email}
//                           />
//                         </div>
//                       </div>

//                       <div
//                         className="form-group"
//                         style={{ borderBottom: " 1px solid #000" }}
//                       >
//                         <div className="input-wrapper-full">
//                           <input
//                             name="streetAddress"
//                             type="text"
//                             placeholder="Street Address*"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.streetAddress}
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <div className="input-wrapper">
//                           <select
//                             name="brand"
//                             value={formData.brand}
//                             onChange={handleInputChange}
//                           >
//                             <option value="option1">Brand</option>
//                             <option value="option2">Option2</option>
//                             <option value="option3">Option3</option>
//                           </select>
//                         </div>
//                         <div className="input-wrapper">
//                           <input
//                             name="serialNumber"
//                             type="text"
//                             placeholder="Serial Number"
//                             required
//                             onChange={handleInputChange}
//                             value={formData?.serialNumber}
//                           />
//                         </div>
//                       </div>

//                       <div className="input-wrapper-full">
//                         <textarea
//                           name="message"
//                           placeholder="How can we help?*"
//                           required
//                           onChange={handleInputChange}
//                           value={formData?.message}
//                         ></textarea>
//                       </div>

//                       <div className="file-upload">
//                         <label>Proof of Purchase</label>
//                         <input type="file" />
//                       </div>

//                       <button
//                         className="flex-row-center-center  submit ui button"
//                         type="submit"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                       </button>
//                     </form>
//                     <br />
//                     <br />
//                     <br />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// const AddressDetails = () => (
//   <div className="address-details">
//     <p className="description ui text size-body_large">
//       At Living Fire, we believe our work is complete only when our clients are
//       enjoying the warmth of their new fireplace with a glass of wine in hand.
//       To ensure every customer across Melbourne and Australia finds their
//       perfect match, we have curated an exceptional selection of luxury
//       fireplace brands. Visit our showrooms in Richmond and Moorabbin to
//       experience our products firsthand.
//     </p>
//     <div className="locationinfo">
//       <div className="column-address">
//         <div className="heading">
//           <p className="headingfive ui text">Richmond Showroom</p>
//         </div>
//         <div className="column-1">
//           <div className="">
//             <p className="bodysmall-1 ui text">
//               359-361 Swan Street, <br />
//               Richmond, Victoria 3121
//             </p>
//             <p className="openinghourstex ui text">
//               Monday – Friday: 9am – 5pm
//               <br />
//               Saturday: 10am – 4pm
//             </p>
//           </div>
//           <div>
//             <div className="heading7">
//               <p className="bodysmall_one ui text">info@livingfire.com.au</p>
//             </div>
//             <div className="heading7">
//               <p className="bodysmall_two ui text">(03) 9977 7886</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="column-address">
//         <div className="heading">
//           <p className="headingfive ui text">Moorabbin Showroom</p>
//         </div>
//         <div className="column-1">
//           <div className="">
//             <p className="bodysmall-1 ui text">
//               148-150 Cochranes Road, <br />
//               Moorabbin, Victoria 3189
//             </p>
//             <p className="openinghourstex ui text">
//               Monday – Friday: 8:30am – 4:30pm
//               <br />
//               Saturday: 10am – 4pm
//             </p>
//           </div>
//           <div>
//             <div className="heading7">
//               <p className="bodysmall_one ui text">info@livingfire.com.au</p>
//             </div>
//             <div className="heading7">
//               <p className="bodysmall_two ui text">(03) 9977 7887</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="column-address">
//         <div className="heading">
//           <p className="headingfive ui text">Moorabbin Warehouse</p>
//         </div>
//         <div className="column-1">
//           <div className="">
//             <p className="bodysmall-1 ui text">
//               148-150 Cochranes Road, <br />
//               Moorabbin, Victoria 3189
//             </p>
//             <div className="bodysmall-15">
//               <p className="bodysmall_two ui text">
//                 Monday – Friday: 9am – 3pm
//               </p>
//             </div>
//             <p className="openinghourstex ui text">
//               Pick-ups must be booked 2-3 Business days in advance
//             </p>
//           </div>
//           <div>
//             <div className="heading7">
//               <p className="bodysmall_two ui text">Accounts: 03 9977 7880</p>
//             </div>
//             <div className="heading7">
//               <p className="bodysmall_one ui text">
//                 <span className="bodysmall_two-span"> Operations:</span>
//                 <span> &nbsp;</span>
//                 <span> 03 9977 7881</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default ContactUs;

"use client";
import "./contactus.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useContactUs } from "./hooks/useContactUs";

// Lazy load the AddressDetails component
const AddressDetails = dynamic(() => import('./AddressDetails'), {
  loading: () => <p>Loading address information...</p>,
  ssr: false
});

const ContactUs = () => {
  const [tab, setTab] = useState("sales");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const initialFormData = {
    loggedEmail: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    deliveryOption: "",
    streetAddress: "",
    suburb: "",
    state: "",
    postcode: "",
    message: "",
    brand: "",
    product: "",
    industry: "",
    serialNumber: "",
    tab: tab,
  };

  const [formData, setFormData] = useState(initialFormData);
  const { mutate, isLoading, isError, isSuccess, error, data } = useContactUs();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSubmitting(false);
      setFormData(initialFormData);
    }
  }, [isLoading, isSuccess]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { opacity: 0, x: 20 }
  };

  if (!isMounted) return null;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ backgroundColor: "#f7f7f5", margin: "50px 0" }}
    >
      <Head>
        <title>Contact Us</title>
        <link rel="stylesheet" href="/index.css" />
        <link rel="stylesheet" href="/contactus.css" />
      </Head>

      <motion.div className="contact-us" variants={itemVariants}>
        <motion.p 
          className="contactus-text" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Contact Us
        </motion.p>
      </motion.div>

      <motion.section variants={itemVariants}>
        <AddressDetails />
      </motion.section>

      <motion.section variants={itemVariants}>
        <div className="contactus-form">
          <div className="container">
            <div id="tabList" role="tablist" aria-label="rowdescription" className="contactforms">
              <motion.div variants={itemVariants}>
                <div className="tab-list">
                  {["sales", "trade", "service", "warranty"].map((tabName) => (
                    <motion.span
                      key={tabName}
                      className={`tablist-text ${tab === tabName ? "active" : ""}`}
                      onClick={() => {
                        setTab(tabName);
                        setFormData(initialFormData);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tabName === "sales" && "Sales Enquiry"}
                      {tabName === "trade" && "Trade Enquiry"}
                      {tabName === "service" && "Service Enquiry"}
                      {tabName === "warranty" && "Warranty Claim"}
                    </motion.span>
                  ))}
                </div>
                <div className="lineeleven_one"></div>
              </motion.div>

              <motion.div
                id="tabpanel01"
                role="tabpanel"
                aria-labelledby="tab01"
                className="column_one tabcontent"
                variants={containerVariants}
              >
                <AnimatePresence mode="wait">
                  {tab === "sales" && (
                    <motion.div
                      key="sales"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <form className="service-form" onSubmit={handleSubmit}>
                        <motion.p className="form-description" variants={itemVariants}>
                          To get more information about a specific product or to receive a quote, 
                          fill out the form and our care team will get in touch.
                        </motion.p>

                        <motion.div className="form-group" variants={itemVariants}>
                          <div className="input-wrapper">
                            <input
                              name="firstName"
                              type="text"
                              placeholder="First Name*"
                              required
                              onChange={handleInputChange}
                              value={formData?.firstName}
                            />
                          </div>
                          <div className="input-wrapper">
                            <input
                              name="lastName"
                              type="text"
                              placeholder="Last Name*"
                              required
                              onChange={handleInputChange}
                              value={formData?.lastName}
                            />
                          </div>
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                          <div className="input-wrapper">
                            <input
                              name="phoneNumber"
                              type="text"
                              placeholder="Phone Number*"
                              required
                              onChange={handleInputChange}
                              value={formData?.phoneNumber}
                            />
                          </div>
                          <div className="input-wrapper">
                            <input
                              name="email"
                              type="email"
                              placeholder="Email*"
                              required
                              onChange={handleInputChange}
                              value={formData?.email}
                            />
                          </div>
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                          <div className="input-wrapper">
                            <input
                              name="deliveryOption"
                              type="text"
                              placeholder="Pickup or delivery?"
                              required
                              onChange={handleInputChange}
                              value={formData?.deliveryOption}
                            />
                          </div>
                          <div className="input-wrapper">
                            <input
                              name="postcode"
                              type="text"
                              placeholder="Postcode*"
                              required
                              onChange={handleInputChange}
                              value={formData?.postcode}
                            />
                          </div>
                        </motion.div>

                        <motion.div className="form-group" variants={itemVariants}>
                          <div className="input-wrapper">
                            <select
                              name="brand"
                              value={formData.brand}
                              onChange={handleInputChange}
                            >
                              <option value="option1">Brand</option>
                              <option value="option2">Option2</option>
                              <option value="option3">Option3</option>
                            </select>
                          </div>
                          <div className="input-wrapper">
                            <select
                              name="product"
                              value={formData.product}
                              onChange={handleInputChange}
                              placeholder="Select Product"
                            >
                              <option value="option1">Product</option>
                              <option value="option2">Option2</option>
                              <option value="option3">Option3</option>
                            </select>
                          </div>
                        </motion.div>

                        <motion.div className="input-wrapper-full" variants={itemVariants}>
                          <textarea
                            name="message"
                            placeholder="How can we help?*"
                            required
                            onChange={handleInputChange}
                            value={formData?.message}
                          ></textarea>
                        </motion.div>

                        <motion.div 
                          className="columnsubmit"
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            className="submit"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                        </motion.div>
                      </form>
                    </motion.div>
                  )}

                  {tab === "trade" && (
                    <motion.div
                      key="trade"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div
                    id="tabpanel01"
                    role="tabpanel"
                    aria-labelledby="tab01"
                    className="column_one tabcontent"
                  >
                    <form className="service-form" onSubmit={handleSubmit}>
                      <p className="form-description ui text">
                        If you are an architect, builder, landscaper or
                        installer and you have an enquiry or need any
                        assistance, speak to our team by filling out the form
                        below. You can also visit our industry hub to find spec
                        sheets and installation manuals. To sign up for a trade
                        account, you can visit our trades page.
                      </p>
                      <div className="form-group">
                        <div className="input-wrapper">
                          <input
                            name="firstName"
                            type="text"
                            placeholder="First Name*"
                            required
                            onChange={handleInputChange}
                            value={formData?.firstName}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name*"
                            required
                            onChange={handleInputChange}
                            value={formData?.lastName}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <input
                            name="phoneNumber"
                            type="text"
                            placeholder="Phone Number*"
                            required
                            onChange={handleInputChange}
                            value={formData?.phoneNumber}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="email"
                            type="email"
                            placeholder="Email*"
                            required
                            onChange={handleInputChange}
                            value={formData?.email}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                          >
                            <option value="option1">Industry</option>
                            <option value="option2">Option2</option>
                            <option value="option3">Option3</option>
                          </select>
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="postcode"
                            type="text"
                            placeholder="Postcode*"
                            required
                            onChange={handleInputChange}
                            value={formData?.postcode}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper-full">
                        <textarea
                          name="message"
                          placeholder="How can we help?*"
                          required
                          onChange={handleInputChange}
                          value={formData?.message}
                        ></textarea>
                      </div>
                      <div className="columnsubmit">
                        <button
                          className="flex-row-center-center  submit ui button"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </form>
                    <br />
                    <br />
                    <br />
                  </div>
                    </motion.div>
                  )}

                  {tab === "service" && (
                    <motion.div
                      key="service"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                     <div
                    id="tabpanel01"
                    role="tabpanel"
                    aria-labelledby="tab01"
                    className="column_one tabcontent"
                  >
                    <form className="service-form" onSubmit={handleSubmit}>
                      <p className="form-description ui text">
                        For assistance or to schedule a service, contact us at
                        03 99 777 888 or fill out the form below. We are here to
                        help you enjoy your fireplace at its very best!
                      </p>
                      <div className="form-group">
                        <div className="input-wrapper">
                          <input
                            name="firstName"
                            type="text"
                            placeholder="First Name*"
                            required
                            onChange={handleInputChange}
                            value={formData?.firstName}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name*"
                            required
                            onChange={handleInputChange}
                            value={formData?.lastName}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <input
                            name="phoneNumber"
                            type="text"
                            placeholder="Phone Number*"
                            required
                            onChange={handleInputChange}
                            value={formData?.phoneNumber}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="email"
                            type="email"
                            placeholder="Email*"
                            required
                            onChange={handleInputChange}
                            value={formData?.email}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <input
                            name="streetAddress"
                            type="text"
                            placeholder="Street Address*"
                            required
                            onChange={handleInputChange}
                            value={formData?.streetAddress}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="suburb"
                            type="text"
                            placeholder="Suburb*"
                            required
                            onChange={handleInputChange}
                            value={formData?.suburb}
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
                            onChange={handleInputChange}
                            value={formData?.state}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="postcode"
                            type="text"
                            placeholder="Postcode*"
                            required
                            onChange={handleInputChange}
                            value={formData?.postcode}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper-full">
                        <textarea
                          name="message"
                          placeholder="How can we help?*"
                          required
                          onChange={handleInputChange}
                          value={formData?.message}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                          >
                            <option value="option1">Brand</option>
                            <option value="option2">Option2</option>
                            <option value="option3">Option3</option>
                          </select>
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="serialNumber"
                            type="text"
                            placeholder="Serial Number"
                            required
                            onChange={handleInputChange}
                            value={formData?.serialNumber}
                          />
                        </div>
                      </div>

                      <div className="file-upload">
                        <label>Proof of Purchase</label>
                        <input type="file" />
                      </div>
                      <button
                        className="flex-row-center-center  submit ui button"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                    <br />
                    <br />
                    <br />
                  </div>
                    </motion.div>
                  )}

                  {tab === "warranty" && (
                    <motion.div
                      key="warranty"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                       <div
                    id="tabpanel01"
                    role="tabpanel"
                    aria-labelledby="tab01"
                    className="column_one tabcontent"
                  >
                    <form className="service-form" onSubmit={handleSubmit}>
                      <p className="form-description ui text">
                        To make a warranty claim or to get more information,
                        fill out the form and our care team will get in touch.
                      </p>
                      <div className="form-group">
                        <div className="input-wrapper">
                          <input
                            name="firstName"
                            type="text"
                            placeholder="First Name*"
                            required
                            onChange={handleInputChange}
                            value={formData?.firstName}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name*"
                            required
                            onChange={handleInputChange}
                            value={formData?.lastName}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <input
                            name="phoneNumber"
                            type="text"
                            placeholder="Phone Number*"
                            required
                            onChange={handleInputChange}
                            value={formData?.phoneNumber}
                          />
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="email"
                            type="email"
                            placeholder="Email*"
                            required
                            onChange={handleInputChange}
                            value={formData?.email}
                          />
                        </div>
                      </div>

                      <div
                        className="form-group"
                        style={{ borderBottom: " 1px solid #000" }}
                      >
                        <div className="input-wrapper-full">
                          <input
                            name="streetAddress"
                            type="text"
                            placeholder="Street Address*"
                            required
                            onChange={handleInputChange}
                            value={formData?.streetAddress}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-wrapper">
                          <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                          >
                            <option value="option1">Brand</option>
                            <option value="option2">Option2</option>
                            <option value="option3">Option3</option>
                          </select>
                        </div>
                        <div className="input-wrapper">
                          <input
                            name="serialNumber"
                            type="text"
                            placeholder="Serial Number"
                            required
                            onChange={handleInputChange}
                            value={formData?.serialNumber}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper-full">
                        <textarea
                          name="message"
                          placeholder="How can we help?*"
                          required
                          onChange={handleInputChange}
                          value={formData?.message}
                        ></textarea>
                      </div>

                      <div className="file-upload">
                        <label>Proof of Purchase</label>
                        <input type="file" />
                      </div>

                      <button
                        className="flex-row-center-center  submit ui button"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                    <br />
                    <br />
                    <br />
                  </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ContactUs;