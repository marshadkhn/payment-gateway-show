// src/app/checkout/page.js
"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { getCart } from "../../utils/cart";
import CheckoutButton from "../../components/CheckoutButton";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const refresh = () => setCart(getCart());
    refresh();
    window.addEventListener("cart-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  if (paymentSuccess) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">Your order has been placed.</p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
        <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* checkout.js script is included per component (CheckoutButton) but keeping here won't hurt */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h1>
        <ul role="list" className="divide-y divide-gray-200">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between py-4">
              <span className="text-gray-900">
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold text-gray-900">
                ₹
                {(
                  (Number(item.price) || 0) * (Number(item.quantity) || 0)
                ).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <p>Total</p>
            <p>₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8">
          <CheckoutButton amount={totalAmount} />
        </div>
      </div>
    </>
  );
}
