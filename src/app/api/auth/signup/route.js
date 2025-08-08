// src/app/api/auth/signup/route.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readJSON, writeJSON } from "../../../../lib/serverAuth";

const USERS_FILE = "data/users.json";
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400 }
      );
    }

    const users = (await readJSON(USERS_FILE)) || [];

    const exists = users.find((u) => u.email === email.toLowerCase());
    if (exists) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = {
      id: String(Date.now()),
      email: email.toLowerCase(),
      name: name || "",
      password: hashed,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeJSON(USERS_FILE, users);

    // create JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return new Response(
      JSON.stringify({
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${
            7 * 24 * 60 * 60
          }; SameSite=Strict`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
