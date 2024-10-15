// pages/api/s3Url.js
import AWS from "aws-sdk";

export default async function GET(req, res) {
  const s3 = new AWS.S3({
    region: "us-east-1",
    accessKeyId: "AKIA3FRRIXSVNFDOPIOW",
    // process.env.AWS_ACCESS_KEY_ID, // Set these in your environment variables
    secretAccessKey: "zYVRPcEvGnU91mhUArM08p7IsdkKXUl2DW3fh6M6",
    // process.env.AWS_SECRET_ACCESS_KEY,
  });

  const bucketName = "living-fire-dev--use1-az4--x-s3";
  const key = "home/home_carousel_image_1.png";

  try {
    const url = s3.getSignedUrl("getObject", {
      Bucket: bucketName,
      Key: key,
      Expires: 60, // URL will be valid for 60 seconds
    });

    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error: "Error generating signed URL" });
  }
}
