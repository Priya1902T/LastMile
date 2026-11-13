import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { prepSessions, scopeMaps, plans } from "@/db/schema";
import { HOURS, intakeSchema, generateTriage } from "@/lib/triage";
import { MAX_RESUME_BYTES, resumeKey, resumeToText } from "@/lib/resume";

export const runtime = "nodejs";
export const maxDuration = 60; // AI generation takes ~20-40s

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("resume");
  let resumeText = String(form.get("resumeText") ?? "");
  let upload: { buf: Buffer; type: string; name: string } | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_RESUME_BYTES) return NextResponse.json({ error: "Resume must be under 5 MB." }, { status: 400 });
    try {
      resumeText = await resumeToText(file);
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 400 });
    }
    upload = { buf: Buffer.from(await file.arrayBuffer()), type: file.type || "application/octet-stream", name: file.name };
  }

  const parsed = intakeSchema.safeParse({
    role: form.get("role"),
    company: form.get("company") ?? "",
    when: form.get("when"),
    round: form.get("round"),
    hours: form.get("hours"),
    fear: form.get("fear"),
    jobDescription: form.get("jobDescription") ?? "",
    resumeText: resumeText.slice(0, 30_000),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your answers.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const intake = parsed.data;

  let triage;
  try {
    triage = await generateTriage(intake);
  } catch (e) {
    console.error("[triage] failed", e);
    return NextResponse.json({ error: "Our AI coach is busy right now. Please try again in a minute." }, { status: 502 });
  }

  const id = randomUUID();
  let key: string | null = null;
  if (upload) {
    const { uploadResume } = await import("@/lib/s3");
    key = resumeKey(id, upload.name);
    await uploadResume(key, upload.buf, upload.type);
  }

  await db.insert(prepSessions).values({
    id,
    role: intake.role,
    company: intake.company || null,
    round: intake.round,
    when: intake.when,
    hoursLeft: HOURS[intake.hours],
    biggestFear: intake.fear,
    jobDescription: intake.jobDescription || null,
    resumeKey: key,
  });
  await db.insert(scopeMaps).values({
    sessionId: id,
    mustKnow: triage.mustKnow,
    likelyProbed: triage.likelyProbed,
    safeToSkip: triage.safeToSkip,
    probeQuestions: triage.probeQuestions,
    gapScripts: triage.gapScripts,
    fearTip: triage.fearTip,
  });
  await db.insert(plans).values({ sessionId: id, blocks: triage.plan });

  return NextResponse.json({ id });
}
