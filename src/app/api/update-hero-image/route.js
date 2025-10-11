import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

// GET - Fetch all hero images
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM tbl_hero_image ORDER BY created_on DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}

// POST - Add new hero image
export async function POST(request) {
  try {
    const { image_src, image_name, created_by } = await request.json();

    if (!image_src || !image_name) {
      return NextResponse.json(
        { error: 'Image source and name are required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO tbl_hero_image (image_src, image_name, created_by) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [image_src, image_name, created_by || 'admin']
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding hero image:', error);
    return NextResponse.json(
      { error: 'Failed to add hero image' },
      { status: 500 }
    );
  }
}

// PUT - Update hero image
export async function PUT(request) {
  try {
    const { id, image_src, image_name, is_active } = await request.json();

    // Validate ID is a valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid numeric ID is required' },
        { status: 400 }
      );
    }

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (image_src !== undefined) {
      updates.push(`image_src = $${paramCount}`);
      values.push(image_src);
      paramCount++;
    }

    if (image_name !== undefined) {
      updates.push(`image_name = $${paramCount}`);
      values.push(image_name);
      paramCount++;
    }

    if (is_active !== undefined) {
      updates.push(`is_active = $${paramCount}`);
      values.push(is_active);
      paramCount++;
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(parseInt(id));

    const result = await pool.query(
      `UPDATE tbl_hero_image 
       SET ${updates.join(', ')} 
       WHERE id = $${paramCount} 
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Hero image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating hero image:', error);
    return NextResponse.json(
      { error: 'Failed to update hero image' },
      { status: 500 }
    );
  }
}

// DELETE - Remove hero image
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid numeric ID is required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'DELETE FROM tbl_hero_image WHERE id = $1 RETURNING *',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Hero image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Hero image deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero image:', error);
    return NextResponse.json(
      { error: 'Failed to delete hero image' },
      { status: 500 }
    );
  }
}