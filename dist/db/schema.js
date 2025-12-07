import { pgTable, serial, varchar, boolean, integer, } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 100 }).notNull(),
});
export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
        .notNull()
        .references(() => users.id),
    task: varchar("task").notNull(),
    completed: boolean("completed").notNull().default(false),
});
//# sourceMappingURL=schema.js.map