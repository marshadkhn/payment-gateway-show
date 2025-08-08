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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Minimal Store
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/cart" className="relative hover:text-blue-600">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
