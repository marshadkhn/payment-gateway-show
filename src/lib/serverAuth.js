// src/lib/serverAuth.js
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || "token";

export const validateTokenFromRequest = (request) => {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [k, ...v] = c.trim().split("=");
        return [k, decodeURIComponent(v.join("="))];
      })
    );
    const token = cookies[COOKIE_NAME];
    if (!token) return null;
    const payload = jwt.verify(token, JWT_SECRET);
    return payload; // { id, email, iat, exp, ... }
  } catch (err) {
    return null;
  }
};

// helpers to read/write JSON files (simple)
export const readJSON = async (relPath) => {
  const file = path.join(process.cwd(), relPath);
  const exists = fs.existsSync(file);
  if (!exists) return null;
  const raw = await fs.promises.readFile(file, "utf-8");
  return JSON.parse(raw || "null");
};

export const writeJSON = async (relPath, data) => {
  const file = path.join(process.cwd(), relPath);
  await fs.promises.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
};
