import { NextResponse } from "next/server";

export function GET() {
    const siteUrl = "https://www.livingfires.com.au"; // Update to the final domain

    const robotsTxt = `
User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /profile/
Disallow: /api/

Allow: /public/
Allow: /products/
Allow: /fireplaces/
Allow: /brands/
Allow: /filters/
Allow: /home/
Allow: /allProducts/
Allow: /our-story/

Allow: /maintenance-service/
Allow: /about/
Allow: /contact/
Allow: /warranty/
Allow: /terms/
Allow: /privacy-policy/
Allow: /specificationSheet/
Allow: /our-story/

Sitemap: ${siteUrl}/api/sitemap.xml
    `.trim();

    return new NextResponse(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
