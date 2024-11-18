import {
  getBrandsDataAction,
  getHomePageDataAction,
} from "@/src/server-actions/home/home.action";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useHomePage = () => {
  const initialHomePageData = {
    collections: [],
    features: [],
    userFeedback: [],
  };
  const {
    data: { collections, features, userFeedback } = initialHomePageData,
  } = useQuery({
    queryKey: ["HomePageAction"],
    queryFn: () => getHomePageDataAction(),
    select: (res) => {
      if (res.success) return res.result;
      toast.error(res.message);
      return initialHomePageData;
    },
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["getBrandsDataAction"],
    queryFn: () => getBrandsDataAction(),
    select: (res) => {
      console.log(brands);
      if (res.success) return res.result;
      toast.error(res.message);
      return [];
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { brands, collections, features, userFeedback };
};

export default useHomePage;
