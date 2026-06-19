<template>
  <section class="container-page py-10">
    <h1 class="text-4xl font-semibold">Commande</h1>
    <EmptyState v-if="!cart.items.length && !completedOrder" class="mt-8" title="Aucun article à commander" message="Votre panier est vide.">
      <RouterLink to="/shop" class="btn-primary mt-5">Voir les produits</RouterLink>
    </EmptyState>
    <div v-else-if="completedOrder" class="mt-8 rounded-md border border-green-200 bg-green-50 p-6">
      <h2 class="text-xl font-semibold text-green-900">Commande validée</h2>
      <p class="mt-2 text-green-800">La commande {{ completedOrder.id }} est maintenant {{ completedOrder.status }}.</p>
      <a v-if="completedOrder.whatsappUrl" class="btn-primary mt-5" :href="completedOrder.whatsappUrl" target="_blank" rel="noreferrer">Continuer sur WhatsApp</a>
      <RouterLink to="/shop" class="btn-primary mt-5">Continuer mes achats</RouterLink>
    </div>
    <form v-else class="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]" @submit.prevent="submit">
      <div class="grid gap-6">
        <section class="rounded-md border border-neutral-200 bg-white p-6">
          <h2 class="text-xl font-semibold">Informations client</h2>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <input v-model="form.name" class="input" placeholder="Nom complet" required />
            <input v-model="form.email" class="input" type="email" placeholder="E-mail" required />
            <input v-model="form.phone" class="input sm:col-span-2" placeholder="Téléphone" />
          </div>
        </section>
        <section class="rounded-md border border-neutral-200 bg-white p-6">
          <h2 class="text-xl font-semibold">Livraison</h2>
          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <input v-model="form.line1" class="input sm:col-span-2" placeholder="Adresse" required />
            <input v-model="form.city" class="input" placeholder="Ville" required />
            <input v-model="form.state" class="input" placeholder="Région" required />
            <input v-model="form.postalCode" class="input" placeholder="Code postal" required />
            <input v-model="form.country" class="input" placeholder="Pays" required />
          </div>
        </section>
        <section class="rounded-md border border-neutral-200 bg-white p-6">
          <h2 class="text-xl font-semibold">Mode de paiement</h2>
          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <label v-for="method in methods" :key="method.value" class="flex cursor-pointer items-center gap-3 rounded-md border border-neutral-200 p-4">
              <input v-model="form.paymentMethod" type="radio" :value="method.value" />
              <span class="text-sm font-semibold">{{ method.label }}</span>
            </label>
          </div>
        </section>
        <p v-if="error" class="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ error }}</p>
      </div>
      <aside class="h-fit rounded-md border border-neutral-200 bg-white p-6">
        <h2 class="text-xl font-semibold">Résumé de commande</h2>
        <div class="mt-5 grid gap-4">
          <div v-for="item in cart.items" :key="item.product.id" class="flex justify-between gap-4 text-sm">
            <span>{{ item.quantity }} x {{ item.product.name }}</span>
            <strong>{{ formatCurrency(item.product.price * item.quantity) }}</strong>
          </div>
        </div>
        <div class="mt-5 grid gap-3 border-t border-neutral-200 pt-5 text-sm">
          <div class="flex justify-between"><span>Sous-total</span><strong>{{ formatCurrency(cart.subtotal) }}</strong></div>
          <div class="flex justify-between"><span>Livraison</span><strong>{{ formatCurrency(cart.shipping) }}</strong></div>
          <div class="flex justify-between"><span>TVA</span><strong>{{ formatCurrency(cart.tax) }}</strong></div>
          <div class="flex justify-between text-base"><span>Total</span><strong>{{ formatCurrency(cart.total) }}</strong></div>
        </div>
        <button class="btn-primary mt-6 w-full" type="submit" :disabled="loading">{{ loading ? 'Validation...' : 'Valider la commande' }}</button>
      </aside>
    </form>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import EmptyState from '@/components/EmptyState.vue';
import { api } from '@/api/http';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/format';
import type { Order } from '@/types';

const auth = useAuthStore();
const cart = useCartStore();
const loading = ref(false);
const error = ref('');
const completedOrder = ref<Order | null>(null);
const methods = [
  { label: 'Carte', value: 'card' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bank', value: 'bank' },
  { label: 'WhatsApp', value: 'whatsapp' }
] as const;

const form = reactive({
  name: '',
  email: '',
  phone: '',
  line1: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'US',
  paymentMethod: 'card'
});

async function submit() {
  loading.value = true;
  error.value = '';
  try {
    completedOrder.value = await api.createOrder({
      customer: { name: form.name, email: form.email, phone: form.phone },
      shippingAddress: {
        line1: form.line1,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country
      },
      paymentMethod: form.paymentMethod,
      items: cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    }, auth.token);
    cart.clear();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Impossible de valider la commande';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  cart.hydrate();
  auth.hydrate();
  if (auth.user) {
    form.name = auth.user.name;
    form.email = auth.user.email;
    form.phone = auth.user.phone ?? '';
    form.line1 = auth.user.address ?? '';
  }
});
</script>
