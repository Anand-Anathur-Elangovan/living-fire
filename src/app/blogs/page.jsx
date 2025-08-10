export const metadata = {
  title: "Blogs | Living Fire - Melbourne’s Fireplace Specialists",
  description: "Discover the journey of Living Fire, Melbourne’s leading fireplace specialists. With over 60 years of experience, we bring the finest European and Australian fireplaces to homes across Australia.",
  keywords: "Living Fire story, about Living Fire, Melbourne fireplace specialists, fireplace history, luxury fireplaces, custom fireplaces, European fireplaces, Australian fireplaces",
  alternates: {
    canonical: "https://livingfires.com.au/blogs",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://livingfires.com.au" }],
  publisher: "Living Fire",
};

import Blogs from "./Blogs";

export default function Page() {
  return <Blogs />;
}