"use client";

import { useEffect, useState } from "react";
import { getCart, clearCart } from "../../utils/cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

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
      // Create Razorpay order on server
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const { order } = await response.json();

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
          alert(`Payment successful! Payment ID: ${res.razorpay_payment_id}`);
          clearCart();
          setCart([]);
          setLoading(false);
          // You can redirect or show success UI here
        },
        prefill: {
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed: " + error.message);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <a href="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <ul className="divide-y divide-gray-300">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold">
                ₹{item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center font-bold text-lg mb-8">
        <span>Total</span>
        <span>₹{totalAmount}</span>
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </main>
  );
}
