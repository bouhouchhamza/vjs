<template>
  <div class="inline-grid h-11 grid-cols-[2.75rem_3.5rem_2.75rem] overflow-hidden rounded-md border border-neutral-300 bg-white">
    <button type="button" class="grid place-items-center hover:bg-neutral-100" :disabled="modelValue <= min" @click="$emit('update:modelValue', modelValue - 1)">
      <Minus class="h-4 w-4" />
    </button>
    <input
      class="w-full border-x border-neutral-300 text-center text-sm font-semibold outline-none"
      type="number"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
    />
    <button type="button" class="grid place-items-center hover:bg-neutral-100" :disabled="modelValue >= max" @click="$emit('update:modelValue', modelValue + 1)">
      <Plus class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
  }>(),
  {
    min: 1,
    max: 99
  }
);

defineEmits<{ 'update:modelValue': [value: number] }>();
</script>
