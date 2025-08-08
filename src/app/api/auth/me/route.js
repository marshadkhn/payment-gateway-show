// src/app/api/auth/me/route.js
import { validateTokenFromRequest } from "../../../../lib/serverAuth";
import { readJSON } from "../../../../lib/serverAuth";

export async function GET(req) {
  const payload = validateTokenFromRequest(req);
  if (!payload) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const users = (await readJSON("data/users.json")) || [];
  const user = users.find((u) => u.id === payload.id);
  if (!user)
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  const safe = { id: user.id, email: user.email, name: user.name };
  return new Response(JSON.stringify({ user: safe }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
