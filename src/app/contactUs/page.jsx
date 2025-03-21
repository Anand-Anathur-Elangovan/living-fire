export const metadata = {
  title: "Contact Us | Living Fire - Get in Touch for Expert Fireplace Advice",
  description: "Reach out to Living Fire, Melbourne’s premium fireplace specialists. Contact us for expert advice, showroom visits, or inquiries about our luxury fireplaces.",
  keywords: "contact Living Fire, fireplace showroom Melbourne, fireplace inquiries, fireplace consultation, premium fireplaces, luxury fireplaces Melbourne",
  alternates: {
    canonical: "https://living-fire.vercel.app/contactUs",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://living-fire.vercel.app" }],
  publisher: "Living Fire",
};


import ContactUs from "./ContactUs";

export default function Page() {
  return <ContactUs />;
}