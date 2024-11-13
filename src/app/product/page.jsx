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
import EnquiryFormModal from "./components/enquiryFormModal/EnquiryFormModal";

const Product = () => {
  const [productData, setProductData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
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
    brand_name,
    product_details,
    specifications,
  } = productData;
  console.log("productData", productData);
  return (
    <section>
      <div className="stackview">
        <HeroImage
          src={JSON.parse(hero_image?.replace(/'/g, '"'))}
          alt="Product Hero Image"
        />
        <DescriptionColumn product_desc={product_desc} />
        <ProductOptions
          short_desc={short_desc}
          name={name}
          price={price}
          brand_name={brand_name}
          openModal={openModal}
        />
        <MaterialFinishOptions product_desc={product_desc} />
        <Specifications specifications={specifications} />
        <DownloadSection product_details={product_details} />
        <OurDifference />
        <OurShowrooms />
        <EnquiryFormModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </section>
  );
};

export default Product;
