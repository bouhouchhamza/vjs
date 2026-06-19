import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Product } from '@/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = 'velora_cart';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  function hydrate() {
    if (items.value.length) {
      return;
    }
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      items.value = JSON.parse(stored) as CartItem[];
    }
  }

  watch(
    items,
    (value) => {
      localStorage.setItem(CART_KEY, JSON.stringify(value));
    },
    { deep: true }
  );

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
  const shipping = computed(() => (subtotal.value > 100 || subtotal.value === 0 ? 0 : 9.9));
  const tax = computed(() => Number((subtotal.value * 0.08).toFixed(2)));
  const total = computed(() => Number((subtotal.value + shipping.value + tax.value).toFixed(2)));

  function add(product: Product, quantity = 1) {
    const existing = items.value.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
      return;
    }
    items.value.push({ product, quantity });
  }

  function update(productId: string, quantity: number) {
    if (quantity <= 0) {
      remove(productId);
      return;
    }
    const item = items.value.find((entry) => entry.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  function remove(productId: string) {
    items.value = items.value.filter((item) => item.product.id !== productId);
  }

  function clear() {
    items.value = [];
  }

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    hydrate,
    add,
    update,
    remove,
    clear
  };
});
