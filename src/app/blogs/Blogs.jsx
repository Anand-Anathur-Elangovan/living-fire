// "use client";
// import React from "react";
// import "./blogs.css";
// import { motion } from "framer-motion";
// import Link from "next/link";

// const Blogs = () => {
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   return (
//     <div className="under-construction-container">
//       <motion.div 
//         className="content-wrapper"
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//       >
//         <motion.h1 className="title" variants={fadeInUp}>
//           Our Blogs Are Coming Soon
//         </motion.h1>
        
//         <motion.p className="description" variants={fadeInUp}>
//           We are working hard to bring you insightful and engaging content about fireplaces, 
//           home heating solutions, and maintenance tips. Check back soon for our first articles!
//         </motion.p>
        
//         <motion.div className="button-group" variants={fadeInUp}>
//           <Link href="/">
//             <motion.button
//               className="home-button"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Return to Home
//             </motion.button>
//           </Link>
          
//           <Link href="/contact">
//             <motion.button
//               className="contact-button"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Contact Us
//             </motion.button>
//           </Link>
//         </motion.div>
        
//         <motion.div 
//           className="construction-icon"
//           animate={{
//             rotate: [0, 10, -10, 0],
//             y: [0, -5, 0]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           variants={fadeInUp}
//         >
//           🚧
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Blogs;

"use client";
import React from "react";
import "./blogs.css";
import { motion } from "framer-motion";
import Link from "next/link";

const Blogs = () => {
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
    <div className="under-construction-container">
      <motion.div 
        className="content-wrapper"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 className="title" variants={fadeInUp}>
          Our Blogs Are Coming Soon
        </motion.h1>
        
        <motion.p className="description" variants={fadeInUp}>
          We are working hard to bring you insightful and engaging content about fireplaces, 
          home heating solutions, and maintenance tips. Check back soon for our first articles!
        </motion.p>
        
        <motion.div className="button-group" variants={fadeInUp}>
          <Link href="/" passHref legacyBehavior>
            <motion.button
              className="home-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Home
            </motion.button>
          </Link>
          
          <Link href="/contact" passHref legacyBehavior>
            <motion.button
              className="contact-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
        
        {/* <motion.div 
          className="construction-icon"
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          variants={fadeInUp}
        >
          🚧
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default Blogs;