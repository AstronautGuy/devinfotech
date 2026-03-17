import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  forcePathStyle: true, // Required for Supabase S3 compatibility
  region: process.env.AWS_S3_REGION || "ap-south-1",
  endpoint: process.env.AWS_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || "",
  },
});
