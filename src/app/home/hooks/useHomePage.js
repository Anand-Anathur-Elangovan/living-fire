import { getHomePageDataAction } from "@/src/server-actions/home/home.action";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useHomePage = () => {
  const initialHomePageData = {
    collections: [],
    features: [],
    brands: [],
    userFeedback: [],
  };
  const { data = initialHomePageData } = useQuery({
    queryKey: ["HomePageAction"],
    queryFn: () => getHomePageDataAction(),
    select: (res) => {
      if (res.success) return res.result;
      toast.error(res.message);
      return initialHomePageData;
    },
  });

  return { data };
};

export default useHomePage;
