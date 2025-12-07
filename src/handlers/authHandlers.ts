import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { LoginUserDTO, RegisterUserDTO } from "../dtos/dtos.js";
import bcrypt from "bcryptjs";
import { db } from "../db/index.js";
import { appendFile } from "fs/promises";
import { todos, users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export async function RegisterUsers(
  req: Request<{}, {}, RegisterUserDTO>,
  res: Response
) {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET is not set");
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  try {
    // check if user already exists
    const checkUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (checkUser.length > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // register new user

    const [addUser] = await db
      .insert(users)
      .values({
        username: username,
        password: hashedPassword,
      })
      .returning();

    if (!addUser) {
      res.status(500).json({ message: "Error registering user" });
      return;
    }

    // add all users to users.txt file
    const date = new Date();
    const formattedDate = date.toISOString().replace("T", " ").substring(0, 19);
    await appendFile(
      "users.txt",
      `ID: ${addUser.id}, Username: ${username}, Registered At: ${formattedDate}\n`
    );

    // default todo for all users
    const defaultTodo = `Hello :) Add your first todo!`;
    await db.insert(todos).values({
      user_id: addUser.id,
      task: defaultTodo,
    });

    //create and send token

    const token = jwt.sign({ id: addUser.id }, jwtSecret, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", status: "success" });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function LoginUsers(
  req: Request<{}, {}, LoginUserDTO>,
  res: Response
) {
  const { username, password } = req.body;

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET is not set");
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    // if we cannot find a user associated with that username, return out from the function
    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    // if the password does not match, return out of the function
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // create and send token
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", status: "success" });
  } catch (error) {
    console.error("Error Logging user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function LogoutUsers(req: Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
}
