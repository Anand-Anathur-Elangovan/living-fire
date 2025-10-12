import { NextResponse } from 'next/server';
import pool from '@/src/helper/db/db';

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        const query = 'DELETE FROM tbl_collection WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Collection not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({
            success: true,
            message: 'Collection deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting collection:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}