import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  return (
    <div>
      <div className="text-center py-10 md:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-highlight tracking-tight">
          Discover Our Exclusive Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
          Handpicked items of the highest quality, just for you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
