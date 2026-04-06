import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const CART_KEY = 'pequena_duquesa_cart';

// Global listeners for add-to-cart event
const listeners = new Set();
export function onAddToCart(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getStoredCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function useCart() {
  const [cart, setCart] = useState(getStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
    // Notify listeners (for toast notification)
    listeners.forEach(fn => fn(product));

    // Decrement stock in database
    const currentQty = product.stock_quantity ?? 0;
    if (currentQty > 0) {
      const newQty = Math.max(0, currentQty - quantity);
      base44.entities.Product.update(product.id, {
        stock_quantity: newQty,
        in_stock: newQty > 0,
      }).catch(() => {});
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount };
}