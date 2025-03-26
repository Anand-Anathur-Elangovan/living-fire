"use client";
import { useNavigationState } from "@/context/NavigationContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Breadcrumbs = ({
  productType,
  fuelType,
  productName,
  brandName,
  fuelTypeId,
  brandId,
}) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure this component is client-side
  }, []);
  const { setNavigationState } = useNavigationState();
  const allProductsRouteHandler = (typeName, displayName, arguId) => {
    if (isClient) {
      setNavigationState({
        typeName: "fuelType",
        displayName: fuelType,
        id: fuelTypeId,
      });
      router.push(`/allProducts`);
    }
  };

  return (
    <div className="flex justify-center mt-[10px] mb-[20px] text-black font-sans font-light text-sm md:text-base">
      <nav>
        <Link href="/home">Home</Link> /
        <span
          style={{ cursor: "pointer", color: "black" }}
          onClick={() =>
            allProductsRouteHandler("fuelType", fuelType, fuelTypeId)
          }
        >
          {`${fuelType} ${productType}`}
        </span>{" "}
        /
        <span
          style={{ cursor: "pointer", color: "black" }}
          onClick={() =>
            allProductsRouteHandler("brandName", brandName, brandId)
          }
        >
          {`${brandName} ${productName}`}
        </span>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
