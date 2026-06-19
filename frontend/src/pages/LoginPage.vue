<template>
  <section class="container-page grid min-h-[calc(100vh-4rem)] items-center py-10">
    <div class="mx-auto w-full max-w-md rounded-md border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 class="text-3xl font-semibold">Sign in</h1>
      <p class="mt-2 text-sm text-neutral-600">Access your orders, profile, and saved account details.</p>
      <form class="mt-6 grid gap-4" @submit.prevent="submit">
        <input v-model="email" class="input" type="email" placeholder="Email" required />
        <input v-model="password" class="input" type="password" placeholder="Password" required />
        <p v-if="auth.error" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{{ auth.error }}</p>
        <button class="btn-primary w-full" type="submit" :disabled="auth.loading">{{ auth.loading ? 'Signing in' : 'Sign in' }}</button>
      </form>
      <p class="mt-5 text-sm text-neutral-600">New here? <RouterLink to="/register" class="font-semibold text-brass">Create an account</RouterLink></p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const email = ref('mia@velora.test');
const password = ref('password');

async function submit() {
  const user = await auth.login(email.value, password.value);
  const redirect = String(route.query.redirect ?? (user.role === 'admin' ? '/admin' : '/dashboard'));
  await router.push(redirect);
}
</script>
