export function transformImageSrc(src) {
  if (!src) return src; // Return the source if it is undefined or null

  let transformedSrc;

  // Convert to string if it's not already a string
  if (typeof src !== "string") {
    console.warn("Warning: src is not a string. Actual type:", typeof src);

    if (typeof src === "object") {
      // If src is an object or array, convert to JSON string
      transformedSrc = JSON.stringify(src);
    } else if (src.toString) {
      // If src has a toString method (like numbers), use it
      transformedSrc = src.toString();
    } else {
      // If src can't be converted, return it as is
      console.error("Unable to convert src to a string.");
      return src;
    }
  } else {
    transformedSrc = src;
  }

  // Replace spaces with %20 if there are spaces
  if (transformedSrc.includes(" ")) {
    transformedSrc = transformedSrc.replace(/ /g, "%20");
  }

  // Replace 'hubspotusercontent-1' with 'hubspotusercontent-na1' if it exists
  if (transformedSrc.includes("hubspotusercontent-1")) {
    transformedSrc = transformedSrc.replace(
      "hubspotusercontent-1",
      "hubspotusercontent-na1"
    );
  }
  return transformedSrc; // Return the transformed (or unmodified) source
}
