"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BookCard } from "@/components/BookCard";
import { mockBooks, categories as rawCategories } from "@/data/books";

// Deduplicate "All Books"
const categories = Array.from(new Set(["All Books", ...rawCategories]));

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Books");

  const [sortPrice, setSortPrice] = useState(searchParams.get("sortPrice") || "normal");
  const [ratingFilter, setRatingFilter] = useState<number>(Number(searchParams.get("rating")) || 0);

  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = useMemo(() => {
    let books = [...mockBooks];

    if (searchQuery) {
      books = books.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All Books") {
      books = books.filter(b => b.category === selectedCategory);
    }

    if (ratingFilter > 0) {
      books = books.filter(b => Math.floor(b.rating) >= ratingFilter);
    }

    switch (sortPrice) {
      case "high":
        books.sort((a, b) => b.price - a.price);
        break;
      case "low":
        books.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return books;
  }, [searchQuery, selectedCategory, sortPrice, ratingFilter]);

  const updateFilter = (key: string, value: any, setter: Function) => {
    setter(value);
    const params = new URLSearchParams(searchParams);
    if (["All Books", "normal", 0].includes(value)) params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-80 bg-card p-6 rounded-xl shadow-lg sticky top-20 h-[590px]">
          <h2 className="text-xl font-bold text-primary mb-4">Filters</h2>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-primary focus:border-primary focus:ring-primary rounded-full"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <h3 className="font-semibold text-muted-foreground mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat}
                  size="sm"
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className={`px-3 py-1 rounded-full text-sm ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "border-primary"}`}
                  onClick={() => updateFilter("category", cat, setSelectedCategory)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Sorting */}
          <div className="mb-4">
            <h3 className="font-semibold text-muted-foreground mb-2">Price</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Normal", value: "normal" },
                { label: "High → Low", value: "high" },
                { label: "Low → High", value: "low" }
              ].map(option => (
                <Button
                  key={option.value}
                  size="sm"
                  variant={sortPrice === option.value ? "default" : "outline"}
                  className={`px-3 py-1 rounded-full text-sm ${sortPrice === option.value ? "bg-secondary text-secondary-foreground" : "border-secondary"}`}
                  onClick={() => updateFilter("sortPrice", option.value, setSortPrice)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <h3 className="font-semibold text-muted-foreground mb-2">Rating</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${ratingFilter >= star ? "text-primary" : "text-muted-foreground"}`}
                  onClick={() => updateFilter("rating", star === ratingFilter ? 0 : star, setRatingFilter)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Mobile filter toggle */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <Button
              variant="outline"
              className="flex-1 bg-card text-foreground hover:bg-primary hover:text-primary-foreground border-primary transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 w-5 h-5" /> Filters
            </Button>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="bg-card p-4 rounded-xl shadow mb-6 lg:hidden">
              {/* Category */}
              <div className="mb-4 flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? "default" : "outline"}
                    className={`px-3 py-1 rounded-full text-sm ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "border-primary"}`}
                    onClick={() => updateFilter("category", cat, setSelectedCategory)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Price Sorting */}
              <div className="mb-4 flex flex-wrap gap-2">
                {[
                  { label: "Normal", value: "normal" },
                  { label: "High → Low", value: "high" },
                  { label: "Low → High", value: "low" }
                ].map(option => (
                  <Button
                    key={option.value}
                    size="sm"
                    variant={sortPrice === option.value ? "default" : "outline"}
                    className={`px-3 py-1 rounded-full text-sm ${sortPrice === option.value ? "bg-secondary text-secondary-foreground" : "border-secondary"}`}
                    onClick={() => updateFilter("sortPrice", option.value, setSortPrice)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-5 h-5 cursor-pointer ${ratingFilter >= star ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => updateFilter("rating", star === ratingFilter ? 0 : star, setRatingFilter)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Books */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Filter className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No books found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
