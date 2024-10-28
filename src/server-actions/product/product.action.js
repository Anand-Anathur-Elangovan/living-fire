"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import {
    getProductPage,
} from "@/src/repo/product/product.repo";

export const getProductPageDataAction = async () => {
  const product = await getProductPage().catch((err) => []);
  console.log("searchProductsList", searchProductsList);
  return {
    ...responsePayload,
    success: true,
    message: "Fetched Product data",
    result: {
        product,
    },
  };
};
