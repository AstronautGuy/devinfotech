"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3";

export async function getUploadUrl(fileName: string, fileType: string) {
  const Bucket = process.env.AWS_S3_BUCKET_NAME || "product-images";
  // Clean file name of spaces/specs
  const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const Key = `${Math.random().toString(36).substring(2, 12)}_${Date.now()}_${cleanName}`;

  const command = new PutObjectCommand({
    Bucket,
    Key,
    ContentType: fileType,
  });

  // Generate Presigned URL valid for 1 hour
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  // Format standard Supabase Public Storage URL structure
  // https://[projectId].supabase.co/storage/v1/object/public/[bucket]/[key]
  const endpoint = process.env.AWS_S3_ENDPOINT || "";
  const projectId = endpoint.split("//")[1]?.split(".")[0];
  
  const publicUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${Bucket}/${Key}`;

  return { uploadUrl, publicUrl };
}
