<template>
  <section>
    <h1 class="text-3xl font-semibold">Analytics</h1>
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="rounded-md border border-neutral-200 bg-white p-5">
        <p class="text-sm text-neutral-500">Average order value</p>
        <strong class="mt-2 block text-2xl">{{ formatCurrency(averageOrderValue) }}</strong>
      </div>
      <div class="rounded-md border border-neutral-200 bg-white p-5">
        <p class="text-sm text-neutral-500">Conversion proxy</p>
        <strong class="mt-2 block text-2xl">3.8%</strong>
      </div>
      <div class="rounded-md border border-neutral-200 bg-white p-5">
        <p class="text-sm text-neutral-500">Returning customer proxy</p>
        <strong class="mt-2 block text-2xl">41%</strong>
      </div>
    </div>
    <div class="mt-8 rounded-md border border-neutral-200 bg-white p-6">
      <h2 class="text-xl font-semibold">Revenue by channel</h2>
      <div class="mt-6 grid gap-4">
        <div v-for="row in rows" :key="row.label">
          <div class="mb-2 flex justify-between text-sm"><span>{{ row.label }}</span><strong>{{ row.value }}%</strong></div>
          <div class="h-3 rounded-full bg-neutral-100"><div class="h-3 rounded-full bg-brass" :style="{ width: `${row.value}%` }" /></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/api/http';
import { useAuthStore } from '@/stores/auth';
import { formatCurrency } from '@/utils/format';
import type { Order } from '@/types';

const auth = useAuthStore();
const orders = ref<Order[]>([]);
const rows = [
  { label: 'Direct', value: 48 },
  { label: 'Search', value: 31 },
  { label: 'Email', value: 21 }
];

const averageOrderValue = computed(() => {
  if (!orders.value.length) return 0;
  return orders.value.reduce((sum, order) => sum + order.total, 0) / orders.value.length;
});

onMounted(async () => {
  auth.hydrate();
  if (auth.token) {
    orders.value = await api.allOrders(auth.token);
  }
});
</script>
