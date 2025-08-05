import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 text-center">
        Minimal Store
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
