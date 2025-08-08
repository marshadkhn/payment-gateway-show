// src/components/Navbar.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateCount = () => {
      const cart = getCart();
      const total = cart.reduce((a, i) => a + (Number(i.quantity) || 0), 0);
      setCartCount(total);
    };
    updateCount();
    window.addEventListener("cart-updated", updateCount);
    window.addEventListener("storage", updateCount);

    // fetch user
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user || null);
      })
      .catch(() => {});

    return () => {
      window.removeEventListener("cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-sky-600"
            >
              Minimal Store
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-gray-700 px-3 py-2 rounded">
              Home
            </Link>
            <Link href="/cart" className="relative px-3 py-2 rounded">
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link
                  href="/orders"
                  className="px-3 py-2 rounded text-gray-700"
                >
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 bg-red-500 text-white rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded text-gray-700">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-2 bg-sky-600 text-white rounded"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded bg-gray-100"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2"
            >
              Home
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2"
            >
              Cart
            </Link>
            {user ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
