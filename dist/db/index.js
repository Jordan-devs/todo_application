import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import { Pool } from "pg";
import * as schema from "./schema.js";
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
export const db = drizzle({ client: pool, schema });
//# sourceMappingURL=index.js.map