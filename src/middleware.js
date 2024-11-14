// middleware.js

import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  // Set CORS headers to allow requests from specific origins
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Preflight requests handling for OPTIONS method
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: response.headers });
  }

  return response;
}
