<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div v-for="item in count" :key="item" class="h-72 animate-pulse rounded-md bg-neutral-200" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ count?: number }>();
</script>
