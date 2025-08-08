// src/app/api/orders/route.js
import Razorpay from "razorpay";
import {
  readJSON,
  writeJSON,
  validateTokenFromRequest,
} from "../../../lib/serverAuth.js"; // adjust path
import { PRODUCTS } from "../../../data/products";

const ORDERS_FILE = "data/orders.json";

export async function POST(req) {
  try {
    // validate auth
    const payload = validateTokenFromRequest(req);
    if (!payload) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { items } = body;
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items" }), {
        status: 400,
      });
    }

    // calculate amount server-side from PRODUCTS
    let amount = 0;
    const lineItems = [];
    for (const it of items) {
      const prod = PRODUCTS.find((p) => p.id === String(it.id));
      if (!prod) {
        return new Response(
          JSON.stringify({ error: `Invalid product id ${it.id}` }),
          { status: 400 }
        );
      }
      const qty = Number(it.quantity) || 0;
      if (qty <= 0)
        return new Response(JSON.stringify({ error: "Invalid quantity" }), {
          status: 400,
        });
      amount += prod.price * qty;
      lineItems.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: qty,
      });
    }

    // convert to paise
    const amountPaise = Math.round(amount * 100);

    // razorpay
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      return new Response(
        JSON.stringify({ error: "Payment provider not configured" }),
        { status: 500 }
      );
    }
    const razorpay = new Razorpay({ key_id, key_secret });

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    // save order server-side
    const orders = (await readJSON(ORDERS_FILE)) || [];
    const saved = {
      id: String(Date.now()),
      razorpay_order_id: order.id,
      userId: payload.id,
      items: lineItems,
      total: amount,
      createdAt: new Date().toISOString(),
      status: "created",
    };
    orders.push(saved);
    await writeJSON(ORDERS_FILE, orders);

    return new Response(JSON.stringify({ order, orderRef: saved }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("orders.post error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
