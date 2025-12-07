import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import AuthRoutes from "./routes/authRoutes.js";
import TodoRoutes from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use("/auth", AuthRoutes);
app.use("/todos", TodoRoutes);
app.listen(PORT, () => console.log("Server has started on PORT", PORT));
//# sourceMappingURL=server.js.map