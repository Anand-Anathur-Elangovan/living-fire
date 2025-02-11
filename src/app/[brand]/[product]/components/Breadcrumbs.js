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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        marginBottom: "20px",
        color: "black",
      }}
    >
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
