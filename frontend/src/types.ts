export type Role = 'user' | 'admin';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId?: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'card' | 'paypal' | 'bank' | 'whatsapp';
  paymentStatus: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
  whatsappUrl?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
}

export interface Paginated<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
