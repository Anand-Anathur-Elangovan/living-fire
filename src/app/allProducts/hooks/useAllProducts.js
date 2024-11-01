import { getAllProductsPageDataAction } from "@/src/server-actions/all-products/all-products.action";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";

const useAllProducts = () => {
  const initialData = { allProducts: [], searchProductsList: [] };
  const { data: allProductsData = initialData } = useQuery({
    queryKey: ["getAllProductsAction"],
    queryFn: () => getAllProductsPageDataAction(),
    select: (res) => {
      if (res.success) return res.result;
      toast.error(res.message);
      return initialData;
    },
  });

  return { allProductsData };
};

export default useAllProducts;

// {
//     queryKey: ["getAllProductsAction"],
//     queryFn: () => getAllProductsPageDataAction(),
//     // select: (res) => {
//     //   if (res.success) return res.result;
//     //   toast.error(res.message);
//     //   return {};
//     // },
//   }
