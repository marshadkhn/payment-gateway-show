// src/app/cart/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../utils/cart";
import CheckoutButton from "../../components/CheckoutButton"; // optional if you want to pay directly from cart

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const refresh = () => setCart(getCart());
    refresh();
    // listen to same-tab updates:
    window.addEventListener("cart-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);
    if (Number.isNaN(quantity) || quantity < 1) return;
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
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="mt-4 text-gray-600">
          Looks like you haven't added anything to your cart yet.
        </p>
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
    <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Your Shopping Cart
      </h1>
      <ul role="list" className="divide-y divide-gray-200">
        {cart.map((product) => (
          <li key={product.id} className="flex flex-col sm:flex-row py-6">
            <div className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 self-center overflow-hidden rounded-md border border-gray-200">
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
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p className="ml-4">
                    ₹{(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm mt-4">
                <div className="flex items-center">
                  <label
                    htmlFor={`qty-${product.id}`}
                    className="mr-2 text-gray-600"
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
                    className="w-16 rounded border bg-white text-gray-900 text-center"
                  />
                </div>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id)}
                    className="font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-200 pt-6 mt-6">
        <div className="flex justify-between text-lg font-medium text-gray-900">
          <p>Subtotal</p>
          <p>₹{totalPrice.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          Shipping and taxes calculated at checkout.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700"
          >
            Proceed to Checkout
          </Link>
          <button
            onClick={handleClearCart}
            className="w-full bg-white border border-red-600 text-red-600 rounded-md px-6 py-3 hover:bg-red-50"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
