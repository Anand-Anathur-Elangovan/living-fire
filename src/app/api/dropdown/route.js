import pool from "@/src/helper/db/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get('brand');
    const type = searchParams.get('type');
    
    // Object to store all dropdown data
    const dropdownData = {};

    // Fetch brands data (with optional filtering)
    if (!brand || brand === 'true') {
      let brandQuery = `SELECT brand_id, brand_name, brand_desc, slug, is_active FROM public.tbl_brands`;
      let brandParams = [];
      
      if (brand === 'active') {
        brandQuery += ` WHERE is_active = true`;
      }
      
      brandQuery += ` ORDER BY brand_name`;
      const brandResult = await pool.query(brandQuery, brandParams);
      dropdownData.brands = brandResult.rows;
    }

    // Fetch fueltype data (with optional filtering)
    if (!type || type === 'fueltype') {
      let fueltypeQuery = `SELECT fueltype_id, fueltype_name, is_active, slug FROM public.tbl_fueltype`;
      let fueltypeParams = [];
      
      if (type === 'fueltype_active') {
        fueltypeQuery += ` WHERE is_active = true`;
      }
      
      fueltypeQuery += ` ORDER BY fueltype_name`;
      const fueltypeResult = await pool.query(fueltypeQuery, fueltypeParams);
      dropdownData.fueltypes = fueltypeResult.rows;
    }

    // Fetch glass orientation data (with optional filtering)
    if (!type || type === 'glass_orientation') {
      let glassQuery = `SELECT glass_orientation_id, glass_orientation_name, is_active, slug FROM public.tbl_glass_orientation`;
      let glassParams = [];
      
      if (type === 'glass_orientation_active') {
        glassQuery += ` WHERE is_active = true`;
      }
      
      glassQuery += ` ORDER BY glass_orientation_name`;
      const glassResult = await pool.query(glassQuery, glassParams);
      dropdownData.glass_orientations = glassResult.rows;
    }

    // Fetch installation data (with optional filtering)
    if (!type || type === 'installation') {
      let installationQuery = `SELECT installation_id, installation_name, is_active, slug FROM public.tbl_installation`;
      let installationParams = [];
      
      if (type === 'installation_active') {
        installationQuery += ` WHERE is_active = true`;
      }
      
      installationQuery += ` ORDER BY installation_name`;
      const installationResult = await pool.query(installationQuery, installationParams);
      dropdownData.installations = installationResult.rows;
    }

    // Fetch range data (with optional filtering)
    if (!type || type === 'range') {
      let rangeQuery = `SELECT range_id, range_name, is_active, slug FROM public.tbl_range`;
      let rangeParams = [];
      
      if (type === 'range_active') {
        rangeQuery += ` WHERE is_active = true`;
      }
      
      rangeQuery += ` ORDER BY range_name`;
      const rangeResult = await pool.query(rangeQuery, rangeParams);
      dropdownData.ranges = rangeResult.rows;
    }

    // Fetch product type data (with optional filtering)
    if (!type || type === 'product_type') {
      let ptypeQuery = `SELECT ptype_id, ptype_name, is_active, slug FROM public.tbl_product_type`;
      let ptypeParams = [];
      
      if (type === 'product_type_active') {
        ptypeQuery += ` WHERE is_active = true`;
      }
      
      ptypeQuery += ` ORDER BY ptype_name`;
      const ptypeResult = await pool.query(ptypeQuery, ptypeParams);
      dropdownData.product_types = ptypeResult.rows;
    }

    return new Response(JSON.stringify(dropdownData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Optional: POST method if you prefer to use request body instead of query parameters
export async function POST(req) {
  try {
    const body = await req.json();
    const { brand, type } = body;
    
    // Reuse the same logic as GET but with body parameters
    const fakeReq = {
      url: `http://localhost/api/dropdown?${new URLSearchParams({ brand, type })}`
    };
    
    return await GET(fakeReq);
    
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}