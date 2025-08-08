"use client";
import { useState, useEffect } from "react";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../utils/cart";
import CheckoutButton from "../../components/CheckoutButton";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
    setCart(getCart());
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <p className="p-6 text-center text-gray-600">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <span>{item.name}</span>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
              className="w-16 border rounded p-1"
            />
            <span>₹{item.price * item.quantity}</span>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-6 font-bold">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>
      <div className="mt-4 flex justify-end">
        <CheckoutButton amount={total} />
      </div>
    </div>
  );
}
