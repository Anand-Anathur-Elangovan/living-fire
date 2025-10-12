import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function GET() {
    try {
        const query = `
            SELECT 
                c.*,
                f.fueltype_name
            FROM tbl_collection c
            LEFT JOIN tbl_fueltype f ON c.fueltype_id = f.fueltype_id
            ORDER BY c.created_on DESC
        `;
        
        const result = await pool.query(query);
        
        return NextResponse.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching collection:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}