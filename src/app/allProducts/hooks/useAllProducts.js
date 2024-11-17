import { getAllProductsPageDataAction } from "@/src/server-actions/all-products/all-products.action";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useHomePage from "../../home/hooks/useHomePage";

const useAllProducts = (type_id) => {
  const initialData = [];
  const { data: allProducts = initialData, isFetched } = useQuery({
    queryKey: ["getAllProductsAction" + type_id],
    queryFn: () => getAllProductsPageDataAction(type_id),
    select: (res) => {
      // console.log(res);
      if (res.success) return res.result;
      toast.error(res.message);
      return initialData;
    },
  });

  return { allProducts, isFetched };
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
