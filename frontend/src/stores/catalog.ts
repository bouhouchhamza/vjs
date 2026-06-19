import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/api/http';
import type { Category, Paginated, Product } from '@/types';

export const useCatalogStore = defineStore('catalog', () => {
  const categories = ref<Category[]>([]);
  const featured = ref<Product[]>([]);
  const products = ref<Paginated<Product> | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadHome() {
    loading.value = true;
    error.value = null;
    try {
      const [featuredProducts, categoryList] = await Promise.all([api.featuredProducts(), api.categories()]);
      featured.value = featuredProducts;
      categories.value = categoryList;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Impossible de charger le catalogue';
    } finally {
      loading.value = false;
    }
  }

  async function loadCategories() {
    categories.value = await api.categories();
  }

  async function loadProducts(params: URLSearchParams) {
    loading.value = true;
    error.value = null;
    try {
      const query = params.toString();
      products.value = await api.products(query ? `?${query}` : '');
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Impossible de charger les produits';
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    featured,
    products,
    loading,
    error,
    loadHome,
    loadCategories,
    loadProducts
  };
});
