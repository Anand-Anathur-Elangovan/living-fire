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
import OurDifference from "../../allProducts/components/ourDifference";
import OurShowrooms from "../../allProducts/components/ourShowrooms";
import Breadcrumbs from "./components/Breadcrumbs";
import EnquiryFormModal from "./components/enquiryFormModal/EnquiryFormModal";
import ProductSpecsDrawer from "./components/productSpecsDrawer/ProductSpecsDrawer";
import Featured from "../../home/components/featured";
import { useNavigationState } from "@/context/NavigationContext";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { setCookie } from "cookies-next";
import Loader from "@/src/helper/loader/Loader";

const Product = ({ params }) => {
  const router = useRouter();
  const productId = getCookie("selectedProductId");
  // const { getNavigationState } = useNavigationState();
  const [productData, setProductData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [isOpenSpecDrawer, setIsOpenSpecDrawer] = useState(false);

  const openDrawer = () => setIsOpenSpecDrawer(true);
  const closeDrawer = () => setIsOpenSpecDrawer(false);
  // const state = getNavigationState();
  let { data } = useProductPage(params.id);

  useEffect(() => {
    // Fetch data from API
    // fetch("/api/check")
    //   .then((res) => res.json())
    //   .then((data) => setProductData(data))
    //   .catch((error) => console.error("Error fetching product data:", error));

    // if (state?.productId) {
    //   // Make your API call here with state.productId
    //   console.log("Fetched Product ID:", state.productId);
    // }
    if (productId) {
      // Make your API call here with state.productId
      console.log("Cookie Product ID:", productId);
    }
    setProductData(data?.product?.[0]?.fn_get_product_page);
  }, [data]);

  if (!productData) return <Loader />;
  // <p>Loading...</p>;

  const {
    hero_image,
    product_desc,
    short_desc,
    name,
    price,
    ptype_name,
    fueltype_name,
    brand_name,
    product_details,
    specifications,
  } = productData;
  console.log("productData", productData);
  const productRouteHandler = (productId) => {
    setCookie(
      "selectedProductId",
      productId
      //   , {
      //   path: "/", // Cookie available site-wide
      //   secure: true, // Only sent over HTTPS
      //   httpOnly: true, // Prevents client-side JS from accessing it
      //   sameSite: "strict", // Only sent for same-site requests
      //   maxAge: 60 * 60 * 24, // Cookie expiry (1 day in seconds)
      // }
    );
    router.push(`/product/${productId}`);
  };
  return (
    <section>
      <div className="stackview">
        <div>
          <Breadcrumbs
            productType={ptype_name}
            fuelType={fueltype_name}
            productName={name}
            brandName={brand_name}
          />
          {/* <br/> */}
          <HeroImage
            // src={JSON.parse(hero_image?.replace(/'/g, '"'))}
            src={hero_image}
            alt="Product Hero Image"
          />
        </div>
        {product_desc && <DescriptionColumn product_desc={product_desc} />}
        {short_desc && (
          <ProductOptions
            short_desc={short_desc}
            name={name}
            price={price}
            brand_name={brand_name}
            openModal={openModal}
          />
        )}
        {short_desc && <MaterialFinishOptions short_desc={short_desc} />}
        <Specifications specifications={specifications} />
        <DownloadSection
          product_details={product_details}
          openDrawer={openDrawer}
        />
        <Featured
          headingValue={"You May Also Like"}
          productRouteHandler={productRouteHandler}
        />
        <OurDifference />
        <OurShowrooms />
        <EnquiryFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          name={name}
          brand_name={brand_name}
        />
        <ProductSpecsDrawer
          isOpen={isOpenSpecDrawer}
          closeDrawer={closeDrawer}
          openDrawer={openDrawer}
          name={name}
          brand_name={brand_name}
          product_details={product_details}
        />
      </div>
    </section>
  );
};

export default Product;
