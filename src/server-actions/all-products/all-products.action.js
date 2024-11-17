"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import {
  getAllProducts,
  // searchProducts,
} from "@/src/repo/all-products/all-products.repo";

export const getAllProductsPageDataAction = async (type_id) => {
  const allProducts = await getAllProducts(type_id)
    .then((res) =>
      res.map((val) => {
        // if(val.fn_get_products.hero_image.includes)
        return val;
      })
    )
    .catch((err) => []);
  // const searchProductsList = await searchProducts("GF7814", [10], [3]).catch(
  //   const searchProductsList = await searchProducts("GFi750").catch(
  //   (err) => []
  // );
  //   console.log("searchProductsList", searchProductsList);
  return {
    ...responsePayload,
    success: true,
    message: "Fetched All Produucts data",
    result: allProducts,
  };
};
