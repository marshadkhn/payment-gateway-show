// src/components/ProductCard.js
"use client";
import Image from "next/image";
import { addToCart } from "../utils/cart";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-center object-cover group-hover:opacity-95 transition-opacity duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600">₹{product.price}</p>
        <div className="mt-auto pt-4">
          <button
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add to Cart
          </button>

          {/* small toast */}
          {justAdded && (
            <div
              role="status"
              aria-live="polite"
              className="mt-2 text-sm text-green-700"
            >
              Added to cart ✓
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
