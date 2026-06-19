<template>
  <section>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1 class="text-3xl font-semibold">Orders</h1>
      <input v-model="search" class="input md:w-80" type="search" placeholder="Search orders" />
    </div>
    <div class="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-white">
      <table class="w-full min-w-[820px] text-left text-sm">
        <thead class="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
          <tr>
            <th class="p-4">Order</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filtered" :key="order.id" class="border-b border-neutral-100">
            <td class="p-4 font-semibold">{{ order.id }}</td>
            <td>{{ order.customer.email }}</td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td><span class="rounded-full bg-neutral-100 px-3 py-1 capitalize">{{ order.status }}</span></td>
            <td>{{ formatCurrency(order.total) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/api/http';
import { useAuthStore } from '@/stores/auth';
import { formatCurrency, formatDate } from '@/utils/format';
import type { Order } from '@/types';

const auth = useAuthStore();
const orders = ref<Order[]>([]);
const search = ref('');
const filtered = computed(() => orders.value.filter((order) => `${order.id} ${order.customer.email}`.toLowerCase().includes(search.value.toLowerCase())));

onMounted(async () => {
  auth.hydrate();
  if (auth.token) {
    orders.value = await api.allOrders(auth.token);
  }
});
</script>
