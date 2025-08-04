"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900">
      <main className="flex flex-col items-center w-full max-w-xs md:max-w-md bg-transparent p-6 rounded-xl">
        <Image
          src="/main.png"
          width={320}
          height={425}
          alt="Torani Pink Embroidery Tassels Dil Ruba Arwa Scarf"
          className="rounded-lg object-cover w-full"
          priority
        />
        <h2 className="text-white text-lg font-semibold mt-6 mb-1">Torani</h2>
        <div className="text-neutral-300 text-base text-center mb-1">
          Pink Embroidery, Tassels Dil Ruba Arwa Scarf
        </div>
        <div className="text-white font-bold text-base mb-4">₹19,500</div>
        <select className="w-full p-3 text-base rounded border border-neutral-700 bg-neutral-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-rose-400">
          <option>FREE SIZE ✔</option>
        </select>
        <button
          onClick={() => router.push("/checkout?id=508140")}
          className="w-full bg-rose-500 text-white font-bold text-lg rounded py-3 transition hover:bg-rose-600"
        >
          Buy Now
        </button>
      </main>
    </div>
  );
}
