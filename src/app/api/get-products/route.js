import pool from "@/src/helper/db/db.js";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    console.log("Received POST request body:", body);

    // Extract the required parameters from the body
    const { folder_id, fueltype_id, brand_id, ptype_id } = body;
    const values = [
      folder_id || 0,
      fueltype_id || 0,
      brand_id || 0,
      ptype_id || 0,
    ];

    // Updated query with placeholders for parameterized query
    const query = "SELECT * FROM fn_get_products($1, $2, $3, $4)";
    const result = await pool.query(query, values);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Error fetching users" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
