import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function PUT(request) {
    try {
        const { id, image_src, image_name, title, description, route, fueltype_id } = await request.json();
        
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        const query = `
            UPDATE tbl_collection 
            SET 
                image_src = $1,
                image_name = $2,
                title = $3,
                description = $4,
                route = $5,
                fueltype_id = $6,
                created_on = CURRENT_TIMESTAMP
            WHERE id = $7
            RETURNING *
        `;
        
        const values = [image_src, image_name, title, description, route, fueltype_id, id];
        const result = await pool.query(query, values);
        
        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Collection not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating collection:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { image_src, image_name, title, description, route, fueltype_id } = await request.json();
        
        const query = `
            INSERT INTO tbl_collection 
            (image_src, image_name, title, description, route, fueltype_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        
        const values = [image_src, image_name, title, description, route, fueltype_id];
        const result = await pool.query(query, values);
        
        return NextResponse.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating collection:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}