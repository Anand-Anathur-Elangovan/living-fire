// "use client";
// import Image from "next/image";
// import Review01 from "@/public/assets/lowerArea/Review01.jpg";
// import Review02 from "@/public/assets/lowerArea/Review02.jpg";
// import Review03 from "@/public/assets/lowerArea/Review03.jpg";

// const LowerArea = () => {
//   return (
//     <div className="w-full mx-auto py-6 md:py-12">
//       {/* First Row */}
//       <div className="flex flex-col md:flex-row w-full">
//         {/* Text Container - Left (50% width) */}
//         <div className="w-full md:w-1/2 px-4 md:px-0 md:pl-[280px] 2xl:pl-[280px] flex flex-col justify-center">
//           <div style={{ paddingLeft: "350px" }}>
//             <h2 className="text-2xl md:text-2xl font-semibold mb-4">Timeless Charm</h2>
//             <div 
//               className="text-gray-700 border-t-[3px] border-black pt-4"
//               style={{ padding: "20px 150px 0 0", borderTop:"black solid 2px" }}
//             >
//               <p className="mb-6 md:mb-10">
//                 Elevate your living space with the timeless charm of a wood
//                 fireplace. Our luxury wood fireplaces offer a perfect blend of
//                 aesthetics and functionality, bringing warmth and elegance to any
//                 room.
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* Image Container - Right (50% width) */}
//         <div className="w-full md:w-1/2 order-first md:order-none">
//           <Image
//             src={Review01}
//             alt="Timeless Charm"
//             className="w-full h-auto object-cover"
//             priority
//           />
//         </div>
//       </div>

//       {/* Second Row */}
//       <div className="flex flex-col md:flex-row w-full">
//         {/* Image Container - Left (50% width) */}
//         <div className="w-full md:w-1/2">
//           <Image
//             src={Review02}
//             alt="Timeless Charm"
//             className="w-full h-auto object-cover"
//             priority
//           />
//         </div>
//         {/* Text Container - Right (50% width) */}
//         <div className="w-full md:w-1/2 px-4 md:px-0 md:pl-[280px] 2xl:pl-[280px] flex flex-col justify-center">
//           <div style={{ paddingRight: "350px" }}>
//             <h2 
//               className="text-2xl md:text-2xl font-semibold mb-4"
//               style={{ paddingLeft: "150px" }}
//             >
//               Cosy Ambiance
//             </h2>
//             <div
//               className="text-gray-700 border-t-[3px] border-black pt-4"
//               style={{
//                 padding: "20px 0 0 150px",
//                 display: "flex",
//                 flexDirection: "column",
//                 borderTop:"black solid 2px"
//               }}
//             >
//               <p className="mb-6 md:mb-10">
//                 Experience the cosy ambience and comforting warmth that only a
//                 wood fireplace can provide. Gather around the hearth with family
//                 and friends, and create lasting memories in the
//               </p>
//               <p className="mb-6 md:mb-10">
//                 Explore our selection today and find the wood fireplace that
//                 seamlessly integrates into your space, creating a cosy and
//                 inviting atmosphere. Let our luxury wood fireplaces stand as a
//                 centrepiece of luxury in your home, adding a touch of
//                 sophistication to any room.
//               </p>
//               <button className="mt-2 md:mt-4 w-fit border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition">
//                 Contact Us
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Third Row */}
//       <div className="flex flex-col md:flex-row w-full">
//         {/* Text Container - Left (50% width) */}
//         <div className="w-full md:w-1/2 px-4 md:px-0 md:pl-[280px] 2xl:pl-[280px] flex flex-col justify-center">
//           <div style={{ paddingLeft: "350px" }}>
//             <h2 className="text-2xl md:text-2xl font-semibold mb-4">
//               Quality Craftsmanship
//             </h2>
//             <div
//               className="text-gray-700 border-t-[3px] border-black-300 pt-4"
//               style={{
//                 padding: "20px 150px 0 0",
//                 display: "flex",
//                 flexDirection: "column",
//                 borderTop:"black solid 2px"
//               }}
//             >
//               <p className="mb-6 md:mb-10">
//                 Crafted with precision and attention to detail, our wood
//                 fireplaces stand as a testament to quality craftsmanship and
//                 enduring beauty. Each piece is carefully constructed using the
//                 finest materials, ensuring both durability and exquisite design.
//               </p>
//               <p className="mb-6 md:mb-10">
//                 With a variety of designs and finishes to choose from, our range
//                 caters to your unique style preferences. Whether you prefer a
//                 classic built-in fireplace or a modern statement piece, we have
//                 the perfect wood fireplace to complement your décor.
//               </p>
//             </div>
//           </div>
//         </div>
//         {/* Image Container - Right (50% width) */}
//         <div className="w-full md:w-1/2 order-first md:order-none">
//           <Image
//             src={Review03}
//             alt="Timeless Charm"
//             className="w-full h-auto object-cover"
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LowerArea;


