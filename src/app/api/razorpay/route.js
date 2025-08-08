// src/app/api/razorpay/route.js
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const body = await request.json();

    // Accepts either `amount` (number) in rupees OR an object with items (optional)
    // For now we support amount in rupees from client but we round / validate server-side.
    const { amount } = body;

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return new Response(
        JSON.stringify({
          error: "Invalid payment amount. Provide a positive number.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      console.error("Razorpay API keys missing.");
      return new Response(
        JSON.stringify({ error: "Payment provider not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    // Convert rupees to paise and round to avoid floating point issues
    const amountPaise = Math.round(amount * 100);

    const options = {
      amount: amountPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify({ order, key_id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return new Response(
      JSON.stringify({ error: "Server error while creating order" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
