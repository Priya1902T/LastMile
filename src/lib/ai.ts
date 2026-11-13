// Swappable AI layer. Any OpenAI-compatible provider works: change the env vars
// (base URL, key, models) to switch from the NVIDIA free tier to a production provider.
import { z } from "zod";

const BASE_URL = process.env.NVIDIA_BASE_URL ?? "https://integrate.api.nvidia.com/v1";
const API_KEY = process.env.NVIDIA_API_KEY;

// Primary = best quality; fallback = faster, used if the primary fails or times out.
export const AI_MODEL = process.env.AI_MODEL ?? "nvidia/nemotron-3-ultra-550b-a55b";
export const AI_FALLBACK_MODEL = process.env.AI_FALLBACK_MODEL ?? "nvidia/nemotron-3.5-lightning-30b-a3b";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

type ChatOptions = { json?: boolean; maxTokens?: number; temperature?: number; timeoutMs?: number };

async function callModel(model: string, messages: ChatMessage[], o: ChatOptions): Promise<string> {
  if (!API_KEY) throw new Error("NVIDIA_API_KEY is not set");
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: o.maxTokens ?? 2000,
      temperature: o.temperature ?? 0.3,
      ...(o.json ? { response_format: { type: "json_object" } } : {}),
    }),
    signal: AbortSignal.timeout(o.timeoutMs ?? 60_000),
  });
  if (!res.ok) throw new Error(`AI ${model} failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const content: string | undefined = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(`AI ${model} returned no content`);
  return content;
}

/** Plain text chat, with automatic fallback to the faster model. */
export async function chat(messages: ChatMessage[], o: ChatOptions = {}): Promise<string> {
  try {
    return await callModel(AI_MODEL, messages, o);
  } catch (err) {
    console.warn(`[ai] primary model failed, using fallback: ${(err as Error).message}`);
    return callModel(AI_FALLBACK_MODEL, messages, o);
  }
}

/** Ask for JSON and validate it against a Zod schema. */
export async function chatJson<T>(schema: z.ZodType<T>, messages: ChatMessage[], o: ChatOptions = {}): Promise<T> {
  const raw = await chat(messages, { ...o, json: true });
  const jsonText = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
  return schema.parse(JSON.parse(jsonText));
}

// ---- Scoped-specific schemas ----

export const scopeMapSchema = z.object({
  mustKnow: z.array(z.string()).min(1),
  likelyProbed: z.array(z.string()),
  safeToSkip: z.array(z.string()),
});
export type ScopeMap = z.infer<typeof scopeMapSchema>;

export const SYSTEM_PROMPT =
  "You are Scoped, an interview triage coach for candidates with little time. " +
  "Be specific and practical. Never invent experience the candidate does not have. " +
  "Address interview nerves only; no therapy language. Reply with JSON only when asked for JSON.";
