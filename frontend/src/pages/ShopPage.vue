<template>
  <section class="container-page py-10">
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-4xl font-semibold">Boutique</h1>
        <p class="mt-2 text-neutral-600">Parcourez des produits réels: smartphones, audio, informatique, maison, mode et sport.</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-3 md:w-[680px]">
        <input v-model="search" class="input" type="search" placeholder="Rechercher un produit" @keyup.enter="applyFilters" />
        <select v-model="categoryId" class="input" @change="applyFilters">
          <option value="">Toutes les catégories</option>
          <option v-for="category in catalog.categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <select v-model="sort" class="input" @change="applyFilters">
          <option value="name:asc">Nom</option>
          <option value="price:asc">Prix croissant</option>
          <option value="price:desc">Prix décroissant</option>
          <option value="rating:desc">Meilleures notes</option>
        </select>
      </div>
    </div>

    <p v-if="catalog.error" class="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ catalog.error }}</p>
    <LoadingState v-if="catalog.loading" class="mt-8" :count="8" />
    <EmptyState v-else-if="!catalog.products?.items.length" class="mt-8" title="Aucun produit trouvé" message="Modifiez la recherche ou les filtres pour afficher plus de produits." />
    <div v-else class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard v-for="product in catalog.products.items" :key="product.id" :product="product" :categories="catalog.categories" />
    </div>

    <div v-if="catalog.products" class="mt-10 flex items-center justify-between border-t border-neutral-200 pt-6">
      <button class="btn-secondary" type="button" :disabled="page <= 1" @click="changePage(page - 1)">Précédent</button>
      <span class="text-sm text-neutral-600">Page {{ catalog.products.meta.page }} sur {{ catalog.products.meta.totalPages }}</span>
      <button class="btn-secondary" type="button" :disabled="page >= catalog.products.meta.totalPages" @click="changePage(page + 1)">Suivant</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EmptyState from '@/components/EmptyState.vue';
import LoadingState from '@/components/LoadingState.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useCatalogStore } from '@/stores/catalog';

const route = useRoute();
const router = useRouter();
const catalog = useCatalogStore();
const search = ref(String(route.query.search ?? ''));
const categoryId = ref(String(route.query.categoryId ?? ''));
const sort = ref(`${route.query.sortBy ?? 'name'}:${route.query.sortDirection ?? 'asc'}`);
const page = ref(Number(route.query.page ?? 1));

function params() {
  const [sortBy, sortDirection] = sort.value.split(':');
  const next = new URLSearchParams({ page: String(page.value), limit: '8', sortBy, sortDirection });
  if (search.value) next.set('search', search.value);
  if (categoryId.value) next.set('categoryId', categoryId.value);
  return next;
}

function applyFilters() {
  page.value = 1;
  void router.replace({ query: Object.fromEntries(params()) });
  void catalog.loadProducts(params());
}

function changePage(nextPage: number) {
  page.value = nextPage;
  void router.replace({ query: Object.fromEntries(params()) });
  void catalog.loadProducts(params());
}

watch(
  () => route.query.categoryId,
  (value) => {
    categoryId.value = String(value ?? '');
    applyFilters();
  }
);

onMounted(async () => {
  await catalog.loadCategories();
  await catalog.loadProducts(params());
});
</script>
