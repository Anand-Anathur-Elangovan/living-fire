// app/api/add-product-master/route.js
import { NextResponse } from 'next/server';
import pool from "@/src/helper/db/db";

export async function POST(request) {
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
      catalogue_image
    } = await request.json();

    // Validate required fields
    if (!p_id || !name || !sku || !brand_id || !ptype_name) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Get brand details for brand_name and brand_desc
    const brandQuery = 'SELECT brand_name, brand_desc FROM brands WHERE brand_id = $1';
    const brandResult = await pool.query(brandQuery, [brand_id]);
    
    if (brandResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid brand ID' },
        { status: 400 }
      );
    }
    
    const { brand_name, brand_desc } = brandResult.rows[0];

    // Get fueltype name if fueltype_id is provided
    let fueltype_name = null;
    if (fueltype_id) {
      const fueltypeQuery = 'SELECT fueltype_name FROM fueltypes WHERE fueltype_id = $1';
      const fueltypeResult = await pool.query(fueltypeQuery, [fueltype_id]);
      fueltype_name = fueltypeResult.rows[0]?.fueltype_name || null;
    }

    const query = `
      INSERT INTO master_table (
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
      'admin', // This should be dynamic in a real app
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
      brand_slug
    ];

    const result = await pool.query(query, values);
    
    return NextResponse.json({ 
      product: result.rows[0], 
      success: true 
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding product to master table:', error);
    return NextResponse.json(
      { error: 'Failed to add product to master table' },
      { status: 500 }
    );
  }
}