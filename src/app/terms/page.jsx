export const metadata = {
  title: "Terms & Conditions | Living Fire",
  description: "Read the terms and conditions of Living Fire to understand our policies regarding purchases, warranties, and service agreements.",
  keywords: "Living Fire terms, terms and conditions, fireplace purchase policy, warranty terms, service terms, legal agreement",
  alternates: {
    canonical: "https://living-fire.vercel.app/terms",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://living-fire.vercel.app" }],
  publisher: "Living Fire",
};

import Terms from "./Terms";

export default function Page() {
  return <Terms />;
}