import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Export the GET method
export async function GET(req) {
  const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_lIVING_FIRE_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_lIVING_FIRE_SECRET_ACCESS_KEY,
    },
  });

  const bucketName = 'living-fire-dev--use1-az4--x-s3';
  const key = 'home/home_carousel_image_1.png';

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return new Response(JSON.stringify({ url: signedUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error generating signed URL' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
