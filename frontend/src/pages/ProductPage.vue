<template>
  <section class="container-page py-10">
    <p v-if="error" class="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ error }}</p>
    <div v-else-if="product" class="grid gap-10 lg:grid-cols-2">
      <div class="grid gap-4">
        <img :src="activeImage" :alt="product.name" class="aspect-[4/5] w-full rounded-md object-cover" />
        <div class="grid grid-cols-4 gap-3">
          <button v-for="image in product.gallery" :key="image" type="button" class="overflow-hidden rounded-md border border-neutral-200" @click="activeImage = image">
            <img :src="image" :alt="product.name" class="aspect-square w-full object-cover" />
          </button>
        </div>
      </div>
      <div>
        <p class="text-sm font-semibold uppercase tracking-wide text-brass">{{ categoryName }}</p>
        <h1 class="mt-3 text-4xl font-semibold">{{ product.name }}</h1>
        <div class="mt-4 flex items-center gap-3">
          <span class="text-2xl font-semibold">{{ formatCurrency(product.price) }}</span>
          <span v-if="product.compareAtPrice" class="text-neutral-400 line-through">{{ formatCurrency(product.compareAtPrice) }}</span>
        </div>
        <p class="mt-6 leading-7 text-neutral-600">{{ product.description }}</p>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <QuantityStepper v-model="quantity" :max="product.stock" />
          <button class="btn-primary" type="button" @click="addToCart">
            <ShoppingBag class="h-4 w-4" />
            Ajouter au panier
          </button>
        </div>
        <div class="mt-8 grid gap-3 border-y border-neutral-200 py-6 text-sm text-neutral-600">
          <span>{{ product.stock }} en stock</span>
          <span>Note moyenne {{ product.rating.toFixed(1) }} basée sur {{ product.reviewCount }} avis</span>
          <span>Mots-clés: {{ product.tags.join(', ') }}</span>
        </div>
        <section class="mt-8">
          <h2 class="text-xl font-semibold">Avis clients</h2>
          <div class="mt-4 grid gap-3">
            <div v-for="review in reviews" :key="review.name" class="rounded-md border border-neutral-200 bg-white p-4">
              <div class="flex items-center justify-between">
                <strong>{{ review.name }}</strong>
                <span class="text-sm text-brass">{{ review.rating }} / 5</span>
              </div>
              <p class="mt-2 text-sm text-neutral-600">{{ review.text }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>

  <section v-if="related.length" class="container-page py-12">
    <h2 class="section-title">Produits associés</h2>
    <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard v-for="item in related" :key="item.id" :product="item" :categories="categories" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ShoppingBag } from 'lucide-vue-next';
import ProductCard from '@/components/ProductCard.vue';
import QuantityStepper from '@/components/QuantityStepper.vue';
import { api } from '@/api/http';
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/utils/format';
import type { Category, Product } from '@/types';

const route = useRoute();
const cart = useCartStore();
const product = ref<Product | null>(null);
const related = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const activeImage = ref('');
const quantity = ref(1);
const error = ref('');
const reviews = [
  { name: 'Avery', rating: 5, text: 'Produit fidèle à la description et finition très propre.' },
  { name: 'Jordan', rating: 4, text: 'Livraison rapide, emballage soigné et bonne qualité.' }
];

const categoryName = computed(() => categories.value.find((category) => category.id === product.value?.categoryId)?.name ?? 'Collection');

function addToCart() {
  if (product.value) {
    cart.add(product.value, quantity.value);
  }
}

onMounted(async () => {
  try {
    categories.value = await api.categories();
    product.value = await api.product(String(route.params.slug));
    activeImage.value = product.value.image;
    related.value = await api.relatedProducts(product.value.id);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Impossible de charger le produit';
  }
});
</script>
