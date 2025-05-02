// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import dynamic from 'next/dynamic';
// import "./testimonials.css";

// const Testimonials = (props) => {
//   const content = [
//     {
//       body: "Living Fire is our go-to supplier for all our fireplace needs. Service is always impeccable, with thorough product knowledge and followup service. We highly recommend them as a premium source of contemporary, classic and traditional fireplaces.",
//       title: "J RAPHAEL",
//     },
//     {
//       body: "Living Fire provides the most superb quality fireplaces! Their expert staff are courteous and helpful: nothing is too much trouble. I am now enjoying my beautiful Quadro Tunnel that they supplied and installed for my newly-renovated Victorian house in inner-Melbourne.",
//       title: "S HAYES",
//     },
//     {
//       body: "As a professional Interior Designer, I have over the years specified Living Fire's beautiful range of stylish projects for numerous projects. The staff have always been professional and I would highly recommend their products for any project.",
//       title: "A NEWMAN",
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     className: "flex gap-4",
//     autoplay: false,
//     autoplaySpeed: 5000,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         }
//       }
//     ]
//   };
//   return (
//     <div className="flex relative justify-center flex-col p-2">
//   <div className="flex flex-row items-center w-full py-4">
//     <div className="heading1 flex w-full justify-center text-[26px] md:text-[40px] lg:text-[40px]">
//       Experience the Difference
//     </div>
//   </div>
//   <div className="slider-container px-4 md:px-20 lg:px-60 py-4 h-auto md:h-[300px]">
//     <Slider {...settings}>
//       {content.map((item, index) => (
//         <div className="px-2" key={index}>
//           <div
//             className="relative flex flex-row w-full md:w-[500px] px-4 py-4 ml-auto mr-auto before:content-['\201c'] before:text-[80px] md:before:text-[120px] lg:before:text-[200px] before:absolute before:z-10 before:top-[-30px] md:before:top-[-50px] lg:before:top-[-70px] before:left-[0px] before:text-[#94999F]"
//             key={index}
//           >
//             <div
//               className="font-sans flex pl-8 md:pl-16 pr-4 py-4 flex-col justify-around"
//               key={index}
//             >
//               <p className="font-light leading-5 text-sm">{item.body}</p>
//               <h3 className="font-extralight leading-5 text-lg mt-4 md:mt-8 text-black">
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   </div>
// </div>
//   );
// };

// export default Testimonials;

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import "./testimonials.css";

// Dynamically import react-slick with CSS (only loads when component is in viewport)
const Slider = dynamic(
  () => {
    import('slick-carousel/slick/slick.css');
    import('slick-carousel/slick/slick-theme.css');
    return import('react-slick');
  },
  { 
    ssr: false,
    loading: () => <div className="h-[300px] flex items-center justify-center">Loading testimonials...</div>
  }
);

const Testimonials = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const content = [
    {
      id: 1,
      body: "Living Fire is our go-to supplier for all our fireplace needs. Service is always impeccable, with thorough product knowledge and followup service. We highly recommend them as a premium source of contemporary, classic and traditional fireplaces.",
      author: "J RAPHAEL",
    },
    {
      id: 2,
      body: "Living Fire provides the most superb quality fireplaces! Their expert staff are courteous and helpful: nothing is too much trouble. I am now enjoying my beautiful Quadro Tunnel that they supplied and installed for my newly-renovated Victorian house in inner-Melbourne.",
      author: "S HAYES",
    },
    {
      id: 3,
      body: "As a professional Interior Designer, I have over the years specified Living Fire's beautiful range of stylish projects for numerous projects. The staff have always been professional and I would highly recommend their products for any project.",
      author: "A NEWMAN",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "flex gap-4",
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
    pauseOnHover: true,
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

  if (!isMounted) {
    return (
      <div className="flex relative justify-center flex-col p-2 min-h-[300px]">
        <div className="heading1 text-center text-[26px] md:text-[40px] py-4">
          Experience the Difference
        </div>
        <div className="flex items-center justify-center">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <section aria-labelledby="testimonials-heading" className="flex relative justify-center flex-col p-2">
      <div className="flex flex-row items-center w-full py-4">
        <h2 id="testimonials-heading" className="heading1 flex w-full justify-center text-[26px] md:text-[40px]">
          Experience the Difference
        </h2>
      </div>
      
      <div className="slider-container px-4 md:px-20 lg:px-60 py-4 h-auto md:h-[300px]">
        {isMounted && (
          <Slider {...settings}>
            {content.map((item) => (
              <div key={item.id} className="px-2 focus:outline-none">
                <blockquote 
                  className="relative flex flex-row w-full md:w-[500px] px-4 py-4 mx-auto before:content-['\201c'] before:text-[80px] md:before:text-[120px] before:absolute before:z-10 before:top-[-30px] md:before:top-[-50px] before:left-0 before:text-[#94999F]"
                  aria-labelledby={`testimonial-${item.id}-body testimonial-${item.id}-author`}
                >
                  <div className="font-sans flex pl-8 md:pl-16 pr-4 py-4 flex-col justify-around">
                    <p id={`testimonial-${item.id}-body`} className="font-light leading-5 text-sm">
                      {item.body}
                    </p>
                    <cite id={`testimonial-${item.id}-author`} className="font-extralight leading-5 text-lg mt-4 md:mt-8 text-black not-italic">
                      - {item.author}
                    </cite>
                  </div>
                </blockquote>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default React.memo(Testimonials);
