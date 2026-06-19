<template>
  <div class="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-neutral-300 bg-white px-6 text-center">
    <PackageOpen class="h-9 w-9 text-neutral-400" />
    <h2 class="mt-4 text-lg font-semibold">{{ title }}</h2>
    <p class="mt-2 max-w-md text-sm text-neutral-600">{{ message }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PackageOpen } from 'lucide-vue-next';

defineProps<{
  title: string;
  message: string;
}>();
</script>
