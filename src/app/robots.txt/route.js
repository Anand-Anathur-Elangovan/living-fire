import { NextResponse } from "next/server";

export function GET() {
    const siteUrl = "https://livingfires.com.au";

    const robotsTxt = `
# SEO-optimized robots.txt for Living Fires
User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /profile/
Disallow: /api/
Disallow: /private/
Disallow: /tmp/
Disallow: /wp-admin/
Disallow: /search/

# Allow critical paths
Allow: /$
Allow: /home
Allow: /allProducts/
Allow: /our-story/
Allow: /maintenance-service/
Allow: /about/
Allow: /contact/
Allow: /warranty/
Allow: /terms/
Allow: /privacy-policy/
Allow: /specificationSheet/
Allow: /specification-sheet/
Allow: /blog/
Allow: /*/

# Googlebot directives
User-agent: Googlebot
Allow: /allProducts/*          # Product/category pages
Allow: /*/                     # Brand/product URLs (e.g., /Gazco/eStudio_ES165R)
Allow: /allProducts/*?sort=*
Disallow: /allProducts/*?*     # Block parameterized filters (e.g., ?ref=test)
Disallow: /*?utm_*             # Block tracking URLs (optional)
Disallow: /*?gclid=*           # Block Google Ads parameters (optional)


# Social/media bots
User-agent: Twitterbot
User-agent: LinkedInBot
User-agent: FacebookExternalHit
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
    `.trim();

    return new NextResponse(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400"
        },
    });
}