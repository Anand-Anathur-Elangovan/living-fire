export function generateSlug(input) {
  return input
    .replace(/[\[\]\(\)]/g, '') // Remove [, ], (, )
    .replace(/\//g, '-')        // Replace / with -
    .replace(/ - /g, ' ')       // Replace " - " with space
    .replace(/-/g, ' ')         // Replace all remaining - with space
    .trim()                     // Trim leading/trailing spaces
    .replace(/\s+/g, '-')       // Replace all spaces with -
    .toLowerCase();             // Convert to lowercase
}