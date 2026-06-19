<template>
  <div class="min-h-screen bg-neutral-100 text-ink">
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-neutral-200 bg-white lg:block">
      <div class="flex h-16 items-center px-6 text-xl font-bold">Velora Admin</div>
      <nav class="grid gap-1 px-3 text-sm font-medium">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="flex items-center gap-3 rounded-md px-3 py-3 text-neutral-700 hover:bg-neutral-100">
          <component :is="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>
    <div class="lg:pl-64">
      <header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:px-8">
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="btn-secondary">Storefront</RouterLink>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="hidden text-neutral-600 sm:inline">{{ auth.user?.email }}</span>
          <button class="btn-primary" type="button" @click="logout">Logout</button>
        </div>
      </header>
      <div class="border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
        <nav class="flex gap-2 overflow-x-auto text-sm">
          <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="whitespace-nowrap rounded-md border border-neutral-200 px-3 py-2">{{ item.label }}</RouterLink>
        </nav>
      </div>
      <main class="px-4 py-8 lg:px-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { BarChart3, Boxes, Gauge, Settings, ShoppingCart, Tags, Users } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';

const nav = [
  { to: '/admin', label: 'Overview', icon: Gauge },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/categories', label: 'Categories', icon: Tags },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings }
];

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  void router.push('/');
}
</script>
