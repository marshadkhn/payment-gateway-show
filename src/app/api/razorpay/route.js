import Razorpay from "razorpay";

export async function POST(req) {
  const { amount } = await req.json();

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  return Response.json({ order });
}
