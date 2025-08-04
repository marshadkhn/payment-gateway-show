"use client";
import React, { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={<div className="text-center mt-20 text-white">Loading...</div>}
    >
      <CheckoutContent />
    </Suspense>
  );
}
