import pool from "@/src/helper/db/db";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { p_id, specifications } = body;
    if (!p_id || !specifications) {
      return new Response(JSON.stringify({ error: "Missing p_id or specifications" }), { status: 400 });
    }

    // Update the specifications column (jsonb) in tbl_master
    const query = `UPDATE tbl_master SET specifications = $2 WHERE p_id = $1 RETURNING *`;
    const values = [p_id, JSON.stringify(specifications)];
    const result = await pool.query(query, values);

    if (!result.rows.length) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ updated: result.rows[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
