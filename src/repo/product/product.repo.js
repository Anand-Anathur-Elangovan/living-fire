import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductPage = async () => {
  const query = "SELECT * FROM fn_get_product_page(1)";
  console.log("query", query);

  try {
    const result = await prisma.$queryRawUnsafe(query); // Use $queryRawUnsafe for raw string queries
    console.log("res_Repo", result);
    return result;
  } catch (err) {
    throw err;
  }
};
