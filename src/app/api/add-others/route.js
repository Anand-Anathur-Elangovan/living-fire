// // app/api/add-others/route.js
// import { NextResponse } from 'next/server';
// import { query } from '@/src/lib/db';
// import pool from "@/src/helper/db/db";

// export async function POST(request) {
//   try {
//     const { table, data } = await request.json();
    
//     // Validate table name
//     const validTables = ['tbl_brands', 'tbl_glass_orientation', 'tbl_installation', 'tbl_fueltype'];
//     if (!validTables.includes(table)) {
//       return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
//     }

//     // Generate slug from name
//     const slug = generateSlug(data.name);
    
//     let queryString;
//     let values;

//     switch (table) {
//       case 'tbl_brands':
//         queryString = `
//           INSERT INTO ${table} 
//           (brand_name, brand_logo_url, brand_desc, slug, created_by, created_date, is_active)
//           VALUES ($1, $2, $3, $4, $5, NOW(), true)
//           RETURNING *
//         `;
//         values = [data.name, data.logo_url || null, data.description || null, slug, data.created_by || 'system'];
//         break;

//       case 'tbl_glass_orientation':
//         queryString = `
//           INSERT INTO ${table} 
//           (glass_orientation_name, slug, created_by, created_date, is_active)
//           VALUES ($1, $2, $3, NOW(), true)
//           RETURNING *
//         `;
//         values = [data.name, slug, data.created_by || 'system'];
//         break;

//       case 'tbl_installation':
//         queryString = `
//           INSERT INTO ${table} 
//           (installation_name, slug, created_by, created_date, is_active)
//           VALUES ($1, $2, $3, NOW(), true)
//           RETURNING *
//         `;
//         values = [data.name, slug, data.created_by || 'system'];
//         break;

//       case 'tbl_fueltype':
//         queryString = `
//           INSERT INTO ${table} 
//           (fueltype_name, fueltype_desc, slug, created_by, created_date, is_active)
//           VALUES ($1, $2, $3, $4, NOW(), true)
//           RETURNING *
//         `;
//         values = [data.name, data.description || null, slug, data.created_by || 'system'];
//         break;

//       default:
//         return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
//     }

//     const result = await query(queryString, values);
//     return NextResponse.json({ success: true, data: result.rows[0] });

//   } catch (error) {
//     console.error('Error creating record:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function PUT(request) {
//   try {
//     const { table, id, data } = await request.json();
    
//     const validTables = ['tbl_brands', 'tbl_glass_orientation', 'tbl_installation', 'tbl_fueltype'];
//     if (!validTables.includes(table)) {
//       return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
//     }

//     // Deactivate instead of delete
//     let queryString;
//     let values;

//     switch (table) {
//       case 'tbl_brands':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE brand_id = $2 RETURNING *`;
//         break;
//       case 'tbl_glass_orientation':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE glass_orientation_id = $2 RETURNING *`;
//         break;
//       case 'tbl_installation':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE installation_id = $2 RETURNING *`;
//         break;
//       case 'tbl_fueltype':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE fueltype_id = $2 RETURNING *`;
//         break;
//       default:
//         return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
//     }

//     values = [data.updated_by || 'system', id];
//     const result = await query(queryString, values);
    
//     return NextResponse.json({ success: true, data: result.rows[0] });

//   } catch (error) {
//     console.error('Error deactivating record:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const table = searchParams.get('table');
    
//     const validTables = ['tbl_brands', 'tbl_glass_orientation', 'tbl_installation', 'tbl_fueltype'];
//     if (!validTables.includes(table)) {
//       return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
//     }

//     const queryString = `SELECT * FROM ${table} WHERE is_active = true ORDER BY created_date DESC`;
//     const result = await query(queryString);
    
//     return NextResponse.json({ success: true, data: result.rows });

//   } catch (error) {
//     console.error('Error fetching records:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// app/api/add-others/route.js
import { NextResponse } from 'next/server';
import pool from "@/src/helper/db/db";
import { generateSlug } from '@/src/helper/slug/slug';

