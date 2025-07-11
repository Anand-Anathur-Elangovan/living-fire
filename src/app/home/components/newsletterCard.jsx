// import React from "react";
// import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
// const NewsletterCard = () => {
//   return (
//     <div className="flex justify-center flex-col gap-6 md:ml-20 md:mr-20 mb-20 md:mb-8 px-4 sm:px-6 md:px-[300px]">
//       <div className="bg-white p-8 md:p-10 rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] space-y-6 relative overflow-hidden">
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-90 -z-10"></div>

//         <div className="text-center space-y-4">
//           <h2 className="text-[4.25rem] font-[100] font-satoru tracking-tight leading-[1.1] text-gray-900">
//             LIVING FIRE
//           </h2>
//           <p className="text-lg text-gray-600 mt-2">
//             Stay Warm and in the loop.
//           </p>
//           <p className="text-gray-500 text-sm max-w-2xl mx-auto">
//             Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
//             nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
//             volutpat.
//           </p>
//         </div>

//         <form className="space-y-4 max-w-md mx-auto">
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
//           >
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default React.memo(NewsletterCard);
import React from "react";
import homePageMainImg from "@/public/assets/homePage/homePageMainImg.png";
import Image from "next/image";

const NewsletterCard = () => {
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

            <form className="space-y-4 max-w-md mx-auto w-full">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Name*"
                    className="w-full px-3 py-2 text-sm text-white bg-transparent border border-white rounded placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white transition-all"
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
                    placeholder="Email*"
                    className="w-full px-3 py-2 text-sm text-white bg-transparent border border-white rounded placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              <button
  type="submit"
  className="max-w-[180px] w-full mx-auto border border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
>
  Submit
</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsletterCard);
