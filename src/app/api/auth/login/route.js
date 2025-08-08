// src/app/api/auth/login/route.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readJSON } from "../../../../lib/serverAuth";

const USERS_FILE = "data/users.json";
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password required" }),
        { status: 400 }
      );
    }

    const users = (await readJSON(USERS_FILE)) || [];
    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return new Response(
      JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name },
      }),
      {
        status: 200,
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
