import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, BookOpen, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartContext } from "@/contexts/CartContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import readOra from "@/assets/readora.png";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartState } = useCartContext();
  const { isDark, toggleTheme } = useThemeContext();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Browse Books" },
    { href: "/categories", label: "Categories" },
  ];

  const isActiveLink = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 dark:bg-slate-900/95 backdrop-blur transition-colors border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
         <Link
            to="/"
            className="flex items-center justify-center space-x-2 text-[22px] font-bold text-primary hover:text-black transition-colors"
          >
            <BookOpen className="h-8 w-8 flex-shrink-0" />
            <span
              className="leading-none"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ReadOra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href}
                className={`font-medium transition-colors hover:text-primary ${isActiveLink(link.href) ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle + Cart + Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="hidden sm:inline-flex hover:bg-[#4D5DDD]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative bg-[#4D5DDD] text-white hover:text-white hover:bg-black">
                <ShoppingCart className="h-4 w-4" />
                {cartState.itemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                    {cartState.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden bg-[#4D5DDD] hover:text-white hover:bg-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} className={`font-medium transition-colors hover:text-primary ${isActiveLink(link.href) ? "text-primary" : "text-muted-foreground"}`}>
                  {link.label}
                </Link>
              ))}
              {/* Mobile toggle visible in mobile menu too */}
              <Button variant="ghost" onClick={toggleTheme} className="w-full bg-[#4D5DDD] hover:bg-black hover:text-white">
                {isDark ? "Light mode" : "Dark mode"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
    
  );
  
}

