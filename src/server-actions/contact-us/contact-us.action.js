// contact-us.action.js

"use server";
import { addContactUsData as addContactUsDataRepo } from "../../repo/contact-us/contact-us.repo"; // Import your repo function
import { responsePayload } from "@/src/constants/reponse-payload";

// Server-side action to handle adding contact data and returning a formatted response
export const addContactUsData = async (payload) => {
  const result = await addContactUsDataRepo(payload).catch((err) => {
    return [];  // In case of error, return an empty array or handle it accordingly
  });
// console.log(result)
  return {
    ...responsePayload,
    success: true,
    message: "Inserted row",
    result: {
      result,
    },
  };
};
