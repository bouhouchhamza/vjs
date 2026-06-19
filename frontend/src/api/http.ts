import type { Category, Order, Paginated, Product, User } from '@/types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

interface RequestOptions extends RequestInit {
  token?: string | null;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(Array.isArray(body.message) ? body.message.join(', ') : body.message);
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (payload: { email: string; password: string }) =>
    request<{ user: User; accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  register: (payload: { name: string; email: string; password: string }) =>
    request<{ user: User; accessToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  profile: (token: string) => request<User>('/users/me', { token }),
  updateProfile: (token: string, payload: Partial<User>) =>
    request<User>('/users/me', { method: 'PATCH', token, body: JSON.stringify(payload) }),
  products: (params = '') => request<Paginated<Product>>(`/products${params}`),
  featuredProducts: () => request<Product[]>('/products/featured'),
  product: (idOrSlug: string) => request<Product>(`/products/${idOrSlug}`),
  relatedProducts: (id: string) => request<Product[]>(`/products/${id}/related`),
  categories: () => request<Category[]>('/categories'),
  createOrder: (payload: unknown, token?: string | null) =>
    request<Order>('/orders', { method: 'POST', token, body: JSON.stringify(payload) }),
  myOrders: (token: string) => request<Order[]>('/orders/mine', { token }),
  allOrders: (token: string) => request<Order[]>('/orders', { token }),
  allUsers: (token: string) => request<User[]>('/users', { token }),
  adminOverview: (token: string) =>
    request<{
      stats: { revenue: number; orders: number; products: number; customers: number; categories: number };
      recentOrders: Order[];
      lowStock: Product[];
    }>('/admin/overview', { token })
};
