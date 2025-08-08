// src/utils/cart.js
export const CART_KEY = "cart";

// Safe parse
const safeParse = (v) => {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
};

export const getCart = () => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CART_KEY);
  const parsed = safeParse(raw || "[]");
  return Array.isArray(parsed) ? parsed : [];
};

export const saveCart = (cart) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // custom event for same-tab listeners
    window.dispatchEvent(new Event("cart-updated"));
  } catch (e) {
    console.error("Failed to save cart:", e);
  }
};

export const addToCart = (product) => {
  if (!product || !product.id) return;
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 0) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
};

export const removeFromCart = (id) => {
  if (!id) return;
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};

export const updateQuantity = (id, quantity) => {
  if (!id) return;
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id);
  if (index === -1) return;
  const qtyNum = Number(quantity) || 0;
  if (qtyNum <= 0) {
    removeFromCart(id);
    return;
  }
  cart[index].quantity = qtyNum;
  saveCart(cart);
};

export const clearCart = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cart-updated"));
  } catch (e) {
    console.error("Failed to clear cart:", e);
  }
};