"use client";
import Image from "next/image";
import Review01 from "@/public/assets/lowerArea/Review01.jpg";
import Review02 from "@/public/assets/lowerArea/Review02.jpg";
import Review03 from "@/public/assets/lowerArea/Review03.jpg";
import "./lowerArea.css";

const LowerArea = () => {
  return (
    <div className="lower-area-container">
      {/* First Row */}
      <div className="first-row">
        {/* Text Container - Left (50% width) */}
        <div className="text-container-left">
          <div className="text-content-left">
            <h2 className="section-title">Timeless Charm</h2>
            <div className="text-content-border">
              <p className="paragraph">
                Elevate your living space with the timeless charm of a wood
                fireplace. Our luxury wood fireplaces offer a perfect blend of
                aesthetics and functionality, bringing warmth and elegance to any
                room.
              </p>
            </div>
          </div>
        </div>
        {/* Image Container - Right (50% width) */}
        <div className="image-container-right">
          <Image
            src={Review01}
            alt="Timeless Charm"
            className="responsive-image"
            priority
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="second-row">
        {/* Image Container - Left (50% width) */}
        <div className="image-container-left">
          <Image
            src={Review02}
            alt="Timeless Charm"
            className="responsive-image"
            priority
          />
        </div>
        {/* Text Container - Right (50% width) */}
        <div className="text-container-right">
          <div className="text-content-right">
            <h2 className="section-title-right">Cosy Ambiance</h2>
            <div className="text-content-border-right">
              <p className="paragraph">
                Experience the cosy ambience and comforting warmth that only a
                wood fireplace can provide. Gather around the hearth with family
                and friends, and create lasting memories in the
              </p>
              <p className="paragraph">
                Explore our selection today and find the wood fireplace that
                seamlessly integrates into your space, creating a cosy and
                inviting atmosphere. Let our luxury wood fireplaces stand as a
                centrepiece of luxury in your home, adding a touch of
                sophistication to any room.
              </p>
              <button className="contact-button">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="third-row">
        {/* Text Container - Left (50% width) */}
        <div className="text-container-left">
          <div className="text-content-left">
            <h2 className="section-title">Quality Craftsmanship</h2>
            <div className="text-content-border">
              <p className="paragraph">
                Crafted with precision and attention to detail, our wood
                fireplaces stand as a testament to quality craftsmanship and
                enduring beauty. Each piece is carefully constructed using the
                finest materials, ensuring both durability and exquisite design.
              </p>
              <p className="paragraph">
                With a variety of designs and finishes to choose from, our range
                caters to your unique style preferences. Whether you prefer a
                classic built-in fireplace or a modern statement piece, we have
                the perfect wood fireplace to complement your décor.
              </p>
            </div>
          </div>
        </div>
        {/* Image Container - Right (50% width) */}
        <div className="image-container-right">
          <Image
            src={Review03}
            alt="Timeless Charm"
            className="responsive-image"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LowerArea;