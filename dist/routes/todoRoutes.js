import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo, } from "../handlers/todoHandlers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);
export default router;
//# sourceMappingURL=todoRoutes.js.map