export async function POST(request) {
  let client;
  try {
    const { table, data } = await request.json();
    
    // Validate table name
    const validTables = ['tbl_brands', 'tbl_glass_orientation', 'tbl_installation', 'tbl_fueltype'];
    if (!validTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    // Validate required fields
    if (!data.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Generate slug from name
    const slug = generateSlug(data.name);
    
    let queryString;
    let values;

    // Get a client from the pool
    client = await pool.connect();

    switch (table) {
      case 'tbl_brands':
        queryString = `
          INSERT INTO ${table} 
          (brand_name, brand_logo_url, brand_desc, slug, created_by, created_date, is_active)
          VALUES ($1, $2, $3, $4, $5, NOW(), true)
          RETURNING *
        `;
        values = [data.name, data.logo_url || null, data.description || null, slug, data.created_by || 'system'];
        break;

      case 'tbl_glass_orientation':
        queryString = `
          INSERT INTO ${table} 
          (glass_orientation_name, slug, created_by, created_date, is_active)
          VALUES ($1, $2, $3, NOW(), true)
          RETURNING *
        `;
        values = [data.name, slug, data.created_by || 'system'];
        break;

      case 'tbl_installation':
        queryString = `
          INSERT INTO ${table} 
          (installation_name, slug, created_by, created_date, is_active)
          VALUES ($1, $2, $3, NOW(), true)
          RETURNING *
        `;
        values = [data.name, slug, data.created_by || 'system'];
        break;

      case 'tbl_fueltype':
        queryString = `
          INSERT INTO ${table} 
          (fueltype_name, fueltype_desc, slug, created_by, created_date, is_active)
          VALUES ($1, $2, $3, $4, NOW(), true)
          RETURNING *
        `;
        values = [data.name, data.description || null, slug, data.created_by || 'system'];
        break;

      default:
        return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }

    const result = await client.query(queryString, values);
    
    return NextResponse.json({ 
      success: true, 
      data: result.rows[0] 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}

// export async function PUT(request) {
//   let client;
//   try {
//     const { table, id, data } = await request.json();
    
//     const validTables = ['tbl_brands', 'tbl_glass_orientation', 'tbl_installation', 'tbl_fueltype'];
//     if (!validTables.includes(table)) {
//       return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
//     }

//     if (!id) {
//       return NextResponse.json({ error: 'ID is required' }, { status: 400 });
//     }

//     // Deactivate instead of delete
//     let queryString;
//     let values;

//     // Get a client from the pool
//     client = await pool.connect();

//     switch (table) {
//       case 'tbl_brands':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE brand_id = $2 RETURNING *`;
//         break;
//       case 'tbl_glass_orientation':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE glass_orientation_id = $2 RETURNING *`;
//         break;
//       case 'tbl_installation':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE installation_id = $2 RETURNING *`;
//         break;
//       case 'tbl_fueltype':
//         queryString = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE fueltype_id = $2 RETURNING *`;
//         break;
//       default:
//         return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
//     }

//     values = [data.updated_by || 'system', id];
//     const result = await client.query(queryString, values);
    
//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
//     }
    
//     return NextResponse.json({ 
//       success: true, 
//       data: result.rows[0] 
//     });

//   } catch (error) {
//     console.error('Error deactivating record:', error);
//     return NextResponse.json({ 
//       error: 'Internal server error' 
//     }, { status: 500 });
//   } finally {
//     // Release the client back to the pool
//     if (client) {
//       client.release();
//     }
//   }
// }

// app/api/add-others/route.js - Add this new PUT method for editing
export async function PUT(request) {
  let client;
  try {
    const { action, table, id, data } = await request.json();
    
    const validTables = ['tbl_brands', 'tbl_glass_orientation', 'tbl_installation', 'tbl_fueltype'];
    if (!validTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Get a client from the pool
    client = await pool.connect();

    if (action === 'deactivate') {
      // Deactivate logic (existing)
      let deactivateQuery;
      switch (table) {
        case 'tbl_brands':
          deactivateQuery = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE brand_id = $2 RETURNING *`;
          break;
        case 'tbl_glass_orientation':
          deactivateQuery = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE glass_orientation_id = $2 RETURNING *`;
          break;
        case 'tbl_installation':
          deactivateQuery = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE installation_id = $2 RETURNING *`;
          break;
        case 'tbl_fueltype':
          deactivateQuery = `UPDATE ${table} SET is_active = false, updated_by = $1, updated_date = NOW() WHERE fueltype_id = $2 RETURNING *`;
          break;
        default:
          return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
      }

      const deactivateValues = [data.updated_by || 'system', id];
      const deactivateResult = await client.query(deactivateQuery, deactivateValues);
      
      if (deactivateResult.rows.length === 0) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
      
      return NextResponse.json({ 
        success: true, 
        data: deactivateResult.rows[0] 
      });

    } else if (action === 'edit') {
      // Edit/Update logic (new)
      if (!data.name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }

      // Generate new slug if name changed
      const slug = generateSlug(data.name);
      
      let updateQuery;
      let updateValues;

      switch (table) {
        case 'tbl_brands':
          updateQuery = `
            UPDATE ${table} 
            SET brand_name = $1, brand_logo_url = $2, brand_desc = $3, slug = $4, updated_by = $5, updated_date = NOW()
            WHERE brand_id = $6
            RETURNING *
          `;
          updateValues = [data.name, data.logo_url || null, data.description || null, slug, data.updated_by || 'system', id];
          break;

        case 'tbl_glass_orientation':
          updateQuery = `
            UPDATE ${table} 
            SET glass_orientation_name = $1, slug = $2, updated_by = $3, updated_date = NOW()
            WHERE glass_orientation_id = $4
            RETURNING *
          `;
          updateValues = [data.name, slug, data.updated_by || 'system', id];
          break;

        case 'tbl_installation':
          updateQuery = `
            UPDATE ${table} 
            SET installation_name = $1, slug = $2, updated_by = $3, updated_date = NOW()
            WHERE installation_id = $4
            RETURNING *
          `;
          updateValues = [data.name, slug, data.updated_by || 'system', id];
          break;

        case 'tbl_fueltype':
          updateQuery = `
            UPDATE ${table} 
            SET fueltype_name = $1, fueltype_desc = $2, slug = $3, updated_by = $4, updated_date = NOW()
            WHERE fueltype_id = $5
            RETURNING *
          `;
          updateValues = [data.name, data.description || null, slug, data.updated_by || 'system', id];
          break;

        default:
          return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
      }

      const updateResult = await client.query(updateQuery, updateValues);
      
      if (updateResult.rows.length === 0) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
      
      return NextResponse.json({ 
        success: true, 
        data: updateResult.rows[0] 
      });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in PUT operation:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}

export async function GET(request) {
  let client;
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table');
    
    const validTables = ['tbl_brands', 'tbl_glass_orientation', 'tbl_installation', 'tbl_fueltype'];
    if (!validTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    // Get a client from the pool
    client = await pool.connect();

    const queryString = `SELECT * FROM ${table} WHERE is_active = true ORDER BY created_date DESC`;
    const result = await client.query(queryString);
    
    return NextResponse.json({ 
      success: true, 
      data: result.rows 
    });

  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}