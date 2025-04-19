import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  // Log to check if middleware is being executed

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
   return new Response(null, { status: 204, headers: response.headers });
  }

  // Define URL alias mappings
  const urlAliases = {
    "/fireplace-brands/wood-yunca/regency-city-series-san-francisco-bay-40-gas-fireplace":
      "/product/427",
  };

  const url = req.nextUrl.clone();
  // Check if the requested path matches an alias
  if (urlAliases[url.pathname]) {
    url.pathname = urlAliases[url.pathname];
    return NextResponse.rewrite(url);
  }

  return response;
}
