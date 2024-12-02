"use server";
// import { PrismaClient } from "@prisma/client";
import pool from "@/src/helper/db/db";
// import { cookies } from "next/headers";

// const prisma = new PrismaClient();

export const getProductPage = async (productId) => {
  // const cookieStore = cookies();
  // const cookieProductId = await cookieStore.get("selectedProductId")?.value;
  console.log("productCheck, productId", productId);
  const query = `SELECT * FROM fn_get_product_page(${
    productId ? productId : "424"
  })`;
  // const query = "select * FROM fn_get_product_page(424)";
  try {
    const result = await pool.query(query);
    // prisma.$queryRawUnsafe(query);
    console.log("productCheck123", result.rows);
    return result.rows;
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

// export const insertProductEnquiry = async () => {
//   const query = `select * from fn_insert_product_enquiry('product enquiry example' ,'John Doe', '1234567890','user@example.com', 'product enquiry message')`;
//   const result = await prisma
//     .$queryRaw(query)
//     .then((res) => res)
//     .catch((err) => {
//       throw err;
//     });
//   return result?.rows;
// };
