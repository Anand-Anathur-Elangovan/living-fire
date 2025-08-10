"use server";
// import { PrismaClient } from "@prisma/client";
import pool from "@/src/helper/db/db";
import { cookies } from "next/headers";

// const prisma = new PrismaClient();

export const addContactUsData = async (payload) => {
  const query = `SELECT * FROM fn_insert_contactus(
    ${payload.loggedEmail?"'"+payload.loggedEmail+"'":null},
    ${payload.firstName?"'"+payload.firstName+"'":null},
    ${payload.lastName?"'"+payload.lastName+"'":null},
    ${payload.phoneNumber?"'"+payload.phoneNumber+"'":null},
    ${payload.email?"'"+payload.email+"'":null},
    ${payload.deliveryOption?"'"+payload.deliveryOption+"'":null},
    ${payload.streetAddress?"'"+payload.streetAddress+"'":null},
    ${payload.suburb?"'"+payload.suburb+"'":null},
    ${payload.state?"'"+payload.state+"'":null},
    ${payload.postcode?"'"+payload.postcode+"'":null},
    ${payload.message?"'"+payload.message+"'":null},
    ${payload.brand?payload.brand:null},
    ${payload.product? payload.product :null},
    ${payload.industry?"'"+payload.industry+"'":null},
    ${payload.serialNumber?"'"+payload.serialNumber+"'":null},
    ${payload.tab?"'"+payload.tab  +"'":null},
    ${payload.filelink?"'"+payload.filelink  +"'":null}
  )`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  } 
};
 
