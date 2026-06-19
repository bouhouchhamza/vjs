import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { api } from '@/api/http';
import type { User } from '@/types';

const TOKEN_KEY = 'velora_token';
const USER_KEY = 'velora_user';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => Boolean(token.value && user.value));

  function hydrate() {
    if (token.value && user.value) {
      return;
    }

    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser) as User;
    }
  }

  function persist(nextUser: User, nextToken: string) {
    user.value = nextUser;
    token.value = nextToken;
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }

  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.login({ email, password });
      persist(response.user, response.accessToken);
      return response.user;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function register(name: string, email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.register({ name, email, password });
      persist(response.user, response.accessToken);
      return response.user;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function refreshProfile() {
    if (!token.value) {
      return;
    }
    user.value = await api.profile(token.value);
    localStorage.setItem(USER_KEY, JSON.stringify(user.value));
  }

  async function updateProfile(payload: Partial<User>) {
    if (!token.value) {
      return;
    }
    user.value = await api.updateProfile(token.value, payload);
    localStorage.setItem(USER_KEY, JSON.stringify(user.value));
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    hydrate,
    login,
    register,
    refreshProfile,
    updateProfile,
    logout
  };
});
