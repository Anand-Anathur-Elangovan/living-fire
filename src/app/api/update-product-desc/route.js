import pool from "@/src/helper/db/db";
export async function PUT(req) {
  try {
    const body = await req.json();
    const { p_id, desc_sections } = body;
    if (!p_id || !desc_sections) {
      return new Response(JSON.stringify({ error: "Missing p_id or desc_sections" }), { status: 400 });
    }
    console.log("Received p_id:", p_id);
    console.log("Received desc_sections:", desc_sections);
    // Update the product_desc column (jsonb) in tbl_master
    const query = `UPDATE tbl_master SET product_desc = $2 WHERE p_id = $1 RETURNING *`;
    const values = [p_id, JSON.stringify(desc_sections)];
    console.log("query", query, "values values:", values);
    const result = await pool.query(query, values);

    if (!result.rows.length) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ updated: result.rows[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
