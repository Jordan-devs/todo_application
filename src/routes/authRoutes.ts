import express from "express";
import {
  LoginUsers,
  RegisterUsers,
  LogoutUsers,
} from "../handlers/authHandlers.js";

const router = express.Router();

router.post("/register", RegisterUsers);

router.post("/login", LoginUsers);

router.post("/logout", LogoutUsers);

export default router;
