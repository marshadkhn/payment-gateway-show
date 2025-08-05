"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../utils/cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);
    if (quantity < 1) return;
    updateQuantity(id, quantity);
    setCart(getCart());
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-highlight">
          Your Cart is Empty
        </h1>
        {/* Corrected the unescaped apostrophe below */}
        <p className="mt-4 text-gray-400">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
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
    <div className="bg-secondary shadow-md rounded-lg p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-highlight mb-6">
        Your Shopping Cart
      </h1>
      <ul role="list" className="divide-y divide-accent">
        {cart.map((product) => (
          <li key={product.id} className="flex flex-col sm:flex-row py-6">
            <div className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 self-center overflow-hidden rounded-md border border-accent">
              {/* Replaced <img> with next/image <Image> */}
              <Image
                src={product.image}
                alt={product.name}
                width={128}
                height={128}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-highlight">
                  <h3>{product.name}</h3>
                  <p className="ml-4">₹{product.price * product.quantity}</p>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm mt-4">
                <div className="flex items-center">
                  <label
                    htmlFor={`qty-${product.id}`}
                    className="mr-2 text-gray-400"
                  >
                    Qty:
                  </label>
                  <input
                    type="number"
                    id={`qty-${product.id}`}
                    min="1"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    className="w-16 rounded border bg-primary text-highlight text-center"
                  />
                </div>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id)}
                    className="font-medium text-brand hover:text-opacity-80"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-accent pt-6 mt-6">
        <div className="flex justify-between text-lg font-medium text-highlight">
          <p>Subtotal</p>
          <p>₹{totalPrice.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-400">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            href="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-brand px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-80"
          >
            Proceed to Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
          <p>
            or{" "}
            <button
              type="button"
              onClick={handleClearCart}
              className="font-medium text-brand hover:text-opacity-80"
            >
              Clear Cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
