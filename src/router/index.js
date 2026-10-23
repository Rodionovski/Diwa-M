import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes.mjs';
import { loadContent } from '@/lib/content';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'router-link-active',
  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // Price sections can arrive from Supabase after the page first renders.
      await loadContent().catch(() => {});
      await nextTick();
      if (!document.getElementById(to.hash.slice(1))) return { top: 0 };
      return {
        el: to.hash,
        top: 24,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      };
    }
    return { top: 0 };
  },
});

export default router;
