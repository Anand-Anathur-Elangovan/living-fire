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

const Product = () => {
  const [productData, setProductData] = useState(null);
  let { data } = useProductPage();
  useEffect(() => {
    // Fetch data from API
    // fetch("/api/check")
    //   .then((res) => res.json())
    //   .then((data) => setProductData(data))
    //   .catch((error) => console.error("Error fetching product data:", error));
    console.log("data Product page", data)
    setProductData(data?.product?.[0]?.
      fn_get_product_page);
  }, [data]);

  if (!productData) return <p>Loading...</p>;

  const {
    hero_image,
    brand_name,
    name,
    //  descriptions, packages, materials, deliveries, pricing
  } = productData;
  console.log("productData", productData, JSON.parse(hero_image?.replace(/'/g, '"')));
  return (
    <section>
      <div className="stackview">
        <HeroImage src={JSON.parse(hero_image?.replace(/'/g, '"'))?.[0]?.value} alt="Product Hero Image" />

        <div className="desc-column">
          <DescriptionColumn />
          {/* {descriptions.map((desc, index) => (
            <DescriptionSection
              key={index}
              title={desc.title}
              text={desc.text}
            />
          ))} */}
        </div>

        <div className="stack-section">
          <ProductOptions />
          {/* <div className="column">
            <div className="columnregency">
              <p className="regency ui text size-h6">{brand_name}</p>
              <p className="gfing ui text size-h1">{name}</p>
            </div>
            <p className="buildyour ui text size-h5">Build your product</p>

            {packages.map((pkg, index) => (
              <PackageOption
                key={index}
                label={pkg.label}
                value={pkg.value}
                description={pkg.description}
              />
            ))}

            <MaterialOption options={materials} />

            <DeliveryOption options={deliveries} />

            <PricingInfo
              price={pricing.price}
              stockStatus={pricing.stockStatus}
            />

            <ActionButtons />
          </div> */}
        </div>

      </div>
    </section>
  );
};

export default Product;
