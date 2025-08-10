// This is a simple API route in Next.js
export default function handler(req, res) {
  // You can check the HTTP method (GET, POST, etc.)
  if (req.method === "GET") {
    // Return a dummy response
    res.status(200).json({
      message: "This is a dummy API response for testing!",
      data: {
        id: 1,
        name: "Sample Data",
        description: "This is just some dummy data for testing purposes.",
      },
    });
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
