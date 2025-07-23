import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/custom/Header";
import Footer from "../components/custom/Footer";
import Providers from "../helper/provider/providers";
import { NavigationProvider } from "@/context/NavigationContext";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import InlineCriticalCSS from "../components/InlineCriticalCSS";
import NewsletterCard from "./home/components/newsletterCard";

// Local fonts with optimized loading
const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const satoru = localFont({
  src: "../../public/fonts/satoru.woff2",
  variable: "--font-satoru",
  display: "swap",
});

const publicSans = localFont({
  src: [
    {
      path: "../../public/fonts/PublicSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PublicSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata = {
  title: "Living Fire - Fire Places",
  description: "Discover premium indoor and outdoor fireplaces at Living Fire. Stylish, efficient, and Australian-designed solutions to warm and elevate your home.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      style={{ backgroundColor: "#f7f7f5" }}
      className={`${geistSans.variable} ${geistMono.variable} ${satoru.variable} ${publicSans.variable}`}
    >
      <head>
        <InlineCriticalCSS />
         <meta name="robots" content="noindex" />
         {/* <meta name="google-site-verification" content="SLUTUDd4zGYmysqN2rWQooOLlsUXLshc1n-dert7AXU" /> */}
        {/* Font Preloading */}
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/satoru.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PublicSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Critical Assets Preloading */}
        <link
          rel="preload"
          href="/_next/static/chunks/main-app.js"
          as="script"
        />
        <link
          rel="preload"
          href="/assets/homePage/homePageMainImg.webp"
          as="image"
          fetchPriority="high"
        />
      </head>
      
      <body className="antialiased">
        {/* Optimized Google Tag Manager */}
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XD9XM6CVMJ"
          strategy="lazyOnload"
          id="gtm-script"
        />
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XD9XM6CVMJ', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <NavigationProvider>
          <Providers>
            <div>
              <Header />
              <Suspense
                fallback={
                  <div className="suspense-fallback" aria-live="polite">
                    <div className="sr-only">Loading content...</div>
                  </div>
                }
              >
                {children}
              </Suspense>
              <NewsletterCard/>
              <Footer />
            </div>
          </Providers>
        </NavigationProvider>
        
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}