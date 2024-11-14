"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getCollectionsRepo = async () => {
  const query = "SELECT * FROM fn_get_collections()";
  const result = await prisma
    .$queryRawUnsafe(query)
    .then((res) => res[0].fn_get_collections)
    .catch((err) => {
      throw err;
    });
  return result;
};

export const getFeaturedRepo = async () => {
  const query = "SELECT * FROM fn_get_featured()";
  const result = await prisma
    .$queryRawUnsafe(query)
    .then((res) => res[0].fn_get_featured)
    .catch((err) => {
      throw err;
    });
  return result;
};

export const getBrandsRepo = async () => {
  const query = "SELECT * FROM fn_get_brands()";
  const result = await prisma
    .$queryRawUnsafe(query)
    .then((res) => {
      // console.log(res);
      return res[0].fn_get_brands;
    })
    .catch((err) => {
      throw err;
    });
  return result;
};

export const getUserFeedbackRepo = async () => {
  const query = "SELECT * FROM fn_get_user_feedbacks()";
  const result = await prisma
    .$queryRawUnsafe(query)
    .then((res) => res[0].fn_get_user_feedbacks)
    .catch((err) => {
      throw err;
    });
  return result;
};
