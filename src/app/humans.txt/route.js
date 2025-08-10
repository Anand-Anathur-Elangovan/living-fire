import { NextResponse } from "next/server";

export function GET() {
    const humansTxt = `
/* TEAM */
Owner: Living Fires
Technical Director: [Name]
Marketing Director: [Name]
Designer: [Name]
Developer: [Name]
Location: Melbourne, Australia

/* SITE */
Last update: ${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}
Standards: HTML5, CSS3, JavaScript (ES6+)
Components: Next.js, React, Node.js
Software: VSCode, GitHub, Figma

/* THANKS */
Special thanks to our customers and partners who make this possible.

/* CONTACT */
Email: info@livingfires.com.au
Phone: +61 3 XXXX XXXX
Address: [Your Business Address]
Twitter: @LivingFiresAU
Facebook: https://www.facebook.com/LivingFiresAU
Instagram: https://www.instagram.com/LivingFiresAU
LinkedIn: https://www.linkedin.com/company/LivingFiresAU
`.trim();

    return new NextResponse(humansTxt, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400, s-maxage=86400"
        },
    });
}