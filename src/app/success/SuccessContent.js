"use client";
import { useSearchParams } from "next/navigation";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <div className="bg-neutral-800 rounded-lg px-8 py-10 max-w-sm text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
        <p className="mb-2">Your payment was successful.</p>
        <p className="mb-2">
          <b>Payment ID:</b> {paymentId}
        </p>
        <p className="mb-6">
          <b>Order ID:</b> {orderId}
        </p>
        <p>We are processing your order and will contact you soon.</p>
      </div>
    </div>
  );
}
