import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/StorefrontLayout.vue'),
      children: [
        { path: '', name: 'home', component: () => import('@/pages/HomePage.vue') },
        { path: 'shop', name: 'shop', component: () => import('@/pages/ShopPage.vue') },
        { path: 'products/:slug', name: 'product', component: () => import('@/pages/ProductPage.vue') },
        { path: 'categories', name: 'categories', component: () => import('@/pages/CategoriesPage.vue') },
        { path: 'cart', name: 'cart', component: () => import('@/pages/CartPage.vue') },
        { path: 'checkout', name: 'checkout', component: () => import('@/pages/CheckoutPage.vue') },
        { path: 'login', name: 'login', component: () => import('@/pages/LoginPage.vue'), meta: { guest: true } },
        { path: 'register', name: 'register', component: () => import('@/pages/RegisterPage.vue'), meta: { guest: true } },
        { path: 'dashboard', name: 'dashboard', component: () => import('@/pages/UserDashboardPage.vue'), meta: { requiresAuth: true } },
        { path: 'contact', name: 'contact', component: () => import('@/pages/ContactPage.vue') },
        { path: 'about', name: 'about', component: () => import('@/pages/AboutPage.vue') }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: '', name: 'admin', component: () => import('@/pages/admin/AdminDashboardPage.vue') },
        { path: 'products', name: 'admin-products', component: () => import('@/pages/admin/AdminProductsPage.vue') },
        { path: 'categories', name: 'admin-categories', component: () => import('@/pages/admin/AdminCategoriesPage.vue') },
        { path: 'orders', name: 'admin-orders', component: () => import('@/pages/admin/AdminOrdersPage.vue') },
        { path: 'customers', name: 'admin-customers', component: () => import('@/pages/admin/AdminCustomersPage.vue') },
        { path: 'analytics', name: 'admin-analytics', component: () => import('@/pages/admin/AdminAnalyticsPage.vue') },
        { path: 'settings', name: 'admin-settings', component: () => import('@/pages/admin/AdminSettingsPage.vue') }
      ]
    }
  ],
  scrollBehavior: () => ({ top: 0 })
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  auth.hydrate();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if (to.meta.requiresAdmin && auth.user?.role !== 'admin') {
    return { name: 'home' };
  }

  if (to.meta.guest && auth.isAuthenticated) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
