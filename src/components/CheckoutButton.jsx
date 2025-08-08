"use client";
import Script from "next/script";

export default function CheckoutButton({ amount }) {
  const handlePayment = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const { order } = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Minimal Store",
      handler: function (response) {
        window.location.href = "/success";
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
      >
        Pay Now
      </button>
    </>
  );
}
