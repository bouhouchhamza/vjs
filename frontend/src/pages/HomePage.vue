<template>
  <section class="bg-white">
    <div class="container-page grid min-h-[620px] items-center gap-10 py-10 lg:grid-cols-[1fr_0.9fr]">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold uppercase tracking-wide text-brass">Nouvelle sélection disponible</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-normal text-ink md:text-7xl">Velora</h1>
        <p class="mt-5 text-lg leading-8 text-neutral-600">Smartphones, audio, informatique, maison et essentiels premium sélectionnés pour un usage quotidien fiable.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/shop" class="btn-primary">Voir la boutique</RouterLink>
          <RouterLink to="/categories" class="btn-secondary">Parcourir les catégories</RouterLink>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-md">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80" alt="Boutique premium" class="h-[520px] w-full object-cover" />
        <div class="absolute bottom-0 left-0 right-0 bg-ink/80 p-5 text-white backdrop-blur">
          <p class="text-sm font-semibold">Livraison offerte dès 100 €</p>
          <p class="mt-1 text-sm text-white/75">Expédition rapide, retours simples et support réactif.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="container-page py-16">
    <div class="flex items-end justify-between gap-4">
      <h2 class="section-title">Produits en vedette</h2>
      <RouterLink to="/shop" class="text-sm font-semibold text-brass">Tout voir</RouterLink>
    </div>
    <LoadingState v-if="catalog.loading" class="mt-8" />
    <div v-else class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard v-for="product in catalog.featured" :key="product.id" :product="product" :categories="catalog.categories" />
    </div>
  </section>

  <section class="bg-white py-16">
    <div class="container-page">
      <h2 class="section-title">Catégories</h2>
      <div class="mt-8 grid gap-5 md:grid-cols-3">
        <RouterLink v-for="category in catalog.categories.slice(0, 6)" :key="category.id" :to="{ name: 'shop', query: { categoryId: category.id } }" class="group overflow-hidden rounded-md border border-neutral-200 bg-white">
          <div class="aspect-[5/3] overflow-hidden">
            <img :src="category.image" :alt="category.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <div class="p-5">
            <h3 class="text-lg font-semibold">{{ category.name }}</h3>
            <p class="mt-2 text-sm leading-6 text-neutral-600">{{ category.description }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="container-page grid gap-5 py-16 lg:grid-cols-2">
    <div class="rounded-md bg-moss p-8 text-white">
      <p class="text-sm font-semibold uppercase tracking-wide text-white/70">Offre limitée</p>
      <h2 class="mt-3 text-3xl font-semibold">Jusqu'à 20% sur les essentiels tech et maison.</h2>
      <RouterLink to="/shop" class="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-ink">Découvrir l'offre</RouterLink>
    </div>
    <div class="rounded-md bg-clay p-8 text-white">
      <p class="text-sm font-semibold uppercase tracking-wide text-white/70">Nouveautés</p>
      <h2 class="mt-3 text-3xl font-semibold">Des produits concrets pour travailler, écouter, courir et vivre mieux.</h2>
      <RouterLink to="/shop?sortBy=name" class="mt-6 inline-flex rounded-md bg-white px-5 py-3 text-sm font-semibold text-ink">Explorer</RouterLink>
    </div>
  </section>

  <section class="bg-white py-16">
    <div class="container-page grid gap-6 md:grid-cols-4">
      <div v-for="benefit in benefits" :key="benefit.title" class="rounded-md border border-neutral-200 p-5">
        <component :is="benefit.icon" class="h-6 w-6 text-brass" />
        <h3 class="mt-4 font-semibold">{{ benefit.title }}</h3>
        <p class="mt-2 text-sm leading-6 text-neutral-600">{{ benefit.text }}</p>
      </div>
    </div>
  </section>

  <section class="container-page py-16">
    <div class="rounded-md border border-neutral-200 bg-white p-8 md:flex md:items-center md:justify-between md:gap-8">
      <div>
        <h2 class="text-2xl font-semibold">Recevoir les nouveautés Velora</h2>
        <p class="mt-2 text-sm text-neutral-600">Promotions privées, sorties produits et conseils utiles.</p>
      </div>
      <form class="mt-6 flex gap-3 md:mt-0" @submit.prevent="subscribed = true">
        <input class="input min-w-0 md:w-80" type="email" placeholder="Adresse e-mail" required />
        <button class="btn-primary" type="submit">{{ subscribed ? 'Inscrit' : "S'inscrire" }}</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Headphones, RefreshCcw, ShieldCheck, Truck } from 'lucide-vue-next';
import LoadingState from '@/components/LoadingState.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useCatalogStore } from '@/stores/catalog';

const catalog = useCatalogStore();
const subscribed = ref(false);
const benefits = [
  { title: 'Livraison rapide', text: 'Expédition fiable avec suivi clair sur chaque commande.', icon: Truck },
  { title: 'Retours simples', text: 'Retours et échanges faciles sur les achats éligibles.', icon: RefreshCcw },
  { title: 'Paiement sécurisé', text: 'Parcours de paiement prêt pour une intégration production.', icon: ShieldCheck },
  { title: 'Support premium', text: 'Aide claire pour les commandes, produits et garanties.', icon: Headphones }
];

onMounted(() => void catalog.loadHome());
</script>
