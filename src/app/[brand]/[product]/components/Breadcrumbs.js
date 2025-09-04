"use client";
import { useNavigationState } from "@/context/NavigationContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateSlug } from "@/src/helper/slug/slug";

const Breadcrumbs = ({
  productType,
  fuelType,
  productName,
  brandName,
  fuelTypeId,
  brandId,
  unwrappedParams,
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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allProductsRouteHandler = (typeName, displayName, slug, brandName) => {
    if (!isClient) return;

    setNavigationState({
      typeName: typeName,
      displayName: displayName,
      slug: slug || null,
      brandName: brandName || null,
    });
    const displayNameSlug = generateSlug(displayName);
    const brandSlug = (brandName && generateSlug(brandName)) || null;
    if (typeName === "productName") {
      const productUrl = `/${brandSlug}/${slug || displayNameSlug}`;
      router.push(productUrl);
    } else {
      const urlPath = `/allProducts/${displayNameSlug}`;
      router.push(urlPath);
    }
  };

  // Only truncate on mobile
  const truncateText = (text) => {
    if (!text || !isMobile) return text;
    const maxLength = 10;
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    
    // Clear localStorage & sessionStorage
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }

    // Clear cookies (requires a utility function)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Force a hard reload
    window.location.href = "/";
  };


  const breadcrumbItems = [
    { name: "Home", path: "/", type: "button", onClick: (e) => handleHomeClick(e)  },
    fuelType && { 
      name: fuelType, 
      onClick: () => allProductsRouteHandler("fuelType", fuelType),
      type: "button"
    },
    productType && {
      name: productType,
      onClick: () => allProductsRouteHandler("productType", productType),
      type: "button"
    },
    brandName && {
      name: brandName,
      onClick: () => allProductsRouteHandler("brandName", brandName),
      type: "button"
    },
    productName && {
      name: productName,
      onClick: () => allProductsRouteHandler(
        "productName",
        productName,
        unwrappedParams,
        brandName
      ),
      type: "button"
    }
  ].filter(Boolean);

  return (
    <div className="breadcrumb-wrapper">
      <div className="breadcrumb-container">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="breadcrumb-item">
              {item.type === "link" ? (
                <Link href={item.path} className="breadcrumb-link">
                  {truncateText(item.name)}
                </Link>
              ) : (
                <button
                  className="breadcrumb-button"
                  onClick={item.onClick}
                  aria-label={`View ${item.name}`}
                >
                  {truncateText(item.name)}
                </button>
              )}
              {index < breadcrumbItems.length - 1 && (
                <span className="breadcrumb-separator">/</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .breadcrumb-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 10px 0px;
        }
        
        .breadcrumb-container {
          display: inline-flex;
          justify-content: center;
          margin: 10px 0;
          color: #333;
          max-width: 100%;
          overflow-x: auto;
          padding: 0 10px;
          -webkit-overflow-scrolling: touch;
        }

        .breadcrumb-nav {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 4px;
          font-size: 16px;
          white-space: nowrap;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .breadcrumb-link {
          color: #0070f3;
          text-decoration: none;
        }

        .breadcrumb-link:hover {
          text-decoration: underline;
        }

        .breadcrumb-separator {
          margin: 0 5px;
          color: #666;
          user-select: none;
        }

        .breadcrumb-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #333;
          font: inherit;
          text-align: left;
        }

        .breadcrumb-button:hover {
          color: #0070f3;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .breadcrumb-nav {
            font-size: 14px;
          }
          
          .breadcrumb-separator {
            margin: 0 3px;
          }
        }

        @media (max-width: 480px) {
          .breadcrumb-container {
            padding: 0 8px;
          }
          
          .breadcrumb-nav {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default Breadcrumbs;