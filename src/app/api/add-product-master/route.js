
// app/api/add-product-master/route.js
import { NextResponse } from "next/server";
import pool from "@/src/helper/db/db";

export async function POST(request) {
  const client = await pool.connect();
  
  try {
    const {
      p_id,
      name,
      sku,
      brand_id,
      is_active,
      fueltype_id,
      glass_orientation_ids,
      installation_id,
      range_id,
      ptype_name,
      product_slug,
      brand_slug,
      price,
      made_country,
      short_desc,
      hero_image,
      product_desc,
      product_details,
      specifications,
      catalogue_image,
    } = await request.json();

    // Validate required fields
    if (!p_id || !name || !sku || !brand_id || !ptype_name || !product_slug) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    await client.query('BEGIN');

    // Check if product slug already exists in master_table
    const checkSlugQuery = 'SELECT p_id FROM tbl_master WHERE product_slug = $1';
    const slugResult = await client.query(checkSlugQuery, [product_slug]);
    
    if (slugResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Get brand details for brand_name and brand_desc
    const brandQuery = "SELECT brand_name, brand_desc FROM tbl_brands WHERE brand_id = $1";
    const brandResult = await client.query(brandQuery, [brand_id]);

    if (brandResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ error: "Invalid brand ID" }, { status: 400 });
    }

    const { brand_name, brand_desc } = brandResult.rows[0];

    // Get fueltype name if fueltype_id is provided
    let fueltype_name = null;
    if (fueltype_id) {
      const fueltypeQuery = "SELECT fueltype_name FROM tbl_fueltype WHERE fueltype_id = $1";
      const fueltypeResult = await client.query(fueltypeQuery, [fueltype_id]);
      fueltype_name = fueltypeResult.rows[0]?.fueltype_name || null;
    }

    const insertMasterQuery = `
      INSERT INTO tbl_master (
        p_id, sku, short_desc, brand_id, range_id, fueltype_id, price, 
        hero_image, is_active, created_by, created_date, product_desc, 
        product_details, specifications, made_country, name, installation_id, 
        glass_orientation_ids, catalogue_image, ptype_name, fueltype_name, 
        brand_name, brand_desc, product_slug, brand_slug
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
      ) RETURNING *
    `;

    const values = [
      p_id,
      sku,
      JSON.stringify(short_desc || []),
      brand_id,
      range_id || null,
      fueltype_id || null,
      price || 0,
      JSON.stringify(hero_image || []),
      is_active !== undefined ? is_active : true,
      "admin",
      JSON.stringify(product_desc || []),
      JSON.stringify(product_details || []),
      JSON.stringify(specifications || []),
      made_country || null,
      name,
      installation_id || null,
      glass_orientation_ids || null,
      JSON.stringify(catalogue_image || []),
      ptype_name,
      fueltype_name,
      brand_name,
      brand_desc,
      product_slug,
      brand_slug,
    ];

    const result = await client.query(insertMasterQuery, values);

    const tableMappings = {
      Fireplace: "tbl_fireplace",
      "Fire Tools": "tbl_firetools",
      Outdoor: "tbl_outdoor",
      "Fireplace Mantels": "tbl_fireplace_mantel",
      "Cast Iron": "tbl_cast_iron",
    };

    const targetTable = tableMappings[ptype_name];

    if (targetTable) {
      // Also check if slug exists in the target table (optional but recommended)
      const checkTargetSlugQuery = `SELECT p_id FROM ${targetTable} WHERE product_slug = $1`;
      const targetSlugResult = await client.query(checkTargetSlugQuery, [product_slug]);
      
      if (targetSlugResult.rows.length > 0) {
        await client.query('ROLLBACK');
        return NextResponse.json(
          { error: "Product with this slug already exists in the target table" },
          { status: 409 }
        );
      }

      const insertTargetQuery = `
        INSERT INTO ${targetTable} (
          p_id, sku, short_desc, brand_id, range_id, fueltype_id, price, 
          hero_image, is_active, created_by, created_date, product_desc, 
          product_details, specifications, made_country, name, installation_id, 
          glass_orientation_ids, catalogue_image, ptype_name, fueltype_name, 
          brand_name, brand_desc, product_slug, brand_slug
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
        )
      `;

      await client.query(insertTargetQuery, values);
    }

    await client.query('COMMIT');

    return NextResponse.json(
      {
        product: result.rows[0],
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error adding product to master table:", error);
    return NextResponse.json(
      { error: "Failed to add product to master table" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
