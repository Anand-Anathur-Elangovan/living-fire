"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import {
  getBrandsRepo,
  getCollectionsRepo,
  getFeaturedRepo,
  getUserFeedbackRepo,
  getAllProducts,
  searchProducts,
} from "@/src/repo/home/home.repo";

export const getHomePageDataAction = async () => {
  const collections = await getCollectionsRepo().catch((err) => []);
  const features = await getFeaturedRepo().catch((err) => []);
  const brands = await getBrandsRepo().catch((err) => []);
  const userFeedback = await getUserFeedbackRepo().catch((err) => []);
  const allProducts = await getAllProducts().catch((err) => []);
  const searchProductsList = await searchProducts("GF7814", [10], [3]).catch(
    (err) => []
  );
  console.log("searchProductsList", searchProductsList);
  return {
    ...responsePayload,
    success: true,
    message: "Fetched Home data",
    result: {
      collections,
      features,
      brands,
      userFeedback,
      allProducts,
      searchProductsList,
    },
  };
};
