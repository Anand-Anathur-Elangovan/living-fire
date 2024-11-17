// app/api/get-product-page/route.js

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { productId } = await req.json();  // Get the productId from the POST body
    const cookieStore = cookies();
    const cookieProductId = cookieStore.get("selectedProductId")?.value;
    const finalProductId = productId || cookieProductId || "424";  // Fallback to cookie or default value

    // Construct the SQL query
    const query = `SELECT * FROM fn_get_product_page(${finalProductId})`;

    // Execute the query with Prisma
    const result = await prisma.$queryRawUnsafe(query);

    // Return the result as a JSON response
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Error fetching product data:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
