import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schemas from "./schemas";

const sqlite = new Database(process.env.DATABASE_URL ?? "");

// You can specify any property from the bun sql connection options
export const db = drizzle(sqlite, { schema: schemas });
