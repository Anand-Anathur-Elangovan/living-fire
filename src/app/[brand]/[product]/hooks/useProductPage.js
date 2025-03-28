import { getProductPageDataAction } from "@/src/server-actions/product/product.action";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import Product from "../page";

const useProductPage = (productName) => {
  const initialHomePageData = {
    Product: [],
  };
  const { data = initialHomePageData } = useQuery({
    queryKey: ["getProductPageDataAction" + productName],
    queryFn: () => getProductPageDataAction(productName),
    select: (res) => {
      if (res.success) return res?.result;
      toast.error(res.message);
      return initialHomePageData;
    },
  });

  return { data };
};

export default useProductPage;
