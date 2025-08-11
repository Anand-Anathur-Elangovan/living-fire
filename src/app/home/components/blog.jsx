// import React from "react";
// import Picture from "@/public/assets/homePage/Blog/pic.png";
// import Picture2 from "@/public/assets/homePage/Blog/pic2.png";
// import Image from "next/image";
// import Link from "next/link";
// import { FiArrowRight } from "react-icons/fi";

// const Blog = () => {
//   return (
//     <div className="flex relative justify-center flex-col gap-6 md:ml-20 md:mr-20 md:gap-10 md:mb-20 px-4 sm:px-6 md:px-[300px]">
//       <div className="flex flex-row items-center w-full mb-2 md:mb-4">
//         {/* <Link href="/blogs" passHref> */}
//           <h2 className="heading1 flex w-full justify-center text-3xl md:text-4xl lg:text-5xl cursor-pointer">
//             News & Blogs
//           </h2>
//         {/* </Link> */}
//       </div>

//       <div className="w-full flex flex-col md:flex-row gap-8 md:gap-4 pb-6 md:pb-1">
//         <div className="w-full flex flex-col md:flex-row gap-8 md:gap-9 pb-6 md:pb-1">
//           {/* Left Section */}
//           <Link href="/blogs" passHref className="w-full md:w-[44%] flex flex-col gap-6 group">
//             <div className="group h-[280px] sm:h-[380px] md:h-[450px] relative overflow-hidden">
//               <Image
//                 src={Picture}
//                 alt="Premium European Wood, Gas, and Electric Fireplaces Melbourne"
//                 className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-300"
//                 title="Premium European Wood, Gas, and Electric Fireplaces Melbourne"
//                 loading="lazy"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 placeholder="blur"
//                 quality={85}
//               />
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
//                 <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
//                   <FiArrowRight className="text-white text-2xl" />
//                 </div>
//               </div>
//             </div>
//             <article className="flex w-full">
//               <div className="w-full flex flex-col gap-2">
//                 <h3 className="font-sans font-extralight leading-6 text-base sm:text-lg uppercase hover:underline cursor-pointer">
//                   Maximising Energy Efficiency with Your Fireplace
//                 </h3>
//                 <p className="font-sans font-light leading-5 text-xs sm:text-sm text-black line-clamp-3">
//                   A well-chosen fireplace not only enhances your homes beauty
//                   but can also improve its energy efficiency. Learn how to
//                   select a fireplace that offers optimal heat output and
//                   efficiency, reducing your energy bills while keeping your home
//                   cozy. Our tips will guide you in making a choice thats both
//                   stylish and sustainable.
//                 </p>
//               </div>
//             </article>
//           </Link>

//           {/* Right Section */}
//           <Link href="/blogs" passHref className="w-full md:w-[44%] flex flex-col gap-6 group">
//             <div className="group h-[280px] sm:h-[380px] md:h-[450px] relative overflow-hidden">
//               <Image
//                 src={Picture2}
//                 alt="Luxury European Wood, Gas, and Electric Fireplaces Melbourne"
//                 className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-300"
//                 title="Luxury European Wood, Gas, and Electric Fireplaces Melbourne"
//                 loading="lazy"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 placeholder="blur"
//                 quality={85}
//               />
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
//                 <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center">
//                   <FiArrowRight className="text-white text-2xl" />
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-between items-start gap-4">
//               <div className="flex flex-col gap-2 w-full">
//                 <h3 className="font-sans font-extralight leading-6 text-base sm:text-lg uppercase hover:underline cursor-pointer">
//                   Wood, Gas, and Electric Fireplaces: Whats Right for You?
//                 </h3>
//                 <p className="font-sans font-light leading-5 text-xs sm:text-sm text-black line-clamp-3">
//                   Each type of fireplace offers its own unique advantages, from
//                   the traditional charm of wood to the convenience of gas and
//                   the versatility of electric. This guide helps you navigate the
//                   pros and cons of each option, ensuring you make an informed
//                   decision that suits your lifestyle and home. Let us help you
//                   find the perfect fireplace to create the ideal ambiance.
//                 </p>
//               </div>
//             </div>
//           </Link>
//         </div>

