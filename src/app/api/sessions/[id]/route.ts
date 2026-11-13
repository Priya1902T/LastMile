import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { prepSessions } from "@/db/schema";

export const runtime = "nodejs";

/** "Delete my data": removes the resume from S3 and the session (plans and scope maps cascade). */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [row] = await db.select({ key: prepSessions.resumeKey }).from(prepSessions).where(eq(prepSessions.id, id));
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (row.key) {
    const { deleteResume } = await import("@/lib/s3");
    await deleteResume(row.key);
  }
  await db.delete(prepSessions).where(eq(prepSessions.id, id));
  return NextResponse.json({ ok: true });
}
