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

const Product = () => {
  const [productData, setProductData] = useState(null);
  const { data } = useProductPage();
  console.log("Product data", data);
  useEffect(() => {
    // Fetch data from API
    fetch("/api/check")
      .then((res) => res.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  if (!productData) return <p>Loading...</p>;

  const { heroImage, descriptions, packages, materials, deliveries, pricing } =
    productData;

  return (
    <section>
      <div className="stackview">
        <HeroImage src={heroImage.src} alt={heroImage.alt} />

        <div className="desc-column">
          {descriptions.map((desc, index) => (
            <DescriptionSection
              key={index}
              title={desc.title}
              text={desc.text}
            />
          ))}
        </div>

        <div className="stack-section">
          <div className="column">
            <div className="columnregency">
              <p className="regency ui text size-h6">Regency</p>
              <p className="gfing ui text size-h1">GFi750 – NG</p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
