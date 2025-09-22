export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  coverImage: string;
  isbn: string;
  publishedDate: string;
  pages: number;
  language: string;
  publisher: string;
  inStock: boolean;
  stockCount: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CheckoutInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  country: string;
}