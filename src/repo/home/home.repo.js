"use server";

import pool from "../../helper/db/db.js";

export const getCollectionsRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result;
};

export const getFeaturedRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result;
};

export const getBrandsRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result;
};

export const getUserFeedbackRepo = async () => {
  const query = "SELECT * FROM fn_get_products(0,0,0)";
  const result = await pool
    .query(query)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
  return result;
};
