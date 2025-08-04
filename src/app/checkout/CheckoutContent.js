"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutContent() {
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  // Show toast on load
  useEffect(() => {
    toast.success("Product added to cart");
  }, []);

  // Dynamically load Razorpay script
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
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 19500,
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
          toast.success("Payment successful!");
          router.push(
            `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}`
          );
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
    <div className="max-w-md mx-auto text-center mt-20 p-6 bg-gray-900 rounded-lg shadow-md text-white">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-1">
        <strong>Product ID:</strong> {id}
      </p>
      <p className="mb-1">
        <strong>Product:</strong> Dil Ruba Arwa Scarf
      </p>
      <p className="mb-6">
        <strong>Price:</strong> ₹19,500
      </p>
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-3 rounded-md text-white font-semibold transition ${
          isProcessing
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-rose-500 hover:bg-rose-600"
        }`}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
