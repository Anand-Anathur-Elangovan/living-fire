import React from "react";
import Slider from "react-slick";
import "./testimonials.css";

const Testimonials = (props) => {
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
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   className: "flex gap-4",
  //   autoplay: false,
  //   autoplaySpeed: 5000,
  //   arrows: false,
  // };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "flex gap-4",
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    <div className="flex relative justify-center flex-col p-2">
  <div className="flex flex-row items-center w-full py-4">
    <div className="heading1 flex w-full justify-center text-[26px] md:text-[40px] lg:text-[40px]">
      Experience the Difference
    </div>
  </div>
  <div className="slider-container px-4 md:px-20 lg:px-60 py-4 h-auto md:h-[300px]">
    <Slider {...settings}>
      {content.map((item, index) => (
        <div className="px-2" key={index}>
          <div
            className="relative flex flex-row w-full md:w-[500px] px-4 py-4 ml-auto mr-auto before:content-['\201c'] before:text-[80px] md:before:text-[120px] lg:before:text-[200px] before:absolute before:z-10 before:top-[-30px] md:before:top-[-50px] lg:before:top-[-70px] before:left-[0px] before:text-[#94999F]"
            key={index}
          >
            <div
              className="font-sans flex pl-8 md:pl-16 pr-4 py-4 flex-col justify-around"
              key={index}
            >
              <p className="font-light leading-5 text-sm">{item.body}</p>
              <h3 className="font-extralight leading-5 text-lg mt-4 md:mt-8 text-black">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>
    // <div className="flex relative justify-center flex-col p-2">
    //   <div className="flex flex-row items-center w-full py-4">
    //     <div className="heading1 flex w-full justify-center text-[26px] md:text-[40px]">
    //       Experience the Difference
    //     </div>
    //   </div>
    //   <div className="slider-container px-60 py-4 h-[300px]">
    //     <Slider {...settings}>
    //       {content.map((item, index) => (
    //         <div className="" key={index}>
    //           <div
    //             className="relative flex flex-row w-[500px] px-4 py-4 ml-auto mr-auto before:content-['\201c'] before:text-[200px] before:absolute before:z-10 before:top-[-70px] before:left-[0px] before:text-[#94999F]"
    //             key={index}
    //           >
    //             <div
    //               className="font-sans flex pl-16 pr-4 py-4 flex-col justify-around"
    //               key={index}
    //             >
    //               <p className="font-light leading-5 text-sm">{item.body}</p>
    //               <h3 className="font-extralight leading-5 text-lg mt-8 text-black">
    //                 {item.title}
    //               </h3>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </Slider>
    //   </div>
    // </div>
  );
};

export default Testimonials;
