"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import {
  getBrandsRepo,
  getCollectionsRepo,
  getFeaturedRepo,
  getUserFeedbackRepo,
} from "@/src/repo/home/home.repo";

export const getHomePageDataAction = async () => {
  const collections = [1, 2, 3]; //await getCollectionsRepo().catch((err) => []);
  const features = ["a", "b", "c"]; //await getFeaturedRepo().catch((err) => []);
  const brands = ["123d", "asd2", "3213"]; //await getBrandsRepo().catch((err) => []);
  const userFeedback = ["test", "test"]; //await getUserFeedbackRepo().catch((err) => []);

  console.log({
    ...responsePayload,
    success: true,
    message: "Fetched Home data",
    result: { collections, features, brands, userFeedback },
  });
  return {
    ...responsePayload,
    success: true,
    message: "Fetched Home data",
    result: { collections, features, brands, userFeedback },
  };
};
