"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getProductPage = async () => {
    const query = "SELECT * FROM fn_get_product_page(1)";
    const result = await prisma
      .$queryRaw(query)
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
    return result?.rows;
  };
