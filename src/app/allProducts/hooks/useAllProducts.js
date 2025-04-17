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
    // staleTime: 0,
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
