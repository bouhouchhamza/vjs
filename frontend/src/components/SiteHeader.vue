<template>
  <header class="sticky top-0 z-40 border-b border-neutral-200 bg-ivory/95 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <RouterLink to="/" class="text-xl font-bold tracking-normal">Velora</RouterLink>
      <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="text-neutral-700 hover:text-ink">{{ item.label }}</RouterLink>
      </nav>
      <div class="flex items-center gap-2">
        <RouterLink to="/cart" class="relative grid h-10 w-10 place-items-center rounded-md border border-neutral-300 bg-white" aria-label="Panier">
          <ShoppingBag class="h-5 w-5" />
          <span v-if="cart.itemCount" class="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-xs font-bold text-white">
            {{ cart.itemCount }}
          </span>
        </RouterLink>
        <RouterLink v-if="!auth.isAuthenticated" to="/login" class="btn-secondary hidden sm:inline-flex">Connexion</RouterLink>
        <RouterLink v-else :to="auth.user?.role === 'admin' ? '/admin' : '/dashboard'" class="grid h-10 w-10 place-items-center rounded-md bg-ink text-white" aria-label="Compte">
          <User class="h-5 w-5" />
        </RouterLink>
        <button class="grid h-10 w-10 place-items-center rounded-md border border-neutral-300 bg-white md:hidden" type="button" aria-label="Menu" @click="open = !open">
          <Menu class="h-5 w-5" />
        </button>
      </div>
    </div>
    <nav v-if="open" class="container-page grid gap-2 border-t border-neutral-200 py-4 text-sm font-medium md:hidden">
      <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="py-2" @click="open = false">{{ item.label }}</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Menu, ShoppingBag, User } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const nav = [
  { to: '/shop', label: 'Boutique' },
  { to: '/categories', label: 'Catégories' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' }
];

const open = ref(false);
const auth = useAuthStore();
const cart = useCartStore();

onMounted(() => {
  auth.hydrate();
  cart.hydrate();
});
</script>
