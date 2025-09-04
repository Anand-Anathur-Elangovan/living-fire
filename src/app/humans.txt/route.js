import { NextResponse } from "next/server";

export function GET() {
    const humansTxt = `
/* TEAM */
Owner: Living Fire
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
Email: info@livingfire.com.au
Phone: +61 3 XXXX XXXX
Address: [Your Business Address]
Twitter: @livingfireAU
Facebook: https://www.facebook.com/livingfireAU
Instagram: https://www.instagram.com/livingfireAU
LinkedIn: https://www.linkedin.com/company/livingfireAU
`.trim();

    return new NextResponse(humansTxt, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400, s-maxage=86400"
        },
    });
}