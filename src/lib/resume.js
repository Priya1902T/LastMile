import { randomUUID } from "crypto";
import { extractText, getDocumentProxy } from "unpdf";

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

/** Pull plain text out of an uploaded resume. PDF and .txt are supported. */
export async function resumeToText(file) {
  const buf = new Uint8Array(await file.arrayBuffer());
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    const pdf = await getDocumentProxy(buf);
    const { text } = await extractText(pdf, { mergePages: true });
    return text;
  }
  if (file.type.startsWith("text/") || file.name.toLowerCase().endsWith(".txt")) {
    return new TextDecoder().decode(buf);
  }
  throw new Error("Please upload your resume as a PDF, or paste it as text.");
}

export function resumeKey(sessionId, fileName) {
  const ext = fileName.toLowerCase().endsWith(".pdf") ? "pdf" : "txt";
  return `resumes/${sessionId}/${randomUUID()}.${ext}`;
}
