// import pool from "@/src/helper/db/db.js";

// export async function POST(req) {
//   try {
//     const query = "SELECT * FROM fn_get_product_page(1)";
//     const result = await pool.query(query); // Await the pool query directly
//     return new Response(JSON.stringify(result.rows), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return new Response(JSON.stringify({ error: "Error fetching users" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
// app/api/get-product-page/route.js

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

// Create Prisma client instance
const prisma = new PrismaClient();

// Server action for handling the API request
export async function POST(req) {
  try {
    // Get the productId from the request body, or from cookies
    const { productId } = await req.json(); // This will extract the JSON data from the POST request body
    const cookieStore = cookies();
    const cookieProductId = cookieStore.get("selectedProductId")?.value;

    // Set the productId to either the one from the body or from cookies, with a fallback
    const finalProductId = productId || cookieProductId || "424";

    // Construct the SQL query
    const query = `SELECT * FROM fn_get_product_page(${finalProductId})`;

    // Execute the query using Prisma
    const result = await prisma.$queryRawUnsafe(query);

    // Return the response
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Error fetching product data:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
