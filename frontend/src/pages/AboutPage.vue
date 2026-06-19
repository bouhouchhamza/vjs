<template>
  <section class="bg-white">
    <div class="container-page grid gap-10 py-12 lg:grid-cols-[0.8fr_1fr]">
      <div>
        <h1 class="text-4xl font-semibold">About Velora</h1>
        <p class="mt-5 text-lg leading-8 text-neutral-600">Velora is a premium retail concept built around useful goods, durable materials, and calm shopping experiences.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1400&q=80" alt="Retail team preparing orders" class="h-[420px] w-full rounded-md object-cover" />
    </div>
  </section>
  <section class="container-page grid gap-6 py-16 md:grid-cols-3">
    <div v-for="value in values" :key="value.title" class="rounded-md border border-neutral-200 bg-white p-6">
      <h2 class="text-xl font-semibold">{{ value.title }}</h2>
      <p class="mt-3 text-sm leading-6 text-neutral-600">{{ value.text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const values = [
  { title: 'Material quality', text: 'Products are selected for construction, finish, and long-term usefulness.' },
  { title: 'Operational clarity', text: 'The buying journey is designed to be fast, predictable, and supportable.' },
  { title: 'Future-ready systems', text: 'The platform is structured for real inventory, payments, and database persistence.' }
];
</script>
