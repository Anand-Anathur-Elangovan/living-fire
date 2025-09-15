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