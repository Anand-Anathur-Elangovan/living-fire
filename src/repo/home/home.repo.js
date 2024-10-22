"use server";

import pool from "../../helper/db/db.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getCollectionsRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

export const getFeaturedRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

export const getBrandsRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

export const getUserFeedbackRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result?.rows;
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.tblProduct.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const searchProducts = async (searchTerm, brandIds, ptypeIds) => {
  try {
    const products = await prisma.tblProduct.findMany({
      where: {
        OR: [
          { p_name: { contains: searchTerm, mode: "insensitive" } },
          { p_code: { contains: searchTerm, mode: "insensitive" } },
          // { p_sub_desc1: { contains: searchTerm, mode: "insensitive" } },
          // { p_sub_desc2: { contains: searchTerm, mode: "insensitive" } },
          // { p_sub_desc3: { contains: searchTerm, mode: "insensitive" } },
        ],
        AND: [
          brandIds?.length ? { brand_id: { in: brandIds } } : {},
          ptypeIds?.length ? { ptype_id: { in: ptypeIds } } : {},
        ],
        is_active: true,
      },
      select: {
        p_id: true,
        p_name: true,
        p_code: true,
        p_desc: true,
        p_cost: true,
        p_stock: true,
        brand_id: true,
        ptype_id: true,
        p_spec_images: true,
        p_main_images: true,
      },
    });

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
