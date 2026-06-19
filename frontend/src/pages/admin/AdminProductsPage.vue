<template>
  <section>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1 class="text-3xl font-semibold">Products</h1>
      <input v-model="search" class="input md:w-80" type="search" placeholder="Search products" />
    </div>
    <div class="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-white">
      <table class="w-full min-w-[800px] text-left text-sm">
        <thead class="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
          <tr>
            <th class="p-4">Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filtered" :key="product.id" class="border-b border-neutral-100">
            <td class="p-4">
              <div class="flex items-center gap-3">
                <img :src="product.image" :alt="product.name" class="h-12 w-12 rounded-md object-cover" />
                <span class="font-semibold">{{ product.name }}</span>
              </div>
            </td>
            <td>{{ categoryName(product.categoryId) }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.rating.toFixed(1) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/api/http';
import { formatCurrency } from '@/utils/format';
import type { Category, Product } from '@/types';

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const search = ref('');

const filtered = computed(() => products.value.filter((product) => product.name.toLowerCase().includes(search.value.toLowerCase())));
const categoryName = (id: string) => categories.value.find((category) => category.id === id)?.name ?? 'Unassigned';

onMounted(async () => {
  const [productPage, categoryList] = await Promise.all([api.products('?limit=100'), api.categories()]);
  products.value = productPage.items;
  categories.value = categoryList;
});
</script>
