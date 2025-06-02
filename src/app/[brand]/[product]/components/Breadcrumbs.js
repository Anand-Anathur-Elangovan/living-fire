// "use client";
// import { useNavigationState } from "@/context/NavigationContext";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const Breadcrumbs = ({
//   productType,
//   fuelType,
//   productName,
//   brandName,
//   fuelTypeId,
//   brandId,
// }) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsClient(true); // Ensure this component is client-side
//   }, []);
//   const { setNavigationState } = useNavigationState();
//   const allProductsRouteHandler = (typeName, displayName, arguId) => {
//     if (isClient) {
//       setNavigationState({
//         typeName: "fuelType",
//         displayName: fuelType,
//         id: fuelTypeId,
//       });
//       router.push(`/allProducts`);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "10px",
//         marginBottom: "20px",
//         color: "black",
//       }}
//     >
//       <nav>
//         <Link href="/">Home</Link> /
//         <span
//           style={{ cursor: "pointer", color: "black" }}
//           onClick={() =>
//             allProductsRouteHandler("fuelType", fuelType, fuelTypeId)
//           }
//         >
//           {`${fuelType} ${productType}`}
//         </span>{" "}
//         /
//         <span
//           style={{ cursor: "pointer", color: "black" }}
//           onClick={() =>
//             allProductsRouteHandler("brandName", brandName, brandId)
//           }
//         >
//           {`${brandName} ${productName}`}
//         </span>
//       </nav>
//     </div>
//   );
// };

// export default Breadcrumbs;


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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { setNavigationState } = useNavigationState();

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allProductsRouteHandler = (typeName, displayName, arguId) => {
    if (!isClient) return;
    
    setNavigationState({
      typeName: "fuelType",
      displayName: fuelType,
      id: fuelTypeId,
    });
    router.push(`/allProducts`);
  };

  const truncateText = (text, maxLength = 15) => {
    if (!text) return '';
    return text.length > maxLength && isMobile 
      ? `${text.substring(0, maxLength)}...` 
      : text;
  };

  return (
    <div className="breadcrumb-container">
      <nav className="breadcrumb-nav">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <button 
          className="breadcrumb-button"
          onClick={() => allProductsRouteHandler("fuelType", fuelType, fuelTypeId)}
          aria-label={`View all ${fuelType} ${productType}`}
        >
          {`${truncateText(fuelType)} ${truncateText(productType)}`}
        </button>
        <span className="breadcrumb-separator">/</span>
        <button 
          className="breadcrumb-button"
          onClick={() => allProductsRouteHandler("brandName", brandName, brandId)}
          aria-label={`View ${brandName} ${productName}`}
        >
          {`${truncateText(brandName)} ${truncateText(productName)}`}
        </button>
      </nav>

      <style jsx>{`
        .breadcrumb-container {
          display: flex;
          justify-content: center;
          margin: 10px 0 20px;
          color: #333;
          width: 100%;
          overflow-x: auto;
          padding: 0 10px;
        }
        
        .breadcrumb-nav {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          font-size: ${isMobile ? '14px' : '16px'};
          max-width: 100%;
        }
        
        .breadcrumb-link {
          color: #0070f3;
          text-decoration: none;
          white-space: nowrap;
        }
        
        .breadcrumb-link:hover {
          text-decoration: underline;
        }
        
        .breadcrumb-separator {
          margin: 0 5px;
          color: #666;
          white-space: nowrap;
        }
        
        .breadcrumb-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #333;
          font: inherit;
          white-space: nowrap;
        }
        
        .breadcrumb-button:hover {
          color: #0070f3;
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          .breadcrumb-container {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Breadcrumbs;