//         {/* Arrow Section */}
//         <div className="hidden md:flex flex-col items-center justify-center gap-5 w-[12%] min-w-[120px]">
//           <Link
//             href="/blogs"
//             passHref
//             className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-gray-400 hover:border-gray-600 hover:bg-gray-100 transition-colors"
//             aria-label="View all blog posts"
//           >
//             <FiArrowRight className="text-3xl text-gray-700" />
//           </Link>
//           <Link href="/blogs" passHref>
//             <p className="font-sans text-[1.4rem] font-normal uppercase tracking-wider hover:underline cursor-pointer">
//               View All
//             </p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(Blog);

import React, { useState, useEffect, useRef } from "react";
import Picture from "@/public/assets/homePage/Blog/pic.png";
import Picture2 from "@/public/assets/homePage/Blog/pic2.png";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {style} from './Blogs.module.css'

const Blog = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 640);
          setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
          setIsDesktop(window.innerWidth > 1440);
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 sm:px-6 md:ml-20 md:mr-20 md:gap-10 md:mb-20"
      style={{ padding: isDesktop ? "40px clamp(120px, 17.7vw, 240px)" : "20px 45px" }}>
      {/* Header */}
      <div className="flex w-full items-center justify-center mb-2 md:mb-4">
        <h2 className="w-full text-center font-publicSans uppercase text-3xl font-normal text-black md:text-4xl lg:text-5xl">
          News & Blogs
        </h2>
      </div>

      {/* Blog Content */}
      <div className="flex w-full flex-col gap-8 pb-6 md:flex-row md:gap-4 md:pb-1">
        {/* Blog Posts */}
        <div className="flex w-full flex-col gap-8 pb-6 md:flex-row md:gap-9 md:pb-1">
          {/* Left Blog Post */}
          <Link 
            href="/blogs" 
            passHref 
            className="group flex w-full flex-col gap-6 md:w-[44%]"
          >
            <div className="relative h-[280px] overflow-hidden sm:h-[380px] md:h-[450px]">
              <Image
                src={Picture}
                alt="Premium European Wood, Gas, and Electric Fireplaces Melbourne"
                className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-50"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white">
                  <FiArrowRight className="text-2xl text-white" />
                </div>
              </div>
            </div>
            <article className="flex w-full flex-col gap-2">
              <h3 className="line-clamp-2 cursor-pointer font-sans text-base font-extralight uppercase leading-6 hover:underline sm:text-lg">
                Maximising Energy Efficiency with Your Fireplace
              </h3>
              <p className="line-clamp-3 font-sans text-xs font-light leading-5 text-black sm:text-sm">
                A well-chosen fireplace not only enhances your homes beauty
                but can also improve its energy efficiency. Learn how to
                select a fireplace that offers optimal heat output and
                efficiency, reducing your energy bills while keeping your home
                cozy. Our tips will guide you in making a choice thats both
                stylish and sustainable.
              </p>
            </article>
          </Link>

          {/* Right Blog Post */}
          <Link 
            href="/blogs" 
            passHref 
            className="group flex w-full flex-col gap-6 md:w-[44%]"
          >
            <div className="relative h-[280px] overflow-hidden sm:h-[380px] md:h-[450px]">
              <Image
                src={Picture2}
                alt="Luxury European Wood, Gas, and Electric Fireplaces Melbourne"
                className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-50"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white">
                  <FiArrowRight className="text-2xl text-white" />
                </div>
              </div>
            </div>
            <article className="flex w-full flex-col gap-2">
              <h3 className="line-clamp-2 cursor-pointer font-sans text-base font-extralight uppercase leading-6 hover:underline sm:text-lg">
                Wood, Gas, and Electric Fireplaces: Whats Right for You?
              </h3>
              <p className="line-clamp-3 font-sans text-xs font-light leading-5 text-black sm:text-sm">
                Each type of fireplace offers its own unique advantages, from
                the traditional charm of wood to the convenience of gas and
                the versatility of electric. This guide helps you navigate the
                pros and cons of each option, ensuring you make an informed
                decision that suits your lifestyle and home. Let us help you
                find the perfect fireplace to create the ideal ambiance.
              </p>
            </article>
          </Link>
        </div>

        {/* View All Section */}
        <div className="hidden md:flex md:w-[12%] md:min-w-[120px] md:flex-col md:items-center md:justify-center md:gap-5">
          <Link
            href="/blogs"
            passHref
            className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-400 transition-colors hover:border-gray-600 hover:bg-gray-100"
            aria-label="View all blog posts"
          >
            <FiArrowRight className="text-3xl text-gray-700" />
          </Link>
          <Link href="/blogs" passHref>
            <p className="cursor-pointer font-sans text-[1.4rem] font-normal uppercase tracking-wider hover:underline">
              View All
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Blog);