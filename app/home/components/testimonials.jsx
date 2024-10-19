import React from "react";
import Slider from "react-slick";

const Testimonials = () => {
  const content = [
    {
      body: "Living Fire is our go-to supplier for all our fireplace needs. Service is always impeccable, with thorough product knowledge and followup service. We highly recommend them as a premium source of contemporary, classic and traditional fireplaces.",
      title: "J RAPHAEL",
    },
    {
      body: "Living Fire provides the most superb quality fireplaces! Their expert staff are courteous and helpful: nothing is too much trouble. I am now enjoying my beautiful Quadro Tunnel that they supplied and installed for my newly-renovated Victorian house in inner-Melbourne.",
      title: "S HAYES",
    },
    {
      body: "As a professional Interior Designer, I have over the years specified Living Fire's beautiful range of stylish projects for numerous projects. The staff have always been professional and I would highly recommend their products for any project.",
      title: "A NEWMAN",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "flex gap-4",
    // nextArrow: <></>,
    // prevArrow: <></>,
  };
  return (
    <div className="flex relative justify-center flex-col p-2">
      <div className="flex flex-row items-center w-full py-4">
        <div className="heading1 flex w-full justify-center uppercase">
          Experience The Difference
        </div>
      </div>
      <div className="slider-container px-60 py-4 h-[300px]">
        <Slider {...settings}>
          {content.map((item, index) => (
            <div className="" key={index}>
              <div
                className="relative flex flex-row w-[500px] px-4 py-4 ml-auto mr-auto before:content-['\201c'] before:text-[200px] before:absolute before:z-10 before:top-[-70px] before:left-[0px]"
                key={index}
              >
                <div
                  className="font-sans flex pl-16 pr-4 py-4 flex-col justify-around"
                  key={index}
                >
                  <p className="font-lignt leading-5 text-base text-justify">
                    {item.body}
                  </p>
                  <h3 className="font-medium leading-5 text-base">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* <div className="grid grid-flow-col auto-cols-[23%] gap-1 overflow-x-auto overscroll-x-contain feature-snaps before:px-1">
        {content.map((item, index) => (
          <div className="flex flex-row" key={index}>
            <div>
              <span
                className="font-normal text-[200px]"
                style={{ fontFamily: "Wasgaten" }}
              >
                "
              </span>
            </div>
            <div className="font-sans  text-left uppercase" key={index}>
              <p className=" font-small leading-5 text-sm text-gray-400">
                {item.body}
              </p>
              <h3 className="font-medium leading-6 text-base ">{item.title}</h3>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Testimonials;
