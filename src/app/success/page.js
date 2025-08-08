// src/app/success/page.js
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold text-green-600">Payment Received</h1>
      <p className="mt-4 text-gray-600">
        Thanks for your purchase! We'll email your receipt shortly.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
