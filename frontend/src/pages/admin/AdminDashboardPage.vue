<template>
  <section>
    <h1 class="text-3xl font-semibold">Overview</h1>
    <div class="mt-6 grid gap-4 md:grid-cols-5">
      <div v-for="card in cards" :key="card.label" class="rounded-md border border-neutral-200 bg-white p-5">
        <p class="text-sm text-neutral-500">{{ card.label }}</p>
        <strong class="mt-2 block text-2xl">{{ card.value }}</strong>
      </div>
    </div>
    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <section class="rounded-md border border-neutral-200 bg-white p-6">
        <h2 class="text-xl font-semibold">Recent orders</h2>
        <div class="mt-5 grid gap-3">
          <div v-for="order in overview?.recentOrders" :key="order.id" class="flex items-center justify-between border-b border-neutral-100 pb-3 text-sm">
            <span class="font-semibold">{{ order.id }}</span>
            <span class="capitalize text-neutral-600">{{ order.status }}</span>
            <span>{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
      </section>
      <section class="rounded-md border border-neutral-200 bg-white p-6">
        <h2 class="text-xl font-semibold">Low stock</h2>
        <div class="mt-5 grid gap-3">
          <div v-for="product in overview?.lowStock" :key="product.id" class="flex items-center justify-between border-b border-neutral-100 pb-3 text-sm">
            <span class="font-semibold">{{ product.name }}</span>
            <span>{{ product.stock }} units</span>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/api/http';
import { useAuthStore } from '@/stores/auth';
import { formatCurrency } from '@/utils/format';
import type { Order, Product } from '@/types';

const auth = useAuthStore();
const overview = ref<{
  stats: { revenue: number; orders: number; products: number; customers: number; categories: number };
  recentOrders: Order[];
  lowStock: Product[];
} | null>(null);

const cards = computed(() => [
  { label: 'Revenue', value: formatCurrency(overview.value?.stats.revenue ?? 0) },
  { label: 'Orders', value: overview.value?.stats.orders ?? 0 },
  { label: 'Products', value: overview.value?.stats.products ?? 0 },
  { label: 'Customers', value: overview.value?.stats.customers ?? 0 },
  { label: 'Categories', value: overview.value?.stats.categories ?? 0 }
]);

onMounted(async () => {
  auth.hydrate();
  if (auth.token) {
    overview.value = await api.adminOverview(auth.token);
  }
});
</script>
