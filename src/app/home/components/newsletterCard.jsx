// import React from "react";
// import Image from "next/image";
// import ourwood1 from "@/public/assets/ourStory/1.jpg";
// import ourwood2 from "@/public/assets/ourStory/2.jpg";
// import ourwood3 from "@/public/assets/ourStory/3.jpg";

// const NewsletterCard = () => {
//   // Replace these with your actual image imports
//   // const images = [
//   //   "@/public/assets/ourStory/1.jpg",
//   //   "@/public/assets/ourStory/2.jpg",
//   //   "@/public/assets/ourStory/2.jpg"
//   // ];

//   return (
//     <div className="max-w-6xl mx-auto p-4 mb-16">
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
//         {/* Left Side - Image Gallery */}
//         <div className="md:w-1/2 flex flex-col md:flex-row">
//           {/* Main Image */}
//           <div className="md:w-2/3 h-64 md:h-auto">
//             <Image
//               src={ourwood1}
//               alt="Fireplace"
//               width={600}
//               height={400}
//               className="w-full h-full object-cover"
//               priority
//             />
//           </div>
          
//           {/* Side Images */}
//           <div className="md:w-1/3 flex flex-col">
//             <div className="h-1/2 border-b border-white">
//               <Image
//                 src={ourwood2}
//                 alt="Fireplace"
//                 width={300}
//                 height={200}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="h-1/2">
//               <Image
//                 src={ourwood3}
//                 alt="Fireplace"
//                 width={300}
//                 height={200}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Content */}
//         <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
//           <div className="mb-6">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">LIVING FIRE</h2>
//             <p className="text-lg text-gray-600 mb-4">
//               Stay Warm and in the loop.
//             </p>
//             <p className="text-gray-500 mb-6">
//               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
//               nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
//               erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.
//             </p>
//           </div>

//           <form className="space-y-4">
//             <div className="flex flex-col space-y-4">
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 transition duration-300 shadow-md hover:shadow-lg"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default React.memo(NewsletterCard);


// import React from "react";

// const NewsletterCard = () => {
//   return (
//     <div className="max-w-2xl mx-auto p-4 mb-16 text-center">
//       <div className="space-y-6">
//         <div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-3">LIVING FIRE</h2>
//           <p className="text-xl text-gray-600 mb-4">
//             Stay Warm and in the loop.
//           </p>
//           <p className="text-gray-500">
//             Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
//             nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
//             erat volutpat.
//           </p>
//         </div>

//         <form className="space-y-4">
//           <div className="flex flex-col space-y-4 max-w-md mx-auto">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-white text-gray-900"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-white text-gray-900"
//             />
//           </div>
//           <button
//             type="submit"
//             className="max-w-md mx-auto w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 transition duration-300 rounded-md shadow-sm hover:shadow-md"
//           >
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default React.memo(NewsletterCard);

// import React from "react";

// const NewsletterCard = () => {
//   return (
//     <div className="max-w-md mx-auto p-4 mb-16">
//       <div className="bg-white p-8 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] space-y-6">
//         <div className="text-center space-y-3">
//           <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
//             LIVING FIRE
//           </h2>
//           <p className="text-lg text-gray-600">
//             Stay Warm and in the loop.
//           </p>
//           <p className="text-gray-500 text-sm">
//             Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
//             nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
//             volutpat.
//           </p>
//         </div>

//         <form className="space-y-4">
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
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

const NewsletterCard = () => {
  return (
    <div className="flex justify-center flex-col gap-6 md:ml-20 md:mr-20 mb-20 md:mb-8 px-4 sm:px-6 md:px-[300px]">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] space-y-6 relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-90 -z-10"></div>
        
        <div className="text-center space-y-4">
          <h2 className="text-[4.25rem] font-[100] font-satoru tracking-tight leading-[1.1] text-gray-900">
            LIVING FIRE
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Stay Warm and in the loop.
          </p>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </p>
        </div>

        <form className="space-y-4 max-w-md mx-auto">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(NewsletterCard);