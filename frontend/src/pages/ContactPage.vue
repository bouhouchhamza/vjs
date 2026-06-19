<template>
  <section class="container-page grid gap-10 py-10 lg:grid-cols-[0.8fr_1fr]">
    <div>
      <h1 class="text-4xl font-semibold">Contact</h1>
      <p class="mt-4 leading-7 text-neutral-600">Questions about orders, sourcing, partnerships, or product care can be sent through this form.</p>
      <div class="mt-8 grid gap-3 text-sm text-neutral-600">
        <span>support@velora.test</span>
        <span>100 Market Street, San Francisco, CA</span>
        <span>Monday through Friday, 9:00-17:00</span>
      </div>
    </div>
    <form class="rounded-md border border-neutral-200 bg-white p-6" @submit.prevent="sent = true">
      <div class="grid gap-4">
        <input class="input" placeholder="Name" required />
        <input class="input" type="email" placeholder="Email" required />
        <input class="input" placeholder="Subject" required />
        <textarea class="input min-h-36 py-3" placeholder="Message" required />
        <button class="btn-primary" type="submit">{{ sent ? 'Message sent' : 'Send message' }}</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sent = ref(false);
</script>
