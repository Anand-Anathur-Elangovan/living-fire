import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

// Create a singleton PrismaClient instance to reuse across requests
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Reuse the Prisma client in development to prevent new instances on every request
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export async function POST(req) {
  try {
    const { productId } = await req.json(); // Get the productId from the POST body
    const cookieStore = cookies();
    const cookieProductId = cookieStore.get("selectedProductId")?.value;
    const finalProductId = productId || cookieProductId || "424"; // Fallback to cookie or default value

    // Construct the SQL query
    const query = `SELECT * FROM fn_get_product_page(${finalProductId})`;

    // Execute the query with Prisma
    const result = await prisma.$queryRawUnsafe(query);

    // Return the result as a JSON response
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Error fetching product data:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
