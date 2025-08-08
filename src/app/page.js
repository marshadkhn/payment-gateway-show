import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
