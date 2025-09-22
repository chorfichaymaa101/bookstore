import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Zap, Users, Globe, Brain, Award, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBooks } from "@/data/books";

export default function Categories() {
  const categoryData = [
    { name: "Classic Literature", icon: BookOpen, description: "Timeless masterpieces that have shaped literature" },
    { name: "Science Fiction", icon: Zap, description: "Explore future worlds and technological wonders" },
    { name: "Romance", icon: Heart, description: "Love stories that will warm your heart" },
    { name: "Fantasy", icon: Globe, description: "Magical realms and epic adventures await" },
    { name: "Self-Help", icon: Brain, description: "Transform your life with practical wisdom" },
    { name: "Mystery", icon: Users, description: "Thrilling puzzles and suspenseful tales" },
    { name: "History", icon: Award, description: "Journey through the past and learn from history" },
    { name: "Business", icon: Briefcase, description: "Strategy, leadership, and entrepreneurship" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);
  const featuredBook = mockBooks.find(book => book.category === selectedCategory.name);

  return (
    <div className="h-auto py-12 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">

        {/* Mobile Category Menu */}
<div className="lg:hidden mb-8">
  {/* Heading */}
    <p className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200 mb-5 tracking-wide">
    Choose a Category
  </p>
  {/* Scrollable Categories */}
  <div className="flex gap-4 px-2 overflow-x-auto touch-pan-x scrollbar-none scroll-smooth">
    {categoryData.map((category) => {
      const isSelected = selectedCategory.name === category.name;
      return (
        <div
          key={category.name}
          onClick={() => setSelectedCategory(category)}
          className="flex-shrink-0 cursor-pointer flex flex-col items-center justify-center px-4 py-2 transition-transform duration-300 hover:scale-105"
        >
          {/* Icon */}
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full mb-1 transition-transform duration-300 ${
              isSelected
                ? "bg-gradient-to-r from-[#4D5DDD] to-[#6670E0]"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <category.icon
              className={`h-6 w-6 ${
                isSelected
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            />
          </div>
          {/* Name with underline */}
          <span className="relative text-sm font-semibold text-center">
            {category.name}
            {isSelected && (
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#4D5DDD] to-[#6670E0] rounded-full animate-pulse"></span>
            )}
          </span>
        </div>
      );
    })}
  </div>
</div>


        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            {/* Main Heading */}
            <h1 className="font-extrabold leading-tight text-[35px] md:text-[50px]">
              Explore
              <span className="block mt-1 text-[35px] md:text-[50px] bg-clip-text text-transparent bg-gradient-to-r from-[#4D5DDD] via-[#6670E0] to-[#8B88FF] animate-gradient-x">
                {selectedCategory.name}
              </span>
            </h1>




            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md tracking-wide animate-fade-up">
              {selectedCategory.description}
            </p>

            {/* Browse Button */}
            <Link
              to={`/books?category=${encodeURIComponent(selectedCategory.name)}`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#4D5DDD] via-[#6670E0] to-[#8B88FF] text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl active:scale-95"
            >
              Browse Books Now
              <span className="ml-3 inline-block transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Featured Book */}
            <div className="relative flex justify-center items-center">
              {featuredBook && (
                <img
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  className="max-h-[250px] md:max-h-[350px] w-auto object-contain rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 hover:rotate-1"
                />
              )}
            </div>

        </div>

        {/* Categories Grid for desktop */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory.name === category.name;

            return (
              <Card
                key={category.name}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer h-full border-0 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isSelected ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white" : "bg-white dark:bg-gray-800"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-125 ${isSelected ? "bg-white/20" : "bg-gray-200 dark:bg-gray-700"}`}>
                    <IconComponent className={`h-8 w-8 ${isSelected ? "text-white" : "text-gray-600 dark:text-gray-300"}`} />
                  </div>
                  <CardTitle className={`text-xl font-semibold transition-colors duration-300 ${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
                    {category.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
