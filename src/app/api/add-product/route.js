// app/api/add-product/route.js
import { NextResponse } from 'next/server';
import pool from "@/src/helper/db/db";

export async function POST(request) {
  try {
    const { sku, ptype_id, is_active, created_by } = await request.json();

    // Validate required fields
    if (!sku || !ptype_id) {
      return NextResponse.json(
        { error: 'SKU and product type are required' },
        { status: 400 }
      );
    }

    // Check if product with this SKU already exists
    const checkQuery = 'SELECT p_id FROM tbl_product WHERE p_sku = $1';
    const checkResult = await pool.query(checkQuery, [sku]);
    
    if (checkResult.rows.length > 0) {
      return NextResponse.json(
        { error: 'Product with this SKU already exists' },
        { status: 409 }
      );
    }

    // Insert into tbl_product
    const query = `
      INSERT INTO tbl_product (p_sku, ptype_id, is_active, created_by, created_date) 
      VALUES ($1, $2, $3, $4, NOW()) 
      RETURNING p_id
    `;
    
    const values = [
      sku, 
      ptype_id, 
      is_active !== undefined ? is_active : true, 
      created_by || 'admin'
    ];
    
    const result = await pool.query(query, values);
    
    return NextResponse.json({ 
      p_id: result.rows[0].p_id, 
      success: true 
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}