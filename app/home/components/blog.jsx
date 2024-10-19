import React from "react";
import Picture from "@/app/assets/homePage/Blog/pic.png";
import Picture2 from "@/app/assets/homePage/Blog/pic2.png";
import Image from "next/image";

const Blog = () => {
  return (
    <div className="flex relative justify-center flex-col">
      <div className="flex flex-row items-center w-full mb-4">
        <div className="heading1 flex w-full justify-center uppercase">
          Blog
        </div>
      </div>
      <div className="w-full h-[600px] flex flex-row gap-8 pl-16 pb-10">
        <div className="w-1/2 h-[505px] ">
          <Image
            src={Picture}
            alt="Picture1"
            className="w-full h-[505px] object-cover"
          />
        </div>
        <div className="w-1/2 h-[505px] pr-16 flex items-start flex-col justify-between">
          <div className="w-full h-[294px] flex flex-row gap-4">
            <Image
              src={Picture2}
              alt="Picture2"
              className="w-2/5 h-[294px] object-cover"
            />
            <div className="flex justify-end flex-col gap-2">
              <span className="font-sans font-medium leading-6 text-base uppercase text-wrap">
                Wood, Gas, and Electric Fireplaces: What’s Right for You?
              </span>
              <p className="font-sans font-normal leading-5 text-sm text-gray-400 line-clamp-3">
                Each type of fireplace offers its own unique advantages, from
                the traditional charm of wood to the convenience of gas and the
                versatility of electric. This guide helps you navigate the pros
                and cons of each option, ensuring you make an informed decision
                that suits your lifestyle and home. Let us help you find the
                perfect fireplace to create the ideal ambiance.
              </p>
              <a className="uppercase font-medium font-sans text-base underline">
                Read More
              </a>
            </div>
          </div>
          <div className="flex">
            <div className="w-[242px] flex justify-end flex-col gap-2">
              <span className="font-sans font-medium leading-6 text-base uppercase text-wrap">
                Maximising Energy Efficiency with Your Fireplace
              </span>
              <p className="font-sans font-normal leading-5 text-sm text-gray-400 line-clamp-3">
                A well-chosen fireplace not only enhances your home’s beauty but
                can also improve its energy efficiency. Learn how to select a
                fireplace that offers optimal heat output and efficiency,
                reducing your energy bills while keeping your home cozy. Our
                tips will guide you in making a choice that’s both stylish and
                sustainable.
              </p>
              <a className="uppercase font-medium font-sans text-base underline">
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
