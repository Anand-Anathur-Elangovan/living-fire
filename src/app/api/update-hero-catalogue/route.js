import pool from "@/src/helper/db/db";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { p_id, hero_image, catalogue_image, ptype_name } = body;
    if (!p_id || !hero_image || !catalogue_image || !ptype_name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Update master table
    const masterQuery = `UPDATE tbl_master SET hero_image = $2, catalogue_image = $3 WHERE p_id = $1 RETURNING *`;
    const masterValues = [p_id, JSON.stringify(hero_image), JSON.stringify(catalogue_image)];
    const masterResult = await pool.query(masterQuery, masterValues);
    if (!masterResult.rows.length) {
      return new Response(JSON.stringify({ error: "Product not found in master" }), { status: 404 });
    }

    // Determine table to update based on ptype_name
    let table = null;
    if (ptype_name === "Fireplace") table = "tbl_fireplace";
    else if (ptype_name === "Outdoor") table = "tbl_outdoor";
    else if (ptype_name === "Fireplace Mantels") table = "tbl_fireplace_mantel";
    else if (ptype_name === "Cast Iron") table = "tbl_cast_iron";
    else if (ptype_name === "Fire Tools") table = "tbl_firetools";

    let extraResult = null;
    if (table) {
      const extraQuery = `UPDATE ${table} SET hero_image = $2, catalogue_image = $3 WHERE p_id = $1 RETURNING *`;
      extraResult = await pool.query(extraQuery, masterValues);
    }

    return new Response(JSON.stringify({ updated: masterResult.rows[0], extra: extraResult?.rows?.[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
