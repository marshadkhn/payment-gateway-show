"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Toast on load
  useEffect(() => {
    toast.success("Product added to cart");
  }, []);

  // Dynamically load Razorpay checkout.js script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Create Order on backend
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 19500, // INR price
          currency: "INR",
          productName: "Dil Ruba Arwa Scarf",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to create order. Try again.");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Torani",
        description: "Payment for Dil Ruba Arwa Scarf",
        order_id: data.id,
        handler: function (response) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          window.location.href = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`;
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#fb5d5d",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response) {
        toast.error("Payment failed: " + response.error.description);
        setIsProcessing(false);
      });
    } catch (error) {
      toast.error("Payment error: " + error.message);
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Toaster position="top-right" />

      <h1>Checkout</h1>
      <p>
        <strong>Product ID:</strong> {id}
      </p>
      <p>
        <strong>Product:</strong> Dil Ruba Arwa Scarf
      </p>
      <p>
        <strong>Price:</strong> ₹19,500
      </p>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        style={{
          backgroundColor: "#fb5d5d",
          color: "white",
          padding: "12px 24px",
          fontSize: "16px",
          border: "none",
          borderRadius: "6px",
          cursor: isProcessing ? "not-allowed" : "pointer",
          marginTop: "20px",
          width: "100%",
        }}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
