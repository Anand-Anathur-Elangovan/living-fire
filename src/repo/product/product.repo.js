"use server";
// import { PrismaClient } from "@prisma/client";
import pool from "@/src/helper/db/db";
// import { cookies } from "next/headers";

// const prisma = new PrismaClient();

export const getProductPage = async (productName) => {
  // const cookieStore = cookies();
  // const cookieProductId = await cookieStore.get("selectedProductId")?.value;
  // const query = `SELECT * FROM fn_get_product_page(${
  //   productId ? productId : "424"
  // })`;
  // const query = "select * FROM fn_get_product_page(424)";
  try {
    // const result = await pool.query(query);
    const result = await pool.query(
      `SELECT 
        p_id,
        sku AS p_sku,
        name,
        brand_name,
        fueltype_name,
        ptype_name,
        short_desc,
        product_desc,
        price,
        best_selling,
        is_featured,
        made_country,
        type,
        hero_image,
        product_details,
        specifications,
        brand_id
      FROM tbl_master
      WHERE name = $1;`, 
      [productName] // Passing productId as a parameter
    );
    
    // console.log("resultCheck", resultCheck.rows);
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
