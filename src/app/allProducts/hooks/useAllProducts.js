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
  subType
) => {
  const initialData = [];
  const {
    data: allProducts = initialData,
    isFetched,
    isFetchedAfterMount,
  } = useQuery({
    queryKey: [
      "getAllProductsAction" +
        type_id +
        fireplaceType +
        brandType +
        bestSelling +
        searchText +
        subType,
    ],
    queryFn: () =>
      getAllProductsPageDataAction({
        type_id,
        fireplaceType,
        brandType,
        bestSelling,
        searchText,
        subType,
      }),
    staleTime: 0,
    // enabled: productMenuIndex ? true : false,
    select: (res) => {
      // console.log(res.result, "HOOCK");
      if (res.success) return res.result;
      toast.error(res.message);
      return initialData;
    },
  });

  return {
    allProducts,
    isFetched,
    isFetchedAfterMount,
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
