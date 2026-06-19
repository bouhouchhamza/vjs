<template>
  <section class="container-page py-10">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-4xl font-semibold">Dashboard</h1>
        <p class="mt-2 text-neutral-600">Profile, orders, and account settings.</p>
      </div>
      <button class="btn-secondary" type="button" @click="logout">Logout</button>
    </div>

    <div class="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
      <section class="rounded-md border border-neutral-200 bg-white p-6">
        <h2 class="text-xl font-semibold">Profile</h2>
        <form class="mt-5 grid gap-4" @submit.prevent="saveProfile">
          <input v-model="profile.name" class="input" placeholder="Name" />
          <input v-model="profile.phone" class="input" placeholder="Phone" />
          <input v-model="profile.address" class="input" placeholder="Address" />
          <button class="btn-primary" type="submit">Save profile</button>
        </form>
      </section>

      <div class="grid gap-8">
        <section class="rounded-md border border-neutral-200 bg-white p-6">
          <h2 class="text-xl font-semibold">Order history</h2>
          <div v-if="orders.length" class="mt-5 overflow-x-auto">
            <table class="w-full min-w-[620px] text-left text-sm">
              <thead class="border-b border-neutral-200 text-neutral-500">
                <tr>
                  <th class="py-3">Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order.id" class="border-b border-neutral-100">
                  <td class="py-3 font-semibold">{{ order.id }}</td>
                  <td>{{ formatDate(order.createdAt) }}</td>
                  <td class="capitalize">{{ order.status }}</td>
                  <td>{{ formatCurrency(order.total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <EmptyState v-else class="mt-5" title="No orders yet" message="Orders created while signed in will appear here." />
        </section>

        <section class="rounded-md border border-neutral-200 bg-white p-6">
          <h2 class="text-xl font-semibold">Account settings</h2>
          <div class="mt-5 grid gap-3 text-sm text-neutral-600">
            <p>Email: {{ auth.user?.email }}</p>
            <p>Role: {{ auth.user?.role }}</p>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import EmptyState from '@/components/EmptyState.vue';
import { api } from '@/api/http';
import { useAuthStore } from '@/stores/auth';
import { formatCurrency, formatDate } from '@/utils/format';
import type { Order } from '@/types';

const auth = useAuthStore();
const router = useRouter();
const orders = ref<Order[]>([]);
const profile = reactive({ name: '', phone: '', address: '' });

async function saveProfile() {
  await auth.updateProfile(profile);
}

function logout() {
  auth.logout();
  void router.push('/');
}

onMounted(async () => {
  auth.hydrate();
  profile.name = auth.user?.name ?? '';
  profile.phone = auth.user?.phone ?? '';
  profile.address = auth.user?.address ?? '';
  if (auth.token) {
    orders.value = await api.myOrders(auth.token).catch(() => []);
  }
});
</script>
