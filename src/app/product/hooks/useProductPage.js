import { getProductPageDataAction } from "@/src/server-actions/product/product.action";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useProductPage = () => {
  const initialHomePageData = {
    collections: [],
    features: [],
    brands: [],
    userFeedback: [],
  };
  const { data = initialHomePageData } = useQuery({
    queryKey: "HomePageAction",
    queryFn: () => getProductPageDataAction(),
    select: (res) => {
      console.log("res", res);
      if (res.success) return res.result;
      toast.error(res.message);
      return initialHomePageData;
    },
  });

  return { data };
};

export default useProductPage;
