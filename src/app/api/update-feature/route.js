import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function PUT(request) {
  try {
    const { features } = await request.json();

    if (!features || !Array.isArray(features)) {
      return NextResponse.json(
        { success: false, error: 'Invalid features data' },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    await client.query('BEGIN');

    try {
      // Deactivate all existing features
      await client.query('UPDATE public.tbl_feature SET is_active = false');

     for (const feature of features) {
  const {
    product_name,
    product_image,
    brand_name,
    product_short_description,
    brand_slug,
    product_slug,
    route,
    feature_id
  } = feature;

  const productImageJson =
    typeof product_image === 'object'
      ? JSON.stringify(product_image)
      : JSON.stringify({ src: product_image });

  if (!feature_id || feature_id.toString().startsWith('new-')) {
    // Insert new feature
    await client.query(
      `INSERT INTO public.tbl_feature 
       (product_name, product_image, brand_name, product_short_description, 
        brand_slug, product_slug, route, is_active, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        product_name,
        productImageJson,
        brand_name,
        product_short_description,
        brand_slug,
        product_slug,
        route,
        true,
        'admin'
      ]
    );
  } else {
    // Update existing feature
    await client.query(
      `UPDATE public.tbl_feature 
       SET product_name = $1, product_image = $2, brand_name = $3, 
           product_short_description = $4, brand_slug = $5, 
           product_slug = $6, route = $7, is_active = $8 
       WHERE feature_id = $9`,
      [
        product_name,
        productImageJson,
        brand_name,
        product_short_description,
        brand_slug,
        product_slug,
        route,
        true,
        feature_id
      ]
    );
  }
}


      await client.query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Features updated successfully'
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating features:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update features' },
      { status: 500 }
    );
  }
}
