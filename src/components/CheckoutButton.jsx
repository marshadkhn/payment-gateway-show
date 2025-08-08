// src/components/CheckoutButton.js
"use client";
import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, clearCart } from "../utils/cart";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setLoading(true);
      const cart = getCart();
      if (!cart || cart.length === 0) throw new Error("Cart is empty");

      const items = cart.map((i) => ({ id: i.id, quantity: i.quantity }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      const { order } = data; // razorpay order
      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.key_id;

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Minimal Store",
        description: "Order Payment",
        handler: function (response) {
          // For prototype we simply clear cart and redirect to success or orders
          clearCart();
          router.push("/orders");
        },
        theme: { color: "#0ea5e9" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        alert("Payment failed. Please retry.");
      });
      rzp.open();
    } catch (err) {
      alert(err.message || "Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </>
  );
}
