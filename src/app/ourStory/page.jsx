export const metadata = {
  title: "Our Story | Living Fire - Melbourne’s Fireplace Specialists",
  description: "Discover the journey of Living Fire, Melbourne’s leading fireplace specialists. With over 60 years of experience, we bring the finest European and Australian fireplaces to homes across Australia.",
  keywords: "Living Fire story, about Living Fire, Melbourne fireplace specialists, fireplace history, luxury fireplaces, custom fireplaces, European fireplaces, Australian fireplaces",
  alternates: {
    canonical: "https://living-fire.vercel.app/ourStory",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://living-fire.vercel.app" }],
  publisher: "Living Fire",
};

import OurStory from "./OurStory";

export default function Page() {
  return <OurStory />;
}