import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function GET() {
  try {
    const query = `
      SELECT brand_id, brand_name, brand_logo_url, is_active, created_by, 
             created_date, updated_by, updated_date, brand_desc, slug
      FROM public.tbl_brands
      WHERE is_active = true AND brand_logo_url IS NOT NULL
      ORDER BY brand_name
    `;
    
    const result = await pool.query(query);
    
    return NextResponse.json({
      success: true,
      data: result.rows
    });
    
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}