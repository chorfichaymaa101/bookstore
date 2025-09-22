import { Book } from "@/types/book";
import gatsbycover from "@/assets/gatsby-cover.jpg";
import mockingbirdcover from "@/assets/mockingbird-cover.jpg";
import cover1984 from "@/assets/1984-cover.jpg";
import lostSymbolCover from "@/assets/lostsymbol.jpg";
import sixOfCrowsCover from "@/assets/sixcrows.jpg";
import exhalationCover from "@/assets/exhalation.jpg";

import pridecover from "@/assets/pride-cover.jpg";
import hobbitcover from "@/assets/hobbit-cover.jpg";
import atomichabitscover from "@/assets/atomic-habits-cover.jpg";
import silentpatientcover from "@/assets/silent-patient-cover.jpg";
import sapienscover from "@/assets/sapiens-cover.jpg";
import mobydickcover from "@/assets/mobydick.jpg";
import leanstartupcover from "@/assets/leanstartup.jpg";

export const mockBooks: Book[] = [
  {
    id: "3",
    title: "Exhalation",
    author: "Ted Chiang",
    price: 16.99,
    originalPrice: 20.99,
    category: "Science Fiction",
    description: "A masterful collection of science fiction short stories exploring the nature of free will, time, and human curiosity.",
    rating: 2,
    reviewCount: 5400,
    coverImage: exhalationCover,
    isbn: "978-0-7653-8901-5",
    publishedDate: "2019-05-07",
    pages: 368,
    language: "English",
    publisher: "Knopf",
    inStock: true,
    stockCount: 20
  },


  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    category: "Romance",
    description: "A witty and romantic novel about Elizabeth Bennet and Mr. Darcy, exploring themes of love, class, and social expectations.",
    rating: 4.6,
    reviewCount: 1876,
    coverImage: pridecover,
    isbn: "978-0-14-143951-8",
    publishedDate: "1813-01-28",
    pages: 432,
    language: "English",
    publisher: "T. Egerton",
    inStock: true,
    stockCount: 22
  },
  {
    id: "2",
    title: "Six of Crows",
    author: "Leigh Bardugo",
    price: 14.99,
    originalPrice: 18.99,
    category: "Fantasy",
    description: "A fantasy novel following a gang of outcasts on a dangerous heist with high stakes and unforgettable characters.",
    rating: 4.7,
    reviewCount: 11200,
    coverImage: sixOfCrowsCover,
    isbn: "978-1-60713-661-1",
    publishedDate: "2015-09-29",
    pages: 465,
    language: "English",
    publisher: "Henry Holt",
    inStock: true,
    stockCount: 25
  },
    {
    id: "1",
    title: "The Lost Symbol",
    author: "Dan Brown",
    price: 15.99,
    originalPrice: 19.99,
    category: "Thriller",
    description: "A gripping thriller that takes you through hidden secrets, codes, and symbols in Washington, D.C.",
    rating: 4.5,
    reviewCount: 8500,
    coverImage: lostSymbolCover,
    isbn: "978-0-385-50441-9",
    publishedDate: "2009-09-15",
    pages: 510,
    language: "English",
    publisher: "Doubleday",
    inStock: true,
    stockCount: 30
  },
  
  
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 15.99,
    category: "Fantasy",
    description: "Follow Bilbo Baggins on an unexpected journey to help a group of dwarves reclaim their homeland from the dragon Smaug.",
    rating: 4.9,
    reviewCount: 4532,
    coverImage: hobbitcover,
    isbn: "978-0-547-92822-7",
    publishedDate: "1937-09-21",
    pages: 310,
    language: "English",
    publisher: "George Allen & Unwin",
    inStock: true,
    stockCount: 15
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    category: "Self-Help",
    description: "A comprehensive guide to building good habits and breaking bad ones through small, incremental changes.",
    rating: 4.8,
    reviewCount: 2891,
    coverImage: atomichabitscover,
    isbn: "978-0-7352-1129-2",
    publishedDate: "2018-10-16",
    pages: 320,
    language: "English",
    publisher: "Avery",
    inStock: true,
    stockCount: 41
  },
  {
    id: "7",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 16.99,
    category: "Mystery",
    description: "A psychological thriller about a woman who refuses to speak after allegedly murdering her husband.",
    rating: 4.4,
    reviewCount: 1653,
    coverImage: silentpatientcover,
    isbn: "978-1-250-30170-7",
    publishedDate: "2019-02-05",
    pages: 336,
    language: "English",
    publisher: "Celadon Books",
    inStock: true,
    stockCount: 28
  },
  {
    id: "8",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 19.99,
    originalPrice: 24.99,
    category: "History",
    description: "A brief history of humankind exploring how Homo sapiens came to dominate the world.",
    rating: 4.5,
    reviewCount: 3267,
    coverImage: sapienscover,
    isbn: "978-0-06-231609-7",
    publishedDate: "2014-09-04",
    pages: 443,
    language: "English",
    publisher: "Harper",
    inStock: true,
    stockCount: 19
  },
   {
    id: "9",
    title: "Moby-Dick",
    author: "Herman Melville",
    price: 12.49,
    category: "Classic Literature",
    description: "An epic tale of obsession and revenge as Captain Ahab hunts the white whale, Moby-Dick.",
    rating: 4.3,
    reviewCount: 1290,
    coverImage: mobydickcover,
    isbn: "978-0-14-243724-7",
    publishedDate: "1851-10-18",
    pages: 635,
    language: "English",
    publisher: "Harper & Brothers",
    inStock: true,
    stockCount: 18
  },
  {
    id: "10",
    title: "The Lean Startup",
    author: "Eric Ries",
    price: 21.99,
    category: "Business",
    description: "A groundbreaking approach to building startups by applying lean principles and rapid experimentation.",
    rating: 4.6,
    reviewCount: 4721,
    coverImage: leanstartupcover,
    isbn: "978-0-307-88789-4",
    publishedDate: "2011-09-13",
    pages: 336,
    language: "English",
    publisher: "Crown Business",
    inStock: true,
    stockCount: 34
  }
];

export const categories = [
  "All Books",
  "Classic Literature", 
  "Science Fiction",
  "Romance",
  "Fantasy",
  "Self-Help",
  "Mystery",
  "History",
  "Biography",
  "Business"
];

export const featuredBooks = mockBooks.slice(0, 4);