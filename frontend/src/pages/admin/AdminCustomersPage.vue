<template>
  <section>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1 class="text-3xl font-semibold">Customers</h1>
      <input v-model="search" class="input md:w-80" type="search" placeholder="Search customers" />
    </div>
    <div class="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-white">
      <table class="w-full min-w-[720px] text-left text-sm">
        <thead class="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
          <tr>
            <th class="p-4">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in filtered" :key="customer.id" class="border-b border-neutral-100">
            <td class="p-4 font-semibold">{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone ?? 'None' }}</td>
            <td class="capitalize">{{ customer.role }}</td>
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
import type { User } from '@/types';

const auth = useAuthStore();
const customers = ref<User[]>([]);
const search = ref('');
const filtered = computed(() => customers.value.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(search.value.toLowerCase())));

onMounted(async () => {
  auth.hydrate();
  if (auth.token) {
    customers.value = await api.allUsers(auth.token);
  }
});
</script>
