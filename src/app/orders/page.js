// src/app/orders/page.js
"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetch("/api/orders/my")
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.orders || []);
      })
      .catch(() => setOrders([]));
  }, []);

  if (orders === null) return <div>Loading...</div>;
  if (orders.length === 0)
    return <div className="text-center py-16">No orders yet.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <ul className="space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-600">
                  Order #: {o.razorpay_order_id}
                </div>
                <div className="font-semibold">₹{o.total.toFixed(2)}</div>
                <div className="text-sm text-gray-500">
                  Placed: {new Date(o.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm">Items:</div>
                <ul>
                  {o.items.map((it) => (
                    <li key={it.id} className="text-sm">
                      {it.name} x {it.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
