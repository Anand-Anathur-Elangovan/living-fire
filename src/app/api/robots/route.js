import { NextResponse } from "next/server";

export function GET() {
    const siteUrl = "https://www.livingfire.com.au"; // Update to the final domain

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
Allow: /ourStory/

Allow: /maintenanceService/
Allow: /about/
Allow: /contactUs/
Allow: /warranty/
Allow: /terms/
Allow: /privacyPolicy/
Allow: /specificationSheet/
Allow: /ourStory/

Sitemap: ${siteUrl}/sitemap.xml
    `.trim();

    return new NextResponse(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
