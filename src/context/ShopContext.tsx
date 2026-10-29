"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Product } from "@/lib/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const isLoadedRef = useRef(false);

  // LocalStorage load on mount (deferred to prevent sync setState in effect error)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("niketan_cart");
        const savedWishlist = localStorage.getItem("niketan_wishlist");
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading cart/wishlist from localStorage:", error);
      } finally {
        isLoadedRef.current = true;
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save Cart to LocalStorage when cart changes (only after initial load)
  useEffect(() => {
    if (isLoadedRef.current) {
      localStorage.setItem("niketan_cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Save Wishlist to LocalStorage when wishlist changes (only after initial load)
  useEffect(() => {
    if (isLoadedRef.current) {
      localStorage.setItem("niketan_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => String(item.product.id) === String(product.id));
      if (existing) {
        return prevCart.map((item) =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => String(item.product.id) !== String(productId)));
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.product.id) === String(productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => String(p.id) === String(product.id));
      if (exists) return prev.filter((p) => String(p.id) !== String(product.id));
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string | number) => {
    setWishlist((prev) => prev.filter((p) => String(p.id) !== String(productId)));
  };

  const isInWishlist = (productId: string | number) => {
    return wishlist.some((p) => String(p.id) === String(productId));
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}