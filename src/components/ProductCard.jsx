"use client";
import { addToCart } from "../utils/cart";

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-40 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">
        {product.name}
      </h3>
      <p className="text-blue-800 font-bold mb-4 text-center">
        ₹{product.price}
      </p>
      <button
        onClick={handleAddToCart}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
