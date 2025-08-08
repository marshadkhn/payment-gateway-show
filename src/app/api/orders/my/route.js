// src/app/api/orders/my/route.js
import { validateTokenFromRequest, readJSON } from "../../../../lib/serverAuth";

export async function GET(req) {
  const payload = validateTokenFromRequest(req);
  if (!payload)
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });

  const orders = (await readJSON("data/orders.json")) || [];
  const userOrders = orders
    .filter((o) => o.userId === payload.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return new Response(JSON.stringify({ orders: userOrders }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
