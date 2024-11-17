"use server";

import pool from "@/src/helper/db/db";

// const prisma = new PrismaClient();
// export const getCollectionsRepo = async () => {
//   const query = "SELECT * FROM fn_get_collections()";
//   try {
//     const result = await pool.query(query);
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
//   // const result = await prisma
//   //   .$queryRawUnsafe(query)
//   //   .then((res) => res[0].fn_get_collections)
//   //   .catch((err) => {
//   //     throw err;
//   //   });
//   // return result;
// };

// export const getFeaturedRepo = async () => {
//   const query = "SELECT * FROM fn_get_featured()";
//   try {
//     const result = await pool.query(query);
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
//   // const result = await prisma
//   //   .$queryRawUnsafe(query)
//   //   .then((res) => res[0].fn_get_featured)
//   //   .catch((err) => {
//   //     throw err;
//   //   });
//   // return result;
// };

export const getBrandsRepo = async () => {
  const query = "SELECT * FROM fn_get_brands()";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
  // const result = await prisma
  //   .$queryRawUnsafe(query)
  //   .then((res) => {
  //     // console.log(res);
  //     return res[0].fn_get_brands;
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
  // return result;
};

export const getUserFeedbackRepo = async () => {
  const query = "SELECT * FROM fn_get_user_feedbacks()";
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
  // const result = await prisma
  //   .$queryRawUnsafe(query)
  //   .then((res) => res[0].fn_get_user_feedbacks)
  //   .catch((err) => {
  //     throw err;
  //   });
  // return result;
};
