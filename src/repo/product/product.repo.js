"use server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const getProductPage = async (productId) => {
  const cookieStore = cookies();
  const cookieProductId = cookieStore.get("selectedProductId")?.value;
  const query = `select * from fn_get_product_page(${
    productId ? productId : cookieProductId ? cookieProductId : "424"
  })`;
  // const query = "select * FROM fn_get_product_page(424)";
  try {
    const result = await prisma.$queryRawUnsafe(query);
    return result;
  } catch (err) {
    throw err;
  }
  // const query = "SELECT * FROM fn_get_fireplace_page(1)";
  // const result = await prisma
  //   .$queryRaw(query)
  //   .then((res) => res)
  //   .catch((err) => {
  //     throw err;
  //   });
  // return result?.rows;
};

export const insertProductEnquiry = async () => {
  const query = `select * from fn_insert_product_enquiry('product enquiry example' ,'John Doe', '1234567890','user@example.com', 'product enquiry message')`;
  const result = await prisma
    .$queryRaw(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};
