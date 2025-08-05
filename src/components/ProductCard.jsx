"use client";
import { addToCart } from "../utils/cart";

export default function ProductCard({ product }) {
  const handleAddToCart = (e) => {
    // Stop the event from bubbling up to any parent link elements
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="group relative bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-center object-cover group-hover:opacity-85 transition-opacity duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-highlight">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-400">₹{product.price}</p>
        <div className="mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
