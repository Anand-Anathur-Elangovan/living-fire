export const metadata = {
  title: "Premium Fireplaces in Melbourne | Living Fire",
  description: "Discover Melbourne’s finest range of premium local and European fireplaces at Living Fire. With 60 years of expertise, we provide luxury fireplaces that blend innovation, craftsmanship, and timeless design.",
  keywords: "fireplaces Melbourne, luxury fireplaces, European fireplaces, modern fireplaces, wood fireplaces, gas fireplaces, designer fireplaces, Living Fire, custom fireplaces",
  alternates: {
    canonical: "https://livingfire.com.au/allProducts",
  },
  robots: "index, follow",
  authors: [{ name: "Living Fire Team", url: "https://livingfire.com.au" }],
  publisher: "Living Fire",
};

import AllProducts from "./AllProducts";

export default function Page() {
  return <AllProducts />;
}