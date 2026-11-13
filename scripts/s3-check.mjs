// Verifies AWS S3 access: write, read, delete a tiny test object. Prints no secrets.
import { config } from "dotenv";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
config({ path: ".env.local" });
const Bucket = process.env.S3_BUCKET;
const s3 = new S3Client({ region: process.env.AWS_REGION });
const Key = `healthcheck/${Date.now()}.txt`;
await s3.send(new PutObjectCommand({ Bucket, Key, Body: "ok", ServerSideEncryption: "AES256" }));
const got = await s3.send(new GetObjectCommand({ Bucket, Key }));
const text = await got.Body.transformToString();
await s3.send(new DeleteObjectCommand({ Bucket, Key }));
console.log(`S3 OK: bucket "${Bucket}" in ${process.env.AWS_REGION} - write/read/delete ${text === "ok" ? "passed" : "FAILED"}`);
