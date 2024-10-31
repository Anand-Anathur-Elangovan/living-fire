"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getProductPage = async () => {
  const query = "SELECT * FROM fn_get_fireplace_page(1)";
  const result = await prisma
    .$queryRaw(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
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
