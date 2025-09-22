import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, CartState, Book } from "@/types/book";

const CART_STORAGE_KEY = "bookstore-cart";

interface CartContextType {
  cartState: CartState;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartState, setCartState] = useState<CartState>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return { items: [], total: 0, itemCount: 0 };
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  }, [cartState]);

  const updateCartState = (newItems: CartItem[]) => {
    const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartState({ items: newItems, total, itemCount });
  };

  const addToCart = (book: Book, quantity = 1) => {
    const existingItem = cartState.items.find(item => item.id === book.id);
    if (existingItem) {
      updateCartState(
        cartState.items.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      updateCartState([...cartState.items, { ...book, quantity }]);
    }
  };

  const removeFromCart = (bookId: string) => {
    updateCartState(cartState.items.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(bookId);
    updateCartState(
      cartState.items.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => updateCartState([]);

  const isInCart = (bookId: string) => cartState.items.some(item => item.id === bookId);

  return (
    <CartContext.Provider
      value={{ cartState, addToCart, removeFromCart, updateQuantity, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within CartProvider");
  return context;
};
