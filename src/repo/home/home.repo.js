"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getCollectionsRepo = async () => {
  const query = "SELECT * FROM fn_get_collections()";
  const result = await prisma
    .$queryRaw(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

export const getFeaturedRepo = async () => {
  const query = "SELECT * FROM fn_get_featured()";
  const result = await prisma
    .$queryRaw(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

export const getBrandsRepo = async () => {
  const query = "SELECT * FROM fn_get_brands()";
  const result = await prisma
    .$queryRaw(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

export const getUserFeedbackRepo = async () => {
  const query = "SELECT * FROM fn_get_user_feedbacks()";
  const result = await prisma
    .$queryRaw(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

