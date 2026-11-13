import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.S3_BUCKET;
if (!bucket || !process.env.AWS_REGION) throw new Error("S3_BUCKET and AWS_REGION must be set");

export const s3 = new S3Client({ region: process.env.AWS_REGION });

// Resumes are personal data: always server-side encrypted.
export async function uploadResume(key: string, body: Buffer, contentType: string) {
  await s3.send(new PutObjectCommand({
    Bucket: bucket, Key: key, Body: body, ContentType: contentType, ServerSideEncryption: "AES256",
  }));
  return key;
}

// Short-lived link to read a private file (default 5 minutes).
export function getResumeUrl(key: string, expiresIn = 300) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn });
}

export async function deleteResume(key: string) {
  await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
