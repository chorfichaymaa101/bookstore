import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBooks } from "@/data/books";
import { useCartContext } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, isInCart } = useCartContext();

  const book = mockBooks.find(b => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Book not found</h2>
          <Button asChild>
            <Link to="/books">Back to Books</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${book.title} added to cart`,
    });
  };

  const handleBuyNow = () => {
    if (!isInCart(book.id)) addToCart(book, quantity);
    navigate("/cart");
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${book.title} ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
        }`}
      />
    ));

  const features = [
    { icon: Truck, text: "Free shipping over $25" },
    { icon: RotateCcw, text: "30-day return policy" },
    { icon: Shield, text: "Secure payment guaranteed" },
  ];

  return (
    <div className="min-h-screen py-10 bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/books" className="flex items-center text-gray-200 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Book Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden shadow-lg rounded-2xl border border-gray-700 bg-gray-800">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="w-full h-[600px] object-contain p-6"
              />
            </Card>
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            {/* Category */}
            <Badge className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-semibold px-4 py-1">
              {book.category}
            </Badge>

            {/* Title & Author */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">{book.title}</h1>
              <p className="text-lg text-gray-300">by {book.author}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">{renderStars(book.rating)}</div>
              <span className="font-medium text-gray-200">{book.rating}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
                ${book.price}
              </span>
              {book.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${book.originalPrice}</span>
                  <Badge variant="destructive" className="font-semibold">
                    Save ${(book.originalPrice - book.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {book.inStock ? (
                <>
                  <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium">
                    In Stock ({book.stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-400 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-700 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 border-l border-r border-gray-700">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(book.stockCount, quantity + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!book.inStock || isInCart(book.id)}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:scale-105 transform transition-all"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isInCart(book.id) ? "Already in Cart" : "Add to Cart"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!book.inStock}
                  variant="secondary"
                  className="flex-1 bg-indigo-700 text-white shadow hover:bg-indigo-600"
                >
                  Buy Now
                </Button>
                <Button variant="outline" size="icon" onClick={handleWishlist} className="hover:bg-pink-800">
                  <Heart className={`h-4 w-4 ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-200"}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                  <feature.icon className="h-4 w-4 text-indigo-400" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <Separator className="border-gray-700" />

            {/* Book Details */}
            <div className="space-y-2 text-sm">
              {["ISBN", "Pages", "Language", "Publisher", "Published"].map((field, idx) => (
                <div className="flex justify-between" key={idx}>
                  <span className="text-gray-500">{field}:</span>
                  <span>
                    {field === "Pages"
                      ? `${book.pages} pages`
                      : field === "Published"
                      ? new Date(book.publishedDate).toLocaleDateString()
                      : (book as any)[field.toLowerCase()]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-indigo-700">
              <TabsTrigger value="description" className="text-white">
                Description
              </TabsTrigger>
              <TabsTrigger value="details" className="text-white">
                Details
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-gray-300 leading-relaxed">
                  {book.description}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-white">Product Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">ISBN:</span>
                          <span>{book.isbn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Pages:</span>
                          <span>{book.pages} pages</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Language:</span>
                          <span>{book.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Publisher:</span>
                          <span>{book.publisher}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-white">Availability</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Stock:</span>
                          <span className={book.inStock ? "text-green-400" : "text-red-400"}>
                            {book.inStock ? `${book.stockCount} in stock` : "Out of stock"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Shipping:</span>
                          <span>Free on orders over $25</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Returns:</span>
                          <span>30-day return policy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
