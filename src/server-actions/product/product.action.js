"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import { getProductPage } from "@/src/repo/product/product.repo";

export const getProductPageDataAction = async (productId) => {
  const product = await getProductPage(productId).catch((err) => []);

  return {
    ...responsePayload,
    success: true,
    message: "Fetched Product data",
    result: {
      product,
    },
  };
};
