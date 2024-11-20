import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = ({ productType, fuelType, productName,brandName ,fuelTypeId,brandId}) => {

  const allProductsRouteHandler = (typeName, displayName, arguId) => {
    setNavigationState({
      typeName: 'fuelType',
      displayName: fuelType,
      id: fuelTypeId,
    });
    router.push(`/allProducts`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      <nav>
        <Link href="/home">Home</Link> /
        <Link onClick={()=>allProductsRouteHandler('fuelType',fuelType,fuelTypeId)}>
          {`${fuelType} ${productType}`}
        </Link>{" "}
        /
        <Link onClick={()=>allProductsRouteHandler('brandName',brandName,brandId)}>
          {`${brandName} ${productName}`}
        </Link>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
