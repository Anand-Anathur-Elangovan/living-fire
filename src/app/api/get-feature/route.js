import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    const result = await client.query(
      `SELECT feature_id, product_name, product_image, brand_name, 
              product_short_description, brand_slug, product_slug, route, 
              is_active, created_on, created_by 
       FROM tbl_feature 
       WHERE is_active = true 
       ORDER BY feature_id 
       LIMIT 6`
    );
    
    client.release();
    
    return NextResponse.json({
      success: true,
      features: result.rows
    });
    
  } catch (error) {
    console.error('Error fetching features:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch features' },
      { status: 500 }
    );
  }
}