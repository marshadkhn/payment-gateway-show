// /src/pages/api/create-payment.js
import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Add these to your .env.local
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: 19500 * 100, // Amount in paise (INR 19,500)
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order); // Send order details to use on frontend Razorpay checkout
    } catch (error) {
      res.status(500).json({ error: "Razorpay order creation failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
