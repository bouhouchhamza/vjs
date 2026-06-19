<template>
  <section class="container-page py-10">
    <h1 class="text-4xl font-semibold">Panier</h1>
    <EmptyState v-if="!cart.items.length" class="mt-8" title="Votre panier est vide" message="Ajoutez des produits pour commencer votre commande.">
      <RouterLink to="/shop" class="btn-primary mt-5">Voir les produits</RouterLink>
    </EmptyState>
    <div v-else class="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
      <div class="grid gap-4">
        <article v-for="item in cart.items" :key="item.product.id" class="grid gap-4 rounded-md border border-neutral-200 bg-white p-4 sm:grid-cols-[120px_1fr_auto]">
          <img :src="item.product.image" :alt="item.product.name" class="aspect-square w-full rounded-md object-cover sm:w-28" />
          <div>
            <h2 class="font-semibold">{{ item.product.name }}</h2>
            <p class="mt-1 text-sm text-neutral-600">{{ formatCurrency(item.product.price) }}</p>
            <button class="mt-4 text-sm font-semibold text-clay" type="button" @click="cart.remove(item.product.id)">Retirer</button>
          </div>
          <QuantityStepper :model-value="item.quantity" @update:model-value="cart.update(item.product.id, $event)" />
        </article>
      </div>
      <aside class="h-fit rounded-md border border-neutral-200 bg-white p-6">
        <h2 class="text-xl font-semibold">Résumé</h2>
        <div class="mt-5 grid gap-3 text-sm">
          <div class="flex justify-between"><span>Sous-total</span><strong>{{ formatCurrency(cart.subtotal) }}</strong></div>
          <div class="flex justify-between"><span>Livraison</span><strong>{{ formatCurrency(cart.shipping) }}</strong></div>
          <div class="flex justify-between"><span>Tax</span><strong>{{ formatCurrency(cart.tax) }}</strong></div>
          <div class="flex justify-between border-t border-neutral-200 pt-3 text-base"><span>Total</span><strong>{{ formatCurrency(cart.total) }}</strong></div>
        </div>
        <RouterLink to="/checkout" class="btn-primary mt-6 w-full">Commander</RouterLink>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import EmptyState from '@/components/EmptyState.vue';
import QuantityStepper from '@/components/QuantityStepper.vue';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/format';

const cart = useCartStore();
onMounted(() => cart.hydrate());
</script>
