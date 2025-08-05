export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === product.id);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};

export const updateQuantity = (id, quantity) => {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1 && quantity >= 1) {
    cart[index].quantity = quantity;
  }
  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
