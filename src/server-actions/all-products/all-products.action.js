"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import {
  getAllProducts,
  searchProducts,
} from "@/src/repo/all-products/all-products.repo";

export const getAllProductsPageDataAction = async () => {
  const allProducts = await getAllProducts().catch((err) => []);
  const searchProductsList = await searchProducts("GF7814", [10], [3]).catch(
    (err) => []
  );
//   console.log("searchProductsList", searchProductsList);
  return {
    ...responsePayload,
    success: true,
    message: "Fetched All Produucts data",
    result: {
      allProducts,
      searchProductsList,
    },
  };
};
