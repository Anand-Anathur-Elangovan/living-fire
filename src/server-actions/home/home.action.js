"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import {
  getBrandsRepo,
  getCollectionsRepo,
  getFeaturedRepo,
  getUserFeedbackRepo,
} from "@/src/repo/home/home.repo";

export const getHomePageDataAction = async () => {
  // const collections = await getCollectionsRepo().catch((err) => []);
  // const features = await getFeaturedRepo().catch((err) => []);

  const userFeedback = await getUserFeedbackRepo().catch((err) => []);
  return {
    ...responsePayload,
    success: true,
    message: "Fetched Home data",
    result: {
      collections: [],
      features: [],
      userFeedback: userFeedback.fn_get_user_feedbacks,
    },
  };
};

export const getBrandsDataAction = async () => {
  // const collections = await getCollectionsRepo().catch((err) => []);
  // const features = await getFeaturedRepo().catch((err) => []);

  const brands = await getBrandsRepo()
    .then((res) => res)
    .catch((err) => []);

  return {
    ...responsePayload,
    success: true,
    message: "Fetched Home data",
    result: brands[0].fn_get_brands,
  };
};
