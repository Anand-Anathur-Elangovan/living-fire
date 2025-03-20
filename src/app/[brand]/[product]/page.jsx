import Product from "./Product";

export async function generateMetadata({ params }) {
  const formatName =  (name) => (name?.includes("_") ? name.replace(/_/g, " ") : name);

  const brand = await params?.brand ? formatName(params?.brand) : "Premium";
  const product = await params?.product ? formatName(params?.product) : "Fireplace";

  return {
      title: `${product} by ${brand} | Living Fire`,
      description: `Discover the ${product} by ${brand}, a premium fireplace designed for elegance and performance.`,
      keywords: `${product}, ${brand} fireplaces, modern ${product}, luxury fireplaces, ${brand} heating solutions, designer fireplaces`,
      alternates: {
          canonical: `https://living-fire.vercel.app/${encodeURIComponent(brand)}/${encodeURIComponent(product)}`,
      },
      robots: "index, follow",
  };
}

export default function Page({ params }) {
  return <Product params={params}/>;
}
