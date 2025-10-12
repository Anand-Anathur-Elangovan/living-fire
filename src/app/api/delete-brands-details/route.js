import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function DELETE(request) {
  try {
    const { brand_id } = await request.json();
    
    const query = 'DELETE FROM public.tbl_brands WHERE brand_id = $1';
    await pool.query(query, [brand_id]);
    
    return NextResponse.json({
      success: true,
      message: 'Brand deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete brand' },
      { status: 500 }
    );
  }
}