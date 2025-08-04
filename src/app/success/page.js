"use client";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <h1>Thank you for your order!</h1>
      <p>Your payment was successful.</p>
      <p>
        <strong>Payment ID:</strong> {paymentId}
      </p>
      <p>
        <strong>Order ID:</strong> {orderId}
      </p>
      <p>We are processing your order and will contact you soon.</p>
    </div>
  );
}
