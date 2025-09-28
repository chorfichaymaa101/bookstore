import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "@/types/book";
import { useCartContext } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

interface BookCardProps {
  book: Book;
  variant?: "default" | "featured";
}

export function BookCard({ book, variant = "default" }: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, isInCart } = useCartContext();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isInCart(book.id)) {
      addToCart(book);
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${book.title} ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const renderStars = (rating: number) => (
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
        }`}
      />
    ))
  );

  return (
    <Link to={`/books/${book.id}`} className="group">
      <Card className="relative bg-card hover:bg-card-hover rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
            <img
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              className="w-full h-56 sm:h-72 lg:h-80 object-contain rounded-t-xl sm:rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            />

            {/* Price Badge */}
            {book.originalPrice && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs"
              >
                Sale
              </Badge>
            )}

          

            {/* Quick Add to Cart Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary-light text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-1.5 sm:gap-2 transition transform translate-y-3 sm:translate-y-4 group-hover:translate-y-0"
                disabled={isInCart(book.id)}
              >
                <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {isInCart(book.id) ? "In Cart" : "Add to Cart"}
              </Button>
            </div>
          </div>

          {/* Book Info */}
          <div className="p-3 sm:p-4">
            {/* Category */}
            <Badge variant="secondary" className="mb-1 sm:mb-2 text-[10px] sm:text-xs bg-primary text-white">
              {book.category}
            </Badge>

            {/* Title & Author */}
            <h3 className="font-semibold sm:font-bold text-sm sm:text-lg mb-0.5 sm:mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-[11px] sm:text-sm text-muted-foreground mb-1 sm:mb-2">by {book.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              <div className="flex">{renderStars(book.rating)}</div>
              <span className="text-[11px] sm:text-sm text-muted-foreground">
                {book.rating} ({book.reviewCount})
              </span>
            </div>

            {/* Price & Stock */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-base sm:text-xl font-bold text-primary">${book.price}</span>
                {book.originalPrice && (
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    ${book.originalPrice}
                  </span>
                )}
              </div>
              {book.inStock ? (
                <span className="text-[10px] sm:text-xs text-green-500">{book.stockCount} in stock</span>
              ) : (
                <span className="text-[10px] sm:text-xs text-red-500">Out of stock</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
