// import { NextResponse } from "next/server";

// export function GET() {
//     const siteUrl = "https://livingfires.com.au";

//     const robotsTxt = `
// # SEO-optimized robots.txt for Living Fires
// User-agent: *
// Disallow: /admin/
// Disallow: /cart/
// Disallow: /checkout/
// Disallow: /account/
// Disallow: /profile/
// Disallow: /api/
// Disallow: /private/
// Disallow: /tmp/
// Disallow: /wp-admin/
// Disallow: /search/

// # Allow critical paths
// Allow: /$
// Allow: /home
// Allow: /allProducts/
// Allow: /our-story/
// Allow: /maintenance-service/
// Allow: /about/
// Allow: /contact/
// Allow: /warranty/
// Allow: /terms/
// Allow: /privacy-policy/
// Allow: /specificationSheet/
// Allow: /specification-sheet/
// Allow: /blog/
// Allow: /*/

// # Googlebot directives
// User-agent: Googlebot
// Allow: /allProducts/*          # Product/category pages
// Allow: /*/                     # Brand/product URLs (e.g., /Gazco/eStudio_ES165R)
// Allow: /allProducts/*?sort=*
// Disallow: /allProducts/*?*     # Block parameterized filters (e.g., ?ref=test)
// Disallow: /*?utm_*             # Block tracking URLs (optional)
// Disallow: /*?gclid=*           # Block Google Ads parameters (optional)


// # Social/media bots
// User-agent: Twitterbot
// User-agent: LinkedInBot
// User-agent: FacebookExternalHit
// Allow: /

// Sitemap: ${siteUrl}/sitemap.xml
//     `.trim();

//     return new NextResponse(robotsTxt, {
//         headers: {
//             "Content-Type": "text/plain",
//             "Cache-Control": "public, max-age=86400"
//         },
//     });
// }

import { NextResponse } from "next/server";

export function GET() {
    const siteUrl = "https://livingfires.com.au";

    const robotsTxt = `
User-agent: *
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /profile/
Disallow: /api/
Disallow: /private/
Disallow: /tmp/
Disallow: /search/
Disallow: /wp-content/uploads/wc-logs/
Disallow: /wp-content/uploads/woocommerce_uploads/
Disallow: /*?utm_*
Disallow: /*?gclid=*
Disallow: /*?ref=*

# Allow important pages and assets
Allow: /$
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
Allow: /specification-sheet/
Allow: /blog/
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.gif$
Allow: /*.svg$
Allow: /*.webp$

# Product category patterns
Allow: /allProducts/fireplace/
Allow: /allProducts/fireplace-mantels/
Allow: /allProducts/fire-tools/
Allow: /allProducts/outdoor/
Allow: /allProducts/cast-iron/
Allow: /allProducts/*/wood/
Allow: /allProducts/*/electric/
Allow: /allProducts/*/gas/
Allow: /allProducts/*/hybrid-wood-electric/
Allow: /allProducts/*/bio-ethanol/

# Brand patterns
Allow: /*/esse/
Allow: /*/gazco/
Allow: /*/stovax/
Allow: /*/regency/
Allow: /*/morso/
Allow: /*/living-fire/
Allow: /*/paul-agnew-designs/
Allow: /*/kalora/
Allow: /*/adf/
Allow: /*/austroflamm/
Allow: /*/bosq/
Allow: /*/eurostove/
Allow: /*/heatmaster/
Allow: /*/hergom/

# Googlebot specific directives
User-agent: Googlebot
Allow: /allProducts/*/freestanding/
Allow: /allProducts/*/inbuilt/
Allow: /allProducts/*/single-sided/
Allow: /allProducts/*/two-sided/
Allow: /allProducts/*/three-sided/
Allow: /allProducts/*/four-sided/
Allow: /*/*/  # Allow all brand/product URLs
Disallow: /allProducts/*?*  # Block parameterized filters

# Image search bots
User-agent: Googlebot-Image
Allow: /
Disallow: /private/
Disallow: /tmp/

# Social media bots
User-agent: Twitterbot
User-agent: LinkedInBot
User-agent: FacebookExternalHit
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
    `.trim();

    return new NextResponse(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400, s-maxage=86400"
        },
    });
}