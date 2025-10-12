import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function POST(request) {
  try {
    const { brand_name, brand_desc, brand_logo_url, is_active, slug } = await request.json();
    
    const query = `
      INSERT INTO public.tbl_brands 
      (brand_name, brand_desc, brand_logo_url, is_active, slug, created_date)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;
    
    const values = [brand_name, brand_desc, brand_logo_url, is_active || true, slug];
    const result = await pool.query(query, values);
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create brand' },
      { status: 500 }
    );
  }
}