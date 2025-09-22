import { useState, useEffect } from "react";
import { CartItem, Book, CartState } from "@/types/book";

const CART_STORAGE_KEY = "bookstore-cart";

export function useCart() {
  const [cartState, setCartState] = useState<CartState>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { items: [], total: 0, itemCount: 0 };
      }
    }
    return { items: [], total: 0, itemCount: 0 };
  });

  const updateCartState = (newItems: CartItem[]) => {
    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
    const newState = { items: newItems, total, itemCount };
    setCartState(newState);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  };

  const addToCart = (book: Book, quantity = 1) => {
    const existingItem = cartState.items.find(item => item.id === book.id);
    
    if (existingItem) {
      const updatedItems = cartState.items.map(item =>
        item.id === book.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      updateCartState(updatedItems);
    } else {
      const newItem: CartItem = { ...book, quantity };
      updateCartState([...cartState.items, newItem]);
    }
  };
 
  const removeFromCart = (bookId: string) => {
    const updatedItems = cartState.items.filter(item => item.id !== bookId);
    updateCartState(updatedItems);
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    const updatedItems = cartState.items.map(item =>
      item.id === bookId ? { ...item, quantity } : item
    );
    updateCartState(updatedItems);
  };

  const clearCart = () => {
    updateCartState([]);
  };

  const isInCart = (bookId: string) => {
    return cartState.items.some(item => item.id === bookId);
  };

  const getItemQuantity = (bookId: string) => {
    const item = cartState.items.find(item => item.id === bookId);
    return item?.quantity || 0;
  };

  return {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
}