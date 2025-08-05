"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalQuantity);
    };

    updateCount();

    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl hover:text-blue-400 transition"
        >
          Minimal Store
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:text-blue-400 transition text-base">
            Home
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center hover:text-blue-400 transition text-base"
          >
            <span className="mr-2">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-5 bg-red-500 rounded-full px-2 text-xs font-semibold text-white shadow">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
