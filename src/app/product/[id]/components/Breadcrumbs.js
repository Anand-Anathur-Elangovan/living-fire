import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = ({ productType, fuelType, productName, brandName }) => {
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
        <Link href={`/home/${productType}`}>
          {`${fuelType} ${productType}    `}
        </Link>{" "}
        /
        <Link href={`/home/${productType}/${brandName} ${productName}`}>
          {`${brandName} ${productName}`}
        </Link>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
