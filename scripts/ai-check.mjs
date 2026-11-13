// Verifies the NVIDIA key and model with one real scope-map request. Prints no secrets.
import { config } from "dotenv";
config({ path: ".env.local", quiet: true });
const model = process.env.AI_MODEL ?? "nvidia/nemotron-3-ultra-550b-a55b";
const t = Date.now();
const res = await fetch(`${process.env.NVIDIA_BASE_URL}/chat/completions`, {
  method: "POST",
  headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model, max_tokens: 1500, temperature: 0.2, response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You are an interview triage coach. Reply with JSON only." },
      { role: "user", content: 'Junior React developer, technical round, 4 hours left. Return {"mustKnow":[3],"likelyProbed":[3],"safeToSkip":[2]} as short strings.' },
    ],
  }),
});
const data = await res.json();
const c = data.choices?.[0]?.message?.content ?? "";
const parsed = JSON.parse(c.slice(c.indexOf("{"), c.lastIndexOf("}") + 1));
console.log(`AI OK: ${model} answered in ${((Date.now() - t) / 1000).toFixed(1)}s`);
console.log(JSON.stringify(parsed, null, 2));
