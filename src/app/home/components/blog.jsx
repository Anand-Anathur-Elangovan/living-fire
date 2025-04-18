// import React from "react";
// import Picture from "@/public/assets/homePage/Blog/pic.png";
// import Picture2 from "@/public/assets/homePage/Blog/pic2.png";
// import Image from "next/image";

// const Blog = () => {
//   return (
//     <div className="flex relative justify-center flex-col gap-10 mb-40">
//       <div className="flex flex-row items-center w-full mb-4">
//         <div className="heading1 flex w-full justify-center">Blog</div>
//       </div>
//       <div className="w-full h-[600px] flex flex-row gap-9 pl-16 pb-10">
//         <div className="w-1/2 h-[505px] ">
//           <Image
//             src={Picture}
//             alt="Picture1"
//             className="w-full h-[505px] object-cover"
//             unoptimized
//           />
//         </div>
//         <div className="w-1/2 h-[505px] pr-16 flex items-start flex-col justify-between">
//           <div className="w-full h-[294px] flex flex-row gap-4">
//             <Image
//               src={Picture2}
//               alt="Picture2"
//               className="w-[242px] h-[294px] object-cover"
//               unoptimized
//             />
//             <div className="flex justify-end flex-col gap-2">
//               <span className="font-sans font-extralight leading-6 text-lg uppercase text-wrap">
//                 Wood, Gas, and Electric Fireplaces:
//                 <br />
//                 What’s Right for You?
//               </span>
//               <p className="font-sans font-light leading-5 text-sm text-black line-clamp-3">
//                 Each type of fireplace offers its own unique advantages, from
//                 the traditional charm of wood to the convenience of gas and the
//                 versatility of electric. This guide helps you navigate the pros
//                 and cons of each option, ensuring you make an informed decision
//                 that suits your lifestyle and home. Let us help you find the
//                 perfect fireplace to create the ideal ambiance.
//               </p>
//               <a className="uppercase font-medium font-sans text-base underline">
//                 Read More
//               </a>
//             </div>
//           </div>
//           <div className="flex">
//             <div className="w-[242px] flex justify-end flex-col gap-2">
//               <span className="font-sans font-extralight leading-6 text-lg uppercase text-wrap">
//                 Maximising Energy Efficiency with Your Fireplace
//               </span>
//               <p className="font-sans font-light leading-5 text-sm text-black line-clamp-3">
//                 A well-chosen fireplace not only enhances your home’s beauty but
//                 can also improve its energy efficiency. Learn how to select a
//                 fireplace that offers optimal heat output and efficiency,
//                 reducing your energy bills while keeping your home cozy. Our
//                 tips will guide you in making a choice that’s both stylish and
//                 sustainable.
//               </p>
//               <a className="uppercase font-medium font-sans text-base underline">
//                 Read More
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;

import React from "react";
import Picture from "@/public/assets/homePage/Blog/pic.png";
import Picture2 from "@/public/assets/homePage/Blog/pic2.png";
import Image from "next/image";

const Blog = () => {
  return (
    <div className="flex relative justify-center flex-col gap-6 md:gap-10 mb-20 md:mb-40 px-4 sm:px-6 md:pl-16">
      <div className="flex flex-row items-center w-full mb-2 md:mb-4">
        <div className="heading1 flex w-full justify-center text-3xl md:text-4xl lg:text-5xl">Blog</div>
      </div>
      <div className="w-full h-auto md:h-[600px] flex flex-col md:flex-row gap-6 md:gap-9 pb-6 md:pb-10">
        {/* Main Image - Full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[505px]">
          <Image
            src={Picture}
            alt="Picture1"
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        
        {/* Content Section - Full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 h-auto md:h-[505px] pr-0 md:pr-16 flex flex-col md:items-start gap-6 md:gap-0 md:justify-between">
          {/* First Blog Post */}
          <div className="w-full h-auto md:h-[294px] flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-[242px] h-[200px] sm:h-[294px]">
              <Image
                src={Picture2}
                alt="Picture2"
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div className="flex justify-end flex-col gap-2 w-full">
              <span className="font-sans font-extralight leading-6 text-base sm:text-lg uppercase">
                Wood, Gas, and Electric Fireplaces:
                <br />
                Whats Right for You?
              </span>
              <p className="font-sans font-light leading-5 text-xs sm:text-sm text-black line-clamp-3">
                Each type of fireplace offers its own unique advantages, from
                the traditional charm of wood to the convenience of gas and the
                versatility of electric. This guide helps you navigate the pros
                and cons of each option, ensuring you make an informed decision
                that suits your lifestyle and home. Let us help you find the
                perfect fireplace to create the ideal ambiance.
              </p>
              <a className="uppercase font-medium font-sans text-sm sm:text-base underline">
                Read More
              </a>
            </div>
          </div>
          
          {/* Second Blog Post */}
          <div className="flex w-full">
            <div className="w-full sm:w-[242px] flex justify-end flex-col gap-2">
              <span className="font-sans font-extralight leading-6 text-base sm:text-lg uppercase">
                Maximising Energy Efficiency with Your Fireplace
              </span>
              <p className="font-sans font-light leading-5 text-xs sm:text-sm text-black line-clamp-3">
                A well-chosen fireplace not only enhances your homes beauty but
                can also improve its energy efficiency. Learn how to select a
                fireplace that offers optimal heat output and efficiency,
                reducing your energy bills while keeping your home cozy. Our
                tips will guide you in making a choice thats both stylish and
                sustainable.
              </p>
              <a className="uppercase font-medium font-sans text-sm sm:text-base underline">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;