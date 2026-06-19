<template>
  <article class="group overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
    <RouterLink :to="{ name: 'product', params: { slug: product.slug } }" class="block">
      <div class="aspect-[4/5] overflow-hidden bg-neutral-100">
        <img :src="product.image" :alt="product.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div class="space-y-3 p-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-brass">{{ categoryName }}</p>
          <h3 class="mt-1 line-clamp-2 min-h-12 text-base font-semibold">{{ product.name }}</h3>
        </div>
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-baseline gap-2">
            <span class="font-semibold">{{ formatCurrency(product.price) }}</span>
            <span v-if="product.compareAtPrice" class="text-sm text-neutral-400 line-through">
              {{ formatCurrency(product.compareAtPrice) }}
            </span>
          </div>
          <span class="text-sm text-neutral-600">{{ product.rating.toFixed(1) }}</span>
        </div>
      </div>
    </RouterLink>
    <div class="border-t border-neutral-100 p-4">
      <button class="btn-primary w-full" type="button" @click="cart.add(product)">
        <ShoppingBag class="h-4 w-4" />
        Ajouter
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ShoppingBag } from 'lucide-vue-next';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/format';
import type { Category, Product } from '@/types';

const props = defineProps<{
  product: Product;
  categories?: Category[];
}>();

const cart = useCartStore();
const categoryName = computed(() => props.categories?.find((category) => category.id === props.product.categoryId)?.name ?? 'Collection');
</script>
