import { Pool } from "pg";
import * as schema from "./schema.js";
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
    $client: import("drizzle-orm/node-postgres").NodePgClient extends TClient ? Pool : TClient;
};
//# sourceMappingURL=index.d.ts.map