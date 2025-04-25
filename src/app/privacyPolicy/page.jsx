export const metadata = {
  title: "Privacy Policy | Living Fire",
  description: "Read the Privacy Policy of Living Fire to understand how we collect, use, and protect your personal information when you visit our website.",
  keywords: "privacy policy, data protection, personal information, Living Fire privacy, website privacy, user data security, GDPR compliance",
  alternates: {
    canonical: "https://livingfires.com.au/privacyPolicy",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://livingfires.com.au" }],
  publisher: "Living Fire",
};


import PrivacyPolicy from "./PrivacyPolicy";

export default function Page() {
  return <PrivacyPolicy />;
}