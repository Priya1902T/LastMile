import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { plans, prepSessions, scopeMaps } from "@/db/schema";
import PlanView from "@/components/PlanView";

export const dynamic = "force-dynamic";

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) notFound();

  const [session] = await db.select().from(prepSessions).where(eq(prepSessions.id, id));
  if (!session) notFound();
  const [scope] = await db.select().from(scopeMaps).where(eq(scopeMaps.sessionId, id));
  const [plan] = await db.select().from(plans).where(eq(plans.sessionId, id));
  if (!scope || !plan) notFound();

  return (
    <PlanView
      id={id}
      session={{ role: session.role, company: session.company, round: session.round, when: session.when, hoursLeft: session.hoursLeft, fear: session.biggestFear }}
      scope={{ mustKnow: scope.mustKnow, likelyProbed: scope.likelyProbed, safeToSkip: scope.safeToSkip }}
      blocks={plan.blocks}
      probeQuestions={scope.probeQuestions}
      gapScripts={scope.gapScripts}
      fearTip={scope.fearTip}
    />
  );
}
