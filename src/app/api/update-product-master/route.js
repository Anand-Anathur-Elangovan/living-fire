// import pool from "@/src/helper/db/db";

// export async function PUT(req) {
//   try {
//     const { p_id, option_price, price } = await req.json();
//     if (!p_id) {
//       return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
//     }
//     // Update only provided fields
//     const fields = [];
//     const values = [];
//     let idx = 2;
//     if (name !== undefined) {
//       fields.push(`name = $${idx++}`);
//       values.push(name);
//     }
//     if (p_sku !== undefined) {
//       fields.push(`sku = $${idx++}`);
//       values.push(p_sku);
//     }
//     if (option_price !== undefined) {
//       fields.push(`option_price = $${idx++}`);
//       values.push(option_price);
//     }
//     if (price !== undefined) {
//       fields.push(`price = $${idx++}`);
//       values.push(price);
//     }
//     if (fields.length === 0) {
//       return new Response(JSON.stringify({ error: "No fields to update" }), { status: 400 });
//     }
//     const query = `UPDATE tbl_master SET ${fields.join(", ")} WHERE p_id = $1 RETURNING *`;
//     const result = await pool.query(query, [p_id, ...values]);
//     return new Response(JSON.stringify({ updated: result.rows[0] }), { status: 200 });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }

import pool from "@/src/helper/db/db";

export async function PUT(req) {
  try {
    const { p_id, option_price, price } = await req.json();
    if (!p_id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
    }

    // 1. Get current short_desc from DB
    const existing = await pool.query(
      "SELECT short_desc FROM tbl_master WHERE p_id = $1",
      [p_id]
    );

    if (!existing.rows.length) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    let short_desc = existing.rows[0].short_desc; // should already be JSON (jsonb column)

    // 2. Update prices based on option_price payload
    if (Array.isArray(option_price)) {
      short_desc = short_desc.map((section) => {
        const matched = option_price.find((opt) => opt.name === section.name);
        if (matched && section.value && section.value.length > 0) {
          // update all child prices in this section
          return {
            ...section,
            value: section.value.map((v) => ({
              ...v,
              price: String(matched.price), // ensure string like your schema
            })),
          };
        }
        return section;
      });
    }

    // 3. Build update query
    const fields = [];
    const values = [];
    let idx = 2;

    fields.push(`short_desc = $${idx++}`);
    values.push(JSON.stringify(short_desc));

    if (price !== undefined) {
      fields.push(`price = $${idx++}`);
      values.push(price);
    }

    const query = `UPDATE tbl_master SET ${fields.join(", ")} WHERE p_id = $1 RETURNING *`;
    const result = await pool.query(query, [p_id, ...values]);

    return new Response(JSON.stringify({ updated: result.rows[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

