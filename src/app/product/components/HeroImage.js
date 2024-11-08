"use client";
import "../product.css";
import Image from "next/image";

const HeroImage = ({ src, alt }) => (
  <div className="hero-slider">
    <Image
      src={src}
      alt={alt}
      className="class-2022ausgfi750"
      layout="responsive"
      width={700}
      height={500}
    />
  </div>
);

export default HeroImage;
