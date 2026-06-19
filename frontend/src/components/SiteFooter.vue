<template>
  <footer class="mt-20 border-t border-neutral-200 bg-white">
    <div class="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
      <div>
        <h2 class="text-xl font-bold">Velora</h2>
        <p class="mt-3 max-w-sm text-sm leading-6 text-neutral-600">Produits premium sélectionnés pour leur qualité, leur utilité et leur durabilité.</p>
      </div>
      <div class="grid gap-8 sm:grid-cols-3">
        <div>
          <h3 class="text-sm font-semibold">Boutique</h3>
          <div class="mt-3 grid gap-2 text-sm text-neutral-600">
            <RouterLink to="/shop">Tous les produits</RouterLink>
            <RouterLink to="/categories">Collections</RouterLink>
            <RouterLink to="/cart">Panier</RouterLink>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold">Entreprise</h3>
          <div class="mt-3 grid gap-2 text-sm text-neutral-600">
            <RouterLink to="/about">À propos</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-semibold">Aide</h3>
          <div class="mt-3 grid gap-2 text-sm text-neutral-600">
            <span>Livraison</span>
            <span>Retours</span>
            <span>Conseils</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
