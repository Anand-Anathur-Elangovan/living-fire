import { getHomePageDataAction } from "@/src/server-actions/home/home.action";
import { useQuery } from "@tanstack/react-query";

const useHomePage = () => {
  const { data } = useQuery({
    queryKey: "HomePageAction",
    queryFn: getHomePageDataAction(),
    enabled: hover,
    select: (data) => {
      console.log(data, "SELECT");
      if (data.success) return data.result;
    },
  });
  console.log(data, "HOOK");
  return { data };
};

export default useHomePage;
