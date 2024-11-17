// import pool from "@/src/helper/db/db.js";

// export async function POST(req) {
//   try {
//     const body = await req.json(); // Parse the request body
//     console.log("Received POST request body:", body);

//     // Extract the required parameters from the body
//     const { folder_id, fueltype_id, brand_id, ptype_id } = body;
//     const values = [
//       folder_id || 0,
//       fueltype_id || 0,
//       brand_id || 0,
//       ptype_id || 0,
//     ];

//     // Updated query with placeholders for parameterized query
//     const query = "SELECT * FROM fn_get_products($1, $2, $3, $4)";
//     const result = await pool.query(query, values);

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

import pool from "@/src/helper/db/db"; // Your DB connection pool

// This function handles the POST request to fetch all products based on type_id
export async function POST(request) {
  try {
    // Extract data from the request body (e.g., { type_id: 1 })
    const { type_id } = await request.json();

    // Check if type_id is provided
    if (!type_id) {
      return new Response(JSON.stringify({ error: "type_id is required" }), {
        status: 400,
      });
    }

    // Database query to get products based on type_id
    const query = `SELECT * FROM fn_get_products(0,0,0,${type_id},false,0,'')`;
    console.log(query);

    const result = await pool.query(query); // Execute the query

    // Return the result as JSON
    return new Response(JSON.stringify({ products: result.rows }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    // Return error response
    return new Response(JSON.stringify({ error: "Error fetching products" }), {
      status: 500,
    });
  }
}
