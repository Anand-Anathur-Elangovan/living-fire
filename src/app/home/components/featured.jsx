import React from "react";

import collectionImg1 from "@/public/assets/homePage/collections/collectionsImg1.svg";
import collectionImg2 from "@/public/assets/homePage/collections/collectionsImg2.svg";
import collectionImg3 from "@/public/assets/homePage/collections/collectionsImg3.svg";
import collectionImg4 from "@/public/assets/homePage/collections/collectionsImg4.svg";
import Image from "next/image";

const Featured = (props) => {
  const carouselItems = [
    {
      image: collectionImg1,
      title: "775 Wood Heater",
      description: "ESSE",
    },
    {
      image: collectionImg2,
      title: "Ilektro 2000 Landscape",
      description: "Paul Agnew Designs",
    },
    {
      image: collectionImg3,
      title: "Loxton 5 Standard Fireplace",
      description: "EUROSTOVE",
    },
    {
      image: collectionImg1,
      title: "775 Wood Heater",
      description: "ESSE",
    },
    {
      image: collectionImg1,
      title: "775 Wood Heater",
      description: "ESSE",
    },
    {
      image: collectionImg1,
      title: "775 Wood Heater",
      description: "ESSE",
    },
  ];
  return (
    <div className="flex relative justify-center flex-col">
      <div className="flex flex-row items-center w-full mb-4">
        <div className="heading1 flex w-full justify-center uppercase">
          Featured
        </div>
      </div>

      <div className="grid grid-flow-col auto-cols-[23%] gap-1 overflow-x-auto overscroll-x-contain feature-snaps before:px-1">
        {carouselItems.map((item, index) => (
          <div key={"featured" + index}>
            <Image
              src={item.image}
              alt={item.title}
              className=""
              key={index}
              //width={323} // specify your desired width
              //height={323} // specify your desired height
              //   layout="fill" // or any other layout you need
            />
            <div className="font-sans  text-left uppercase">
              <h3 className="font-medium leading-6 text-base ">{item.title}</h3>
              <p className=" font-small leading-5 text-sm text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
