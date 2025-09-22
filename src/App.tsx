import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CartProvider } from "@/contexts/CartContext"; // ✅ import it

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <ThemeProvider>
          <CartProvider> {/* ✅ wrap your app with CartProvider */}
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/books/:id" element={<BookDetail />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </CartProvider>
        </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
