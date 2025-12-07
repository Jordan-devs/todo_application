import { db } from "../db/index.js";
import { todos } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
export async function getTodos(req, res) {
    const userId = req.userId;
    if (userId == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const getTodos = await db
        .select()
        .from(todos)
        .where(eq(todos.user_id, userId));
    res.status(200).json(getTodos);
}
export async function createTodo(req, res) {
    const { task } = req.body;
    const userId = req.userId;
    if (userId == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const [addTodo] = await db
        .insert(todos)
        .values({
        user_id: userId,
        task,
    })
        .returning();
    if (!addTodo) {
        return res.status(500).json({ message: "Failed to create todo" });
    }
    res.status(201).json({ id: addTodo.id, userId, task });
}
export async function updateTodo(req, res) {
    const { completed } = req.body;
    const { id } = req.params;
    await db
        .update(todos)
        .set({ completed })
        .where(eq(todos.id, Number(id)))
        .returning();
    res.status(200).json({ message: "Todo updated successfully" });
}
export async function deleteTodo(req, res) {
    const { id } = req.params;
    const userId = req.userId;
    if (userId == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    await db
        .delete(todos)
        .where(and(eq(todos.id, Number(id)), eq(todos.user_id, userId)));
    res.status(200).json({ message: "Todo deleted successfully" });
}
//# sourceMappingURL=todoHandlers.js.map