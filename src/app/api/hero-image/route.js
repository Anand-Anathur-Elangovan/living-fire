import { NextResponse } from "next/server";
import pool from "@/src/helper/db/db";

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM tbl_hero_image WHERE is_active = true ORDER BY created_on DESC'

    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching hero image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
