import { NextResponse } from "next/server";
import pool from "@/src/helper/db/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rangeId = searchParams.get("range_id");
    const brandName = searchParams.get("brand_name");
    const pId = searchParams.get("p_id");
    let query = `
      SELECT 
        p_id, 
        name, 
        product_slug, 
        brand_id, 
        brand_name, 
        brand_slug, 
        product_desc, 
        range_id, 
        catalogue_image,
        hero_image
      FROM public.tbl_master
      WHERE 1=1
      AND is_active = true
    `;

    const params = [];
    if (pId) {
      query += ` AND p_id != $${params.length + 1}`;
      params.push(pId);
    }
    // First try to get products by range_id
    if (rangeId) {
      query += ` AND range_id = $${params.length + 1}`;
      params.push(rangeId);
    }

    query += " ORDER BY p_id LIMIT 6";

    const result = await pool.query(query, params);
    let products = result.rows;

    // If we don't have enough products and brand_name is provided, try to get more by brand
    if (products.length < 6 && brandName) {
      let brandQuery = `
        SELECT 
          p_id, 
          name, 
          product_slug, 
          brand_id, 
          brand_name, 
          brand_slug, 
          product_desc, 
          range_id, 
          catalogue_image,
          hero_image
        FROM public.tbl_master
        WHERE brand_name = $1
        AND is_active = true
      `;
      const brandParams = [brandName];
      let paramCounter = 2; // Start from $2 since $1 is brandName
      if (pId) {
        brandQuery += ` AND p_id != $${paramCounter}`;
        brandParams.push(pId);
        paramCounter++;
      }
      let excludedIds = []; // <-- Declare here

      // Exclude already fetched products if we have any
      if (products.length > 0) {
        excludedIds = products.map((p) => p.p_id); // <-- Assign here
         if (excludedIds.length > 0) {
      brandQuery += ` AND p_id NOT IN (${excludedIds
        .map((_, i) => `$${paramCounter + i}`)
        .join(",")})`;
      brandParams.push(...excludedIds);
    }
      }

      brandQuery += ` LIMIT ${6 - products.length}`;

    //   if (products.length > 0) {
    //     brandParams.push(...excludedIds);
    //   }

      const brandResult = await pool.query(brandQuery, brandParams);
      products = [...products, ...brandResult.rows];
    }

    // If we still don't have enough products and have both range_id and brand_name, try combination
    if (products.length < 6 && rangeId && brandName) {
      const combinationQuery = `
        SELECT 
          p_id, 
          name, 
          product_slug, 
          brand_id, 
          brand_name, 
          brand_slug, 
          product_desc, 
          range_id, 
          catalogue_image,
          hero_image
        FROM public.tbl_master
        WHERE range_id = $1 AND brand_name = $2
        AND is_active = true
        ${pId ? "AND p_id != $3" : ""}
        LIMIT ${6 - products.length}
      `;
      const combinationParams = [rangeId, brandName];
      if (pId) {
        combinationParams.push(pId);
      }

      const combinationResult = await pool.query(
        combinationQuery,
        combinationParams
      );
      products = [...products, ...combinationResult.rows];
    }

    // Format the products as required
    const formattedProducts = products.map((product) => {
      // Process product_desc - extract DESCRIPTION and combine into single paragraph
      let description = "";
      try {
        const descData =
          typeof product.product_desc === "string"
            ? JSON.parse(product.product_desc || "[]")
            : product.product_desc;
        const descriptionObj = descData.find(
          (item) =>
            item.name === "DESCRIPTION" ||
            item.name === "Description" ||
            item.name?.toLowerCase().includes("description")
        );
        if (descriptionObj && Array.isArray(descriptionObj.value)) {
          description = descriptionObj.value.join(" ");
        } else {
          description = "No description available";
        }
      } catch (error) {
        description = "No description available";
      }

      // Process image - prefer catalogue_image, fallback to hero_image
      let imageUrl = "";
      try {
        // First try catalogue_image
        if (product.catalogue_image) {
          const catalogueImages =
            product.catalogue_image || JSON?.parse(product.catalogue_image);
          if (Array.isArray(catalogueImages) && catalogueImages.length > 0) {
            imageUrl = catalogueImages[0].value;
          }
        }

        // If no catalogue image, try hero_image
        if (!imageUrl && product.hero_image) {
          const heroImages = JSON.parse(product.hero_image);
          if (Array.isArray(heroImages) && heroImages.length > 0) {
            imageUrl = heroImages[0].value;
          }
        }
      } catch (error) {
        console.error("Error parsing image data:", error);
      }

      return {
        p_id: product.p_id,
        image: imageUrl,
        title: product.name,
        description: description,
        name: product.name,
        brand_name: product.brand_name,
      };
    });

    return NextResponse.json({
      success: true,
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch featured products",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
