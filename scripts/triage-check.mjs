import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
for (const m of [process.argv[2]]) {
  process.env.AI_MODEL = m;
  const { generateTriage } = await import("../src/lib/triage.js");
  const t = Date.now();
  try {
    const r = await generateTriage({
      role: "Backend developer",
      company: "Acme",
      when: "Tomorrow",
      round: "Technical",
      hours: "3 to 12 hours",
      fear: "Freezing",
      jobDescription: "Node.js, PostgreSQL, REST APIs, Docker, Kubernetes, AWS. 2+ years.",
      resumeText:
        "Junior dev, 1.5 years. Built REST API in Express with Postgres for an inventory app. Some Docker. Email a@b.com phone +91 98765 43210",
    });
    console.log(
      m,
      ((Date.now() - t) / 1000).toFixed(1) + "s",
      "must:",
      r.mustKnow.map((x) => x.topic).join("; "),
      "| plan min:",
      r.plan.reduce((a, b) => a + b.minutes, 0),
      "| gaps:",
      r.gapScripts.map((g) => g.skill).join(","),
    );
  } catch (e) {
    console.log(m, "FAIL", ((Date.now() - t) / 1000).toFixed(1) + "s", e.message.slice(0, 200));
  }
}
