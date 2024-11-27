import { getMasterValuesAction } from "@/src/server-actions/all-products/all-products.action";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useHomePage from "../../home/hooks/useHomePage";

const useMasterValues = () => {
  const { brands } = useHomePage();

  const {
    data: masterValues = {
      ranges: [],
      fuelTypes: [],
      productTypes: [],
      subTypes: [],
      installationTypes: [],
      glassOrientationTypes: [],
    },
    isFetched: isFetchedValues,
  } = useQuery({
    queryKey: ["getMasterValuesAction"],
    queryFn: () => getMasterValuesAction(),
    select: (res) => {
      if (res.success) return res.result;
      toast.error(res.message);
      return {
        ranges: [],
        fuelTypes: [],
        productTypes: [],
        subTypes: [],
        installationTypes: [],
        glassOrientationTypes: [],
      };
    },
  });

  return {
    brands,
    masterValues,
  };
};

export default useMasterValues;
