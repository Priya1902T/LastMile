import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucket = process.env.S3_BUCKET;
if (!bucket || !process.env.S3_REGION) throw new Error("S3_BUCKET and S3_REGION must be set");

// S3_* names (not AWS_*) because Vercel reserves the AWS_* variable names.
export const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

// Resumes are personal data: always server-side encrypted.
export async function uploadResume(key, body, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      ServerSideEncryption: "AES256",
    }),
  );
  return key;
}

// Short-lived link to read a private file (default 5 minutes).
export function getResumeUrl(key, expiresIn = 300) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn });
}

export async function deleteResume(key) {
  await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
