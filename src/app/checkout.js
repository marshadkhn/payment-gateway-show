"use client";
import { useSearchParams } from "next/navigation";

export default function Checkout() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const handlePayment = async () => {
    const res = await fetch("/api/create-payment", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h3>Ready to buy: Dil Ruba Arwa Scarf</h3>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
}
