"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
      <main className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Go Back to Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.map(({ id, name, price, quantity, image }) => (
          <div key={id} className="flex items-center gap-6 border-b pb-4">
            <img
              src={image}
              alt={name}
              className="h-24 w-24 object-contain rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-blue-700 font-bold">₹{price}</p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor={`qty-${id}`} className="sr-only">
                Quantity
              </label>
              <input
                type="number"
                id={`qty-${id}`}
                min={1}
                value={quantity}
                onChange={(e) => handleQuantityChange(id, e.target.value)}
                className="w-16 border rounded p-1 text-center"
              />
            </div>
            <button
              onClick={() => handleRemove(id)}
              className="text-red-600 hover:underline font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleClearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Clear Cart
        </button>
        <div className="text-xl font-semibold">
          Total: ₹{totalPrice.toFixed(2)}
        </div>
      </div>

      <div className="mt-8 text-right">
        <Link
          href="/checkout"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}
