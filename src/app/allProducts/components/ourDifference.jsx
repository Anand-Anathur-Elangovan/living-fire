"use client";
import React from "react";

const OurDifference = () => {
  return (
    <div className="flex flex-col md:flex-row w-full px-8 py-10 gap-4 md:pr-20 md:pl-16 md:py-10 md:gap-32">
      <div className="flex flex-col gap-3">
        <div className="uppercase font-[Satoru] font-normal md:font-medium leading-[30.8px] md:leading-9 text-[22px] md:text-3xl">
          Explore Our Full Range of Fireplaces and Accessories
        </div>
        <div className="font-sans font-normal text-justify break-normal md:leading-5 text-xs md:text-sm">
          At Living Fire, we offer an extensive selection of premium fireplaces,
          heaters, and accessories. Whether you&apos;re looking for a gas, wood,
          or electric fireplace, our range has been carefully curated to meet
          the diverse needs of Australian homes. Our products are sourced from
          leading European and local brands, ensuring every fireplace not only
          provides warmth but enhances the style of your home.
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-sans font-normal text-justify break-normal md:leading-5 text-xs md:text-sm">
          Browse through our collection of fireplaces designed to suit various
          room sizes and layouts, from open-plan living spaces to cosy lounge
          areas. Each fireplace is crafted with the latest technology to offer
          optimal heating efficiency and stunning flame visuals, perfect for
          creating a comforting atmosphere in your home.
        </div>
        <div className="font-sans font-normal text-justify break-normal md:leading-5 text-xs md:text-sm">
          We also stock a range of fireplace accessories, from mantels to fire
          screens and tools, ensuring your fireplace is not only functional but
          a statement piece that reflects your personal style. Explore Living
          Fire&apos;s collection and find the perfect heating solution for your
          home.
        </div>
      </div>
    </div>
  );
};

export default OurDifference;
