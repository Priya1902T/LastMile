// Verifies DATABASE_URL works. Prints no secrets.
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL);
const [r] = await sql`select version() as v, current_database() as db`;
const tables = await sql`select table_name from information_schema.tables where table_schema='public' order by 1`;
console.log("Connected to", r.db, "-", r.v.split(" ").slice(0, 2).join(" "));
console.log("Tables:", tables.map((t) => t.table_name).join(", ") || "(none)");
