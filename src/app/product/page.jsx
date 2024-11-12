"use client";
import HeroImage from "./components/HeroImage";
import DescriptionSection from "./components/DescriptionSection";
import PackageOption from "./components/PackageOption";
import MaterialOption from "./components/MaterialOption";
import DeliveryOption from "./components/DeliveryOption";
import PricingInfo from "./components/PricingInfo";
import ActionButtons from "./components/ActionButtons";
import { useEffect, useState } from "react";
import "./product.css";
import useProductPage from "./hooks/useProductPage";
import ProductOptions from "./components/productOptions/ProductOptions";
import DescriptionColumn from "./components/descriptionColumn/DescriptionColumn";
import MaterialFinishOptions from "./components/materialFinishOptions/MaterialFinishOptions";
import Specifications from "./components/specifications/Specifications";
import DownloadSection from "./components/downloadSection/DownloadSection";
import OurDifference from "../allProducts/components/ourDifference";
import OurShowrooms from "../allProducts/components/ourShowrooms";
import Breadcrumbs from "./components/Breadcrumbs";

const Product = () => {
  const [productData, setProductData] = useState(null);
  let { data } = useProductPage();
  useEffect(() => {
    // Fetch data from API
    // fetch("/api/check")
    //   .then((res) => res.json())
    //   .then((data) => setProductData(data))
    //   .catch((error) => console.error("Error fetching product data:", error));
    console.log("data Product page", data);
    setProductData(data?.product?.[0]?.fn_get_product_page);
  }, [data]);

  if (!productData) return <p>Loading...</p>;

  const {
    hero_image,
    product_desc,
    short_desc,
    name,
    price,
    ptype_name,fueltype_name,brand_name
    //  descriptions, packages, materials, deliveries, pricing
  } = productData;
  const materials = [
    {
      imgSrc: "",
      value: "",
      description: "Reflective Black Inner Panels",
      imgSrc: "",
      value: "",
      description: "3-Sided Black Backing Plate",
      imgSrc: "",
      value: "",
      description: "Metallic Black Inner Panels",
    },
  ];
  console.log("productData", productData);
  return (
    <section>
      <div className="stackview">
      <Breadcrumbs productType={ptype_name} fuelType={fueltype_name} productName={name}  brandName={brand_name} />
      {/* <br/> */}
        <HeroImage
          src={JSON.parse(hero_image?.replace(/'/g, '"'))}
          alt="Product Hero Image"
        />
        <DescriptionColumn product_desc={product_desc} />
        <ProductOptions short_desc={short_desc} name={name} price={price} />
        <MaterialFinishOptions product_desc={product_desc} />
        <Specifications />
        <DownloadSection />
        <OurDifference />
        <OurShowrooms />
      </div>
    </section>
  );
};

export default Product;
