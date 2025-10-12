import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function PUT(request) {
  try {
    const { brand_id, brand_name, brand_desc, brand_logo_url, is_active, slug } = await request.json();
    
    const query = `
      UPDATE public.tbl_brands 
      SET brand_name = $1, brand_desc = $2, brand_logo_url = $3, 
          is_active = $4, slug = $5, updated_date = NOW()
      WHERE brand_id = $6
      RETURNING *
    `;
    
    const values = [brand_name, brand_desc, brand_logo_url, is_active, slug, brand_id];
    const result = await pool.query(query, values);
    
    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error updating brand:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update brand' },
      { status: 500 }
    );
  }
}