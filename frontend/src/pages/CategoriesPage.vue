<template>
  <section class="container-page py-10">
    <h1 class="text-4xl font-semibold">Catégories</h1>
    <p class="mt-2 text-neutral-600">Explorez les collections principales du catalogue Velora.</p>
    <div class="mt-8 grid gap-5 md:grid-cols-3">
      <RouterLink v-for="category in catalog.categories" :key="category.id" :to="{ name: 'shop', query: { categoryId: category.id } }" class="group overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
        <img :src="category.image" :alt="category.name" class="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105" />
        <div class="p-5">
          <h2 class="text-xl font-semibold">{{ category.name }}</h2>
          <p class="mt-2 text-sm leading-6 text-neutral-600">{{ category.description }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatalogStore } from '@/stores/catalog';

const catalog = useCatalogStore();
onMounted(() => void catalog.loadCategories());
</script>
