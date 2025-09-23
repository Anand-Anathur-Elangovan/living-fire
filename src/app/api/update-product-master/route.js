// import pool from "@/src/helper/db/db";

// export async function PUT(req) {
//   try {
//     const { p_id, ptype_name, short_desc, price } = await req.json();
    
//     if (!p_id) {
//       return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
//     }

//     // Determine which table to update based on ptype_name
//     let tableName = 'tbl_master';
//     switch (ptype_name) {
//       case 'Outdoor':
//         tableName = 'tbl_outdoor';
//         break;
//       case 'Fireplace Mantels':
//         tableName = 'tbl_fireplace_mantel';
//         break;
//       case 'Cast Iron':
//         tableName = 'tbl_cast_iron';
//         break;
//       case 'Fire Tools':
//         tableName = 'tbl_firetools';
//         break;
//       case 'Fireplace':
//         tableName = 'tbl_fireplace';
//         break;
//       default:
//         tableName = 'tbl_master';
//     }

//     // Build update query
//     const fields = [];
//     const values = [p_id];
//     let paramIndex = 2;

//     if (short_desc !== undefined) {
//       fields.push(`short_desc = $${paramIndex}`);
//       values.push(JSON.stringify(short_desc));
//       paramIndex++;
//     }

//     if (price !== undefined) {
//       fields.push(`price = $${paramIndex}`);
//       values.push(price);
//       paramIndex++;
//     }

//     if (fields.length === 0) {
//       return new Response(JSON.stringify({ error: "No fields to update" }), { status: 400 });
//     }

//     const query = `UPDATE ${tableName} SET ${fields.join(", ")} WHERE p_id = $1 RETURNING *`;
    
//     // Update the specific table
//     const result = await pool.query(query, values);

//     // Also update tbl_master for consistency if we updated a different table
//     if (tableName !== 'tbl_master') {
//       const masterFields = [];
//       const masterValues = [p_id];
//       let masterParamIndex = 2;

//       if (short_desc !== undefined) {
//         masterFields.push(`short_desc = $${masterParamIndex}`);
//         masterValues.push(JSON.stringify(short_desc));
//         masterParamIndex++;
//       }

//       if (price !== undefined) {
//         masterFields.push(`price = $${masterParamIndex}`);
//         masterValues.push(price);
//         masterParamIndex++;
//       }

//       if (masterFields.length > 0) {
//         const masterQuery = `UPDATE tbl_master SET ${masterFields.join(", ")} WHERE p_id = $1`;
//         await pool.query(masterQuery, masterValues);
//       }
//     }

//     return new Response(JSON.stringify({ 
//       updated: result.rows[0],
//       table_updated: tableName
//     }), { status: 200 });

//   } catch (err) {
//     console.error("Update error:", err);
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }


import pool from "@/src/helper/db/db";

export async function PUT(req) {
  try {
    const body = await req.json();
    const {
      p_id,
      ptype_name,
      short_desc,
      price,
      // New fields
      name,
      sku,
      brand_id,
      is_active,
      fueltype_id,
      glass_orientation_ids,
      installation_id,
      range_id,
      product_slug,
      brand_slug
    } = body;
    
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

    // Build update query for the specific table
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

    // Add new fields to update
    if (name !== undefined) {
      fields.push(`name = $${paramIndex}`);
      values.push(name);
      paramIndex++;
    }

    if (sku !== undefined) {
      fields.push(`sku = $${paramIndex}`);
      values.push(sku);
      paramIndex++;
    }

    if (brand_id !== undefined) {
      fields.push(`brand_id = $${paramIndex}`);
      values.push(brand_id);
      paramIndex++;
    }

    if (is_active !== undefined) {
      fields.push(`is_active = $${paramIndex}`);
      values.push(is_active);
      paramIndex++;
    }

    if (fueltype_id !== undefined) {
      fields.push(`fueltype_id = $${paramIndex}`);
      values.push(fueltype_id);
      paramIndex++;
    }

    if (glass_orientation_ids !== undefined) {
      fields.push(`glass_orientation_ids = $${paramIndex}`);
      values.push(glass_orientation_ids);
      paramIndex++;
    }

    if (installation_id !== undefined) {
      fields.push(`installation_id = $${paramIndex}`);
      values.push(installation_id);
      paramIndex++;
    }

    if (range_id !== undefined) {
      fields.push(`range_id = $${paramIndex}`);
      values.push(range_id);
      paramIndex++;
    }

    if (ptype_name !== undefined) {
      fields.push(`ptype_name = $${paramIndex}`);
      values.push(ptype_name);
      paramIndex++;
    }

    if (product_slug !== undefined) {
      fields.push(`product_slug = $${paramIndex}`);
      values.push(product_slug);
      paramIndex++;
    }

    if (brand_slug !== undefined) {
      fields.push(`brand_slug = $${paramIndex}`);
      values.push(brand_slug);
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

      // Add all fields to update in master table
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

      if (name !== undefined) {
        masterFields.push(`name = $${masterParamIndex}`);
        masterValues.push(name);
        masterParamIndex++;
      }

      if (sku !== undefined) {
        masterFields.push(`sku = $${masterParamIndex}`);
        masterValues.push(sku);
        masterParamIndex++;
      }

      if (brand_id !== undefined) {
        masterFields.push(`brand_id = $${masterParamIndex}`);
        masterValues.push(brand_id);
        masterParamIndex++;
      }

      if (is_active !== undefined) {
        masterFields.push(`is_active = $${masterParamIndex}`);
        masterValues.push(is_active);
        masterParamIndex++;
      }

      if (fueltype_id !== undefined) {
        masterFields.push(`fueltype_id = $${masterParamIndex}`);
        masterValues.push(fueltype_id);
        masterParamIndex++;
      }

      if (glass_orientation_ids !== undefined) {
        masterFields.push(`glass_orientation_ids = $${masterParamIndex}`);
        masterValues.push(glass_orientation_ids);
        masterParamIndex++;
      }

      if (installation_id !== undefined) {
        masterFields.push(`installation_id = $${masterParamIndex}`);
        masterValues.push(installation_id);
        masterParamIndex++;
      }

      if (range_id !== undefined) {
        masterFields.push(`range_id = $${masterParamIndex}`);
        masterValues.push(range_id === ""? null : range_id);
        masterParamIndex++;
      }

      if (ptype_name !== undefined) {
        masterFields.push(`ptype_name = $${masterParamIndex}`);
        masterValues.push(ptype_name);
        masterParamIndex++;
      }

      if (product_slug !== undefined) {
        masterFields.push(`product_slug = $${masterParamIndex}`);
        masterValues.push(product_slug);
        masterParamIndex++;
      }

      if (brand_slug !== undefined) {
        masterFields.push(`brand_slug = $${masterParamIndex}`);
        masterValues.push(brand_slug);
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
