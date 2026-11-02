# Scoped: stack decisions

- Neon free plan: 100 projects, compute suspends after 5 minutes idle. Check current limits before relying on them.
- AI: NVIDIA NIM free tier, about 30 to 40 requests per minute per key. Development use only per its terms. Strip phone and email from resumes before sending.
- Open models are less reliable at strict JSON. Validate every response with Zod and retry once.
- Wrap all model calls in one function, `generate(prompt, schema)`, so the provider can be swapped in one file.
