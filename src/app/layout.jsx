// import localFont from "next/font/local";
// import "./globals.css";
// import Header from "../components/custom/Header";
// import Footer from "../components/custom/Footer";
// import Providers from "../helper/provider/providers";
// import { NavigationProvider } from "@/context/NavigationContext";
// import { Suspense } from "react";
// import { SpeedInsights } from "@vercel/speed-insights/next"
// // Local fonts
// const geistSans = localFont({
//   src: "../../public/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "../../public/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata = {
//   title: "Living Fire -Dev",
//   description: "Living Fire -Dev",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" style={{ backgroundColor: "#f7f7f5" }}>
//       <head>
//         {/* Load Google Fonts directly via <link> */}
//         <link
//           href="https://fonts.googleapis.com/css2?family=Satoru:wght@400&family=Public+Sans:wght@400&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <NavigationProvider>
//           <Providers>
//             <div>
//               <Header />
//               <Suspense fallback={<div>LOADING....</div>}>{children}</Suspense>
//               <Footer />
//             </div>
//           </Providers>
//         </NavigationProvider>
//         <SpeedInsights />
//       </body>
//     </html>
//   );
// }
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/custom/Header";
import Footer from "../components/custom/Footer";
import Providers from "../helper/provider/providers";
import { NavigationProvider } from "@/context/NavigationContext";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Local fonts
const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Living Fire - Fire Places",
  description:
    "Discover premium indoor and outdoor fireplaces at Living Fire. Stylish, efficient, and Australian-designed solutions to warm and elevate your home.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ backgroundColor: "#f7f7f5" }}>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XVDY2WJ890"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XVDY2WJ890');
            `,
          }}
        />

        {/* Load Google Fonts directly via <link> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Satoru:wght@400&family=Public+Sans:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavigationProvider>
          <Providers>
            <div>
              <Header />
              <Suspense fallback={<div>LOADING....</div>}>{children}</Suspense>
              <Footer />
            </div>
          </Providers>
        </NavigationProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
