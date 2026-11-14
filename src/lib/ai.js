const BASE_URL = process.env.NVIDIA_BASE_URL ?? "https://integrate.api.nvidia.com/v1";

const API_KEY = process.env.NVIDIA_API_KEY;

// Primary = fast (~15s for a full triage); fallback = larger model, used if the primary fails.
export const AI_MODEL = process.env.AI_MODEL ?? "nvidia/nemotron-3.5-lightning-30b-a3b";

export const AI_FALLBACK_MODEL = process.env.AI_FALLBACK_MODEL ?? "nvidia/nemotron-3-ultra-550b-a55b";

/**
 * @typedef {{ role: "system" | "user" | "assistant", content: string }} ChatMessage
 * @typedef {object} ChatOptions
 * @property {boolean} [json] ask for a JSON object
 * @property {number} [maxTokens]
 * @property {number} [temperature]
 * @property {number} [timeoutMs] primary model timeout
 * @property {number} [fallbackTimeoutMs] fallback model timeout (keep both under the 60s serverless limit)
 * @property {string} [model] override the primary model
 */

/** @param {string} model @param {ChatMessage[]} messages @param {ChatOptions} o */
async function callModel(model, messages, o) {
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
      // Nemotron "thinking" mode burns tokens and time before answering; our prompts don't need it.
      chat_template_kwargs: { enable_thinking: false },
    }),
    signal: AbortSignal.timeout(o.timeoutMs ?? 60_000),
  });
  if (!res.ok) throw new Error(`AI ${model} failed: ${res.status} ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(`AI ${model} returned no content`);
  return content;
}

/** Plain text chat, with automatic fallback to the larger model. */
export async function chat(messages, o = {}) {
  try {
    return await callModel(o.model ?? AI_MODEL, messages, o);
  } catch (err) {
    console.warn(`[ai] primary model failed, using fallback: ${err.message}`);
    return callModel(AI_FALLBACK_MODEL, messages, { ...o, timeoutMs: o.fallbackTimeoutMs ?? o.timeoutMs });
  }
}

function parseJson(schema, raw) {
  const jsonText = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
  return schema.parse(JSON.parse(jsonText));
}

/** Ask for JSON and validate it against a Zod schema. Retries once, telling the model what was wrong. */
export async function chatJson(schema, messages, o = {}) {
  const raw = await chat(messages, { ...o, json: true });
  try {
    return parseJson(schema, raw);
  } catch (err) {
    const retry = await chat(
      [
        ...messages,
        { role: "assistant", content: raw },
        {
          role: "user",
          content: `That JSON was invalid (${err.message.slice(0, 300)}). Reply again with valid JSON only, matching the requested shape exactly.`,
        },
      ],
      { ...o, json: true },
    );
    return parseJson(schema, retry);
  }
}

export const SYSTEM_PROMPT =
  "You are Scoped, an interview triage coach for candidates with little time. " +
  "Be specific and practical. Never invent experience the candidate does not have. " +
  "Address interview nerves only; no therapy language. Reply with JSON only when asked for JSON.";
