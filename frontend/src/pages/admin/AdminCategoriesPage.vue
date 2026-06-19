<template>
  <section>
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1 class="text-3xl font-semibold">Categories</h1>
      <input v-model="search" class="input md:w-80" type="search" placeholder="Search categories" />
    </div>
    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <article v-for="category in filtered" :key="category.id" class="overflow-hidden rounded-md border border-neutral-200 bg-white">
        <img :src="category.image" :alt="category.name" class="aspect-[5/3] w-full object-cover" />
        <div class="p-5">
          <h2 class="font-semibold">{{ category.name }}</h2>
          <p class="mt-2 text-sm leading-6 text-neutral-600">{{ category.description }}</p>
          <p class="mt-4 text-xs text-neutral-500">{{ category.slug }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { api } from '@/api/http';
import type { Category } from '@/types';

const categories = ref<Category[]>([]);
const search = ref('');
const filtered = computed(() => categories.value.filter((category) => category.name.toLowerCase().includes(search.value.toLowerCase())));

onMounted(async () => {
  categories.value = await api.categories();
});
</script>
