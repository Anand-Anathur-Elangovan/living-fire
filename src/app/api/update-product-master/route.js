// import pool from "@/src/helper/db/db";

// export async function PUT(req) {
//   try {
//     const { p_id, option_price, price } = await req.json();
//     if (!p_id) {
//       return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
//     }

//     // 1. Get current short_desc from DB
//     const existing = await pool.query(
//       "SELECT short_desc FROM tbl_master WHERE p_id = $1",
//       [p_id]
//     );

//     if (!existing.rows.length) {
//       return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
//     }

//     let short_desc = existing.rows[0].short_desc; // should already be JSON (jsonb column)

//     // 2. Update prices based on option_price payload
//     if (Array.isArray(option_price)) {
//       short_desc = short_desc.map((section) => {
//         const matched = option_price.find((opt) => opt.name === section.name);
//         if (matched && section.value && section.value.length > 0) {
//           // update all child prices in this section
//           return {
//             ...section,
//             value: section.value.map((v) => ({
//               ...v,
//               price: String(matched.price), // ensure string like your schema
//             })),
//           };
//         }
//         return section;
//       });
//     }

//     // 3. Build update query
//     const fields = [];
//     const values = [];
//     let idx = 2;

//     fields.push(`short_desc = $${idx++}`);
//     values.push(JSON.stringify(short_desc));

//     if (price !== undefined) {
//       fields.push(`price = $${idx++}`);
//       values.push(price);
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
    const { p_id, ptype_name, short_desc, price } = await req.json();
    
    if (!p_id) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
    }

    // Determine which table to update based on ptype_name
    let tableName = 'tbl_master';
    switch (ptype_name) {
      case 'Outdoor':
        tableName = 'tbl_outdoor';
        break;
      case 'Fireplace Mantels':
        tableName = 'tbl_fireplace_mantel';
        break;
      case 'Cast Iron':
        tableName = 'tbl_cast_iron';
        break;
      case 'Fire Tools':
        tableName = 'tbl_firetools';
        break;
      case 'Fireplace':
        tableName = 'tbl_fireplace';
        break;
      default:
        tableName = 'tbl_master';
    }

    // Build update query
    const fields = [];
    const values = [p_id];
    let paramIndex = 2;

    if (short_desc !== undefined) {
      fields.push(`short_desc = $${paramIndex}`);
      values.push(JSON.stringify(short_desc));
      paramIndex++;
    }

    if (price !== undefined) {
      fields.push(`price = $${paramIndex}`);
      values.push(price);
      paramIndex++;
    }

    if (fields.length === 0) {
      return new Response(JSON.stringify({ error: "No fields to update" }), { status: 400 });
    }

    const query = `UPDATE ${tableName} SET ${fields.join(", ")} WHERE p_id = $1 RETURNING *`;
    
    // Update the specific table
    const result = await pool.query(query, values);

    // Also update tbl_master for consistency if we updated a different table
    if (tableName !== 'tbl_master') {
      const masterFields = [];
      const masterValues = [p_id];
      let masterParamIndex = 2;

      if (short_desc !== undefined) {
        masterFields.push(`short_desc = $${masterParamIndex}`);
        masterValues.push(JSON.stringify(short_desc));
        masterParamIndex++;
      }

      if (price !== undefined) {
        masterFields.push(`price = $${masterParamIndex}`);
        masterValues.push(price);
        masterParamIndex++;
      }

      if (masterFields.length > 0) {
        const masterQuery = `UPDATE tbl_master SET ${masterFields.join(", ")} WHERE p_id = $1`;
        await pool.query(masterQuery, masterValues);
      }
    }

    return new Response(JSON.stringify({ 
      updated: result.rows[0],
      table_updated: tableName
    }), { status: 200 });

  } catch (err) {
    console.error("Update error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}