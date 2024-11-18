// app/api/get-product-page/route.js
// import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import pool from "@/src/helper/db/db";

// const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { productId } = await req.json(); // Get the productId from the POST body
    const cookieStore = cookies();
    const cookieProductId = cookieStore.get("selectedProductId")?.value;
    const finalProductId = productId || cookieProductId || "424"; // Fallback to cookie or default value

    // Ensure this is only done at runtime and not build time
    const query = `SELECT * FROM fn_get_product_page(${finalProductId})`;
    const result =  await pool.query(query);


    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Error fetching product data:", err);

    return new Response(
      JSON.stringify({ error: "Internal Server Error", message: err.message }),
      { status: 500 }
    ); 
  }
}
