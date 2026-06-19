<template>
  <section class="container-page grid min-h-[calc(100vh-4rem)] items-center py-10">
    <div class="mx-auto w-full max-w-md rounded-md border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 class="text-3xl font-semibold">Create account</h1>
      <form class="mt-6 grid gap-4" @submit.prevent="submit">
        <input v-model="name" class="input" placeholder="Full name" required />
        <input v-model="email" class="input" type="email" placeholder="Email" required />
        <input v-model="password" class="input" type="password" placeholder="Password" required minlength="6" />
        <p v-if="auth.error" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{{ auth.error }}</p>
        <button class="btn-primary w-full" type="submit" :disabled="auth.loading">{{ auth.loading ? 'Creating account' : 'Create account' }}</button>
      </form>
      <p class="mt-5 text-sm text-neutral-600">Already registered? <RouterLink to="/login" class="font-semibold text-brass">Sign in</RouterLink></p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');

async function submit() {
  await auth.register(name.value, email.value, password.value);
  await router.push('/dashboard');
}
</script>
