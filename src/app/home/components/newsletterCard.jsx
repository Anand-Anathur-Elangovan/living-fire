import React from "react";
import Image from "next/image";
import ourwood1 from "@/public/assets/ourStory/1.jpg";
import ourwood2 from "@/public/assets/ourStory/2.jpg";
import ourwood3 from "@/public/assets/ourStory/3.jpg";

const NewsletterCard = () => {
  // Replace these with your actual image imports
  // const images = [
  //   "@/public/assets/ourStory/1.jpg",
  //   "@/public/assets/ourStory/2.jpg",
  //   "@/public/assets/ourStory/2.jpg"
  // ];

  return (
    <div className="max-w-6xl mx-auto p-4 mb-16">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image Gallery */}
        <div className="md:w-1/2 flex flex-col md:flex-row">
          {/* Main Image */}
          <div className="md:w-2/3 h-64 md:h-auto">
            <Image
              src={ourwood1}
              alt="Fireplace"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          
          {/* Side Images */}
          <div className="md:w-1/3 flex flex-col">
            <div className="h-1/2 border-b border-white">
              <Image
                src={ourwood2}
                alt="Fireplace"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-1/2">
              <Image
                src={ourwood3}
                alt="Fireplace"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-white">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">LIVING FIRE</h2>
            <p className="text-lg text-gray-600 mb-4">
              Stay Warm and in the loop.
            </p>
            <p className="text-gray-500 mb-6">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.
            </p>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default React.memo(NewsletterCard);