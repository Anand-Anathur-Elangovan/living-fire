"use server";

import pool from "@/src/helper/db/db";
import prisma from "@/src/lib/prisma";

// import { prismaClient } from "@/src/helper/db/prismadb";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
export const getAllProducts = async (type_id) => {
  try {
    const query = `SELECT * FROM fn_get_products(0,0,0,${type_id})`;
    console.log(query);
    const result = await pool.query(query); // Await the pool query directly
    // const formatResults = result.rows.map(({ fn_get_products }) => ({
    //   ...fn_get_products,
    //   hero_image: JSON.parse(fn_get_products.hero_image),
    // }));
    // console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
  // try {
  //   const products = await prisma.tblProduct.findMany();
  //   console.log(products);
  //   return products;
  // } catch (error) {
  //   console.error("Error fetching all products:", error);
  //   throw error;
  // }
};

// export const searchProducts = async (searchTerm, brandIds, ptypeIds) => {
//   try {
//     const products = await prismaClient.tblProduct.findMany({
//       where: {
//         OR: [
//           { p_name: { contains: searchTerm, mode: "insensitive" } },
//           { p_code: { contains: searchTerm, mode: "insensitive" } },
//           // { p_sub_desc1: { contains: searchTerm, mode: "insensitive" } },
//           // { p_sub_desc2: { contains: searchTerm, mode: "insensitive" } },
//           // { p_sub_desc3: { contains: searchTerm, mode: "insensitive" } },
//         ],
//         AND: [
//           brandIds?.length ? { brand_id: { in: brandIds } } : {},
//           ptypeIds?.length ? { ptype_id: { in: ptypeIds } } : {},
//         ],
//         is_active: true,
//       },
//       select: {
//         p_id: true,
//         p_name: true,
//         p_code: true,
//         p_desc: true,
//         p_cost: true,
//         p_stock: true,
//         brand_id: true,
//         ptype_id: true,
//         p_spec_images: true,
//         p_main_images: true,
//       },
//     });

//     return products;
//   } catch (error) {
//     console.error("Error searching products:", error);
//     throw error;
//   }
// };

export const getProductTypesRepo = async () => {
  try {
    const productTypes = await prisma.tblProductType.findMany();
    return productTypes;
  } catch (error) {
    console.error("Error getting Product Types", error);
    throw error;
  }
};
