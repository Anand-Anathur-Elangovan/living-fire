"use client";
import "../product.css";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroImage = ({ src, alt }) => {
  // Check if src is an array and has more than one image

  const images =
    Array.isArray(src) && src.length > 1
      ? src
      : [
          { value: src?.[0]?.value },
          { value: src?.[0]?.value },
          { value: src?.[0]?.value },
        ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
  };
  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {images?.map((imageSrc, index) => (
          <div key={index} className="slider-image">
            <Image
              src={imageSrc?.value !== "TBC" ? imageSrc?.value : ""}
              alt={`${alt} ${index + 1}`}
              className="class-hero-image-size"
              layout="responsive"
              width={700}
              height={600}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroImage;

// "use client";
// import "../product.css";
// import Image from "next/image";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const HeroImage = ({ src, alt }) => {
//   const images =
//     Array.isArray(src) && src.length > 1
//       ? src
//       : [
//           { value: src?.[0]?.value },
//           { value: src?.[0]?.value },
//           { value: src?.[0]?.value },
//         ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     autoplaySpeed: 3000,
//     arrows: true,
//   };

//   return (
//     <div className="hero-slider">
//       <Slider {...settings}>
//         {images?.map((imageSrc, index) => (
//           <div key={index} className="slider-image">
//             <Image
//               src={imageSrc?.value !== "TBC" ? imageSrc?.value : ""}
//               alt={`${alt} ${index + 1}`}
//               width={700}
//               height={500}
//               // style={{ objectFit: "cover" }} // Ensures proper image scaling
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default HeroImage;
