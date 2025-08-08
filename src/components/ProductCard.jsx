"use client";
import Image from "next/image";
import { addToCart } from "../utils/cart";

export default function ProductCard({ product }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition p-4 flex flex-col">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="rounded-md object-cover"
      />
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
