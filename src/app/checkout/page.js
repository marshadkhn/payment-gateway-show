"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { getCart, clearCart } from "../../utils/cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const storedCart = getCart();
    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        alert(`Error: ${responseBody.error}`);
        setLoading(false);
        return;
      }

      const { order } = responseBody;

      if (!order) {
        alert("Error creating order, please try again.");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Minimal Store",
        description: "Order Payment",
        handler: function (res) {
          setPaymentSuccess(true);
          clearCart();
          setCart([]);
          setLoading(false);
        },
        prefill: {
          email: "",
          contact: "",
        },
        theme: {
          color: "#FF5A5F",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed: " + error.message);
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-green-500">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-400">Your order has been placed.</p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-brand text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-highlight">
          Your Cart is Empty
        </h1>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-brand text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="bg-secondary shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-highlight mb-6">
          Order Summary
        </h1>
        <ul role="list" className="divide-y divide-accent">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between py-4">
              <span className="text-gray-300">
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold text-highlight">
                ₹{item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t border-accent pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold text-highlight">
            <p>Total</p>
            <p>₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-brand text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:bg-opacity-80 disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : `Pay ₹${totalAmount.toFixed(2)} with Razorpay`}
          </button>
        </div>
      </div>
    </>
  );
}
