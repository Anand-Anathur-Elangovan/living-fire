import Filters from "./Filters";
export async function generateMetadata({ params }) {
  console.log("params in generateMetadata:", params); // Debugging

  if (!params?.filters || params.filters.length === 0) {
    return {
      title: "Living Fire - Explore Our Fireplaces",
      description: "Discover premium fireplaces from Living Fire.",
    };
  }

  // Convert filter parameters into a readable format
  const formatName = (name) => name.replace(/_/g, " ");

  // Decode filters from the URL (e.g., ["gas", "wall_mounted", "modern"])
  const filters = params?.filters.map(formatName);

  return {
    title: `Filtered Fireplaces: ${filters.join(", ")} | Living Fire`,
    description: `Explore fireplaces with filters: ${filters.join(
      ", "
    )} at Living Fire.`,
    keywords: filters.join(", "),
    alternates: {
      canonical: `https://living-fire.vercel.app/allProducts/${filters
        .map(encodeURIComponent)
        .join("/")}`,
    },
    robots: "index, follow",
  };
}

export default function Page({ params }) {
  console.log("params in Page:", params); // Debugging

  if (!params?.filters || params.filters.length === 0) {
    return <p>Loading...</p>;
  }

  const formatName = (name) => name.replace(/_/g, " ");
  const filters = params?.filters.map(formatName);

  return <Filters params={params} />;
}
