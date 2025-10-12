import {
  getAllProductsPageDataAction,
  getMasterValuesAction,
} from "@/src/server-actions/all-products/all-products.action";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useHomePage from "../../home/hooks/useHomePage";
import { useState } from "react";

const useAllProducts = (
  type_id,
  fireplaceType,
  brandType,
  bestSelling,
  searchText,
  subType,
  rangeType,
  installationType,
  glassOrientationType
) => {
  const initialData = [];
  const {
    data: allProducts = initialData,
    isLoading,
    isFetched,
    isStale,
    isFetchedAfterMount,
  } = useQuery({
    queryKey: [
      "getAllProductsAction" +
        type_id +
        fireplaceType +
        brandType +
        bestSelling +
        searchText +
        subType +
        rangeType +
        installationType +
        glassOrientationType,
    ],
    queryFn: () =>
      getAllProductsPageDataAction({
        type_id,
        fireplaceType,
        brandType,
        bestSelling,
        searchText,
        subType,
        rangeType,
        installationType,
        glassOrientationType,
      }),
    staleTime: 1000 * 30, // 30 seconds
    // enabled: productMenuIndex ? true : false,
    select: (res) => {
      if (res.success) return res.result;
      toast.error(res.message);
      return initialData;
    },
  });

  return {
    allProducts,
    isLoading,
    isFetched,
    isFetchedAfterMount,
    isStale,
  };
};

export default useAllProducts;

//, searchProductsList: []
// {
//     queryKey: ["getAllProductsAction"],
//     queryFn: () => getAllProductsPageDataAction(),
//     // select: (res) => {
//     //   if (res.success) return res.result;
//     //   toast.error(res.message);
//     //   return {};
//     // },
//   }



// import {
//   getAllProductsPageDataAction,
//   getMasterValuesAction,
// } from "@/src/server-actions/all-products/all-products.action";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useMemo } from "react";
// import { useDebounce } from "./useDebounce";

// const useAllProducts = (
//   type_id,
//   fireplaceType,
//   brandType,
//   bestSelling,
//   searchText,
//   subType,
//   rangeType,
//   installationType,
//   glassOrientationType
// ) => {
//   const initialData = [];
  
//   // Debounce the most frequently changing parameters
//   const debouncedSearchText = useDebounce(searchText, 500);
//   const debouncedTypeId = useDebounce(type_id, 300);

//   const {
//     data: allProducts = initialData,
//     isLoading,
//     isFetched,
//     isStale,
//     isFetchedAfterMount,
//   } = useQuery({
//     queryKey: [
//       "getAllProductsAction",
//       debouncedTypeId,
//       debouncedSearchText,
//       brandType, // Keep brandType in query key for major changes
//       bestSelling, // Keep bestSelling in query key
//     ],
//     queryFn: () =>
//       getAllProductsPageDataAction({
//         type_id: debouncedTypeId,
//         fireplaceType: 0, // We'll handle this client-side
//         brandType: brandType || 0,
//         bestSelling: bestSelling || null,
//         searchText: debouncedSearchText || "",
//         subType: 0, // We'll handle this client-side
//         rangeType: 0, // We'll handle this client-side
//         installationType: 0, // We'll handle this client-side
//         glassOrientationType: 0, // We'll handle this client-side
//       }),
//     staleTime: 1000 * 30, // 30 seconds
//     select: (res) => {
//       if (res.success) return res.result;
//       toast.error(res.message);
//       return initialData;
//     },
//   });

//   // Client-side filtering for instant response
//   const filteredProducts = useMemo(() => {
//     if (!allProducts.length) return [];
    
//     return allProducts.filter(product => {
//       const productData = product.fn_get_products;
      
//       // Type filter (server-side + client-side)
//       const matchesType = !type_id || productData?.type_id === type_id;
      
//       // Fireplace Type filter (client-side)
//       const matchesFuelType = !fireplaceType || productData?.fueltype_id === fireplaceType;
      
//       // Brand filter (server-side + client-side)
//       const matchesBrand = !brandType || productData?.brand_id === brandType;
      
//       // Search filter (server-side + client-side)
//       const matchesSearch = !searchText || 
//         productData?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
//         productData?.p_sku?.toLowerCase().includes(searchText.toLowerCase()) ||
//         productData?.p_name?.toLowerCase().includes(searchText.toLowerCase());
      
//       // Best Selling filter (client-side)
//       const matchesBestSelling = !bestSelling || productData?.is_best_selling === true;
      
//       // Sub Type filter (client-side)
//       const matchesSubType = !subType || productData?.subtype_id === subType;
      
//       // Range filter (client-side)
//       const matchesRange = !rangeType || productData?.range_id === rangeType;
      
//       // Installation Type filter (client-side)
//       const matchesInstallation = !installationType || productData?.installation_id === installationType;
      
//       // Glass Orientation filter (client-side)
//       const matchesGlassOrientation = !glassOrientationType || 
//         productData?.glass_orientation_ids?.includes(glassOrientationType);

//       return matchesType && 
//              matchesFuelType && 
//              matchesBrand && 
//              matchesSearch && 
//              matchesBestSelling && 
//              matchesSubType && 
//              matchesRange && 
//              matchesInstallation && 
//              matchesGlassOrientation;
//     });
//   }, [
//     allProducts, 
//     type_id,
//     fireplaceType,
//     brandType,
//     searchText,
//     bestSelling,
//     subType,
//     rangeType,
//     installationType,
//     glassOrientationType
//   ]);

//   return {
//     allProducts: filteredProducts,
//     isLoading,
//     isFetched,
//     isFetchedAfterMount,
//     isStale,
//   };
// };

// export default useAllProducts;