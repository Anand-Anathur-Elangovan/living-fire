// // export default React.memo(NewsletterCard);
// import React from "react";
// import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
// import Image from "next/image";

// const NewsletterCard = () => {
//   return (
//     <div className="relative w-full">
//       {/* Hero image background */}
//       <div className="absolute inset-0 w-full h-full">
//         <Image
//           src={homePageMainImg}
//           alt="Newsletter background"
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//           placeholder="blur"
//         />
//       </div>

//       {/* Semi-transparent overlay */}
//       <div className="relative flex justify-center items-center min-h-[700px] py-20 px-4 sm:px-6">
//         <div className="bg-black bg-opacity-80 p-8 max-w-2xl w-full mx-4">
//           <div className="text-center space-y-6">
//             <h2 className="text-white text-2xl md:text-3xl font-semibold">
//               Stay Warm and in the loop.
//             </h2>

//             <p className="text-gray-300 text-sm max-w-[600px] mx-auto">
//               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
//               nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
//               erat volutpat.
//             </p>

//             <form className="space-y-4 max-w-md mx-auto w-full">
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="sr-only">
//                     Name
//                   </label>
//                   <input
//                     id="name"
//                     type="text"
//                     required
//                     placeholder="Name*"
//                     className="w-full px-3 py-2 text-sm text-white bg-transparent border border-white rounded placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="sr-only">
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     required
//                     placeholder="Email*"
//                     className="w-full px-3 py-2 text-sm text-white bg-transparent border border-white rounded placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white transition-all"
//                   />
//                 </div>
//               </div>

//               <button
//   type="submit"
//   className="max-w-[180px] w-full mx-auto border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
// >
//   Submit
// </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(NewsletterCard);

"use client";
import React, { useState } from "react";
import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
import Image from "next/image";

const NewsletterCard = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: "Newsletter Subscription",
          product: "Newsletter",
          ...formData,
          phone: "",
          message: ""
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          userName: "",
          email: ""
        });
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        alert("There was an issue with your subscription.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your subscription.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  return (
    <div className="relative w-full">
      {/* Hero image background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={homePageMainImg}
          alt="Newsletter background"
          layout="fill"
          objectFit="cover"
          quality={100}
          placeholder="blur"
        />
      </div>

      {/* Semi-transparent overlay */}
      <div className="relative flex justify-center items-center min-h-[700px] py-20 px-4 sm:px-6">
        <div className="bg-black bg-opacity-80 p-8 max-w-2xl w-full mx-4">
          <div className="text-center space-y-6">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">
              Stay Warm and in the loop.
            </h2>

            <p className="text-gray-300 text-sm max-w-[600px] mx-auto">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto w-full">
              <div className="space-y-4">
                <div>
                  <label htmlFor="userName" className="sr-only">
                    Name
                  </label>
                  <input
                    id="userName"
                    type="text"
                    required
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Name*"
                    className="w-full px-3 py-2 text-sm text-white bg-transparent border border-white rounded placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    className="w-full px-3 py-2 text-sm text-white bg-transparent border border-white rounded placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="max-w-[180px] w-full mx-auto border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              {/* Modern success notification */}
              {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4 animate-fade-in">
                    <div className="flex flex-col items-center">
                      <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Subscribed Successfully!</h3>
                      <p className="text-sm text-gray-500 text-center">
                        Thank you for joining our newsletter. Stay tuned for updates!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsletterCard);
